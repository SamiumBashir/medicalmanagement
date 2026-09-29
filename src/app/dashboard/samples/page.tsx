"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, SampleRecord } from "@/lib/services/dataStore";
import { SampleStatus } from "@/types";
import { Droplet, Search, QrCode, CheckCircle2, AlertOctagon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardSamplesPage() {
  const [samples, setSamples] = React.useState<SampleRecord[]>(dataStore.samples);
  const [search, setSearch] = React.useState("");
  const [rejectId, setRejectId] = React.useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = React.useState("Hemolyzed Specimen");

  const updateSampleStatus = (id: string, newStatus: SampleStatus, reason?: string) => {
    const s = dataStore.samples.find((item) => item.id === id);
    if (s) {
      s.status = newStatus;
      if (newStatus === "COLLECTED") {
        s.collectedAt = new Date().toISOString();
        s.collectedBy = "Phlebotomist Rafiqul Islam";
      }
      if (newStatus === "REJECTED" && reason) {
        s.rejectionReason = reason;
      }
      setSamples([...dataStore.samples]);
      setRejectId(null);
    }
  };

  const filtered = samples.filter(
    (s) =>
      s.sampleId.toLowerCase().includes(search.toLowerCase()) ||
      s.patientName.toLowerCase().includes(search.toLowerCase()) ||
      s.testName.toLowerCase().includes(search.toLowerCase()) ||
      s.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Phlebotomy & Sample Tracking</h1>
          <p className="text-xs text-slate-500 font-mono">
            Vacutainer barcoding, blood draw collection timestamps, sample custody handovers, and rejection logs
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/dashboard/laboratory">
            Enter Lab Workbench →
          </Link>
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by sample ID, barcode, patient, or test..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> specimens
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Barcode / Sample ID</th>
                <th className="py-3 px-6">Patient Name</th>
                <th className="py-3 px-6">Investigation Test</th>
                <th className="py-3 px-6">Specimen Matrix</th>
                <th className="py-3 px-6">Collection Status</th>
                <th className="py-3 px-6 text-right">Phlebotomist Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-teal-800 text-sm block">{s.sampleId}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Order: {s.orderId}</span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 block font-semibold">{s.patientName}</strong>
                    <span className="text-xs text-slate-400 font-mono">{s.patientId}</span>
                  </td>
                  <td className="py-4 px-6 font-sans font-semibold text-slate-800">{s.testName}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono">
                      {s.sampleType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded inline-block ${
                        s.status === "COMPLETED"
                          ? "bg-slate-100 text-slate-700"
                          : s.status === "PROCESSING"
                          ? "bg-teal-100 text-teal-800"
                          : s.status === "COLLECTED"
                          ? "bg-blue-100 text-blue-800"
                          : s.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {s.status}
                    </span>
                    {s.rejectionReason && (
                      <span className="text-[10px] text-red-600 block mt-0.5 italic">
                        Reason: {s.rejectionReason}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {s.status === "PENDING" && (
                        <Button
                          size="sm"
                          onClick={() => updateSampleStatus(s.id, "COLLECTED")}
                          className="h-7 text-[11px] bg-teal-700 hover:bg-teal-800 text-white font-medium"
                        >
                          Mark Collected
                        </Button>
                      )}
                      {s.status === "COLLECTED" && (
                        <Button
                          size="sm"
                          onClick={() => updateSampleStatus(s.id, "PROCESSING")}
                          className="h-7 text-[11px] bg-blue-700 hover:bg-blue-800 text-white font-medium"
                        >
                          Send to Analyzer
                        </Button>
                      )}
                      {s.status !== "COMPLETED" && s.status !== "REJECTED" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setRejectId(s.id)}
                          className="h-7 text-[11px] text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Specimen Reason Dialog */}
      {rejectId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-red-700 font-bold text-lg mb-2">
              <AlertOctagon className="w-5 h-5" />
              <h3>Reject Clinical Specimen</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-mono">
              In accordance with laboratory protocol, specify the clinical justification for specimen rejection:
            </p>

            <select
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-semibold mb-6 bg-white"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            >
              <option value="Hemolyzed Specimen">Gross Hemolysis in Serum Tube</option>
              <option value="Clotted EDTA Tube">Micro-Clots Detected in Whole Blood EDTA</option>
              <option value="Insufficient Quantity (QNS)">Quantity Not Sufficient for Automated Analyzer</option>
              <option value="Lipemic Serum Sample">Severe Lipemia Interfering with Optical Absorbance</option>
              <option value="Labeling Discrepancy">Mismatched Patient Name on Barcode Tube</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setRejectId(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white font-medium"
                onClick={() => updateSampleStatus(rejectId, "REJECTED", rejectionReason)}
              >
                Confirm Rejection & Alert Ward
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
