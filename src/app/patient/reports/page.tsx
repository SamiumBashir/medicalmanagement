import * as React from "react";
import { dataStore } from "@/lib/services/dataStore";
import { requirePatientIdFromSession } from "@/lib/auth/patient-context";
import { PatientReportsClient } from "./reports-client";

export default async function PatientReportsPage() {
  const { patientId } = await requirePatientIdFromSession();
  const reports = dataStore.reports.filter((r) => r.patientId === patientId);

  return <PatientReportsClient reports={reports} />;
}
