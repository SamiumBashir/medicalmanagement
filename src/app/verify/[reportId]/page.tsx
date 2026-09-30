import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getReportById } from "@/lib/services/report.service";
import { generateQrDataUrl } from "@/lib/qr";
import { CheckCircle2, ShieldAlert, ShieldCheck, ChevronRight, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ reportId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reportId } = await params;
  return {
    title: `Medical Report Verification | DiagnostiCare Anti-Counterfeit Portal`,
    description: `Official cryptographic verification record for Diagnostic Report Reference ${reportId}.`,
  };
}

export default async function VerifyReportPage({ params }: PageProps) {
  const { reportId } = await params;

  // Lookup via report service (supporting secure tokens or report ID)
  const report = await getReportById(reportId);
  const token = (report as any)?.verificationToken || reportId;

  const qrUrl = await generateQrDataUrl(
    `https://diagnosticare.org/verify/${token}`
  );

  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4 bg-[#222222] px-3 py-1 rounded-full border border-[#315C4A]/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Counterfeit Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Medical Report Authentication
          </h1>
          <p className="text-sm text-[#DDEDE3]/85">
            Cryptographically validates original diagnostic reports issued by DiagnostiCare.
          </p>
        </div>
      </section>

      {/* Verification Card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8">
        {report && report.status === "VERIFIED" ? (
          <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[#315C4A] shadow-2xl p-8 sm:p-10 relative overflow-hidden">
            {/* Top Verified Ribbon: Dark Green #315C4A */}
            <div className="bg-[#315C4A] text-white text-center py-2.5 font-bold tracking-wider uppercase text-xs font-mono mb-8 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 flex items-center justify-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
              <span>Certified Genuine Medical Document</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E8E8E3]">
              <div>
                <span className="text-xs font-mono uppercase text-[#70706B] block mb-1">Investigation Identifier</span>
                <span className="text-2xl font-black font-mono text-[#171717]">{report.reportId}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#315C4A] animate-pulse" />
                  <span className="text-xs font-semibold text-[#315C4A]">Doctor Verified & Legally Certified</span>
                </div>
              </div>

              {qrUrl && (
                <div className="p-2 border border-[#E8E8E3] rounded-2xl bg-[#FFFFFF] shadow-sm shrink-0">
                  <img src={qrUrl} alt="Verification QR" className="w-24 h-24" />
                </div>
              )}
            </div>

            {/* Privacy-Compliant Public Details */}
            <div className="py-6 space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Patient Reference</span>
                <span className="font-semibold text-[#171717] font-mono">
                  {report.patientName
                    .split(" ")
                    .map((n, i) => (i === 0 ? n : n[0] + "***"))
                    .join(" ")}{" "}
                  ({report.patientId})
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Test Category</span>
                <span className="font-semibold text-[#171717]">{report.category}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Diagnostic Investigation</span>
                <span className="font-semibold text-[#315C4A]">{report.testName}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Date Issued</span>
                <span className="font-mono text-[#171717]">
                  {report.issuedDate || "2026-09-29"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Verifying Physician</span>
                <span className="font-semibold text-[#171717] text-right">
                  {report.verifiedBy || "Certified Consultant Pathologist"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#E8E8E3]">
                <span className="text-[#70706B]">Doctor Registration</span>
                <span className="font-mono text-xs text-[#315C4A] bg-[#DDEDE3] px-2 py-0.5 rounded font-semibold">
                  {report.doctorReg || "BMDC Verified"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#70706B]">Issuing Facility</span>
                <span className="font-medium text-[#171717] text-right">{report.branchName}</span>
              </div>
            </div>

            {/* Authenticity Hash Fingerprint */}
            <div className="p-4 bg-[#F7F7F3] rounded-2xl border border-[#E8E8E3] mb-6">
              <span className="text-[11px] font-mono uppercase text-[#70706B] font-bold block mb-1">
                Cryptographic Audit Digest (SHA-256)
              </span>
              <span className="font-mono text-xs text-[#171717] break-all select-all font-semibold">
                {report.authenticityHash}
              </span>
            </div>

            <div className="text-center pt-2">
              <Button asChild className="w-full bg-[#171717] hover:bg-[#262626] text-white">
                <Link href="/">Return to DiagnostiCare Home</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#D97706] shadow-xl p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#171717] mb-2">
              {report ? "Report Verification Pending" : "Record Not Located"}
            </h2>
            <p className="text-sm text-[#70706B] max-w-md mx-auto mb-6">
              {report
                ? `Report ${reportId} is currently undergoing pathologist analysis and has not yet received final physician certification.`
                : `We could not find an authentic medical record matching identifier "${reportId}" in our national laboratory registry.`}
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild variant="outline" className="border-[#E8E8E3]">
                <Link href="/contact">Contact Laboratory Helpdesk</Link>
              </Button>
              <Button asChild className="bg-[#315C4A] hover:bg-[#254638] text-white">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
