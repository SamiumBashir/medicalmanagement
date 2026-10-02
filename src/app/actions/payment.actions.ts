"use server";

import { revalidatePath } from "next/cache";
import {
  recordPaymentTransaction,
  processRefundTransaction,
  getPayments,
  RecordPaymentInput,
} from "@/lib/services/payment.service";
import { validatePaymentReference, type PaymentMethod } from "@/lib/payments/bd-payment-methods";
import { dataStore } from "@/lib/services/dataStore";
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

export async function submitPatientInvoicePaymentAction(input: {
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  transactionReference?: string;
  notes?: string;
}) {
  const session = await requireAuth();
  if (session.role !== "PATIENT" || !session.patientId) {
    throw new Error("Only registered patients can pay invoices online.");
  }

  const invoice = dataStore.invoices.find(
    (i) => i.invoiceId.toUpperCase() === input.invoiceId.toUpperCase(),
  );
  if (!invoice || invoice.patientId !== session.patientId) {
    throw new Error("Invoice not found or access denied.");
  }
  if (invoice.due <= 0) {
    throw new Error("This invoice is already fully paid.");
  }
  if (input.amount <= 0 || input.amount > invoice.due) {
    throw new Error(`Payment must be between ৳1 and ৳${invoice.due}.`);
  }

  const refError = validatePaymentReference(input.method, input.transactionReference);
  if (refError) {
    throw new Error(refError);
  }

  const payment = await recordPaymentTransaction(
    {
      invoiceId: invoice.invoiceId,
      orderId: invoice.orderId,
      patientName: session.name,
      amount: input.amount,
      method: input.method,
      transactionReference: input.transactionReference,
      notes: input.notes ?? "Patient portal online settlement",
    },
    { name: `${session.name} (Patient Portal)`, role: session.role },
  );

  revalidatePath("/patient/payments");
  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard/billing");
  return { success: true, payment };
}
