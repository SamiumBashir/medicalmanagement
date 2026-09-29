import * as React from "react";
import { dataStore } from "@/lib/services/dataStore";
import { DashboardOverviewClient } from "./dashboard-overview-client";

export default function DashboardPage() {
  const todayPatients = dataStore.patients.length;
  const todayAppointments = dataStore.appointments.filter((a) => a.status !== "CANCELLED").length;
  const pendingSamples = dataStore.samples.filter((s) => s.status === "PENDING" || s.status === "COLLECTED").length;
  const pendingReports = dataStore.reports.filter((r) => r.status === "PENDING_VERIFICATION").length;
  const todayRevenue = dataStore.payments.reduce((acc, p) => acc + p.amount, 0);
  const totalDue = dataStore.invoices.reduce((acc, i) => acc + i.due, 0);

  const patientGrowthData = [
    { date: "Sep 23", patients: 18, tests: 42 },
    { date: "Sep 24", patients: 24, tests: 58 },
    { date: "Sep 25", patients: 20, tests: 49 },
    { date: "Sep 26", patients: 32, tests: 76 },
    { date: "Sep 27", patients: 28, tests: 64 },
    { date: "Sep 28", patients: 35, tests: 85 },
    { date: "Sep 29", patients: todayPatients + 28, tests: 92 },
  ];

  const revenueByModality = [
    { name: "Biochemistry", value: 48, color: "#0F766E" },
    { name: "Hematology", value: 34, color: "#2563EB" },
    { name: "Ultrasonography", value: 28, color: "#F59E0B" },
    { name: "Radiology & X-Ray", value: 22, color: "#8B5CF6" },
  ];

  const appointmentsTrend = [
    { day: "Sat", scheduled: 14, completed: 12 },
    { day: "Sun", scheduled: 18, completed: 16 },
    { day: "Mon", scheduled: 22, completed: 20 },
    { day: "Tue", scheduled: 19, completed: 18 },
    { day: "Wed", scheduled: 25, completed: 23 },
    { day: "Thu", scheduled: 21, completed: 19 },
    { day: "Fri", scheduled: 8, completed: 7 },
  ];

  return (
    <DashboardOverviewClient
      stats={{
        todayPatients,
        todayAppointments,
        pendingSamples,
        pendingReports,
        todayRevenue,
        totalDue,
      }}
      patientGrowthData={patientGrowthData}
      revenueByModality={revenueByModality}
      appointmentsTrend={appointmentsTrend}
    />
  );
}
