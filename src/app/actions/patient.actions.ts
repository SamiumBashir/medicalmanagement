"use server";

import { revalidatePath } from "next/cache";
import { createPatientRecord, getPatients } from "@/lib/services/patient.service";
import { requireAuth, requirePermission } from "@/lib/auth/session";

export async function createPatientAction(data: {
  name: string;
  phone: string;
  email?: string;
  age?: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  bloodGroup?: string;
  address?: string;
  notes?: string;
}) {
  const session = await requireAuth();
  await requirePermission("patients.create");

  const actor = {
    name: session.name,
    role: session.role,
  };

  const patient = await createPatientRecord(data, actor);
  revalidatePath("/dashboard/patients");
  return { success: true, patient };
}

export async function getPatientsAction(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  await requireAuth();
  await requirePermission("patients.read");
  return getPatients(params);
}
