import * as React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ArticlePreview {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
}

const HEALTH_ARTICLES: ArticlePreview[] = [
  {
    id: "art-fasting",
    slug: "how-to-prepare-for-fasting-blood-tests",
    title: "How to prepare for fasting blood tests: Expert guidance",
    category: "Patient Guide",
    description:
      "Essential pre-analytical rules for glucose, lipid profile, and hormone investigations to avoid invalid clinical metrics.",
    author: "Prof. Dr. Farhana Rahman",
    date: "Sep 28, 2026",
    readTime: "4 min read",
  },
  {
    id: "art-mri",
    slug: "understanding-3t-mri-vs-1-5t-scanners",
    title: "Understanding 3.0T MRI vs 1.5T scanners: What patients should know",
    category: "Radiology Insights",
    description:
      "A clinical breakdown of signal-to-noise ratio, scan duration, and micro-structure imaging in neurological disorders.",
    author: "Dr. Tariqul Islam",
    date: "Sep 25, 2026",
    readTime: "6 min read",
  },
  {
    id: "art-cardiac",
    slug: "preventive-cardiac-screening-markers",
    title: "Key diagnostic biomarkers for early coronary artery disease",
    category: "Cardiology",
    description:
      "From high-sensitivity troponin to lipid sub-fractions: identifying asymptomatic risk before cardiac events happen.",
    author: "Dr. Sabrina Ahmed",
    date: "Sep 20, 2026",
    readTime: "5 min read",
  },
];

export function BlogPreviewSection() {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-[#F7F7F3] border-b border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaas Numbering Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
                5
              </span>
              <div className="h-[1px] w-10 bg-[#171717]/30" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
                Journal & Articles
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] tracking-tight font-normal">
              Clinical knowledge & patient guides
            </h3>
          </div>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full px-7 text-xs sm:text-sm font-semibold border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A]"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <span>All articles</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Klaas Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HEALTH_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 flex flex-col justify-between hover:border-[#A8D5BA] transition-all duration-300 shadow-sm group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase text-[#315C4A] bg-[#DDEDE3] px-2.5 py-1 rounded-full text-[10px] font-semibold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#70706B] font-mono text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-[#171717] group-hover:text-[#315C4A] transition-colors leading-snug pt-2">
                  {article.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#70706B] leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E8E3] flex items-center justify-between text-xs">
                <div>
                  <p className="text-[11px] font-semibold text-[#171717]">{article.author}</p>
                  <p className="text-[10px] text-[#70706B] font-mono">{article.date}</p>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#F7F7F3] border border-[#E8E8E3] group-hover:bg-[#A8D5BA] group-hover:border-[#A8D5BA] group-hover:text-[#171717] text-[#171717] flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
