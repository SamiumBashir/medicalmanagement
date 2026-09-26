import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MOCK_DOCTORS } from "@/lib/services/mockData";
import { ChevronRight, Calendar, Award, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Senior Medical Faculty & Specialist Doctors | Apex Diagnostics",
  description: "Consult with our distinguished team of consultant pathologists, radiologists, cardiologists, and endocrinologists.",
};

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Consultant Doctors</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4">
            Medical Faculty & Clinical Consultants
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            Fellowship-trained medical specialists committed to evidence-based diagnostic verification and patient-centered clinical consultations.
          </p>
        </div>
      </section>

      {/* Doctors Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 Borders */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-[#FFFFFF] rounded-[28px] border border-[#E8E8E3] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#A8D5BA] transition-all duration-300"
            >
              <div>
                <div className="relative h-64 w-full bg-[#DDEDE3] overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-[#171717]/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-0.5 rounded-full">
                    {doctor.experienceYears}+ Yrs Exp
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-mono font-medium text-[#315C4A] bg-[#DDEDE3] px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                    {doctor.bmdcRegNo}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#171717] group-hover:text-[#315C4A] transition-colors mb-1">
                    <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
                  </h3>
                  <p className="text-xs font-semibold text-[#70706B] mb-1">{doctor.title}</p>
                  <p className="text-xs text-[#70706B] mb-4 line-clamp-1">{doctor.qualification}</p>

                  <div className="space-y-1.5 text-xs text-[#70706B] border-t border-[#E8E8E3] pt-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#315C4A] shrink-0" />
                      <span className="truncate">{doctor.branch}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#315C4A] shrink-0" />
                      <span>{doctor.timing}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E8E8E3] flex items-center justify-between gap-2 mt-4">
                <Button asChild variant="outline" size="sm" className="w-1/2 rounded-full border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A] text-xs">
                  <Link href={`/doctors/${doctor.slug}`}>Profile</Link>
                </Button>
                <Button asChild size="sm" variant="medical" className="w-1/2 rounded-full text-xs font-semibold">
                  <Link href={`/book-appointment?doctor=${doctor.id}`}>Book Visit</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
