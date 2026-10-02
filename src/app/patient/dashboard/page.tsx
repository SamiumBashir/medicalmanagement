import * as React from "react";
import Link from "next/link";
import { dataStore } from "@/lib/services/dataStore";
import { requirePatientIdFromSession } from "@/lib/auth/patient-context";
import {
  Calendar,
  FileText,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PatientDashboardPage() {
  const { session, patientId } = await requirePatientIdFromSession();
  const patientName = session.name || "Patient";

  const appointments = dataStore.appointments.filter(
    (a) => a.patientName.toLowerCase() === patientName.toLowerCase() || (session.patientId && a.patientPhone === (session as any).phone)
  );
  const orders = dataStore.orders.filter((o) => o.patientId === patientId);
  const reports = dataStore.reports.filter((r) => r.patientId === patientId);
  const invoices = dataStore.invoices.filter((i) => i.patientId === patientId);

  const dueTotal = invoices.reduce((acc, inv) => acc + inv.due, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal-300 font-bold block mb-2">
            Patient Health Dashboard • {patientId}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Welcome back, {patientName}
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
            You have <strong className="text-white font-semibold">{reports.length} verified diagnostic report(s)</strong> available for digital download. All laboratory results are secured with cryptographic QR certification.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold" size="sm">
              <Link href="/patient/reports">View Certified Reports</Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800" size="sm">
              <Link href="/book-test">Request New Investigation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Upcoming Visits</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">{appointments.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Active Orders</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">{orders.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Verified Reports</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {reports.filter((r) => r.status === "VERIFIED").length}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Pending Balance</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">৳{dueTotal}</span>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Appointments & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900">Upcoming Appointments</h2>
            </div>
            <Link href="/patient/appointments" className="text-xs font-semibold text-teal-700 hover:underline">
              View All ({appointments.length})
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No scheduled consultations</p>
              <p className="text-xs text-slate-400 mb-4">Book an appointment with a specialist physician</p>
              <Button asChild size="sm" className="bg-teal-700 text-white">
                <Link href="/book-appointment">Book Consultation</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{apt.doctorName}</h4>
                      <p className="text-xs text-slate-500">{apt.doctorSpecialization}</p>
                    </div>
                    <span className="text-xs font-mono bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded">
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-600 mt-3 pt-2 border-t border-slate-200/60">
                    <span>{apt.appointmentDate}</span>
                    <span>•</span>
                    <span>{apt.appointmentTime}</span>
                    <span>•</span>
                    <span className="truncate">{apt.branchName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Diagnostic Reports Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900">Recent Diagnostic Reports</h2>
            </div>
            <Link href="/patient/reports" className="text-xs font-semibold text-teal-700 hover:underline">
              All Reports ({reports.length})
            </Link>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FileCheck2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No laboratory reports found</p>
              <p className="text-xs text-slate-400 mb-4">Diagnostic reports will appear here once verified by a pathologist</p>
              <Button asChild size="sm" variant="outline" className="border-slate-300">
                <Link href="/book-test">Schedule Lab Test</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((rpt) => (
                <div key={rpt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-teal-800">{rpt.reportId}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          rpt.status === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {rpt.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{rpt.testName}</h4>
                    <p className="text-xs text-slate-500 font-mono">Issued: {rpt.issuedDate}</p>
                  </div>

                  <Button asChild size="sm" variant="outline" className="border-slate-300">
                    <Link href={`/verify/${(rpt as any).verificationToken || rpt.reportId}`}>Verify Seal</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
