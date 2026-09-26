import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MOCK_BRANCHES } from "@/lib/services/mockData";
import { ChevronRight, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Diagnostic Branches & Center Locations | Apex Diagnostics",
  description: "Find our state-of-the-art diagnostic centers across Dhanmondi, Gulshan, Uttara, and Mirpur.",
};

export default function BranchesPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Locations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Diagnostic Center Network
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            Conveniently located clinical diagnostic hubs equipped with automated phlebotomy suites, digital radiology, and 24/7 emergency sampling.
          </p>
        </div>
      </section>

      {/* Branches Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 Borders */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#A8D5BA] transition-all duration-300"
            >
              <div>
                <div className="relative h-64 w-full bg-[#DDEDE3] overflow-hidden">
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#171717]/80 backdrop-blur-md text-[#DDEDE3] text-xs font-mono px-3 py-1 rounded-full border border-[#315C4A]">
                    {branch.openingHours}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#171717] mb-3 group-hover:text-[#315C4A] transition-colors">
                    <Link href={`/branches/${branch.slug}`}>{branch.name}</Link>
                  </h3>

                  <div className="space-y-2.5 text-sm text-[#70706B] mb-6">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#315C4A] mt-1 shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#315C4A] shrink-0" />
                      <span className="font-mono text-[#171717]">{branch.phone} (Emergency: {branch.emergencyPhone})</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#315C4A] shrink-0" />
                      <span className="font-mono">{branch.email}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#E8E8E3] pt-4">
                    <span className="text-xs uppercase font-mono text-[#70706B] block mb-2 font-semibold">Key Facilities</span>
                    <div className="flex flex-wrap gap-2">
                      {branch.facilities.slice(0, 3).map((f, fi) => (
                        <span key={fi} className="text-xs bg-[#DDEDE3] text-[#315C4A] px-2.5 py-1 rounded-lg font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex items-center justify-between gap-4">
                <Button asChild variant="outline" className="w-1/2 border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A]">
                  <Link href={`/branches/${branch.slug}`}>Center Details</Link>
                </Button>
                <Button asChild variant="medical" className="w-1/2">
                  <Link href={`/book-appointment?branch=${branch.id}`}>Book Appointment</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
