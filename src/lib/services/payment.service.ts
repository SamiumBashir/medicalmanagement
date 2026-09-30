import { Payment } from "@/models/Payment";
import { Invoice } from "@/models/Invoice";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, PaymentRecord } from "./dataStore";
import { createAuditEntry } from "./audit.service";

export interface RecordPaymentInput {
  invoiceId: string;
  orderId?: string;
  patientName: string;
  amount: number;
  method: "CASH" | "CARD" | "MOBILE_BANKING";
  notes?: string;
}

export async function getPayments(params?: {
  patientName?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  let list = [...dataStore.payments];

  if (params?.patientName) {
    const term = params.patientName.toLowerCase();
    list = list.filter((p) => p.patientName.toLowerCase().includes(term));
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    payments: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}

export async function recordPaymentTransaction(
  input: RecordPaymentInput,
  actor: { name: string; role: string }
): Promise<PaymentRecord> {
  if (input.amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  // Find linked invoice
  const invoice = dataStore.invoices.find(
    (i) => i.invoiceId.toUpperCase() === input.invoiceId.toUpperCase()
  );

  const count = dataStore.payments.length + 1;
  const transactionId = `TXN-2026-${String(count).padStart(6, "0")}`;

  const paymentRecord: PaymentRecord = {
    id: `pay-${Date.now()}`,
    transactionId,
    invoiceId: input.invoiceId,
    orderId: input.orderId || invoice?.orderId || "ORD-2026-000001",
    patientName: input.patientName,
    amount: input.amount,
    method: input.method,
    receivedBy: actor.name,
    date: new Date().toISOString(),
    notes: input.notes,
  };

  // Update Invoice balance transactionally
  if (invoice) {
    invoice.paid = invoice.paid + input.amount;
    invoice.due = Math.max(0, invoice.total - invoice.paid);
    invoice.status = invoice.due === 0 ? "PAID" : "PARTIAL";

    // Update corresponding order
    const order = dataStore.orders.find((o) => o.orderId === invoice.orderId);
    if (order) {
      order.paidAmount = invoice.paid;
      order.dueAmount = invoice.due;
      order.paymentStatus = invoice.status;
    }
  }

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await Payment.create({
        paymentId: transactionId,
        amount: input.amount,
        method: input.method,
        notes: input.notes,
      });

      if (invoice) {
        await Invoice.updateOne(
          { invoiceId: invoice.invoiceId },
          {
            $inc: { paidAmount: input.amount },
            dueAmount: invoice.due,
            status: invoice.status,
          }
        );
      }
    } catch (e) {
      console.error("Failed to persist payment in MongoDB:", e);
    }
  }

  // Immutable append
  dataStore.payments.unshift(paymentRecord);

  // Log Audit
  await createAuditEntry({
    userName: actor.name,
    userRole: actor.role,
    action: "PAYMENT_RECORDED",
    entity: "Payment",
    entityId: transactionId,
    details: `Collected ৳${input.amount} via ${input.method} for invoice ${input.invoiceId}`,
  });

  return paymentRecord;
}

export async function processRefundTransaction(
  paymentTransactionId: string,
  reason: string,
  actor: { name: string; role: string }
): Promise<PaymentRecord> {
  const original = dataStore.payments.find(
    (p) => p.transactionId === paymentTransactionId || p.id === paymentTransactionId
  );
  if (!original) {
    throw new Error("Original payment record not found.");
  }

  const refundCount = dataStore.payments.length + 1;
  const refundTxId = `RFD-2026-${String(refundCount).padStart(6, "0")}`;

  // Immutably record refund (never delete original)
  const refundRecord: PaymentRecord = {
    id: `pay-${Date.now()}`,
    transactionId: refundTxId,
    invoiceId: original.invoiceId,
    orderId: original.orderId,
    patientName: original.patientName,
    amount: -original.amount, // Negative accounting balance
    method: original.method,
    receivedBy: actor.name,
    date: new Date().toISOString(),
    notes: `Refund issued for ${original.transactionId}. Reason: ${reason}`,
  };

  // Adjust invoice balances
  const invoice = dataStore.invoices.find((i) => i.invoiceId === original.invoiceId);
  if (invoice) {
    invoice.paid = Math.max(0, invoice.paid - original.amount);
    invoice.due = Math.min(invoice.total, invoice.due + original.amount);
    invoice.status = invoice.paid === 0 ? "DUE" : "PARTIAL";

    const order = dataStore.orders.find((o) => o.orderId === invoice.orderId);
    if (order) {
      order.paidAmount = invoice.paid;
      order.dueAmount = invoice.due;
      order.paymentStatus = invoice.status;
    }
  }

  dataStore.payments.unshift(refundRecord);

  await createAuditEntry({
    userName: actor.name,
    userRole: actor.role,
    action: "REFUND_PROCESSED",
    entity: "Payment",
    entityId: refundTxId,
    details: `Processed refund of ৳${original.amount} on original transaction ${original.transactionId}. Reason: ${reason}`,
  });

  return refundRecord;
}
