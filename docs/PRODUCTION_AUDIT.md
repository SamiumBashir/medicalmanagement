# DiagnostiCare Medical / Diagnostic Center Management System
## Comprehensive Repository Audit, Architecture Review & Security Hardening Plan

**Date:** September 30, 2026  
**Auditor:** Senior Next.js Full-Stack, Database & Healthcare Application Security Engineer  
**Repository:** [https://github.com/SamiumBashir/medicalmanagement](https://github.com/SamiumBashir/medicalmanagement)  
**Target Architecture:** Next.js 15 (App Router) + TypeScript + MongoDB / Mongoose + JWT / Secure Cookies + RBAC + Zod + Tailwind CSS  

---

## Executive Summary

A comprehensive, ground-up audit of the entire repository was performed across all routes, components, services, models, utilities, configurations, and data flows. 

While the application features an attractive, Klaas-inspired clinical design system, robust UI components, and complete Mongoose schema declarations in `src/models/`, **the core business runtime is disconnected from the database**. The system currently operates via an in-memory mutable singleton store (`src/lib/services/dataStore.ts`), hardcoded demo users (`src/app/api/auth/login/route.ts`), patient portal pages hardcoded to a single patient ID (`PAT-2026-000001`), and client components directly mutating in-memory arrays.

This audit details **42 verified issues** categorized into P0 (Critical), P1 (High), P2 (Medium), and P3 (Low) across 17 distinct functional and architectural domains, with concrete remediation steps.

---

## Severity Classification Legend

| Level | Definition | Impact |
| :--- | :--- | :--- |
| **P0 (Critical)** | Severe vulnerability, data loss risk, complete bypass of auth/privacy, or non-functional production architecture. | Immediate system compromise, total HIPAA/privacy breach, data desynchronization. |
| **P1 (High)** | Flawed state machine, missing transactions, lack of input validation, image SSRF, or missing authorization layers. | Data inconsistency, privilege escalation, unverified modifications. |
| **P2 (Medium)** | Missing error standards, unpaginated collections, missing test harnesses, or sub-optimal caching. | Degraded user experience, memory bloat, long-term maintenance hurdles. |
| **P3 (Low)** | Code hygiene, minor UX micro-interactions, redundant imports, or cosmetic polishes. | Aesthetic or developer experience friction. |

---

## 1. Architecture Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/lib/services/dataStore.ts` | The entire application relies on a Node.js global variable (`global.__globalDiagnosticDataStore`) as its primary data store. | In serverless (Vercel) or multi-instance containers, state is lost between requests or desynchronized across lambdas/containers. It is not persistent. | **P0** | Replace direct store calls with a dedicated service layer querying MongoDB through Mongoose models. | Pending |
| `src/lib/services/` | Missing business service layer (`patient.service.ts`, `order.service.ts`, `report.service.ts`, `billing.service.ts`, etc.). | Business rules (financial calculations, state transitions, audit trail logging) are duplicated inside UI client components and API route handlers. | **P1** | Build centralized service layer modules in `src/lib/services/` that encapsulate all validation, Mongoose queries, transactions, and audit records. | Pending |
| `src/app/dashboard/*` & `src/app/patient/*` | Server Components render without verifying session tokens or permissions; no `middleware.ts` exists. | Direct HTTP GET requests to dashboard paths will execute server components without edge token verification. | **P0** | Implement `src/middleware.ts` to validate JWT cookies, enforce route protection rules, and set security headers. | Pending |

---

## 2. Authentication Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/api/auth/register/route.ts` | The `password` parameter sent by the client is completely discarded (lines 7–28). Password is neither hashed nor saved into a `User` model. | Registered patients cannot ever authenticate with their chosen password; their credentials are not stored in any database. | **P0** | Validate password with Zod (min 8 chars, complexity), hash with bcryptjs, and create both `User` and `Patient` documents in MongoDB. | Pending |
| `src/app/api/auth/login/route.ts` | Hardcoded `DEMO_USERS` map (lines 6–13) is checked first; if an email is not in the map, ANY password is accepted without verification (lines 27–34). | Anyone can log in as any role with any bogus credentials, resulting in total authentication bypass. | **P0** | Query MongoDB `User` model by email, verify password hash using `bcrypt.compare`, and issue signed JWT containing authenticated user identity. | Pending |
| `src/lib/env.ts` & `src/lib/auth/jwt.ts` | `AUTH_SECRET` falls back to `"development_super_secret_diagnostic_center_key_2026_auth"` by default even in production without throwing an exception. | Predictable or default JWT secrets allow malicious actors to forge JWT tokens and impersonate administrators. | **P0** | Enforce strictly in `src/lib/env.ts` that if `NODE_ENV === "production"`, `AUTH_SECRET` must be set and must meet entropy criteria (>= 32 chars). | Pending |
| `src/app/api/seed/route.ts` | Unauthenticated public POST endpoint drops collections (`Branch.deleteMany`, `User.deleteMany`) without any authorization check (lines 20, 46). | Any external actor can wipe the database by sending a single unauthenticated `POST /api/seed` request. | **P0** | Guard route with `requireRole(["SUPER_ADMIN"])` or disable in production (`process.env.NODE_ENV === "production"`). | Pending |

---

## 3. Authorization Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/lib/permissions/index.ts` | Contains `ROLE_PERMISSIONS` and `isRouteAllowed`, but lacks server-side authorization enforcement helpers (`requireAuth`, `requireRole`, `requirePermission`, `requireResourceOwnership`). | API route handlers and server actions currently perform zero role checks; authorization logic is left to client-side UI toggles. | **P0** | Add server-side guard helpers in `src/lib/auth/session.ts` and `src/lib/permissions/index.ts` that extract JWT from cookies and throw/respond 401/403. | Pending |
| `src/app/api/appointments/route.ts` | `GET` and `POST` handlers execute without inspecting the caller's role or identity. | Any anonymous user can view all appointments across all doctors/branches and book arbitrary appointments. | **P0** | Add `requireAuth()` to appointment endpoints and scope queries based on role (doctors see assigned; patients see only their own). | Pending |
| `src/app/api/orders/route.ts` | Anonymous callers can retrieve all diagnostic orders (`GET`) or create orders without authentication. | Exposes patient order records, test codes, and pricing data publicly. | **P0** | Enforce `requireAuth()` and role authorization (`RECEPTIONIST`, `ADMIN`, or self `PATIENT`). | Pending |

---

## 4. Database Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/lib/db/connection.ts` | Default connection URI points to `mongodb://127.0.0.1:27017/diagnostic_center_db` without SSL/TLS options. | Production clusters (e.g. MongoDB Atlas) require TLS and replica set configurations. | **P1** | Add connection options for retryWrites, replica sets, and proper environment configuration in `.env.example`. | Pending |
| `src/app/api/orders/route.ts` | Multi-document creation (Order + Invoices + Samples + Tokens) is done without MongoDB multi-document transactions. | If invoice or sample generation fails halfway, orphaned orders or corrupt financial records occur. | **P1** | Wrap order, invoice, and sample creation within a Mongoose session transaction (`session.startTransaction()`). | Pending |
| `src/models/*.ts` | Missing Compound Indexes for high-frequency queries (e.g., `Patient: { phone: 1, email: 1 }`, `Appointment: { doctorId: 1, date: 1 }`, `Report: { patientId: 1, status: 1 }`). | As datasets grow to tens of thousands of records, querying without compound indexes causes slow collection scans. | **P1** | Audit and declare specific compound indexes across Mongoose models. | Pending |

---

## 5. Mock Data Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/lib/services/dataStore.ts` | Contains 8 in-memory arrays pre-populated from `mockData.ts` (`patients`, `appointments`, `orders`, `invoices`, `payments`, `samples`, `reports`, `tokens`, `auditLogs`). | Production flows read and write to this in-memory mock store instead of MongoDB. | **P0** | Transition all read/write paths to MongoDB collections; reserve `mockData.ts` strictly for initial database seeding. | Pending |
| `src/app/dashboard/page.tsx` | Dashboard statistics (`todayPatients`, `todayAppointments`, `patientGrowthData`, etc.) read from `dataStore` and static hardcoded arrays (lines 6–38). | Analytics shown to administrators and managers do not reflect actual database reality. | **P1** | Aggregate live metrics using Mongoose aggregation pipelines (`$match`, `$group`, `$sum`, `$count`). | Pending |
| `src/app/dashboard/patients/patients-client.tsx` | Patient addition form pushes directly into `dataStore.patients.unshift(...)` on the client side (lines 48–60). | Newly created patients are lost on page refresh and never saved to the database. | **P0** | Wire the form to a dedicated Server Action or `POST /api/patients` endpoint backed by the Mongoose `Patient` model. | Pending |

---

## 6. Medical Data Security Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/patient/dashboard/page.tsx` | Patient ID is hardcoded to `PAT-2026-000001` and filters by `a.patientName.includes("Tanvir")` (lines 17–20). | Any patient logging into the portal sees Tanvir Ahmed's medical records, appointments, and diagnostic results. | **P0** | Derive `patientId` strictly from the authenticated JWT session (`session.patientId`), querying the patient's own records. | Pending |
| `src/app/patient/appointments/page.tsx` | Hardcodes filter `a.patientPhone.includes("1711") \|\| a.patientName.includes("Tanvir")` (lines 8–10). | Severe patient privacy violation; leaks another patient's confidential doctor consultations. | **P0** | Scope query strictly to `authenticatedUser.patientId` or verified phone number. | Pending |
| `src/app/patient/reports/page.tsx` | Hardcodes `patientId = "PAT-2026-000001"` (line 6). | Leaks diagnostic pathology test reports across all registered patient accounts. | **P0** | Resolve authenticated session and query reports belonging solely to that patient. | Pending |
| `src/app/patient/payments/page.tsx` | Hardcodes `patientId = "PAT-2026-000001"` and `p.patientName.includes("Tanvir")` (lines 9–11). | Financial and invoice data leakage across patient accounts. | **P0** | Query invoices and payments linked to the authenticated user's ID. | Pending |

---

## 7. Report Verification Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/api/verify/[reportId]/route.ts` & `src/app/verify/[reportId]/page.tsx` | Verification uses sequential, predictable `reportId` (e.g. `REP-2026-001`, `RPT-2026-000001`) as the public route lookup key. | Anyone can scrape or enumerate reports by incrementing the report ID, exposing patient initials, test types, and doctor names. | **P0** | Verify reports using a cryptographically secure random `verificationToken` (UUIDv4 or 32-byte hex) instead of predictable IDs. | Pending |
| `src/lib/qr/index.ts` & `reports-client.tsx` | QR code encodes `https://diagnosticare.org/verify/${rpt.reportId}` using sequential `reportId`. | Scanning the QR code exposes predictable URL identifiers. | **P0** | Encode `/verify/${rpt.verificationToken}` in the QR code, ensuring high entropy verification. | Pending |
| `src/app/api/verify/[reportId]/route.ts` | Route lacks rate limiting. | Attackers can run high-frequency brute-force scans against the verification endpoint. | **P1** | Implement in-memory/Redis rate limiting on the verification route. | Pending |

---

## 8. Result Management Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/dashboard/laboratory/page.tsx` | Submitting lab results directly executes `dataStore.reports.unshift(...)` and mutates `selectedSample.status = "COMPLETED"` in client memory (lines 114–115). | Results are not saved in the database, cannot be audited, and bypass physician verification workflows. | **P0** | Implement server-side result submission endpoint/service creating `LabResult` and transitioning `Report` state to `PENDING_VERIFICATION`. | Pending |
| `src/app/dashboard/reports/page.tsx` | Doctor verification (`handleVerify`) and correction (`handleRequestCorrection`) directly mutate in-memory objects on the client (lines 28, 54). | Any user can mark reports as verified without doctor credentials, digital signature timestamps, or persistent audit records. | **P0** | Create a server-side endpoint verifying that the user has role `DOCTOR`, recording timestamp, doctor BMDC reg, and audit log. | Pending |
| `src/models/LabResult.ts` & `src/models/Report.ts` | Correction workflow does not enforce immutable versioning of previous lab values. | Modifying a lab result could overwrite prior values without an immutable history of who changed what, when, and why. | **P1** | Store prior parameter snapshots (`oldValue`, `newValue`, `reason`, `changedBy`, `changedAt`) in `LabResult.history` or `AuditLog`. | Pending |

---

## 9. Billing Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/api/orders/route.ts` | Line 28: Calculates subtotal from `MOCK_TESTS` rather than verified database prices. Line 30 applies a hardcoded 10% discount. | Inaccurate pricing if tests are updated in MongoDB; client could manipulate discounts if not calculated strictly server-side. | **P1** | Query authoritative test prices from the MongoDB `Test` model and calculate `subtotal`, `discount`, `total`, `paid`, `due` server-side. | Pending |
| `src/app/dashboard/billing/page.tsx` | Direct client-side creation and mutation of invoices in `dataStore.invoices`. | Financial ledger can be modified client-side without cashier role verification or transactional guarantees. | **P0** | Route all billing operations through server actions with `requirePermission("billing.create")`. | Pending |

---

## 10. Payment Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/dashboard/payments/page.tsx` | `handleRecordPayment` pushes directly to `dataStore.payments.unshift(...)` (line 41). Does not update the corresponding `Invoice.paidAmount` or `Invoice.dueAmount` in the database. | Invoices and payments fall out of sync; payments are not immutable financial records. | **P0** | Implement transactional payment creation: create `Payment` document, increment `Invoice.paidAmount`, decrement `dueAmount`, update status (`PAID` or `PARTIAL`). | Pending |
| `src/app/dashboard/payments/page.tsx` | `handleRefund` (lines 59–75) mutates payment in client memory. No refund transaction is created. | Violates accounting immutability rules. | **P1** | Never delete or mutate an existing payment; insert a negative/refund `Payment` document linked to the original payment with an audit entry. | Pending |

---

## 11. Validation Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/api/auth/register/route.ts` | Manual rudimentary check: `if (!name \|\| !email \|\| !phone)` (line 9). No email format validation, phone pattern check, or password rules. | Corrupt or malicious input can be submitted. | **P1** | Implement a Zod validation schema for registration (`registerSchema.parse(body)`). | Pending |
| `src/app/api/appointments/route.ts` | Validates only existence of fields (`!patientName \|\| !patientPhone...`); does not check valid ISO dates, doctor ID existence, or future scheduling. | Invalid dates or non-existent doctors can be scheduled. | **P1** | Validate appointment booking payload using Zod with date format and relationship checks. | Pending |
| `src/app/api/orders/route.ts` | `testIds` array is not validated for structure, non-empty IDs, or valid MongoDB ObjectIds. | Malformed arrays cause unexpected 500 runtime exceptions. | **P1** | Add comprehensive Zod schema for order placement. | Pending |

---

## 12. Error Handling Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/api/orders/route.ts` & others | Inconsistent error responses: some return `{ error: "message" }`, some `{ message: "..." }`. No standard error codes. | Client cannot programmatically handle specific error classes (e.g. `UNAUTHORIZED`, `VALIDATION_ERROR`, `NOT_FOUND`). | **P2** | Standardize all API error responses to `{ success: false, error: { code: string, message: string } }`. | Pending |
| `src/app/api/seed/route.ts` | Line 95: Returns `{ error: error.message }` directly to caller, potentially leaking database connection strings or stack traces. | Information disclosure of internal database topology or errors. | **P1** | Log detailed errors server-side and return sanitized generic error messages in production. | Pending |

---

## 13. Performance Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/dashboard/patients/patients-client.tsx` | All patients are rendered in a single unpaginated table. | As patient records scale to 10,000+, DOM nodes will freeze the browser and slow initial network transfer. | **P2** | Implement server-side pagination with `page`, `limit`, and `skip()` in MongoDB queries. | Pending |
| `src/app/dashboard/reports/page.tsx` | All reports are loaded into client state at once without pagination or server filtering. | Degraded memory and render performance as reports accumulate. | **P2** | Add pagination and status filters (`DRAFT`, `PENDING_VERIFICATION`, `VERIFIED`). | Pending |
| `src/app/tests/test-directory-client.tsx` | Tests list filters entirely on the client side. | Client transfers full test catalog data. | **P3** | Keep debounced search and category filter optimized. | Pending |

---

## 14. UI/UX Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `src/app/patient/dashboard/page.tsx` | Empty states for zero appointments or zero reports are minimal or missing. | When a newly registered patient logs in, the screen looks barren or broken without guided call-to-actions. | **P2** | Add polished empty states with "Book your first diagnostic test" or "Schedule an appointment" action cards. | Pending |
| `src/app/dashboard/tokens/page.tsx` | Queue token ticket display has no automated refresh or live status indicator. | Receptionists and patients in waiting rooms need live token movement. | **P2** | Provide manual refresh or polled state for real-time queue visibility. | Pending |

---

## 15. Testing Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `package.json` | There is no test runner installed (no `vitest` or `jest`) and no `npm test` script. | Automated regression testing, authorization tests, and calculation validations cannot run in CI/CD. | **P1** | Install `vitest` (or lightweight test harness) and configure unit/integration test suites for permissions, auth, and calculations. | Pending |
| Repository root | Zero unit or integration tests exist for: 1) Role permission checks, 2) Patient data isolation, 3) Invoice calculation, 4) Report state machine. | Critical security boundaries have no automated guardrails against regressions. | **P1** | Implement tests covering role boundaries, patient isolation, and financial calculations. | Pending |

