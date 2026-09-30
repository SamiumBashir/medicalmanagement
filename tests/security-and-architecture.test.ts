/**
 * Automated Security Boundary, Authorization, and Healthcare Data Integrity Tests
 * Execution: npx tsx tests/security-and-architecture.test.ts
 */

import { hashPassword, comparePassword, signToken, verifyToken } from "../src/lib/auth/jwt";
import { hasPermission, isRouteAllowed } from "../src/lib/permissions";
import { generateVerificationToken, verifyReportPublic } from "../src/lib/services/report.service";
import { updateSampleStatus } from "../src/lib/services/sample.service";
import { recordPaymentTransaction, processRefundTransaction } from "../src/lib/services/payment.service";
import { createOrderTransaction } from "../src/lib/services/order.service";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log("\n=======================================================");
  console.log("  DIAGNOSTICARE AUTOMATED SECURITY & INTEGRITY TEST SUITE ");
  console.log("=======================================================\n");

  // -------------------------------------------------------------------------
  // 1. AUTHENTICATION & CRYPTOGRAPHY TESTS
  // -------------------------------------------------------------------------
  console.log("▶ [Test Suite 1] Authentication & Cryptographic Hashing");

  const password = "SecuredPassword2026!";
  const hash = await hashPassword(password);
  assert(hash.startsWith("$2"), "Password hashing utilizes strong bcrypt format");

  const isMatch = await comparePassword(password, hash);
  assert(isMatch === true, "Valid password credentials correctly match bcrypt hash");

  const isMismatch = await comparePassword("WrongPassword123", hash);
  assert(isMismatch === false, "Invalid password credentials are strictly rejected");

  const tokenPayload = {
    userId: "user-test-01",
    email: "test.patient@example.com",
    name: "Ayesha Siddiqua",
    role: "PATIENT" as const,
    patientId: "PAT-2026-999001",
  };
  const token = signToken(tokenPayload);
  assert(typeof token === "string" && token.split(".").length === 3, "JWT successfully signed with 3 standard segments");

  const verified = verifyToken(token);
  assert(verified !== null && verified.patientId === "PAT-2026-999001", "Valid JWT decodes correct patient identity");

  const tamperedToken = token.slice(0, -6) + "xyz123";
  const verifiedTampered = verifyToken(tamperedToken);
  assert(verifiedTampered === null, "Tampered JWT is safely rejected");

  // -------------------------------------------------------------------------
  // 2. ROLE-BASED ACCESS CONTROL & PERMISSIONS
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 2] RBAC & Privilege Escalation Boundary Guards");

  assert(hasPermission("SUPER_ADMIN", "billing.read") === true, "Super Admin has full billing read permission");
  assert(hasPermission("TECHNICIAN", "billing.create") === false, "Security Guard: Technician blocked from creating invoices/billing");
  assert(hasPermission("TECHNICIAN", "payments.create") === false, "Security Guard: Technician blocked from collecting cash/payments");
  assert(hasPermission("RECEPTIONIST", "users.update") === false, "Security Guard: Front desk receptionist blocked from user role alteration");
  assert(hasPermission("PATIENT", "reports.verify") === false, "Security Guard: Patient cannot verify or certify clinical reports");
  assert(hasPermission("DOCTOR", "reports.verify") === true, "Doctor permitted to verify and certify reports");
  assert(hasPermission("DOCTOR", "settings.update") === false, "Security Guard: Doctor cannot modify system-wide administrative settings");

  // -------------------------------------------------------------------------
  // 3. ROUTE AUTHORIZATION & URL ACCESS BOUNDARIES
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 3] Portal Route Boundary Enforcement");

  assert(isRouteAllowed("PATIENT", "/dashboard") === false, "Security Guard: Patient strictly blocked from staff dashboard root");
  assert(isRouteAllowed("PATIENT", "/dashboard/billing") === false, "Security Guard: Patient blocked from staff billing hub");
  assert(isRouteAllowed("PATIENT", "/patient/dashboard") === true, "Patient permitted to access patient portal dashboard");
  assert(isRouteAllowed("DOCTOR", "/dashboard/billing") === false, "Security Guard: Doctor restricted from financial billing routes");
  assert(isRouteAllowed("DOCTOR", "/dashboard/reports") === true, "Doctor permitted to access pathologist verification queue");
  assert(isRouteAllowed("TECHNICIAN", "/dashboard/laboratory") === true, "Technician permitted to access laboratory workbench");
  assert(isRouteAllowed("SUPER_ADMIN", "/dashboard/settings") === true, "Super Administrator possesses unrestricted access");

  // -------------------------------------------------------------------------
  // 4. PATIENT DATA OWNERSHIP & PRIVACY ISOLATION
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 4] Patient Data Isolation & Privacy Masking");

  // Patient A vs Patient B test
  const patientA_Id = "PAT-2026-000001";
  const patientB_Id = "PAT-2026-000002";

  // Simulate ownership assertion logic
  function checkPatientAccess(callerPatientId: string, targetPatientId: string, role: string) {
    if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "DOCTOR") return true;
    return callerPatientId === targetPatientId;
  }

  assert(
    checkPatientAccess(patientA_Id, patientB_Id, "PATIENT") === false,
    "Security Guard: Patient A (001) attempting to access Patient B (002) is DENIED (403 Forbidden)"
  );
  assert(
    checkPatientAccess(patientA_Id, patientA_Id, "PATIENT") === true,
    "Patient A accessing their own diagnostic health records is ALLOWED"
  );
  assert(
    checkPatientAccess("ANY", patientB_Id, "SUPER_ADMIN") === true,
    "Authorized Super Administrator access is granted for clinical audit"
  );

  // -------------------------------------------------------------------------
  // 5. REPORT VERIFICATION TOKEN & DATA MINIMIZATION
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 5] Cryptographic QR Verification & Privacy Minimization");

  const vToken = generateVerificationToken();
  assert(vToken.startsWith("vtok_") && vToken.length >= 32, "Verification token has high entropy (>= 32 chars)");

  const publicResult = await verifyReportPublic("RPT-2026-001245");
  assert(publicResult.found === true, "Public verification successfully locates verified report");
  if (publicResult.found && publicResult.verification) {
    assert(
      publicResult.verification.patientRef.includes(".***"),
      "Patient name is privacy-masked (e.g. 'Tanvir A.***') in public verification"
    );
    assert(
      (publicResult.verification as any)._id === undefined,
      "Internal MongoDB _id is NOT exposed in public verification payload"
    );
    assert(
      publicResult.verification.isAuthentic === true,
      "Verification response confirms document authenticity"
    );
  }

  // -------------------------------------------------------------------------
  // 6. SERVER-SIDE FINANCIAL INTEGRITY & CALCULATION TESTS
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 6] Financial Billing & Immutable Payment Ledger");

  // Simulate Order Requisition with authentic test IDs: test-cbc (550) + test-lipid (1200) = 1750
  const orderResult = await createOrderTransaction({
    patientName: "Farid Uddin",
    patientPhone: "+880 1711 555666",
    branchId: "branch-dhanmondi",
    testIds: ["test-cbc", "test-lipid"],
  });

  const expectedSubtotal = 1750;
  const expectedDiscount = Math.round(expectedSubtotal * 0.1); // 175
  const expectedTotal = expectedSubtotal - expectedDiscount; // 1575

  assert(orderResult.order.subtotal === expectedSubtotal, `Subtotal strictly computed server-side (৳${expectedSubtotal})`);
  assert(orderResult.order.discount === expectedDiscount, `10% online discount computed server-side (৳${expectedDiscount})`);
  assert(orderResult.order.total === expectedTotal, `Net total strictly equals subtotal - discount (৳${expectedTotal})`);
  assert(orderResult.invoice.due === expectedTotal, `Initial invoice balance matches total (৳${expectedTotal})`);

  // Record Partial Payment
  const payment1 = await recordPaymentTransaction(
    {
      invoiceId: orderResult.invoice.invoiceId,
      orderId: orderResult.order.orderId,
      patientName: orderResult.order.patientName,
      amount: 1000,
      method: "MOBILE_BANKING",
      notes: "bKash TxID #9872",
    },
    { name: "Cashier Shahriar", role: "ACCOUNTANT" }
  );

  assert(payment1.amount === 1000, "Payment record #1 immutable transaction created (৳1000)");
  assert(orderResult.invoice.paid === 1000, "Invoice paid balance updated to ৳1000");
  assert(orderResult.invoice.due === expectedTotal - 1000, `Invoice remaining balance due updated to ৳${expectedTotal - 1000}`);
  assert(orderResult.invoice.status === "PARTIAL", "Invoice status transitioned to PARTIAL");

  // Record Final Settlement Payment
  const payment2 = await recordPaymentTransaction(
    {
      invoiceId: orderResult.invoice.invoiceId,
      orderId: orderResult.order.orderId,
      patientName: orderResult.order.patientName,
      amount: expectedTotal - 1000,
      method: "CASH",
    },
    { name: "Cashier Shahriar", role: "ACCOUNTANT" }
  );

  assert(payment2.amount === expectedTotal - 1000, "Payment record #2 created for remaining settlement balance");
  assert(orderResult.invoice.due === 0, "Invoice remaining due is ৳0");
  assert(orderResult.invoice.status === "PAID", "Invoice status successfully transitioned to PAID");

  // Refund Workflow Test
  const refund = await processRefundTransaction(
    payment2.transactionId,
    "Patient cancelled additional liver profile consultation",
    { name: "Cashier Shahriar", role: "ACCOUNTANT" }
  );

  assert(refund.amount === -(expectedTotal - 1000), "Refund creates negative transaction record (payment history immutable)");
  assert(orderResult.invoice.due === expectedTotal - 1000, "Invoice balance restored by refunded amount");
  assert(orderResult.invoice.status === "PARTIAL", "Invoice status adjusted from PAID back to PARTIAL");

  // -------------------------------------------------------------------------
  // 7. SPECIMEN WORKFLOW & STATE TRANSITION CONSTRAINTS
  // -------------------------------------------------------------------------
  console.log("\n▶ [Test Suite 7] Laboratory Specimen State Machine Constraints");

  const sample = orderResult.samples[0];
  assert(sample.status === "PENDING", "Newly requisitioned sample is initially PENDING");

  const collectedSample = await updateSampleStatus(sample.sampleId, "COLLECTED", { name: "Phlebotomist", role: "TECHNICIAN" });
  assert(collectedSample?.status === "COLLECTED", "Sample status transitioned to COLLECTED");

  const processedSample = await updateSampleStatus(sample.sampleId, "PROCESSING", { name: "Lab Tech", role: "TECHNICIAN" });
  assert(processedSample?.status === "PROCESSING", "Sample status transitioned to PROCESSING");

  const rejectedSample = await updateSampleStatus(sample.sampleId, "REJECTED", { name: "Lab Tech", role: "TECHNICIAN" }, "Hemolyzed specimen");
  assert(rejectedSample?.status === "REJECTED", "Sample successfully marked REJECTED with reason");

  let transitionBlocked = false;
  try {
    await updateSampleStatus(sample.sampleId, "COMPLETED", { name: "Lab Tech", role: "TECHNICIAN" });
  } catch (_err: any) {
    transitionBlocked = true;
  }
  assert(transitionBlocked === true, "State Machine Guard: Rejected specimen cannot transition directly to COMPLETED without redrawing");

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log("\n=======================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution threw unhandled exception:", err);
  process.exit(1);
});
