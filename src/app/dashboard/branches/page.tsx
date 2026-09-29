import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_BRANCHES } from "@/lib/services/mockData";
import { Building2, Plus, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardBranchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnostic Center Branch Network</h1>
          <p className="text-xs text-slate-500 font-mono">
            Diagnostic wing administration, operating schedules, and local equipment allocation
          </p>
        </div>

        <Button className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Plus className="w-4 h-4" />
          Add Branch Center
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_BRANCHES.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-xs">
                <Image src={b.image} alt={b.name} fill className="object-cover" />
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900">{b.name}</h3>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded">
                  {b.slug}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4">{b.address}</p>

              <div className="space-y-1.5 text-xs text-slate-500 font-mono border-t border-slate-100 pt-3 mb-6">
                <div>Phone: <strong className="text-slate-800">{b.phone}</strong></div>
                <div>Emergency: <strong className="text-red-600">{b.emergencyPhone}</strong></div>
                <div>Hours: <span className="text-slate-700">{b.openingHours}</span></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-xs font-mono text-slate-400">
                {b.availableTestsCount} Tests • {b.doctorsCount} Doctors
              </span>
              <Button asChild size="sm" variant="outline" className="border-slate-300">
                <Link href={`/branches/${b.slug}`}>View Public Profile →</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
