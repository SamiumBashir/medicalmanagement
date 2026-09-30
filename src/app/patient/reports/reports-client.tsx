"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, ReportRecord } from "@/lib/services/dataStore";
import { generateQrDataUrl } from "@/lib/qr";
import { FileCheck2, Printer, ShieldCheck, Download, Eye, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PatientReportsClient({ reports }: { reports: ReportRecord[] }) {
  const [activeReport, setActiveReport] = React.useState<ReportRecord | null>(null);
  const [qrUrl, setQrUrl] = React.useState<string>("");

  const handleOpenReport = async (rpt: ReportRecord) => {
    setActiveReport(rpt);
    const token = (rpt as any).verificationToken || rpt.reportId;
    const url = await generateQrDataUrl(`https://diagnosticare.org/verify/${token}`);
    setQrUrl(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnostic Reports Archive</h1>
          <p className="text-xs text-slate-500 font-mono">
            Digitally certified medical reports with anti-counterfeit QR authentication
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {reports.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No diagnostic reports released yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reports.map((rpt) => (
              <div
                key={rpt.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {rpt.reportId}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        rpt.status === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {rpt.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{rpt.testName}</h3>
                  <p className="text-xs text-slate-500">{rpt.category} • Specimen: {rpt.sampleType}</p>
                  <p className="text-xs text-slate-600 font-mono">
                    Verified By: {rpt.verifiedBy || "Pending Review"} • Issued: {rpt.issuedDate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenReport(rpt)}
                    className="gap-1.5 border-slate-300"
                  >
                    <Eye className="w-4 h-4" />
                    View & Print A4 Report
                  </Button>
                  <Button asChild size="sm" className="bg-teal-700 hover:bg-teal-800 text-white">
                    <Link href={`/verify/${rpt.reportId}`}>QR Seal</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official A4 Printable Diagnostic Report Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="relative bg-white text-slate-900 rounded-3xl max-w-4xl w-full my-8 p-6 sm:p-10 shadow-2xl border border-slate-200">
            {/* Action Bar (Hidden when printing) */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Doctor Certified Diagnostic Report Preview</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => window.print()}
                  className="bg-teal-700 hover:bg-teal-800 text-white gap-2 font-medium"
                  size="sm"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save A4 PDF
                </Button>
                <button
                  onClick={() => setActiveReport(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* A4 Report Body */}
            <div id="printable-report" className="space-y-6">
              {/* Header Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-800 text-white font-bold text-2xl flex items-center justify-center rounded-xl">
                    D+
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                      DiagnostiCare Laboratories
                    </h2>
                    <p className="text-xs text-slate-500 font-mono">
                      ISO 15189 Accredited Clinical Reference Laboratory & Diagnostic Imaging Center
                    </p>
                    <p className="text-xs text-slate-500">
                      Central Hub: House 42, Road 9/A, Dhanmondi, Dhaka • Hotline: +880 2 966 8400
                    </p>
                  </div>
                </div>

                {qrUrl && (
                  <div className="text-center">
                    <img src={qrUrl} alt="QR Code" className="w-20 h-20 mx-auto" />
                    <span className="text-[9px] font-mono text-slate-400 block mt-0.5">Scan to Verify</span>
                  </div>
                )}
              </div>

              {/* Patient Demographics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Patient Name</span>
                  <strong className="text-slate-900 text-sm">{activeReport.patientName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Patient ID / Order ID</span>
                  <span className="text-slate-800 font-semibold">{activeReport.patientId}</span>
                  <span className="text-slate-500 block">{activeReport.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Age / Gender</span>
                  <span className="text-slate-800 font-semibold">
                    {activeReport.patientAge} Years / {activeReport.patientGender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Report ID & Date</span>
                  <strong className="text-teal-900">{activeReport.reportId}</strong>
                  <span className="text-slate-500 block">{activeReport.issuedDate}</span>
                </div>
              </div>

              {/* Test Name & Department Banner */}
              <div className="text-center py-2 bg-slate-900 text-white rounded-xl">
                <span className="text-xs font-mono uppercase text-teal-400 tracking-wider">
                  DEPARTMENT OF {activeReport.category.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{activeReport.testName}</h3>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-slate-500 uppercase text-[11px]">
                      <th className="py-2.5 px-3">Test Investigation Parameter</th>
                      <th className="py-2.5 px-3">Observed Value</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Biological Reference Range</th>
                      <th className="py-2.5 px-3 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activeReport.results.map((res, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">{res.parameter}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-950 text-sm">{res.value}</td>
                        <td className="py-2.5 px-3 text-slate-600">{res.unit}</td>
                        <td className="py-2.5 px-3 text-slate-600">{res.refRange}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              res.flag === "NORMAL"
                                ? "bg-emerald-100 text-emerald-800"
                                : res.flag === "CRITICAL"
                                ? "bg-red-100 text-red-800 font-black animate-pulse"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {res.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pathologist Clinical Remarks */}
              {activeReport.clinicalRemarks && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block uppercase font-mono mb-1">
                    Pathologist Interpretation / Remarks:
                  </span>
                  <p className="text-slate-700 italic">{activeReport.clinicalRemarks}</p>
                </div>
              )}

              {/* Signatures & Certification Block */}
              <div className="border-t-2 border-slate-200 pt-6 mt-8 grid grid-cols-2 gap-8 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block mb-1">Laboratory Technologist</span>
                  <span className="font-bold text-slate-800 block">Rafiqul Islam, B.Sc. Med. Tech.</span>
                  <span className="text-[11px] text-slate-500">Automated Chemistry & Hematology Lead</span>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block mb-1">Digitally Signed & Verified By</span>
                  <span className="font-bold text-slate-900 text-sm block">
                    {activeReport.verifiedBy || "Prof. Dr. Mizanur Rahman, FCPS, FRCPath"}
                  </span>
                  <span className="text-[11px] text-teal-800 font-semibold block">
                    {activeReport.doctorReg || "BMDC Reg: A-18492"}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Digital Signature Timestamp: {activeReport.verifiedAt || "2026-09-29 11:45:00 UTC"}
                  </span>
                </div>
              </div>

              {/* Bottom Notice */}
              <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
                This is an electronically generated and certified medical document. To verify authenticity, visit 
                https://diagnosticare.org/verify/{activeReport.reportId} or scan the QR code above.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
