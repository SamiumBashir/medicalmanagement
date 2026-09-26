import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ChevronRight, Award, ShieldCheck, HeartPulse, Microscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Clinical Heritage & Mission | Apex Diagnostics",
  description: "Learn about Apex Diagnostics' diagnostic excellence, international accreditations, board-certified pathologists, and patient-first methodology.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Editorial Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>About Us</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white mb-6">
              Precision Diagnostics. Built on Trust and Evidence.
            </h1>
            <p className="text-lg text-[#DDEDE3]/85 leading-relaxed font-light">
              Since 2005, Apex Diagnostics has spearheaded clinical accuracy and automated pathology in Bangladesh, combining fellowship-certified clinical leadership with state-of-the-art diagnostic technology.
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315C4A] font-bold block">
              Our Clinical Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] leading-tight">
              Behind every sample is a human life depending on the truth.
            </h2>
            <p className="text-[#70706B] leading-relaxed text-base">
              At Apex Diagnostics, we operate on the fundamental belief that clinical diagnoses dictate the entire course of medical care. A fraction of a milligram in a biochemical assay or a subtle contrast differentiation in a high-resolution CT can mean the difference between timely intervention and missed diagnosis.
            </p>
            <p className="text-[#70706B] leading-relaxed text-base">
              Our automated Roche Cobas and Sysmex systems eliminate manual transcription discrepancies, while our dual-pathologist verification protocols guarantee absolute fidelity in every issued report.
            </p>
          </div>

          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFFFFF] bg-[#DDEDE3]">
            <Image
              src="/images/hero_diagnostics.jpg"
              alt="Automated Clinical Diagnostics Laboratory at Apex Diagnostics"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission and Vision Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#FFFFFF] p-10 rounded-3xl border border-[#E8E8E3] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#DDEDE3] text-[#315C4A] flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#171717] mb-4">Our Clinical Mission</h3>
            <p className="text-[#70706B] leading-relaxed">
              To deliver uncompromising, rapid, and peer-reviewed diagnostic findings that empower physicians to treat confidently and patients to heal effectively.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-10 rounded-3xl border border-[#E8E8E3] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#DDEDE3] text-[#315C4A] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#171717] mb-4">Our Technological Vision</h3>
            <p className="text-[#70706B] leading-relaxed">
              To establish an interconnected diagnostic network powered by zero-error barcoding, AI-assisted radiology screening, and cryptographic anti-counterfeit QR verification.
            </p>
          </div>
        </div>

        {/* Core Pillars: Deep Charcoal #171717 Container */}
        <div className="bg-[#171717] text-white rounded-3xl p-10 sm:p-16 mb-20 shadow-xl border border-[#262626]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8D5BA] font-bold block mb-2">
              The Four Cornerstones
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Why leading hospitals and specialists trust Apex Diagnostics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-t border-[#315C4A]/60 pt-6">
              <span className="text-[#A8D5BA] font-mono text-sm block mb-1">01 / Rigor</span>
              <h4 className="text-lg font-bold mb-2 text-white">Daily Calibrations</h4>
              <p className="text-[#DDEDE3]/80 text-sm leading-relaxed">
                Bi-daily controls run against international Bio-Rad standard calibrators before any patient specimen is processed.
              </p>
            </div>

            <div className="border-t border-[#315C4A]/60 pt-6">
              <span className="text-[#A8D5BA] font-mono text-sm block mb-1">02 / Authenticity</span>
              <h4 className="text-lg font-bold mb-2 text-white">QR Anti-Fraud</h4>
              <p className="text-[#DDEDE3]/80 text-sm leading-relaxed">
                Every generated patient report contains a cryptographically hashed QR code verifiable instantly by any treating clinician.
              </p>
            </div>

            <div className="border-t border-[#315C4A]/60 pt-6">
              <span className="text-[#A8D5BA] font-mono text-sm block mb-1">03 / Speed</span>
              <h4 className="text-lg font-bold mb-2 text-white">Same-Day Turnaround</h4>
              <p className="text-[#DDEDE3]/80 text-sm leading-relaxed">
                Over 85% of routine pathology investigations are verified and available online within 4 hours.
              </p>
            </div>

            <div className="border-t border-[#315C4A]/60 pt-6">
              <span className="text-[#A8D5BA] font-mono text-sm block mb-1">04 / Compassion</span>
              <h4 className="text-lg font-bold mb-2 text-white">Patient-First Care</h4>
              <p className="text-[#DDEDE3]/80 text-sm leading-relaxed">
                Certified pediatric and geriatric phlebotomists trained in ultra-gentle micro-needle sampling.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-[#171717] mb-4">Experience the Standard in Diagnostics</h3>
          <p className="text-[#70706B] mb-8">
            Schedule an appointment at any of our four diagnostic centers or request home specimen collection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="medical" size="lg">
              <Link href="/book-appointment">Book an Appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]">
              <Link href="/tests">Browse Test Directory</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
