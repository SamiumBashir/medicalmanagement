"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, ReportRecord } from "@/lib/services/dataStore";
import { verifyReportAction, requestReportCorrectionAction } from "@/app/actions/report.actions";
import { generateQrDataUrl } from "@/lib/qr";
import { ShieldCheck, CheckCircle2, RotateCcw, Eye, Printer, X, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DoctorVerificationReportsPage() {
  const [reports, setReports] = React.useState<ReportRecord[]>(dataStore.reports);
  const [search, setSearch] = React.useState("");
  const [reviewReport, setReviewReport] = React.useState<ReportRecord | null>(null);
  const [doctorComments, setDoctorComments] = React.useState("");
  const [qrUrl, setQrUrl] = React.useState("");

  const handleOpenReview = async (rpt: ReportRecord) => {
    setReviewReport(rpt);
    setDoctorComments(rpt.clinicalRemarks || "Clinical parameters verified against standard biological intervals.");
    const token = (rpt as any).verificationToken || rpt.reportId;
    const url = await generateQrDataUrl(`https://diagnosticare.org/verify/${token}`);
    setQrUrl(url);
  };

  const handleVerify = async (rptId: string) => {
    try {
      const res = await verifyReportAction(rptId, doctorComments);
      if (res.success && res.report) {
        setReports(reports.map((r) => (r.reportId === res.report.reportId ? res.report : r)));
        setReviewReport(null);
      }
    } catch (err: any) {
      alert(err.message || "Failed to verify report");
    }
  };

  const handleRequestCorrection = async (rptId: string) => {
    try {
      const res = await requestReportCorrectionAction(rptId, doctorComments);
      if (res.success && res.report) {
        setReports(reports.map((r) => (r.reportId === res.report.reportId ? res.report : r)));
        setReviewReport(null);
      }
    } catch (err: any) {
      alert(err.message || "Failed to request correction");
    }
  };

  const filtered = reports.filter(
    (r) =>
      r.reportId.toLowerCase().includes(search.toLowerCase()) ||
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.testName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medical Reports & Doctor Verification Hub</h1>
          <p className="text-xs text-slate-500 font-mono">
            Pathologist review workbench, digital cryptographic signatures, and correction requests
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search report ID, patient, or test..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> reports
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Report ID & Date</th>
                <th className="py-3 px-6">Patient Name</th>
                <th className="py-3 px-6">Diagnostic Investigation</th>
                <th className="py-3 px-6">Verification Status</th>
                <th className="py-3 px-6">Verifying Consultant</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-teal-800 text-sm block">{r.reportId}</span>
                    <span className="text-slate-400 text-[10px]">{r.issuedDate}</span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 block font-semibold">{r.patientName}</strong>
                    <span className="text-slate-400 font-mono text-xs">{r.patientId}</span>
                  </td>
                  <td className="py-4 px-6 font-sans font-semibold text-slate-800">{r.testName}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded inline-block ${
                        r.status === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800"
                          : r.status === "CORRECTION_REQUESTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-sans text-xs">
                    {r.verifiedBy || "Pending Doctor Review"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenReview(r)}
                        className="text-xs h-8 border-slate-300 gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review & Verify
                      </Button>
                      {r.status === "VERIFIED" && (
                        <Button asChild size="sm" variant="ghost" className="h-8 text-teal-700">
                          <Link href={`/verify/${r.reportId}`}>Public QR</Link>
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

      {/* Doctor Verification Modal */}
      {reviewReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="relative bg-white text-slate-900 rounded-3xl max-w-3xl w-full my-8 p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded">
                  {reviewReport.reportId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Doctor Clinical Review: {reviewReport.testName}
                </h3>
              </div>
              <button
                onClick={() => setReviewReport(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Results Table for Doctor */}
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2 px-3">Analyte Parameter</th>
                    <th className="py-2 px-3">Technician Value</th>
                    <th className="py-2 px-3">Reference Range</th>
                    <th className="py-2 px-3 text-right">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reviewReport.results.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-900 font-sans">{res.parameter}</td>
                      <td className="py-2 px-3 font-bold text-slate-900 text-sm">
                        {res.value} {res.unit}
                      </td>
                      <td className="py-2 px-3 text-slate-500">{res.refRange}</td>
                      <td className="py-2 px-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            res.flag === "NORMAL"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
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

            {/* Doctor Remarks Input */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-mono uppercase text-slate-500 font-semibold block">
                Doctor / Pathologist Remarks & Clinical Impression
              </label>
              <textarea
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={doctorComments}
                onChange={(e) => setDoctorComments(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                onClick={() => handleRequestCorrection(reviewReport.id)}
                className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Request Laboratory Correction
              </Button>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setReviewReport(null)}
                  className="w-1/2 sm:w-auto text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleVerify(reviewReport.id)}
                  className="w-1/2 sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Apply Digital Seal & Verify Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
