"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export interface BranchInfo {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  tag: string;
}

const CLINICAL_BRANCHES: BranchInfo[] = [
  {
    id: "branch-dhanmondi",
    name: "Dhanmondi Flagship Campus",
    slug: "dhanmondi-main-branch",
    city: "Dhaka Central",
    address: "House 42, Road 7, Dhanmondi R/A, Dhaka-1205",
    phone: "+880 2 9660000",
    hours: "Open 24/7 (Emergency Labs & 3.0T MRI)",
    tag: "Main Complex",
  },
  {
    id: "branch-gulshan",
    name: "Gulshan Executive Suite",
    slug: "gulshan-branch",
    city: "Dhaka North",
    address: "Plot 18, Road 113, Gulshan-2, Dhaka-1212",
    phone: "+880 2 8830000",
    hours: "7:00 AM – 11:00 PM (Daily)",
    tag: "Executive MRI",
  },
  {
    id: "branch-uttara",
    name: "Uttara Diagnostic Center",
    slug: "uttara-branch",
    city: "Dhaka Suburb",
    address: "Sector 3, Rabindra Sarani, Uttara, Dhaka-1230",
    phone: "+880 2 8950000",
    hours: "7:00 AM – 10:00 PM (Daily)",
    tag: "Rapid Collection",
  },
];

export function BranchesSection() {
  return (
    <section id="branches" className="py-20 lg:py-28 bg-[#F7F7F3] border-b border-[#E8E8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas Numbering Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-14"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
              4
            </span>
            <div className="h-[1px] w-10 bg-[#171717]/30" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
              Clinics & Locations
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight font-normal">
            State-of-the-art diagnostic centers
          </h2>
        </motion.div>

        {/* Klaas Clinic Cards Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CLINICAL_BRANCHES.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 flex flex-col justify-between hover:border-[#A8D5BA] transition-all duration-300 shadow-sm group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#315C4A] bg-[#DDEDE3] px-3 py-1 rounded-full font-semibold">
                    {branch.tag}
                  </span>
                  <span className="text-xs text-[#70706B] font-mono">{branch.city}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#171717] group-hover:text-[#315C4A] transition-colors leading-snug">
                  {branch.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#70706B] leading-relaxed flex items-start gap-2 pt-2">
                  <MapPin className="w-4 h-4 text-[#315C4A] shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E8E3] space-y-4">
                <div className="space-y-1.5 text-xs text-[#70706B] font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#315C4A]" />
                    <span className="text-[#171717] font-semibold">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#315C4A]" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full rounded-full border-[#E8E8E3] bg-[#F7F7F3] hover:bg-[#A8D5BA] hover:text-[#171717] hover:border-[#A8D5BA] text-xs font-semibold py-5 transition-colors"
                >
                  <Link href={`/branches/${branch.slug}`} className="flex items-center justify-center gap-2">
                    <span>View clinic details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
