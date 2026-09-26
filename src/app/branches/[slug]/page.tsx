import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_BRANCHES, MOCK_DOCTORS } from "@/lib/services/mockData";
import { ChevronRight, MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = MOCK_BRANCHES.find((b) => b.slug === slug);
  if (!branch) {
    return { title: "Branch Not Found | Apex Diagnostics" };
  }
  return {
    title: `${branch.name} - Diagnostic Center & Facilities | Apex Diagnostics`,
    description: `${branch.address}. Phone: ${branch.phone}. Hours: ${branch.openingHours}. Full laboratory and radiology facilities.`,
  };
}

export default async function BranchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const branch = MOCK_BRANCHES.find((b) => b.slug === slug);

  if (!branch) {
    notFound();
  }

  const assignedDoctors = MOCK_DOCTORS.filter((d) => d.branchSlug === branch.slug);

  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <Link href="/branches" className="hover:underline text-[#DDEDE3]">Branches</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>{branch.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase bg-[#DDEDE3] text-[#315C4A] px-3 py-1 rounded-full mb-2 inline-block font-semibold">
                {branch.openingHours}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                {branch.name}
              </h1>
              <p className="text-[#DDEDE3]/85 text-base">{branch.address}</p>
            </div>

            <Button asChild variant="medical" size="lg" className="px-8 py-6 text-base">
              <Link href={`/book-appointment?branch=${branch.id}`}>Book at this Branch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-[#E8E8E3] shadow-md bg-[#DDEDE3]">
              <Image src={branch.image} alt={branch.name} fill className="object-cover" />
            </div>

            {/* Facilities */}
            <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E8E8E3] shadow-sm">
              <h2 className="text-xl font-bold text-[#171717] mb-6">Diagnostic Facilities & Equipment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branch.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#F7F7F3] rounded-xl border border-[#E8E8E3]">
                    <CheckCircle2 className="w-5 h-5 text-[#315C4A] shrink-0" />
                    <span className="text-sm font-medium text-[#171717]">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors at this location */}
            {assignedDoctors.length > 0 && (
              <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E8E8E3] shadow-sm">
                <h2 className="text-xl font-bold text-[#171717] mb-6">Consultants at this Branch</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {assignedDoctors.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-4 p-4 border border-[#E8E8E3] rounded-2xl bg-[#F7F7F3]">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#DDEDE3]">
                        <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#171717] text-sm">{doc.name}</h4>
                        <p className="text-xs text-[#70706B] mb-2">{doc.specialization}</p>
                        <Link href={`/doctors/${doc.slug}`} className="text-xs font-semibold text-[#315C4A] hover:underline">
                          View Schedule →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-[#171717] mb-4">Branch Contact & Timings</h3>

              <div className="space-y-4 mb-6 text-sm text-[#70706B]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#315C4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717]">Address</strong>
                    <span>{branch.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#315C4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717]">Operating Schedule</strong>
                    <span>{branch.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#315C4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717]">Phone Numbers</strong>
                    <span className="font-mono block text-[#171717]">Reception: {branch.phone}</span>
                    <span className="font-mono block text-[#315C4A] font-bold">Emergency: {branch.emergencyPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#315C4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717]">Email Inquiries</strong>
                    <span className="font-mono">{branch.email}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8E8E3] pt-4 space-y-3">
                <Button asChild variant="medical" className="w-full py-5">
                  <Link href={`/book-appointment?branch=${branch.id}`}>Book Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3] py-5">
                  <Link href={`/book-test?branch=${branch.id}`}>Order Diagnostic Tests</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
