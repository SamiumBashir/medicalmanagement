"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  Activity,
  HeartPulse,
  Scan,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function ServicesSection() {
  const cardMotionProps = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: "easeOut" as const },
    whileHover: { y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F7F7F3] border-b border-[#E8E8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas Numbering Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
            1
          </span>
          <div className="h-[1px] w-10 bg-[#171717]/30" />
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
            Treatments & Services
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-center text-[#171717] tracking-tight max-w-3xl mx-auto mb-16 font-normal"
        >
          Specialized diagnostic disciplines
        </motion.h2>

        {/* Klaas Categories-2 Flex Stack */}
        <div className="space-y-10 lg:space-y-14">
          {/* Card 1: Soft Green #DDEDE3 Background */}
          <motion.div
            {...cardMotionProps}
            className="rounded-[32px] lg:rounded-[40px] bg-[#DDEDE3] border border-[#A8D5BA]/40 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image Block (5 cols) */}
              <div className="lg:col-span-5 relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-[#E8E8E3] shadow-inner">
                <Image
                  src="/images/hero_diagnostics.jpg"
                  alt="Clinical pathology automated laboratory"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Block (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#315C4A] font-semibold">
                    Core Laboratory Discipline
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] tracking-tight">
                    Clinical Pathology & Molecular Lab
                  </h3>
                  <p className="text-sm sm:text-base text-[#70706B] leading-relaxed">
                    We specialize in fully automated barcoded hematology, immunochemistry, serology, and molecular diagnostics with zero manual handling errors.
                  </p>
                </div>

                {/* Nested Links 2x2 Grid */}
                <div className="pt-2 border-t border-[#315C4A]/15 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-medium text-[#171717]">
                  <Link
                    href="/tests/complete-blood-count-cbc"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <FlaskConical className="w-3.5 h-3.5" />
                    </div>
                    <span>Complete Blood Count (CBC)</span>
                  </Link>

                  <Link
                    href="/tests/comprehensive-metabolic-panel-cmp"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span>HbA1c & Glycemic Panel</span>
                  </Link>

                  <Link
                    href="/tests/lipid-profile-complete"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <HeartPulse className="w-3.5 h-3.5" />
                    </div>
                    <span>Lipid & Cardiac Markers</span>
                  </Link>

                  <Link
                    href="/tests/thyroid-profile-tsh-ft3-ft4"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>Thyroid & Hormonal Assays</span>
                  </Link>
                </div>

                {/* Klaas Category Pill Button */}
                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button
                      variant="medical"
                      size="lg"
                      asChild
                      className="rounded-full px-7 text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      <Link href="/services" className="flex items-center gap-2">
                        <span>Explore Pathology Services</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Pure White #FFFFFF Background */}
          <motion.div
            {...cardMotionProps}
            className="rounded-[32px] lg:rounded-[40px] bg-[#FFFFFF] border border-[#E8E8E3] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Block (7 cols) */}
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#315C4A] font-semibold">
                    Advanced High-Field Imaging
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] tracking-tight">
                    High-Resolution MRI & Diagnostic Radiology
                  </h3>
                  <p className="text-sm sm:text-base text-[#70706B] leading-relaxed">
                    Ultra-high resolution magnetic resonance with AI motion correction, 128-slice sub-millimeter CT, and high-definition 4D ultrasound sonography.
                  </p>
                </div>

                {/* Nested Links 2x2 Grid */}
                <div className="pt-2 border-t border-[#E8E8E3] grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-medium text-[#171717]">
                  <Link
                    href="/tests/magnetic-resonance-imaging-mri-brain"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#DDEDE3] flex items-center justify-center text-[#315C4A] shrink-0">
                      <Scan className="w-3.5 h-3.5" />
                    </div>
                    <span>3.0T Brain & Spine MRI</span>
                  </Link>

                  <Link
                    href="/tests/ct-scan-chest-high-resolution"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#DDEDE3] flex items-center justify-center text-[#315C4A] shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span>128-Slice Low-Dose CT</span>
                  </Link>

                  <Link
                    href="/tests/ultrasonography-whole-abdomen"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#DDEDE3] flex items-center justify-center text-[#315C4A] shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span>4D Color Doppler Ultrasound</span>
                  </Link>

                  <Link
                    href="/tests/digital-x-ray-chest-pa"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#DDEDE3] flex items-center justify-center text-[#315C4A] shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>Digital High-Contrast X-Ray</span>
                  </Link>
                </div>

                {/* Klaas Category Pill Button */}
                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="rounded-full px-7 text-xs sm:text-sm font-semibold border-[#E8E8E3] hover:bg-[#DDEDE3] text-[#171717] hover:text-[#315C4A]"
                    >
                      <Link href="/services" className="flex items-center gap-2">
                        <span>Explore Imaging Services</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Image Block (5 cols) */}
              <div className="lg:col-span-5 relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] bg-[#DDEDE3] border border-[#E8E8E3] shadow-inner order-1 lg:order-2">
                <Image
                  src="/images/mri_suite.jpg"
                  alt="Apex Diagnostics 3.0 Tesla MRI suite"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Off-White #F7F7F3 Card with Soft Green Touches */}
          <motion.div
            {...cardMotionProps}
            className="rounded-[32px] lg:rounded-[40px] bg-[#FFFFFF] border border-[#E8E8E3] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image Block (5 cols) */}
              <div className="lg:col-span-5 relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] bg-[#DDEDE3] border border-[#E8E8E3] shadow-inner">
                <Image
                  src="/images/doctor_pathologist.jpg"
                  alt="Specialist clinical review and consultation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Block (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#315C4A] font-semibold">
                    Physiological & Cardiology Lab
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] tracking-tight">
                    Cardiovascular & Neurodiagnostics
                  </h3>
                  <p className="text-sm sm:text-base text-[#70706B] leading-relaxed">
                    Comprehensive non-invasive physiological testing for heart rhythm, brain electrical activity, and coronary function with certified cardiologists.
                  </p>
                </div>

                {/* Nested Links 2x2 Grid */}
                <div className="pt-2 border-t border-[#E8E8E3] grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-medium text-[#171717]">
                  <Link
                    href="/tests/echocardiogram-2d-color-doppler"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <HeartPulse className="w-3.5 h-3.5" />
                    </div>
                    <span>2D/4D Color Doppler Echo</span>
                  </Link>

                  <Link
                    href="/tests/electrocardiogram-12-lead-ecg"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span>12-Lead Computerized ECG</span>
                  </Link>

                  <Link
                    href="/tests/exercise-tolerance-test-ett"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>Exercise Tolerance Test (ETT)</span>
                  </Link>

                  <Link
                    href="/tests/eeg-electroencephalogram"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F7F7F3] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717] shrink-0">
                      <Scan className="w-3.5 h-3.5" />
                    </div>
                    <span>Digital Video EEG Suite</span>
                  </Link>
                </div>

                {/* Klaas Category Pill Button */}
                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button
                      variant="medical"
                      size="lg"
                      asChild
                      className="rounded-full px-7 text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      <Link href="/services" className="flex items-center gap-2">
                        <span>Explore Cardiac & Neuro</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
