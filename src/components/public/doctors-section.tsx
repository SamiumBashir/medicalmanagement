"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: string;
  registrationNumber: string;
  availableBranch: string;
  visitingHours: string;
  imageUrl: string;
}

const CONSULTANT_DOCTORS: DoctorProfile[] = [
  {
    id: "dr-farhana",
    name: "Prof. Dr. Farhana Rahman",
    specialization: "Clinical Pathology & Hematology",
    qualification: "MBBS, FCPS (Hematology), FRCPath (UK)",
    experience: "22+ Years",
    registrationNumber: "BMDC Reg: A-28491",
    availableBranch: "Dhanmondi Main Center",
    visitingHours: "Sat - Thu: 9:00 AM – 3:00 PM",
    imageUrl: "/images/doctor_pathologist.jpg",
  },
  {
    id: "dr-tariqul",
    name: "Dr. Tariqul Islam",
    specialization: "Senior Consultant Radiologist",
    qualification: "MBBS, MD (Radiology), Fellow CIRSE",
    experience: "18+ Years",
    registrationNumber: "BMDC Reg: A-34190",
    availableBranch: "Gulshan Executive Suite",
    visitingHours: "Sat - Wed: 4:00 PM – 9:00 PM",
    imageUrl: "/images/hero_diagnostics.jpg",
  },
  {
    id: "dr-sabrina",
    name: "Dr. Sabrina Ahmed",
    specialization: "Non-Invasive Cardiology & ECHO",
    qualification: "MBBS, FCPS (Medicine), MD (Cardio)",
    experience: "15+ Years",
    registrationNumber: "BMDC Reg: A-41829",
    availableBranch: "Uttara Diagnostic Hub",
    visitingHours: "Sun - Thu: 10:00 AM – 4:00 PM",
    imageUrl: "/images/mri_suite.jpg",
  },
];

export function DoctorsSection() {
  return (
    <section id="the-team" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E8E8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas The-Team-2 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The-Team-2-About (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-6 sticky top-28"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
                3
              </span>
              <div className="h-[1px] w-10 bg-[#171717]/30" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
                Medical Faculty
              </span>
            </div>

            <h3 className="font-serif text-4xl sm:text-5xl text-[#171717] tracking-tight font-normal">
              Our specialists & team
            </h3>

            <p className="text-sm text-[#70706B] leading-relaxed">
              We are excellent in clinical diagnostics and consultations for all patients, led by distinguished professors and consultant pathologists.
            </p>

            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button
                  variant="medical"
                  size="lg"
                  asChild
                  className="rounded-full px-7 text-xs sm:text-sm font-semibold shadow-sm"
                >
                  <Link href="/doctors" className="flex items-center gap-2">
                    <span>The team</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Team Cards (8 Cols) with Stagger */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONSULTANT_DOCTORS.map((doctor, idx) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-[#F7F7F3] border border-[#E8E8E3] rounded-[28px] overflow-hidden flex flex-col justify-between group hover:border-[#A8D5BA] transition-all duration-300 shadow-sm"
              >
                {/* Doctor Portrait */}
                <div className="relative aspect-[4/5] bg-[#DDEDE3] overflow-hidden">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#171717]/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono text-white">
                    {doctor.experience}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#315C4A] font-semibold block mb-1">
                      {doctor.specialization}
                    </span>
                    <h4 className="font-serif text-lg text-[#171717] leading-snug group-hover:text-[#315C4A] transition-colors">
                      {doctor.name}
                    </h4>
                    <p className="text-[11px] text-[#70706B] mt-1 font-mono">
                      {doctor.qualification}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E8E3]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#70706B] font-mono mb-3">
                      <Clock className="w-3.5 h-3.5 text-[#315C4A]" />
                      <span className="truncate">{doctor.visitingHours}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full rounded-full text-xs font-medium border-[#E8E8E3] bg-white hover:bg-[#A8D5BA] hover:text-[#171717] hover:border-[#A8D5BA] transition-colors"
                    >
                      <Link href={`/book-appointment?doctor=${doctor.id}`} className="flex items-center justify-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book visit</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
