"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";

export interface DiagnosticTestItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  sampleType: string;
  turnaroundTime: string;
  price: number;
  preparation: string;
}

const FEATURED_INVESTIGATIONS: DiagnosticTestItem[] = [
  {
    id: "test-cbc",
    name: "Complete Blood Count (CBC) with ESR",
    slug: "complete-blood-count-cbc",
    category: "Hematology Lab",
    shortDescription:
      "Automated 5-part differential analysis of RBC, WBC, platelets, hemoglobin, and erythrocyte sedimentation rate.",
    sampleType: "Blood (EDTA)",
    turnaroundTime: "Same Day (< 3h)",
    price: 500,
    preparation: "No fasting required. Hydration recommended.",
  },
  {
    id: "test-lipid",
    name: "Comprehensive Lipid & Cardiac Profile",
    slug: "lipid-profile-complete",
    category: "Biochemistry",
    shortDescription:
      "Evaluates cardiovascular risk assessing Total Cholesterol, HDL, LDL, VLDL, and Triglycerides.",
    sampleType: "Blood (Serum)",
    turnaroundTime: "Same Day (4h)",
    price: 1200,
    preparation: "Strict 10-12 hours overnight fasting mandatory.",
  },
  {
    id: "test-mri-brain",
    name: "3.0T High-Resolution Brain MRI",
    slug: "magnetic-resonance-imaging-mri-brain",
    category: "Advanced Radiology",
    shortDescription:
      "Multi-planar high resolution neuro imaging with silent scan acoustics and AI motion artifact correction.",
    sampleType: "Diagnostic Scan",
    turnaroundTime: "Same Day (4h)",
    price: 8500,
    preparation: "Remove all metallic objects and credit cards.",
  },
  {
    id: "test-echo",
    name: "2D/4D Color Doppler Echocardiogram",
    slug: "echocardiogram-2d-color-doppler",
    category: "Cardiology Suite",
    shortDescription:
      "Real-time evaluation of cardiac chamber dimensions, ejection fraction, and heart valve hemodynamics.",
    sampleType: "Cardiac Scan",
    turnaroundTime: "Immediate",
    price: 3200,
    preparation: "Wear comfortable two-piece clothing.",
  },
];

export function PopularTestsSection() {
  return (
    <section id="tests" className="py-20 lg:py-28 bg-[#171717] border-b border-[#262626] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas Header with Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif font-bold text-[#A8D5BA] w-6 h-6 rounded-full border border-[#A8D5BA]/40 flex items-center justify-center">
                ★
              </span>
              <div className="h-[1px] w-10 bg-[#A8D5BA]/40" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#DDEDE3]/80 font-semibold">
                Featured Investigations
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight font-normal">
              Most requested clinical tests
            </h3>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="medical"
              size="lg"
              asChild
              className="rounded-full px-7 text-xs sm:text-sm font-semibold shrink-0"
            >
              <Link href="/tests" className="flex items-center gap-2">
                <span>All 140+ investigations</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Klaas Listing-2 Cards Grid with Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_INVESTIGATIONS.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link
                href={`/tests/${test.slug}`}
                className="bg-[#222222] border border-[#315C4A]/40 rounded-3xl p-6 hover:border-[#A8D5BA] transition-all duration-300 flex flex-col justify-between group shadow-md h-full"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-mono text-[#A8D5BA] font-semibold mb-2">
                    {test.category}
                  </p>
                  <h4 className="font-serif text-xl text-white group-hover:text-[#A8D5BA] transition-colors leading-snug">
                    {test.name}
                  </h4>
                  <p className="text-xs text-[#DDEDE3]/70 leading-relaxed mt-2.5 line-clamp-3">
                    {test.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="my-5 h-[1px] bg-[#315C4A]/30" />
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#DDEDE3]/60 font-mono mb-1">
                        <Clock className="w-3.5 h-3.5 text-[#A8D5BA]" />
                        <span>{test.turnaroundTime}</span>
                      </div>
                      <span className="text-base font-bold text-[#A8D5BA] font-mono">
                        {formatCurrency(test.price)}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#171717] border border-[#315C4A]/60 flex items-center justify-center text-[#A8D5BA] group-hover:bg-[#315C4A] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
