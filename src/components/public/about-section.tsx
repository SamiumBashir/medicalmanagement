"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Users2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F7F7F3] border-b border-[#E8E8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Klaas Numbering Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
              2
            </span>
            <div className="h-[1px] w-10 bg-[#171717]/30" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
              About us
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight font-normal">
            Precision diagnostics founded on trust
          </h2>
        </motion.div>

        {/* Klaas 3 Icon Blocks (med-grid-3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: HeartHandshake,
              title: "Precision",
              desc: "We are passionate about clinical accuracy, dual verification, and zero manual diagnostic errors.",
            },
            {
              icon: Users2,
              title: "Specialists",
              desc: "Board-certified senior consultant pathologists, radiologists, and clinical microbiologists.",
            },
            {
              icon: Award,
              title: "Experience",
              desc: "High-quality, affordable, and ISO 15189 accredited clinical diagnostic care for over two decades.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -5 }}
                className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl p-8 space-y-4 shadow-sm hover:border-[#A8D5BA] transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-2xl bg-[#DDEDE3] text-[#315C4A] flex items-center justify-center"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h4 className="font-serif text-2xl text-[#171717]">{item.title}</h4>
                <p className="text-xs sm:text-sm text-[#70706B] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Klaas Asymmetric Bento Grid (content-grid-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Block 1: Experience Headline (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#315C4A] font-semibold">
                <div className="h-[1px] w-6 bg-[#315C4A]" />
                <span>Know-how</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] tracking-tight leading-snug">
                <span className="opacity-50">We have over </span>20 years
                <span className="opacity-50"> of diagnostic excellence</span>
              </h3>
            </div>
            <p className="text-sm text-[#70706B] leading-relaxed pt-8">
              Founded with an uncompromising commitment to medical integrity, our central laboratory pairs robotic automation with distinguished medical pathologists to deliver verifiable patient reports.
            </p>
          </motion.div>

          {/* Block 2: Image 1 (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative rounded-[32px] overflow-hidden aspect-[16/10] bg-[#DDEDE3] border border-[#E8E8E3] shadow-sm group"
          >
            <Image
              src="/images/mri_suite.jpg"
              alt="Apex Diagnostics 3.0T MRI Diagnostic Suite"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Block 3: Image 2 (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 relative rounded-[32px] overflow-hidden aspect-[4/3] lg:aspect-auto bg-[#DDEDE3] border border-[#E8E8E3] shadow-sm min-h-[260px] group"
          >
            <Image
              src="/images/doctor_pathologist.jpg"
              alt="Doctor verifying lab report"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Block 4: Clinics & Team CTA (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-4 bg-[#DDEDE3] border border-[#A8D5BA]/50 rounded-[32px] p-8 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#315C4A] font-semibold">
                <div className="h-[1px] w-6 bg-[#315C4A]" />
                <span>Clinics</span>
              </div>
              <p className="text-sm font-semibold text-[#171717]">
                We specialize in helping patients with fast, accurate testing and clear clinical insights.
              </p>
              <p className="text-xs text-[#70706B] leading-relaxed">
                Reliable diagnostics are the foundation of effective healthcare. Our experienced team of specialists will guide you every step of the way.
              </p>
            </div>

            <div className="pt-6">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="rounded-full bg-[#171717] hover:bg-[#315C4A] text-white text-xs font-semibold px-6 shadow-sm"
                >
                  <Link href="/doctors" className="flex items-center gap-2">
                    <span>The team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Block 5: Vertical 3-Stats Metric (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 flex flex-col justify-around shadow-sm divide-y divide-[#E8E8E3]"
          >
            <div className="pb-4">
              <p className="font-serif text-4xl lg:text-5xl text-[#171717] font-normal">50+</p>
              <p className="text-xs font-semibold text-[#171717] mt-1">expert doctors & pathologists</p>
              <p className="text-[11px] font-mono text-[#70706B] uppercase tracking-wider mt-0.5">Team</p>
            </div>

            <div className="py-4">
              <p className="font-serif text-4xl lg:text-5xl text-[#171717] font-normal">3+</p>
              <p className="text-xs font-semibold text-[#171717] mt-1">flagship diagnostic centers</p>
              <p className="text-[11px] font-mono text-[#70706B] uppercase tracking-wider mt-0.5">Clinics</p>
            </div>

            <div className="pt-4">
              <p className="font-serif text-4xl lg:text-5xl text-[#171717] font-normal">500K+</p>
              <p className="text-xs font-semibold text-[#171717] mt-1">accurate reports verified</p>
              <p className="text-[11px] font-mono text-[#70706B] uppercase tracking-wider mt-0.5">Patients</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
