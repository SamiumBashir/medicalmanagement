import crypto from "crypto";
import { Report } from "@/models/Report";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, ReportRecord } from "./dataStore";
import { MOCK_REPORT_SAMPLE } from "./mockData";
import { createAuditEntry } from "./audit.service";
import { ReportStatus } from "@/types";

/**
 * Generates a cryptographically secure, high-entropy verification token.
 */
export function generateVerificationToken(): string {
  return `vtok_${crypto.randomBytes(18).toString("hex")}`;
}

export async function getReports(params?: {
  status?: string;
  patientId?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  let list = [...dataStore.reports];

  if (params?.status) {
    list = list.filter((r) => r.status === params.status);
  }
  if (params?.patientId) {
    list = list.filter((r) => r.patientId.toUpperCase() === params.patientId?.toUpperCase());
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    reports: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}

export async function getReportById(reportId: string): Promise<ReportRecord | null> {
  const found = dataStore.reports.find(
    (r) => r.reportId.toLowerCase() === reportId.toLowerCase() || (r as any).verificationToken === reportId
  );
  if (found) return found;

  if (reportId.toLowerCase() === MOCK_REPORT_SAMPLE.reportId.toLowerCase()) {
    const formatted: ReportRecord = {
      id: "rpt-sample",
      reportId: MOCK_REPORT_SAMPLE.reportId,
      orderId: MOCK_REPORT_SAMPLE.orderId,
      patientId: MOCK_REPORT_SAMPLE.patientId,
      patientName: MOCK_REPORT_SAMPLE.patientName,
      patientAge: MOCK_REPORT_SAMPLE.age,
      patientGender: MOCK_REPORT_SAMPLE.gender as "MALE",
      testName: MOCK_REPORT_SAMPLE.testName,
      category: MOCK_REPORT_SAMPLE.category,
      sampleType: MOCK_REPORT_SAMPLE.sampleType,
      status: MOCK_REPORT_SAMPLE.status as ReportStatus,
      verifiedAt: MOCK_REPORT_SAMPLE.verifiedAt,
      verifiedBy: MOCK_REPORT_SAMPLE.verifiedBy,
      doctorReg: MOCK_REPORT_SAMPLE.doctorReg,
      branchName: MOCK_REPORT_SAMPLE.branchName,
      authenticityHash: MOCK_REPORT_SAMPLE.authenticityHash,
      results: MOCK_REPORT_SAMPLE.results as any,
      clinicalRemarks: MOCK_REPORT_SAMPLE.clinicalRemarks,
      issuedDate: "2026-09-29",
    };
    return formatted;
  }

  return null;
}

/**
 * Public Verification Service:
 * Accepts a high-entropy verification token or reportId.
 * Sanitizes and minimizes medical data exposure according to healthcare privacy standards.
 */
export async function verifyReportPublic(identifier: string) {
  const report = await getReportById(identifier);
  if (!report) {
    return {
      found: false,
      error: "Medical report record not located in certified diagnostic registry.",
    };
  }

  // Mask patient name for HIPAA/data privacy compliance
  const nameParts = report.patientName.trim().split(" ");
  const maskedName =
    nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.***`
      : `${nameParts[0][0]}***`;

  return {
    found: true,
    verification: {
      reportId: report.reportId,
      verificationToken: (report as any).verificationToken || identifier,
      patientRef: `${maskedName} (${report.patientId})`,
      testName: report.testName,
      category: report.category,
      issuedDate: report.issuedDate || "2026-09-29",
      verifiedAt: report.verifiedAt || "2026-09-29T11:45:00Z",
      verifiedBy: report.verifiedBy || "Certified Consultant Pathologist",
      doctorReg: report.doctorReg || "BMDC Verified",
      branchName: report.branchName,
      status: report.status,
      isAuthentic: report.status === "VERIFIED",
      authenticityHash: report.authenticityHash,
    },
  };
}

/**
 * Doctor Verification Action:
 * Transitions report to VERIFIED and digitally seals it.
 */
export async function verifyReportByDoctor(
  reportId: string,
  doctor: { name: string; bmdcReg?: string },
  comments?: string
): Promise<ReportRecord | null> {
  const report = dataStore.reports.find((r) => r.id === reportId || r.reportId === reportId);
  if (!report) return null;

  report.status = "VERIFIED";
  report.verifiedAt = new Date().toISOString();
  report.verifiedBy = doctor.name;
  report.doctorReg = doctor.bmdcReg || "BMDC Reg: A-18492";
  if (comments) {
    report.clinicalRemarks = comments;
  }
  if (!(report as any).verificationToken) {
    (report as any).verificationToken = generateVerificationToken();
  }

  // Persist to MongoDB if available
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await Report.updateOne(
        { reportId: report.reportId },
        {
          status: "VERIFIED",
          verifiedAt: new Date(),
          doctorComments: report.clinicalRemarks,
          verificationToken: (report as any).verificationToken,
        }
      );
    } catch (e) {
      console.error("Failed to update report in MongoDB:", e);
    }
  }

  // Log Audit
  await createAuditEntry({
    userName: doctor.name,
    userRole: "DOCTOR",
    action: "REPORT_VERIFIED",
    entity: "Report",
    entityId: report.reportId,
    details: `Doctor digitally certified pathology report for ${report.patientName} (${report.testName})`,
  });

  return report;
}

/**
 * Request Correction Action:
 * Transitions report to CORRECTION_REQUESTED for lab technologist review.
 */
export async function requestReportCorrection(
  reportId: string,
  doctor: { name: string },
  reason: string
): Promise<ReportRecord | null> {
  const report = dataStore.reports.find((r) => r.id === reportId || r.reportId === reportId);
  if (!report) return null;

  report.status = "CORRECTION_REQUESTED";
  report.clinicalRemarks = `Correction requested by ${doctor.name}: ${reason}`;

  await createAuditEntry({
    userName: doctor.name,
    userRole: "DOCTOR",
    action: "CORRECTION_REQUESTED",
    entity: "Report",
    entityId: report.reportId,
    details: `Requested analytical correction on ${report.reportId}: ${reason}`,
  });

  return report;
}
