import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Clinical Facilities & Laboratory Gallery | Apex Diagnostics",
  description: "Take a visual tour through our diagnostic facilities, advanced imaging systems, and automated testing suites.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Diagnostic Facilities & Technology
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            State-of-the-art imaging equipment, high-throughput robotic analyzers, and modern patient spaces.
          </p>
        </div>
      </section>

      <GalleryClient />
    </div>
  );
}
