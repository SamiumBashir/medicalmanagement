import { TestOrder } from "@/models/TestOrder";
import { Invoice } from "@/models/Invoice";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, TestOrderRecord, InvoiceRecord, SampleRecord } from "./dataStore";
import { MOCK_TESTS, MOCK_BRANCHES } from "./mockData";
import { createAuditEntry } from "./audit.service";
import { createPatientRecord } from "./patient.service";

export interface CreateOrderInput {
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  branchId: string;
  testIds: string[];
  preferredDate?: string;
  patientAge?: number;
  patientGender?: "MALE" | "FEMALE" | "OTHER";
}

export async function createOrderTransaction(
  input: CreateOrderInput,
  actor?: { name: string; role: string }
) {
  const selectedTests = MOCK_TESTS.filter((t) => input.testIds.includes(t.id));
  if (!selectedTests.length) {
    throw new Error("No valid diagnostic tests selected.");
  }

  const branch = MOCK_BRANCHES.find((b) => b.id === input.branchId) || MOCK_BRANCHES[0];

  // Authoritative Server-side Price Calculation
  const subtotal = selectedTests.reduce((acc, t) => acc + t.price, 0);
  const discount = Math.round(subtotal * 0.1); // 10% standard online discount
  const total = subtotal - discount;

  // Resolve or create Patient
  const existingPatient = dataStore.patients.find((p) => p.phone === input.patientPhone.trim());
  let patientId = existingPatient?.patientId;

  if (!existingPatient) {
    const newPat = await createPatientRecord(
      {
        name: input.patientName,
        phone: input.patientPhone,
        email: input.patientEmail,
        age: input.patientAge || 35,
        gender: input.patientGender || "MALE",
      },
      actor
    );
    patientId = newPat.patientId;
  }

  const orderNum = dataStore.orders.length + 1;
  const orderId = `ORD-2026-${String(orderNum).padStart(6, "0")}`;

  dataStore.currentTokenIndex += 1;
  const tokenNumber = `TKN-${String(dataStore.currentTokenIndex).padStart(3, "0")}`;

  const newOrder: TestOrderRecord = {
    id: `ord-${Date.now()}`,
    orderId,
    patientId: patientId || "PAT-2026-000001",
    patientName: input.patientName.trim(),
    patientPhone: input.patientPhone.trim(),
    branchId: branch.id,
    branchName: branch.name,
    tests: selectedTests.map((t) => ({
      testId: t.id,
      testCode: t.code,
      testName: t.name,
      price: t.price,
    })),
    subtotal,
    discount,
    total,
    paidAmount: 0,
    dueAmount: total,
    paymentStatus: "DUE",
    tokenNumber,
    tokenStatus: "WAITING",
    orderDate: new Date().toISOString(),
  };

  // Generate linked Invoice
  const invoiceId = `INV-2026-${String(dataStore.invoices.length + 1).padStart(6, "0")}`;
  const newInvoice: InvoiceRecord = {
    id: `inv-${Date.now()}`,
    invoiceId,
    orderId,
    patientId: newOrder.patientId,
    patientName: newOrder.patientName,
    items: selectedTests.map((t) => ({ description: t.name, amount: t.price })),
    subtotal,
    discount,
    total,
    paid: 0,
    due: total,
    status: "DUE",
    date: new Date().toISOString(),
  };

  // Generate linked Samples for laboratory collection
  const createdSamples: SampleRecord[] = selectedTests.map((test, index) => {
    const sampleNum = dataStore.samples.length + index + 1;
    return {
      id: `smp-${Date.now()}-${index}`,
      sampleId: `SMP-2026-${String(sampleNum).padStart(6, "0")}`,
      orderId,
      patientId: newOrder.patientId,
      patientName: newOrder.patientName,
      testName: test.name,
      sampleType: test.category === "Pathology & Biochemistry" ? "Blood" : "Serum / Swab",
      status: "PENDING",
    };
  });

  // Persist to MongoDB if available
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await TestOrder.create({
        orderId,
        subtotal,
        discount,
        total,
        paidAmount: 0,
        dueAmount: total,
        paymentStatus: "DUE",
        tokenNumber,
      });

      await Invoice.create({
        invoiceId,
        subtotal,
        discount,
        total,
        paidAmount: 0,
        dueAmount: total,
        status: "DUE",
      });
    } catch (e) {
      console.error("Failed to persist order in MongoDB:", e);
    }
  }

  // Atomically update dataStore state
  dataStore.orders.unshift(newOrder);
  dataStore.invoices.unshift(newInvoice);
  for (const s of createdSamples) {
    dataStore.samples.unshift(s);
  }

  // Log Audit
  await createAuditEntry({
    userName: actor?.name || input.patientName,
    userRole: actor?.role || "RECEPTIONIST",
    action: "ORDER_CREATED",
    entity: "TestOrder",
    entityId: orderId,
    details: `Created diagnostic test order ${orderId} for ${newOrder.patientName}. Total: ৳${total}`,
  });

  return {
    order: newOrder,
    invoice: newInvoice,
    samples: createdSamples,
    tokenNumber,
  };
}

export async function getOrders(params?: {
  patientId?: string;
  branchId?: string;
  paymentStatus?: "PAID" | "PARTIAL" | "DUE";
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  let list = [...dataStore.orders];

  if (params?.patientId) {
    list = list.filter((o) => o.patientId.toUpperCase() === params.patientId?.toUpperCase());
  }
  if (params?.branchId) {
    list = list.filter((o) => o.branchId === params.branchId);
  }
  if (params?.paymentStatus) {
    list = list.filter((o) => o.paymentStatus === params.paymentStatus);
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    orders: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}
