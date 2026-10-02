import * as React from "react";
import { dataStore } from "@/lib/services/dataStore";
import { requirePatientIdFromSession } from "@/lib/auth/patient-context";
import { PatientPaymentsClient } from "./payments-client";

export default async function PatientPaymentsPage() {
  const { session, patientId } = await requirePatientIdFromSession();
  const patientName = session.name || "Patient";

  const invoices = dataStore.invoices.filter((i) => i.patientId === patientId);
  const payments = dataStore.payments.filter(
    (p) => p.patientName.toLowerCase() === patientName.toLowerCase()
  );

  return <PatientPaymentsClient invoices={invoices} payments={payments} />;
}
