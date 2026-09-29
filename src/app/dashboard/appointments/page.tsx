"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, AppointmentRecord } from "@/lib/services/dataStore";
import { AppointmentStatus } from "@/types";
import { Calendar, Plus, Check, X, Clock, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardAppointmentsPage() {
  const [appointments, setAppointments] = React.useState<AppointmentRecord[]>(dataStore.appointments);
  const [search, setSearch] = React.useState("");

  const updateStatus = (id: string, newStatus: AppointmentStatus) => {
    const found = dataStore.appointments.find((a) => a.id === id);
    if (found) {
      found.status = newStatus;
      setAppointments([...dataStore.appointments]);
    }
  };

  const filtered = appointments.filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.appointmentId.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clinical Appointment Management</h1>
          <p className="text-xs text-slate-500 font-mono">
            Track patient arrival, update consultation statuses, and re-schedule slots
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/book-appointment">
            <Plus className="w-4 h-4" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Filter by patient, APT ID, or physician..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> visits
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">ID & Status</th>
                <th className="py-3 px-6">Patient Details</th>
                <th className="py-3 px-6">Consultant Specialist</th>
                <th className="py-3 px-6">Date & Time</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-teal-800 block">{apt.appointmentId}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded inline-block mt-1 ${
                        apt.status === "COMPLETED"
                          ? "bg-slate-100 text-slate-700"
                          : apt.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800"
                          : apt.status === "WAITING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="block text-slate-900 font-semibold">{apt.patientName}</strong>
                    <span className="text-xs text-slate-500 font-mono">{apt.patientPhone}</span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <span className="font-semibold text-slate-900 block">{apt.doctorName}</span>
                    <span className="text-xs text-slate-500">{apt.doctorSpecialization}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    <span className="block font-semibold">{apt.appointmentDate}</span>
                    <span className="text-slate-500">{apt.appointmentTime}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 truncate max-w-[160px]">{apt.branchName}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(apt.id, "WAITING")}
                        className="text-[11px] h-7 px-2 border-amber-300 text-amber-800 hover:bg-amber-50"
                      >
                        Patient In
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(apt.id, "COMPLETED")}
                        className="text-[11px] h-7 px-2 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                      >
                        Complete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
