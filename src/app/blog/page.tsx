import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MOCK_ARTICLES } from "@/lib/services/mockData";
import { ChevronRight, Clock, Calendar, ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Clinical Diagnostic Articles & Health Insights | Apex Diagnostics",
  description: "Educational articles authored by our senior pathologists and radiologists on preventive testing and clinical biomarker interpretations.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>Health Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Diagnostic Health Journal & Patient Insights
          </h1>
          <p className="text-base sm:text-lg text-[#DDEDE3]/85 max-w-2xl leading-relaxed">
            Evidence-based medical education, preventive health protocols, and lab result interpretation written by certified clinicians.
          </p>
        </div>
      </section>

      {/* Articles Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 borders */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ARTICLES.map((art) => (
            <article
              key={art.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#A8D5BA] transition-all duration-300"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#DDEDE3]">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#171717]/80 backdrop-blur-md text-[#DDEDE3] text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider border border-[#315C4A]">
                    {art.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs text-[#70706B] font-mono mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#315C4A]" />
                      {art.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#315C4A]" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#315C4A] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-sm text-[#70706B] leading-relaxed mb-6 font-normal line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0 border-t border-[#E8E8E3] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#171717] block">{art.author}</span>
                  <span className="text-[11px] text-[#70706B]">{art.authorTitle}</span>
                </div>

                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-[#315C4A] hover:text-[#171717]"
                >
                  Read
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
