import * as React from "react";
import Link from "next/link";
import { dataStore } from "@/lib/services/dataStore";
import { Calendar, Plus, MapPin, Clock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientAppointmentsPage() {
  const appointments = dataStore.appointments.filter(
    (a) => a.patientPhone.includes("1711") || a.patientName.includes("Tanvir")
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Medical Appointments</h1>
          <p className="text-xs text-slate-500 font-mono">
            Upcoming and historical specialist physician consultations
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/book-appointment">
            <Plus className="w-4 h-4" />
            Book Specialist Consultation
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {appointments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No consultations currently scheduled.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100">
                      {apt.appointmentId}
                    </span>
                    <span className="text-xs font-semibold uppercase font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {apt.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{apt.doctorName}</h3>
                  <p className="text-xs font-medium text-slate-500">{apt.doctorSpecialization}</p>
                  <p className="text-xs text-slate-600 italic mt-1">&ldquo;{apt.reason}&rdquo;</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs text-slate-600 font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-700" />
                      <span>{apt.appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      <span>{apt.appointmentTime}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-700" />
                      <span className="truncate max-w-[200px]">{apt.branchName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
