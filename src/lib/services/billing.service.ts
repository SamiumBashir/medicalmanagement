import { Invoice } from "@/models/Invoice";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, InvoiceRecord } from "./dataStore";

export async function getInvoices(params?: {
  patientId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const query: any = {};
    if (params?.status) query.status = params.status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Invoice.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Invoice.countDocuments(query),
    ]);

    if (items.length > 0) {
      const formatted: InvoiceRecord[] = items.map((inv: any) => ({
        id: inv._id.toString(),
        invoiceId: inv.invoiceId,
        orderId: inv.orderId ? inv.orderId.toString() : "",
        patientId: inv.patientId ? inv.patientId.toString() : "",
        patientName: "Patient",
        items: [{ description: "Diagnostic Investigation Services", amount: inv.total }],
        subtotal: inv.subtotal,
        discount: inv.discount,
        total: inv.total,
        paid: inv.paidAmount,
        due: inv.dueAmount,
        status: inv.status,
        date: inv.createdAt ? inv.createdAt.toISOString() : new Date().toISOString(),
      }));

      return {
        invoices: formatted,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
  }

  let list = [...dataStore.invoices];

  if (params?.patientId) {
    list = list.filter((i) => i.patientId.toUpperCase() === params.patientId?.toUpperCase());
  }
  if (params?.status) {
    list = list.filter((i) => i.status === params.status);
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    invoices: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}

export async function getInvoiceById(invoiceId: string): Promise<InvoiceRecord | null> {
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const inv = await Invoice.findOne({ invoiceId: invoiceId.toUpperCase() }).lean();
    if (inv) {
      return {
        id: (inv as any)._id.toString(),
        invoiceId: (inv as any).invoiceId,
        orderId: (inv as any).orderId?.toString() || "",
        patientId: (inv as any).patientId?.toString() || "",
        patientName: "Patient",
        items: [{ description: "Diagnostic Investigation Services", amount: (inv as any).total }],
        subtotal: (inv as any).subtotal,
        discount: (inv as any).discount,
        total: (inv as any).total,
        paid: (inv as any).paidAmount,
        due: (inv as any).dueAmount,
        status: (inv as any).status,
        date: (inv as any).createdAt ? (inv as any).createdAt.toISOString() : new Date().toISOString(),
      };
    }
  }

  const found = dataStore.invoices.find(
    (i) => i.invoiceId.toUpperCase() === invoiceId.toUpperCase()
  );
  return found || null;
}
