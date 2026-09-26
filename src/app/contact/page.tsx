import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact & 24/7 Clinical Emergency Hotlines | Apex Diagnostics",
  description: "Reach our diagnostic desks in Dhanmondi, Gulshan, Uttara, and Mirpur. 24/7 emergency sampling and home collection services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Patient Support & Clinical Coordination
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            Our customer care desks, emergency phlebotomy dispatchers, and branch receptionists are ready to assist you.
          </p>
        </div>
      </section>

      <ContactClient />
    </div>
  );
}
