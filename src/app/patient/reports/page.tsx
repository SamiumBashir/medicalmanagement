import * as React from "react";
import { dataStore } from "@/lib/services/dataStore";
import { PatientReportsClient } from "./reports-client";

export default function PatientReportsPage() {
  const patientId = "PAT-2026-000001";
  const reports = dataStore.reports.filter((r) => r.patientId === patientId);

  return <PatientReportsClient reports={reports} />;
}
