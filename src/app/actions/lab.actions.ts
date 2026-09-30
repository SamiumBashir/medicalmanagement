"use server";

import { revalidatePath } from "next/cache";
import { submitAnalyticalResults, LabParameterInput } from "@/lib/services/result.service";
import { updateSampleStatus } from "@/lib/services/sample.service";
import { requireAuth, requirePermission, requireRole } from "@/lib/auth/session";
import { SampleStatus } from "@/types";

export async function submitLabResultsAction(
  sampleId: string,
  parameters: LabParameterInput[],
  clinicalRemarks: string
) {
  const session = await requireAuth();
  await requireRole(["TECHNICIAN", "SUPER_ADMIN", "ADMIN"]);

  const actor = {
    name: session.name,
    role: session.role,
  };

  const report = await submitAnalyticalResults(sampleId, parameters, clinicalRemarks, actor);
  revalidatePath("/dashboard/laboratory");
  revalidatePath("/dashboard/reports");
  return { success: true, report };
}

export async function updateSampleStatusAction(
  sampleId: string,
  status: SampleStatus,
  rejectionReason?: string
) {
  const session = await requireAuth();
  await requirePermission("samples.process");

  const actor = {
    name: session.name,
    role: session.role,
  };

  const sample = await updateSampleStatus(sampleId, status, actor, rejectionReason);
  revalidatePath("/dashboard/samples");
  revalidatePath("/dashboard/laboratory");
  return { success: true, sample };
}
