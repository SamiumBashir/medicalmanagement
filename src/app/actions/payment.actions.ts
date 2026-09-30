"use server";

import { revalidatePath } from "next/cache";
import {
  recordPaymentTransaction,
  processRefundTransaction,
  getPayments,
  RecordPaymentInput,
} from "@/lib/services/payment.service";
import { requireAuth, requirePermission, requireRole } from "@/lib/auth/session";

export async function recordPaymentAction(input: RecordPaymentInput) {
  const session = await requireAuth();
  await requirePermission("payments.create");

  const actor = {
    name: session.name,
    role: session.role,
  };

  const payment = await recordPaymentTransaction(input, actor);
  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard/billing");
  return { success: true, payment };
}

export async function processRefundAction(transactionId: string, reason: string) {
  const session = await requireAuth();
  await requireRole(["ACCOUNTANT", "SUPER_ADMIN", "ADMIN"]);
  await requirePermission("payments.refund");

  const actor = {
    name: session.name,
    role: session.role,
  };

  const refund = await processRefundTransaction(transactionId, reason, actor);
  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard/billing");
  return { success: true, refund };
}

export async function getPaymentsAction(params?: {
  patientName?: string;
  page?: number;
  limit?: number;
}) {
  await requireAuth();
  await requirePermission("payments.read");
  return getPayments(params);
}