---

## 16. Dependency Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `package.json` | Both `jsonwebtoken` and `bcryptjs` are installed, but `bcryptjs` was not utilized during registration or login. | Dead dependencies or unexercised cryptographic routines. | **P2** | Wire `bcryptjs` into actual registration and login pipelines. | Pending |
| `package.json` | Missing `@types/` or development scripts for automated testing. | Cannot execute automated verification in standard workflow. | **P2** | Add test runner and scripts to `package.json`. | Pending |

---

## 17. Deployment & Configuration Problems

| File | Problem | Why It Is A Problem | Severity | Recommended Solution | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `next.config.mjs` | `images.remotePatterns` has `hostname: "**"`, allowing images from any host on the internet. | Security risk: Server-Side Request Forgery (SSRF) and image optimization resource exhaustion. | **P1** | Restrict `remotePatterns` explicitly to `images.unsplash.com` and trusted asset hosts. | Pending |
| Repository root | Missing `middleware.ts` for security headers (HSTS, X-Content-Type-Options, Referrer-Policy, CSP, X-Frame-Options). | Vulnerable to clickjacking, MIME-sniffing, and unencrypted downgrade attacks. | **P1** | Add standard Next.js security headers in `middleware.ts`. | Pending |

---

## Summary of Critical (P0) Issues to Fix First

1. **Authentication Overhaul**: Replace fake `DEMO_USERS` and unhashed password registration with real MongoDB `User` creation, bcrypt password hashing, and credentials verification.
2. **Remove In-Memory Mock Store from Production Flows**: Build a real service layer backed by Mongoose models for patients, appointments, orders, reports, invoices, and payments.
3. **Enforce Patient Data Ownership**: Terminate hardcoded `PAT-2026-000001` in the patient portal. Derive patient identity strictly from authenticated JWT sessions and reject unauthorized resource access.
4. **Server-Side Authorization & Middleware**: Implement `src/middleware.ts` and server-side helpers (`requireAuth`, `requireRole`, `requirePermission`, `requireResourceOwnership`).
5. **Secure Cryptographic Report Verification**: Replace predictable sequential `reportId` in QR codes and public `/verify/[id]` routes with secure random `verificationToken` lookups, masking sensitive patient details.
6. **Payment & Billing Immutability**: Transition financial operations to transactional server actions with strict server-side calculation of subtotals, discounts, and balances.
7. **Report & Result Lifecycle**: Ensure laboratory technician entry and doctor verification are authenticated server operations with audit logging.

---
*End of Production Audit Report. Beginning systematic execution of P0 fixes.*
