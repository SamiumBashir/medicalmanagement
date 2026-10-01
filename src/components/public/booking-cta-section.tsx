"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { gsap } from "gsap";

export function BookingCTASection() {
  const pillRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (pillRef.current) {
        gsap.to(pillRef.current, {
          y: -6,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E8E8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas CTA-Section-3 Split Layout with Motion entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-[36px] lg:rounded-[48px] bg-[#DDEDE3] border border-[#A8D5BA]/50 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#315C4A] font-semibold">
                  Fast Digital Scheduling
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#171717] tracking-tight leading-tight font-normal">
                  Book online
                </h3>
                <p className="text-sm sm:text-base text-[#70706B] leading-relaxed max-w-lg">
                  To book an appointment or schedule home sample collection straight away, you can use our encrypted online booking system.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="medical"
                    size="lg"
                    asChild
                    className="rounded-full px-8 py-6 text-sm font-semibold shadow-sm"
                  >
                    <Link href="/book-appointment" className="flex items-center gap-2">
                      <span>Doctor appointment</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="rounded-full px-8 py-6 text-sm font-semibold border-[#315C4A]/30 bg-white text-[#171717] hover:bg-[#315C4A] hover:text-white transition-colors"
                  >
                    <Link href="/book-test" className="flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-[#315C4A]" />
                      <span>Order lab tests</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Guarantees */}
              <div className="pt-6 border-t border-[#315C4A]/20 grid grid-cols-2 gap-4 text-xs text-[#171717]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4A] shrink-0" />
                  <span className="font-medium">No waiting room queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#315C4A] shrink-0" />
                  <span className="font-medium">Confidential digital reports</span>
                </div>
              </div>
            </div>

            {/* Right Image Block (6 Cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-[#E8E8E3] shadow-md group">
                <Image
                  src="/images/doctor_pathologist.jpg"
                  alt="Apex Diagnostics medical consultation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Hotline Pill with GSAP Floating Effect */}
                <div
                  ref={pillRef}
                  className="absolute bottom-6 left-6 right-6 bg-[#FFFFFF]/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#E8E8E3] flex items-center justify-between text-xs shadow-lg"
                >
                  <div>
                    <p className="text-[10px] font-mono uppercase text-[#70706B]">Need Immediate Assistance?</p>
                    <p className="text-sm font-bold text-[#171717] font-mono">+880 9610-000000</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase text-[#315C4A] bg-[#DDEDE3] px-2.5 py-1 rounded-full">
                    24/7 STAT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
