import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F7F3] pt-12 pb-16 lg:pt-20 lg:pb-20 border-b border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas Header-11 Centered Composition */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Flanking Subtitle Line */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#70706B]/30" />
            <p className="text-xs uppercase tracking-[0.3em] font-mono text-[#70706B] font-semibold">
              Welcome to Apex Diagnostics
            </p>
            <div className="h-[1px] w-12 bg-[#70706B]/30" />
          </div>

          {/* Klaas Large Serif Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#171717] tracking-tight leading-[1.06]">
            Excellence in diagnostic medicine
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#70706B] max-w-2xl mx-auto leading-relaxed font-normal pt-1">
            We provide laboratory investigations and advanced medical imaging at a highly innovative level, backed by ISO 15189 accreditation and dual-specialist verification.
          </p>

          {/* Button Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Button
              variant="medical"
              size="lg"
              asChild
              className="rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-sm"
            >
              <Link href="/book-appointment" className="flex items-center gap-2">
                <span>Book online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-8 py-6 text-sm font-semibold border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A]"
            >
              <Link href="/services" className="flex items-center gap-2">
                <span>Explore services</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              asChild
              className="rounded-full px-6 py-6 text-sm text-[#315C4A] hover:bg-[#DDEDE3]/50"
            >
              <Link href="/verify/REP-2026-001" className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#315C4A]" />
                <span>Verify report</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Klaas Panoramic Showcase Image with Rounded Corners */}
        <div className="mt-14 lg:mt-16 relative">
          <div className="relative mx-auto rounded-3xl lg:rounded-[36px] overflow-hidden border border-[#E8E8E3] shadow-xl aspect-[16/9] sm:aspect-[21/9] max-h-[540px] bg-[#DDEDE3]">
            <Image
              src="/images/hero_diagnostics.jpg"
              alt="Apex Diagnostics advanced robotic pathology automation"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Accreditations & Key Metrics on Image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3 bg-[#171717]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#A8D5BA] animate-ping" />
                <span className="text-[#DDEDE3]">ISO 15189 & CAP Accredited Laboratory</span>
              </div>

              <div className="hidden sm:flex items-center gap-6 text-xs text-white/90 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
                  99.98% Accuracy
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A8D5BA]" />
                  Same-Day STAT Results
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Klaas Signature Hero Bottom Page-Links Bar (home-hero-page-links) */}
        <div className="mt-10 lg:mt-12 bg-[#FFFFFF] border border-[#E8E8E3] rounded-2xl sm:rounded-full p-2.5 sm:px-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium text-[#171717]">
            <div className="flex flex-wrap items-center gap-1 sm:gap-6">
              <Link
                href="/services"
                className="px-3 py-1.5 rounded-full hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A] transition-colors"
              >
                Services
              </Link>
              <span className="text-[#E8E8E3] hidden sm:inline">•</span>
              <Link
                href="/tests"
                className="px-3 py-1.5 rounded-full hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A] transition-colors"
              >
                Tests directory
              </Link>
              <span className="text-[#E8E8E3] hidden sm:inline">•</span>
              <Link
                href="/doctors"
                className="px-3 py-1.5 rounded-full hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A] transition-colors"
              >
                The team
              </Link>
              <span className="text-[#E8E8E3] hidden sm:inline">•</span>
              <Link
                href="/branches"
                className="px-3 py-1.5 rounded-full hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A] transition-colors"
              >
                Clinics
              </Link>
              <span className="text-[#E8E8E3] hidden sm:inline">•</span>
              <Link
                href="/gallery"
                className="px-3 py-1.5 rounded-full hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A] transition-colors"
              >
                Gallery
              </Link>
            </div>

            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] text-white hover:bg-[#315C4A] text-xs font-semibold transition-all ml-auto sm:ml-0"
            >
              <span>Book online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
