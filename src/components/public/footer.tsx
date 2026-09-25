"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#70706B] border-t border-[#262626]">
      {/* Top Banner / Accreditation Ribbon: Deep Charcoal #171717 with #262626 border */}
      <div className="border-b border-[#262626] bg-[#121212] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDEDE3]/10 border border-[#A8D5BA]/30 flex items-center justify-center text-[#A8D5BA]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#FFFFFF] text-sm font-semibold">ISO 15189:2022 Certified</p>
                <p className="text-xs text-[#70706B]">International Quality & Clinical Competence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDEDE3]/10 border border-[#A8D5BA]/30 flex items-center justify-center text-[#A8D5BA]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#FFFFFF] text-sm font-semibold">CAP Standards Compliant</p>
                <p className="text-xs text-[#70706B]">Automated Roche & Sysmex Workflows</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDEDE3]/10 border border-[#A8D5BA]/30 flex items-center justify-center text-[#A8D5BA]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#FFFFFF] text-sm font-semibold">BMDC Recognized Faculty</p>
                <p className="text-xs text-[#70706B]">Dual Doctor Verification System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] shadow-md">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#FFFFFF]">
                Apex Diagnostics
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#DDEDE3]/80 max-w-sm">
              Providing precision medical laboratory testing, advanced 3.0T MRI, 128-slice CT scans, and comprehensive preventive health checkups with hospital-grade clinical excellence.
            </p>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex items-center gap-2.5 text-[#DDEDE3]">
                <Phone className="w-4 h-4 text-[#A8D5BA]" />
                <span className="font-medium">Emergency Hotline: 10678 / +880 2 9660000</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#DDEDE3]">
                <Mail className="w-4 h-4 text-[#A8D5BA]" />
                <span>support@apexdiagnostics.com.bd</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#DDEDE3]">
                <Clock className="w-4 h-4 text-[#A8D5BA]" />
                <span>Diagnostic Center: 7:00 AM – 11:00 PM (Emergency 24/7)</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Services (Multi-page links) */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider mb-4">
              Clinical Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  Pathology & Biochemistry
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  3.0T Silent MRI Imaging
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  128-Slice Cardiac CT Scan
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  4D Color Doppler Ultrasound
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  Cardiology & 2D/4D Echo
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#A8D5BA] transition-colors">
                  Preventive Health Checkups
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Quick Links (Multi-page links) */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider mb-4">
              Patient Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tests" className="hover:text-[#A8D5BA] transition-colors">
                  Browse Tests & Pricing
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="hover:text-[#A8D5BA] transition-colors">
                  Book Doctor Consultation
                </Link>
              </li>
              <li>
                <Link href="/book-test" className="hover:text-[#A8D5BA] transition-colors">
                  Book Home Specimen Pickup
                </Link>
              </li>
              <li>
                <Link href="/verify/REP-2026-001" className="hover:text-[#A8D5BA] transition-colors">
                  Verify Report Online (QR)
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#A8D5BA] hover:text-[#FFFFFF] font-medium transition-colors">
                  Portal Sign In (Staff & Patient) →
                </Link>
              </li>
              <li>
                <Link href="/patient/dashboard" className="hover:text-[#A8D5BA] transition-colors">
                  Patient Records Dashboard
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-[#A8D5BA] transition-colors">
                  Specialist Doctors Faculty
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-[#A8D5BA] transition-colors">
                  Locate Diagnostic Branches
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Articles */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] uppercase tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link href="/about" className="hover:text-[#A8D5BA] transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#A8D5BA] transition-colors">
                  Facilities & Lab Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#A8D5BA] transition-colors">
                  Health & Diagnostic Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#A8D5BA] transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>

            <div className="pt-2 border-t border-[#262626]">
              <p className="text-xs text-[#DDEDE3]/80 mb-2">Subscribe to Health Bulletin</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-[#222222] border-[#315C4A]/40 text-white placeholder:text-[#70706B] h-9 text-xs rounded-lg focus:border-[#A8D5BA]"
                />
                <Button
                  size="sm"
                  variant="medical"
                  className="h-9 px-3 shrink-0 rounded-lg"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer */}
        <div className="mt-14 pt-8 border-t border-[#262626] text-xs text-[#70706B] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} Apex Diagnostics Ltd. All rights reserved. Registered under DGHS Bangladesh.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#A8D5BA] transition-colors">
              Privacy & Compliance
            </Link>
            <Link href="/about" className="hover:text-[#A8D5BA] transition-colors">
              Terms of Medical Service
            </Link>
            <Link href="/contact" className="hover:text-[#A8D5BA] transition-colors">
              Patient Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
