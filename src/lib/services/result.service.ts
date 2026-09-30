import { Report } from "@/models/Report";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, ReportRecord } from "./dataStore";
import { LabResultFlag } from "@/types";
import { createAuditEntry } from "./audit.service";
import { generateVerificationToken } from "./report.service";

export interface LabParameterInput {
  name: string;
  value: string;
  unit: string;
  refRange: string;
  flag: LabResultFlag;
}

export async function submitAnalyticalResults(
  sampleId: string,
  parameters: LabParameterInput[],
  clinicalRemarks: string,
  actor: { name: string; role: string }
): Promise<ReportRecord> {
  const sample = dataStore.samples.find(
    (s) => s.sampleId === sampleId || s.id === sampleId
  );
  if (!sample) {
    throw new Error("Specified biological specimen not found in laboratory queue.");
  }

  const reportNum = dataStore.reports.length + 1;
  const reportId = `RPT-2026-${String(reportNum).padStart(6, "0")}`;
  const verificationToken = generateVerificationToken();

  const newReport: ReportRecord = {
    id: `rpt-${Date.now()}`,
    reportId,
    orderId: sample.orderId,
    patientId: sample.patientId,
    patientName: sample.patientName,
    patientAge: 42,
    patientGender: "MALE",
    testName: sample.testName,
    category: "Clinical Pathology",
    sampleType: sample.sampleType,
    status: "PENDING_VERIFICATION",
    branchName: "Dhanmondi Main Diagnostic Hub",
    authenticityHash: `SHA256-${verificationToken.slice(-10).toUpperCase()}`,
    results: parameters.map((p) => ({
      parameter: p.name,
      value: p.value,
      unit: p.unit,
      refRange: p.refRange,
      flag: p.flag,
    })),
    clinicalRemarks: clinicalRemarks || "Analytical parameters within standard instrument tolerances.",
    issuedDate: new Date().toISOString().split("T")[0],
  };

  (newReport as any).verificationToken = verificationToken;

  sample.status = "COMPLETED";

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await Report.create({
        reportId,
        status: "PENDING_VERIFICATION",
        verificationToken,
        doctorComments: clinicalRemarks,
      });
    } catch (e) {
      console.error("Failed to persist report in MongoDB:", e);
    }
  }

  dataStore.reports.unshift(newReport);

  const hasCritical = parameters.some((p) => p.flag === "CRITICAL");
  if (hasCritical) {
    await createAuditEntry({
      userName: actor.name,
      userRole: actor.role,
      action: "CRITICAL_VALUE_FLAGGED",
      entity: "Report",
      entityId: reportId,
      details: `CRITICAL PANIC VALUE flagged on ${sample.testName} for ${sample.patientName}. Requires immediate physician notification!`,
    });
  }

  await createAuditEntry({
    userName: actor.name,
    userRole: actor.role,
    action: "LAB_RESULTS_SUBMITTED",
    entity: "Report",
    entityId: reportId,
    details: `Technologist submitted analytical findings for ${sample.testName}. Dispatched to doctor review queue.`,
  });

  return newReport;
}
