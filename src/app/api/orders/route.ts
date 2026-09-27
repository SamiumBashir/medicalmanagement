import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/services/dataStore";
import { MOCK_TESTS, MOCK_BRANCHES } from "@/lib/services/mockData";

export async function GET() {
  return NextResponse.json({ orders: dataStore.orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientName, patientPhone, patientEmail, branchId, testIds, preferredDate } = body;

    if (!patientName || !patientPhone || !branchId || !testIds || !testIds.length) {
      return NextResponse.json(
        { error: "Patient name, phone, branch, and at least one test are required." },
        { status: 400 }
      );
    }

    const selectedTests = MOCK_TESTS.filter((t) => testIds.includes(t.id));
    if (!selectedTests.length) {
      return NextResponse.json({ error: "No valid diagnostic tests selected." }, { status: 400 });
    }

    const branch = MOCK_BRANCHES.find((b) => b.id === branchId) || MOCK_BRANCHES[0];

    const subtotal = selectedTests.reduce((acc, t) => acc + t.price, 0);
    // 10% promotional online discount
    const discount = Math.round(subtotal * 0.1);
    const total = subtotal - discount;

    const orderNum = dataStore.orders.length + 1;
    const orderId = `ORD-2026-${String(orderNum).padStart(6, "0")}`;

    const patient = dataStore.patients.find((p) => p.phone === patientPhone);
    const patientId = patient ? patient.patientId : `PAT-2026-${String(dataStore.patients.length + 1).padStart(6, "0")}`;

    if (!patient) {
      dataStore.patients.unshift({
        id: `pat-${Date.now()}`,
        patientId,
        name: patientName,
        phone: patientPhone,
        email: patientEmail,
        age: 35,
        gender: "MALE",
        registeredAt: new Date().toISOString(),
      });
    }

    dataStore.currentTokenIndex += 1;
    const tokenNumber = `TKN-${String(dataStore.currentTokenIndex).padStart(3, "0")}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderId,
      patientId,
      patientName,
      patientPhone,
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
      paidAmount: total, // Mark paid for demo or online booking
      dueAmount: 0,
      paymentStatus: "PAID" as const,
      tokenNumber,
      tokenStatus: "WAITING" as const,
      orderDate: preferredDate || new Date().toISOString(),
    };

    dataStore.orders.unshift(newOrder);

    // Create Invoice
    const invoiceId = `INV-2026-${String(dataStore.invoices.length + 1).padStart(6, "0")}`;
    dataStore.invoices.unshift({
      id: `inv-${Date.now()}`,
      invoiceId,
      orderId,
      patientId,
      patientName,
      items: selectedTests.map((t) => ({ description: t.name, amount: t.price })),
      subtotal,
      discount,
      total,
      paid: total,
      due: 0,
      status: "PAID",
      date: new Date().toISOString(),
    });

    // Create Samples for phlebotomy tracking
    selectedTests.forEach((t, i) => {
      const sampleNum = dataStore.samples.length + 1 + i;
      dataStore.samples.unshift({
        id: `smp-${Date.now()}-${i}`,
        sampleId: `SMP-2026-${String(sampleNum).padStart(6, "0")}`,
        orderId,
        patientId,
        patientName,
        testName: t.name,
        sampleType: t.sampleType,
        status: "PENDING",
      });
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      invoiceId,
      tokenNumber,
      message: "Diagnostic test booking confirmed successfully!",
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create test order" }, { status: 500 });
  }
}
