import * as React from "react";
import { redirect } from "next/navigation";
import { dataStore } from "@/lib/services/dataStore";
import { getServerSession } from "@/lib/auth/session";
import { PatientReportsClient } from "./reports-client";

export default async function PatientReportsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?from=/patient/reports");
  }

  const patientId = session.patientId || "PAT-2026-000001";
  const reports = dataStore.reports.filter((r) => r.patientId === patientId);

  return <PatientReportsClient reports={reports} />;
}
