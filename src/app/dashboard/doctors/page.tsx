import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_DOCTORS } from "@/lib/services/mockData";
import { Plus, Stethoscope, MapPin, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardDoctorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medical Faculty Roster</h1>
          <p className="text-xs text-slate-500 font-mono">
            Consultant pathologists, radiologists, and cardiologists on duty
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/contact">
            <Plus className="w-4 h-4" />
            Add Consultant Physician
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_DOCTORS.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
          >
            <div>
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 border border-slate-100 shadow-sm">
                <Image src={doc.image} alt={doc.name} fill className="object-cover" />
              </div>

              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded inline-block mb-1">
                {doc.bmdcRegNo}
              </span>
              <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
              <p className="text-xs font-semibold text-slate-600 mb-1">{doc.title}</p>
              <p className="text-xs text-slate-400 font-mono mb-4">{doc.qualification}</p>

              <div className="space-y-1.5 text-xs text-slate-600 font-mono border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span className="truncate">{doc.branch.split(" ")[0]} Branch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>{doc.timing}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs font-bold font-mono text-slate-900">৳{doc.consultationFee}</span>
              <Button asChild size="sm" variant="outline" className="border-slate-300 text-xs">
                <Link href={`/doctors/${doc.slug}`}>Public Profile</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
