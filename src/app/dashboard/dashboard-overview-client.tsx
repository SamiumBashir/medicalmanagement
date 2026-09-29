"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Droplets,
  FileCheck2,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Stethoscope,
  Microscope,
  Ticket,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";

interface DashboardOverviewProps {
  stats: {
    todayPatients: number;
    todayAppointments: number;
    pendingSamples: number;
    pendingReports: number;
    todayRevenue: number;
    totalDue: number;
  };
  patientGrowthData: { date: string; patients: number; tests: number }[];
  revenueByModality: { name: string; value: number; color: string }[];
  appointmentsTrend: { day: string; scheduled: number; completed: number }[];
}

export function DashboardOverviewClient({
  stats,
  patientGrowthData,
  revenueByModality,
  appointmentsTrend,
}: DashboardOverviewProps) {
  const [userRole, setUserRole] = React.useState<UserRole>("SUPER_ADMIN");
  const [userName, setUserName] = React.useState<string>("Administrator");

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserRole(data.user.role as UserRole);
          setUserName(data.user.name);
        }
      })
      .catch(() => {});
  }, []);

  const isMasterAdmin = userRole === "SUPER_ADMIN" || userRole === "ADMIN";
  const isDoctor = userRole === "DOCTOR";
  const isTechnician = userRole === "TECHNICIAN";
  const isReceptionist = userRole === "RECEPTIONIST";

  return (
    <div className="space-y-8">
      {/* Top Welcome & Role Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#DDEDE3] text-[#315C4A]">
              {isMasterAdmin
                ? "👑 Master Administration Portal (Full Access)"
                : isDoctor
                ? "🩺 Doctor Clinical Consultation Portal"
                : isTechnician
                ? "🔬 Laboratory & Specimen Workbench"
                : "💼 Front Desk & Reception Portal"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#171717] font-normal tracking-tight">
            {isMasterAdmin && "Hospital Operations & Financial Master Control"}
            {isDoctor && `Welcome, ${userName}`}
            {isTechnician && "Laboratory Analyzer Queue & Workbench"}
            {isReceptionist && "Front Desk Patient Flow & Token Registry"}
          </h1>
          <p className="text-xs text-[#70706B] mt-0.5">
            {isMasterAdmin &&
              "Real-time diagnostic metrics, clinical operations, staff roles, and financial ledger reconciliation."}
            {isDoctor &&
              "Access your consultation appointments schedule, patient diagnostic histories, and pending report validations."}
            {isTechnician &&
              "Process barcoded specimen vials, monitor automated Roche analyzers, and enter diagnostic test findings."}
            {isReceptionist &&
              "Manage patient walk-ins, print counter tokens, book specialist appointments, and process lab orders."}
          </p>
        </div>

        {/* Role Direct Action Shortcuts */}
        <div className="flex items-center gap-2.5">
          {isMasterAdmin && (
            <>
              <Button asChild size="sm" variant="outline" className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]">
                <Link href="/dashboard/tokens">Queue Display</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white font-semibold">
                <Link href="/dashboard/analytics">Financial Analytics</Link>
              </Button>
            </>
          )}

          {isDoctor && (
            <>
              <Button asChild size="sm" variant="outline" className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]">
                <Link href="/dashboard/appointments">My Consultations</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white font-semibold">
                <Link href="/dashboard/reports">Sign-off Reports ({stats.pendingReports})</Link>
              </Button>
            </>
          )}

          {isTechnician && (
            <>
              <Button asChild size="sm" variant="outline" className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]">
                <Link href="/dashboard/samples">Phlebotomy Queue</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white font-semibold">
                <Link href="/dashboard/laboratory">Enter Test Results</Link>
              </Button>
            </>
          )}

          {isReceptionist && (
            <>
              <Button asChild size="sm" variant="outline" className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]">
                <Link href="/dashboard/tokens">Call Next Token</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white font-semibold">
                <Link href="/dashboard/orders">Book New Test</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* KPI Cards: Dynamic & Strictly Filtered per Role */}
      {isMasterAdmin && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#70706B] font-semibold">Patients</span>
              <Users className="w-4 h-4 text-[#315C4A]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#171717] font-mono">{stats.todayPatients}</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">+14% vs avg</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#70706B] font-semibold">Appointments</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#171717] font-mono">{stats.todayAppointments}</span>
              <span className="text-[10px] text-[#70706B] block mt-0.5">Specialists on duty</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#70706B] font-semibold">Pending Samples</span>
              <Droplets className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-amber-700 font-mono">{stats.pendingSamples}</span>
              <span className="text-[10px] text-amber-600 block mt-0.5">Phlebotomy Rack</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#70706B] font-semibold">Pending Reports</span>
              <FileCheck2 className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-purple-700 font-mono">{stats.pendingReports}</span>
              <span className="text-[10px] text-purple-600 block mt-0.5">Doctor Verification</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#A8D5BA] shadow-xs flex flex-col justify-between ring-1 ring-[#A8D5BA]/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-[#315C4A] font-semibold">Today&apos;s Revenue</span>
              <CreditCard className="w-4 h-4 text-[#315C4A]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#171717] font-mono">৳{stats.todayRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-[#315C4A] block mt-0.5 font-semibold">Admin Financial Access</span>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-red-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-red-600 font-semibold">Total Due</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-red-600 font-mono">৳{stats.totalDue.toLocaleString()}</span>
              <span className="text-[10px] text-red-500 block mt-0.5">Unsettled Invoices</span>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Dedicated KPIs */}
      {isDoctor && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">My Appointments</span>
              <Calendar className="w-4 h-4 text-[#315C4A]" />
            </div>
            <span className="text-3xl font-bold text-[#171717] font-mono">{stats.todayAppointments}</span>
            <span className="text-xs text-[#315C4A] block mt-1">Scheduled for consultation</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#A8D5BA] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-purple-700 font-semibold">Reports for Sign-off</span>
              <FileCheck2 className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-purple-700 font-mono">{stats.pendingReports}</span>
            <span className="text-xs text-purple-600 block mt-1">Awaiting digital verification</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Critical Flags</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-3xl font-bold text-red-600 font-mono">2</span>
            <span className="text-xs text-red-500 block mt-1">Abnormal lab values detected</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Consulted Today</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-bold text-emerald-700 font-mono">14</span>
            <span className="text-xs text-emerald-600 block mt-1">Patients completed</span>
          </div>
        </div>
      )}

      {/* Technician Dedicated KPIs */}
      {isTechnician && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-amber-700 font-semibold">Pending Phlebotomy</span>
              <Droplets className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-3xl font-bold text-amber-700 font-mono">{stats.pendingSamples}</span>
            <span className="text-xs text-amber-600 block mt-1">Barcode labels printed</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#A8D5BA] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#315C4A] font-semibold">In Processing</span>
              <Microscope className="w-4 h-4 text-[#315C4A]" />
            </div>
            <span className="text-3xl font-bold text-[#171717] font-mono">18</span>
            <span className="text-xs text-[#315C4A] block mt-1">On automated analyzer</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Draft Reports</span>
              <FileCheck2 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-blue-700 font-mono">{stats.pendingReports}</span>
            <span className="text-xs text-blue-600 block mt-1">Submitted to doctor</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Analyzers Online</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-bold text-emerald-700 font-mono">4 / 4</span>
            <span className="text-xs text-emerald-600 block mt-1">Sysmex, Cobas, Beckman</span>
          </div>
        </div>
      )}

      {/* Receptionist Dedicated KPIs */}
      {isReceptionist && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#A8D5BA] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#315C4A] font-semibold">Active Tokens</span>
              <Ticket className="w-4 h-4 text-[#315C4A]" />
            </div>
            <span className="text-3xl font-bold text-[#171717] font-mono">12</span>
            <span className="text-xs text-[#315C4A] block mt-1">Patients in waiting lounge</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Today&apos;s Check-ins</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-3xl font-bold text-[#171717] font-mono">{stats.todayPatients}</span>
            <span className="text-xs text-blue-600 block mt-1">Registered at reception</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Consultations Booked</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-3xl font-bold text-purple-700 font-mono">{stats.todayAppointments}</span>
            <span className="text-xs text-purple-600 block mt-1">With specialist faculty</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#70706B] font-semibold">Counter Receipts</span>
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-bold text-emerald-700 font-mono">32</span>
            <span className="text-xs text-emerald-600 block mt-1">Bills issued today</span>
          </div>
        </div>
      )}

      {/* Main Charts & Telemetry (Full for Admin, Focused for specialized staff) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Patient Throughput / Schedule Trend */}
        <div className="lg:col-span-2 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-normal text-[#171717]">
                {isDoctor ? "Weekly Consultation Flow" : "Patient Volume & Test Processing"}
              </h3>
              <p className="text-xs text-[#70706B]">7-day throughput and demand curve</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#70706B]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#315C4A]" /> Patients
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#A8D5BA]" /> Tests
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#315C4A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#315C4A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="testGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A8D5BA" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A8D5BA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E8E3" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#70706B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#70706B" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E8E8E3",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="patients" stroke="#315C4A" strokeWidth={2} fillOpacity={1} fill="url(#patientGrad)" />
                <Area type="monotone" dataKey="tests" stroke="#A8D5BA" strokeWidth={2} fillOpacity={1} fill="url(#testGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Modality Breakdown (Admin only gets financial breakdown, others get test volume) */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-normal text-[#171717]">
              {isMasterAdmin ? "Modality Revenue Share" : "Department Workload"}
            </h3>
            <p className="text-xs text-[#70706B]">Distribution across diagnostic faculties</p>
          </div>

          <div className="h-56 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByModality}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {revenueByModality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E8E8E3",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E8E8E3]">
            {revenueByModality.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#70706B] truncate text-[11px]">{item.name}</span>
                <span className="font-semibold text-[#171717] ml-auto text-[11px]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Quick Portal Access Hub (Visible ONLY to Admin) */}
      {isMasterAdmin && (
        <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#E8E8E3] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-lg font-normal text-[#171717]">
                Master Administrator Control Hub
              </h3>
              <p className="text-xs text-[#70706B]">
                As Super Admin, you hold full privileges to inspect, manage, and configure every portal in the diagnostic system.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#315C4A] bg-[#DDEDE3] px-2.5 py-1 rounded-full font-semibold">
              👑 Full System Clearance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <Link
              href="/dashboard/users"
              className="p-3.5 rounded-xl border border-[#E8E8E3] hover:border-[#315C4A] hover:bg-[#F7F7F3] transition-all flex flex-col gap-1"
            >
              <span className="font-semibold text-[#171717] flex items-center justify-between">
                <span>Staff & Roles Manager</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315C4A]" />
              </span>
              <span className="text-[11px] text-[#70706B]">Manage access permissions, accounts, credentials</span>
            </Link>

            <Link
              href="/dashboard/billing"
              className="p-3.5 rounded-xl border border-[#E8E8E3] hover:border-[#315C4A] hover:bg-[#F7F7F3] transition-all flex flex-col gap-1"
            >
              <span className="font-semibold text-[#171717] flex items-center justify-between">
                <span>Hospital Financial Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315C4A]" />
              </span>
              <span className="text-[11px] text-[#70706B]">Revenues, invoices, collections, payment gateway</span>
            </Link>

            <Link
              href="/dashboard/branches"
              className="p-3.5 rounded-xl border border-[#E8E8E3] hover:border-[#315C4A] hover:bg-[#F7F7F3] transition-all flex flex-col gap-1"
            >
              <span className="font-semibold text-[#171717] flex items-center justify-between">
                <span>Diagnostic Branch Network</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315C4A]" />
              </span>
              <span className="text-[11px] text-[#70706B]">Multi-branch management (Dhanmondi, Gulshan, Uttara)</span>
            </Link>

            <Link
              href="/patient/dashboard"
              className="p-3.5 rounded-xl border border-[#E8E8E3] hover:border-[#315C4A] hover:bg-[#F7F7F3] transition-all flex flex-col gap-1"
            >
              <span className="font-semibold text-[#171717] flex items-center justify-between">
                <span>Inspect Patient Health Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#315C4A]" />
              </span>
              <span className="text-[11px] text-[#70706B]">Preview patient report download & appointments</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
