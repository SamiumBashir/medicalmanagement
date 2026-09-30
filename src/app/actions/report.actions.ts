"use server";

import { revalidatePath } from "next/cache";
import { verifyReportByDoctor, requestReportCorrection, getReports } from "@/lib/services/report.service";
import { requireAuth, requireRole, requirePermission } from "@/lib/auth/session";

export async function verifyReportAction(reportId: string, comments?: string) {
  const session = await requireAuth();
  await requireRole(["DOCTOR", "SUPER_ADMIN", "ADMIN"]);
  await requirePermission("reports.verify");

  const doctor = {
    name: session.name,
    bmdcReg: (session as any).bmdcReg || "BMDC Reg: A-18492",
  };

  const report = await verifyReportByDoctor(reportId, doctor, comments);
  if (!report) {
    throw new Error("Specified diagnostic report could not be found for verification.");
  }

  revalidatePath("/dashboard/reports");
  revalidatePath(`/verify/${report.reportId}`);
  return { success: true, report };
}

export async function requestReportCorrectionAction(reportId: string, reason: string) {
  const session = await requireAuth();
  await requireRole(["DOCTOR", "SUPER_ADMIN", "ADMIN"]);

  const doctor = {
    name: session.name,
  };

  const report = await requestReportCorrection(reportId, doctor, reason);
  if (!report) {
    throw new Error("Specified diagnostic report could not be found for correction request.");
  }

  revalidatePath("/dashboard/reports");
  revalidatePath("/dashboard/laboratory");
  return { success: true, report };
}

export async function getReportsAction(params?: {
  status?: string;
  patientId?: string;
  page?: number;
  limit?: number;
}) {
  await requireAuth();
  return getReports(params);
}
