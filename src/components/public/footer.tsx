"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Activity, Mail, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const pathname = usePathname();

  // Do not render public footer on internal app, portal, or auth pages
  const isExcluded =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/patient") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  if (isExcluded) return null;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#171717] text-[#A3A39E] border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded-full bg-[#315C4A] text-white flex items-center justify-center shrink-0 shadow-sm"
            >
              <Activity className="w-4.5 h-4.5" />
            </motion.div>
            <div>
              <span className="font-serif text-lg text-white tracking-tight block">
                Apex Diagnostics
              </span>
              <span className="text-xs text-[#8A8A85] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8D5BA]" />
                ISO 15189:2022 Certified Medical Center
              </span>
            </div>
          </div>

          {/* Details & Copyright */}
          <div className="flex flex-col md:items-end gap-1.5 text-xs text-[#73736E] text-center md:text-right">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5">
              <span className="flex items-center gap-1.5 hover:text-[#DDEDE3] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-[#8A8A85]" />
                House 42, Road 11, Banani, Dhaka
              </span>
              <span className="hidden sm:inline text-[#333333]">|</span>
              <a
                href="mailto:info@apexdiagnostics.com.bd"
                className="flex items-center gap-1.5 hover:text-[#A8D5BA] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8A8A85]" />
                info@apexdiagnostics.com.bd
              </a>
            </div>
            <p className="text-[11px] text-[#5A5A55]">
              © {new Date().getFullYear()} Apex Diagnostics Center. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
