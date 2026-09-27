import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { BookingClient } from "./booking-client";

export const metadata: Metadata = {
  title: "Book a Specialist Consultation | Apex Diagnostics",
  description: "Schedule an appointment with our consultant pathologists, radiologists, and cardiologists across our diagnostic branches.",
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Consultation Booking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Specialist Physician Booking
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            Direct appointments with certified clinical consultants at your preferred diagnostic center.
          </p>
        </div>
      </section>

      <React.Suspense fallback={<div className="p-12 text-center text-[#70706B]">Loading booking interface...</div>}>
        <BookingClient />
      </React.Suspense>
    </div>
  );
}
