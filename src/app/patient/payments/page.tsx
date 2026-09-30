import * as React from "react";
import { redirect } from "next/navigation";
import { dataStore } from "@/lib/services/dataStore";
import { getServerSession } from "@/lib/auth/session";
import { PatientPaymentsClient } from "./payments-client";

export default async function PatientPaymentsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?from=/patient/payments");
  }

  const patientId = session.patientId || "PAT-2026-000001";
  const patientName = session.name || "Patient";

  const invoices = dataStore.invoices.filter((i) => i.patientId === patientId);
  const payments = dataStore.payments.filter(
    (p) => p.patientName.toLowerCase() === patientName.toLowerCase()
  );

  return <PatientPaymentsClient invoices={invoices} payments={payments} />;
}
