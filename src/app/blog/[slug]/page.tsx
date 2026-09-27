import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_ARTICLES } from "@/lib/services/mockData";
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Article Not Found | Apex Diagnostics" };
  }
  return {
    title: `${article.title} | Apex Diagnostics Clinical Journal`,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <Link href="/blog" className="hover:underline text-[#DDEDE3]">Health Journal</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#DDEDE3] border-t border-[#262626] pt-6">
            <div>
              <span className="block font-semibold text-white">{article.author}</span>
              <span className="text-xs text-[#70706B]">{article.authorTitle}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#DDEDE3]/80 ml-auto">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#A8D5BA]" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#A8D5BA]" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reading Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative h-[420px] w-full rounded-3xl overflow-hidden border border-[#E8E8E3] shadow-md mb-12 bg-[#DDEDE3]">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#E8E8E3] shadow-sm max-w-none">
          <p className="text-xl text-[#171717] font-medium leading-relaxed mb-8 border-l-4 border-[#315C4A] pl-4 italic">
            &ldquo;{article.excerpt}&rdquo;
          </p>

          <h2 className="text-2xl font-bold text-[#171717] mt-8 mb-4">
            Understanding Biomarkers and Biological Variations
          </h2>
          <p className="text-[#70706B] leading-relaxed mb-6">
            When clinicians evaluate laboratory findings, standard static boundaries are only the baseline. Diagnostic accuracy demands correlating clinical history, family predilections, and acute metabolic states. Modern automated immunoassay platforms allow sub-picogram sensitivity, enabling early recognition of metabolic perturbations long before symptomatic manifestations appear.
          </p>

          <h2 className="text-2xl font-bold text-[#171717] mt-8 mb-4">
            The Role of Laboratory Calibration and Quality Assurance
          </h2>
          <p className="text-[#70706B] leading-relaxed mb-6">
            Without strict daily external quality assurance, automated diagnostic machines can experience calibration drift. At Apex Diagnostics, our clinical biochemists and hematology technologists run dual controls every 6 hours, adhering strictly to Westgard multi-rule algorithms before patient samples are released for pathologist verification.
          </p>

          <div className="my-10 bg-[#DDEDE3] border border-[#A8D5BA]/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-[#315C4A] mb-2">Key Clinical Takeaway</h3>
            <p className="text-[#171717] text-sm leading-relaxed mb-0">
              Never self-interpret borderline diagnostic indicators without contextual physician consultation. A slightly elevated biomarker may reflect transient physiological adaptation rather than pathology.
            </p>
          </div>

          <div className="border-t border-[#E8E8E3] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button asChild variant="outline" size="sm" className="gap-2 border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Link>
            </Button>
            <Button asChild variant="medical" size="sm">
              <Link href="/book-test">Book Recommended Health Screening</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
