import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_DOCTORS } from "@/lib/services/mockData";
import {
  ChevronRight,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = MOCK_DOCTORS.find((d) => d.slug === slug);
  if (!doc) {
    return { title: "Doctor Not Found | Apex Diagnostics" };
  }
  return {
    title: `${doc.name} - ${doc.specialization} | Apex Diagnostics`,
    description: `${doc.title}. ${doc.qualification}. BMDC Reg: ${doc.bmdcRegNo}. Available at ${doc.branch}.`,
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = MOCK_DOCTORS.find((d) => d.slug === slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <Link href="/doctors" className="hover:underline text-[#DDEDE3]">Doctors</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>{doc.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#A8D5BA]/50 shadow-xl shrink-0 bg-[#DDEDE3]">
                <Image src={doc.image} alt={doc.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase bg-[#DDEDE3] text-[#315C4A] px-3 py-1 rounded-full mb-2 inline-block font-semibold">
                  {doc.specialization}
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                  {doc.name}
                </h1>
                <p className="text-[#DDEDE3] text-sm sm:text-base font-medium mb-1">{doc.title}</p>
                <p className="text-[#A8D5BA] text-xs font-mono">{doc.qualification}</p>
              </div>
            </div>

            <Button asChild variant="medical" size="lg" className="px-8 py-6 text-base">
              <Link href={`/book-appointment?doctor=${doc.id}`}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Biography and Qualifications */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8E8E3] shadow-sm">
              <h2 className="text-xl font-bold text-[#171717] mb-4">Professional Biography</h2>
              <p className="text-[#70706B] leading-relaxed text-base mb-6 font-normal">
                {doc.biography}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#E8E8E3] pt-6">
                <div>
                  <span className="text-xs font-mono uppercase text-[#70706B] block">Experience</span>
                  <span className="text-lg font-bold text-[#171717]">{doc.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#70706B] block">BMDC Reg</span>
                  <span className="text-lg font-bold text-[#171717] font-mono">{doc.bmdcRegNo}</span>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#70706B] block">Consultation Fee</span>
                  <span className="text-lg font-bold text-[#171717] font-mono">৳{doc.consultationFee}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E8E8E3] shadow-sm">
              <h2 className="text-xl font-bold text-[#171717] mb-4">Specialized Focus Areas</h2>
              <ul className="space-y-3 text-[#70706B] text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#315C4A]" />
                  <span>Clinical Pathological and Biochemical Biomarker Interpretation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#315C4A]" />
                  <span>Second-Opinion Diagnostic Review and Cross-Sectional Imaging</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#315C4A]" />
                  <span>Preventive Screening Protocols for High-Risk Cardiovascular Indicators</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Schedule & Branch Location Card */}
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-[#171717] mb-4">Consultation Schedule</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-[#F7F7F3] rounded-xl border border-[#E8E8E3]">
                  <Calendar className="w-5 h-5 text-[#315C4A] mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-[#70706B] block">Available Days</span>
                    <span className="text-sm font-semibold text-[#171717]">
                      {doc.availableDays.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#F7F7F3] rounded-xl border border-[#E8E8E3]">
                  <Clock className="w-5 h-5 text-[#315C4A] mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-[#70706B] block">Consultation Hours</span>
                    <span className="text-sm font-semibold text-[#171717]">{doc.timing}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#F7F7F3] rounded-xl border border-[#E8E8E3]">
                  <MapPin className="w-5 h-5 text-[#315C4A] mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-[#70706B] block">Assigned Branch</span>
                    <span className="text-sm font-semibold text-[#171717]">{doc.branch}</span>
                  </div>
                </div>
              </div>

              <Button asChild variant="medical" className="w-full py-6">
                <Link href={`/book-appointment?doctor=${doc.id}`}>Reserve Clinical Slot</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
