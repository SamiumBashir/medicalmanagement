import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MOCK_CATEGORIES } from "@/lib/services/mockData";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Clinical Diagnostic Services & Modalities | Apex Diagnostics",
  description: "Explore our specialized diagnostic departments including Pathology, Radiology, Ultrasonography, Cardiology, and Molecular Biomarkers.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Editorial Page Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Clinical Services</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white mb-6">
              Precision Diagnostic Departments & Imaging Suites
            </h1>
            <p className="text-lg text-[#DDEDE3]/85 leading-relaxed font-light">
              Engineered with world-standard automated analyzers, low-dose digital imaging, and board-certified clinical leadership to empower critical healthcare decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 Borders */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#FFFFFF] rounded-[28px] border border-[#E8E8E3] shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#A8D5BA]"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#DDEDE3]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold bg-[#315C4A]/80 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider text-[#DDEDE3]">
                    {cat.testCount}+ Active Tests
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#315C4A] transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#70706B] leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E8E3] flex items-center justify-between">
                  <Link
                    href={`/tests?category=${cat.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#315C4A] hover:text-[#171717] group-hover:translate-x-1 transition-all uppercase tracking-wider"
                  >
                    View Directory Tests
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance Banner: Deep Charcoal #171717 */}
        <div className="mt-20 bg-[#171717] text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#262626]">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8D5BA] font-semibold mb-2 block">
              International Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight mb-4 text-white">
              CAP & ISO 15189 Quality Calibrated Laboratories
            </h2>
            <p className="text-[#DDEDE3]/85 text-sm sm:text-base leading-relaxed mb-6">
              Our pathology facilities participate in rigorous international external quality assurance programs (EQAS) ensuring error-free standard deviations across hematology, biochemistry, and hormone assays.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="medical">
                <Link href="/book-test">Request Test Collection</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#315C4A] bg-[#222222] text-[#DDEDE3] hover:bg-[#DDEDE3] hover:text-[#171717]">
                <Link href="/contact">Speak with Lab Director</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
