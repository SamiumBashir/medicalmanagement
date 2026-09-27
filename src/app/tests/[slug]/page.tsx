import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_TESTS, MockTest } from "@/lib/services/mockData";
import {
  ChevronRight,
  Clock,
  Droplets,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = MOCK_TESTS.find((t) => t.slug === slug);
  if (!test) {
    return { title: "Test Not Found | Apex Diagnostics" };
  }
  return {
    title: `${test.name} (${test.code}) - Diagnostic Price & Preparation | Apex Diagnostics`,
    description: `${test.description} Price: ৳${test.price}. Turnaround: ${test.turnaroundTime}. Specimen: ${test.sampleType}.`,
  };
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const test = MOCK_TESTS.find((t) => t.slug === slug);

  if (!test) {
    notFound();
  }

  const relatedTests = MOCK_TESTS.filter(
    (t) => t.categorySlug === test.categorySlug && t.id !== test.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F7F3] pb-20">
      {/* Header: Deep Charcoal #171717 */}
      <section className="bg-[#171717] text-white pt-24 pb-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#A8D5BA] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:underline text-[#DDEDE3]">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <Link href="/tests" className="hover:underline text-[#DDEDE3]">Tests</Link>
            <ChevronRight className="w-3 h-3 text-[#70706B]" />
            <span>{test.code}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#DDEDE3]/20 border border-[#A8D5BA]/40 text-[#A8D5BA] text-xs font-mono rounded-full mb-3 uppercase tracking-wider">
                {test.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                {test.name}
              </h1>
              <p className="text-[#DDEDE3]/85 text-base sm:text-lg leading-relaxed">
                {test.description}
              </p>
            </div>

            {/* Quick Pricing Card */}
            <div className="bg-[#222222] border border-[#315C4A]/50 p-6 rounded-2xl flex flex-col items-start sm:items-end justify-between min-w-[280px]">
              <span className="text-xs uppercase font-mono tracking-widest text-[#A8D5BA] mb-1">
                Investigation Fee
              </span>
              <div className="text-3xl font-extrabold text-white font-mono mb-4">
                ৳{test.price.toLocaleString()}
              </div>
              <Button asChild variant="medical" className="w-full">
                <Link href={`/book-test?selected=${test.id}`}>Book Investigation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specimen Guidelines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Specimen & Turnaround Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-[#DDEDE3] rounded-xl text-[#315C4A]">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-mono text-[#70706B] block">Specimen Matrix</span>
                  <span className="text-base font-semibold text-[#171717]">{test.sampleType}</span>
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E8E3] flex items-start gap-4 shadow-sm">
                <div className="p-3 bg-[#DDEDE3] rounded-xl text-[#315C4A]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-mono text-[#70706B] block">Reporting SLA</span>
                  <span className="text-base font-semibold text-[#171717]">{test.turnaroundTime}</span>
                </div>
              </div>
            </div>

            {/* Preparation Instructions */}
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E8E8E3] shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-[#171717] font-semibold text-lg">
                <AlertCircle className="w-5 h-5 text-[#315C4A]" />
                <h2>Patient Preparation Guidelines</h2>
              </div>
              <p className="text-[#171717] leading-relaxed bg-[#DDEDE3]/50 p-4 rounded-xl border border-[#A8D5BA]/50 text-sm">
                {test.preparationInstructions}
              </p>
            </div>

            {/* Dynamic Parameters & Biological Reference Intervals */}
            {test.parameters && test.parameters.length > 0 && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E8E8E3] shadow-sm">
                <h2 className="text-xl font-bold text-[#171717] mb-2">
                  Parameters Measured & Reference Intervals
                </h2>
                <p className="text-xs text-[#70706B] mb-6 font-mono">
                  Standardized bio-reference intervals calibrated according to CLSI guidelines.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E8E3] text-xs font-mono uppercase text-[#70706B]">
                        <th className="py-3 px-4">Parameter Component</th>
                        <th className="py-3 px-4">Metric Unit</th>
                        <th className="py-3 px-4">Standard Biological Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8E3]">
                      {test.parameters.map((param, idx) => (
                        <tr key={idx} className="hover:bg-[#DDEDE3]/30">
                          <td className="py-3 px-4 font-semibold text-[#171717]">{param.name}</td>
                          <td className="py-3 px-4 font-mono text-[#70706B]">{param.unit}</td>
                          <td className="py-3 px-4 text-[#171717]">
                            {param.referenceRanges && param.referenceRanges.length > 0 ? (
                              param.referenceRanges.map((r, ri) => (
                                <span key={ri} className="inline-block mr-3 text-xs font-mono bg-[#DDEDE3] text-[#315C4A] px-2 py-0.5 rounded">
                                  {r.gender !== "BOTH" && `${r.gender}: `}
                                  {r.low !== undefined && r.high !== undefined
                                    ? `${r.low} – ${r.high}`
                                    : r.textRange || "Normal Range"}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-[#70706B]">Descriptive Pathological Finding</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FAQs */}
            {test.frequentlyAskedQuestions && test.frequentlyAskedQuestions.length > 0 && (
              <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E8E8E3] shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-[#171717] font-bold text-xl">
                  <HelpCircle className="w-5 h-5 text-[#315C4A]" />
                  <h2>Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                  {test.frequentlyAskedQuestions.map((faq, idx) => (
                    <div key={idx} className="border-b border-[#E8E8E3] pb-4">
                      <h3 className="font-semibold text-[#171717] text-base mb-1">{faq.question}</h3>
                      <p className="text-sm text-[#70706B] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-sm sticky top-24">
              <span className="text-xs font-mono uppercase text-[#315C4A] font-bold tracking-wider block mb-2">
                Fast-Track Booking
              </span>
              <h3 className="text-xl font-bold text-[#171717] mb-4">Book Diagnostic Test</h3>

              <div className="space-y-3 mb-6 text-sm text-[#70706B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4A]" />
                  <span>Certified Digital Report with QR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4A]" />
                  <span>Available at all 4 branch centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#315C4A]" />
                  <span>Home Phlebotomy sample collection</span>
                </div>
              </div>

              <div className="border-t border-[#E8E8E3] pt-4 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[#70706B] text-sm">Package Cost</span>
                  <span className="text-2xl font-bold font-mono text-[#171717]">৳{test.price.toLocaleString()}</span>
                </div>
                <span className="text-xs text-[#315C4A] font-medium">Includes sample tube & pathologist review</span>
              </div>

              <Button asChild variant="medical" className="w-full py-6">
                <Link href={`/book-test?selected=${test.id}`}>Proceed to Book Test</Link>
              </Button>

              <div className="mt-4 text-center">
                <Link href="/book-appointment" className="text-xs font-medium text-[#70706B] hover:text-[#315C4A]">
                  Need a doctor consultation first? Click here →
                </Link>
              </div>
            </div>

            {/* Related Tests */}
            {relatedTests.length > 0 && (
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-[#70706B] mb-4">
                  Complementary Tests
                </h4>
                <div className="space-y-3">
                  {relatedTests.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/tests/${rel.slug}`}
                      className="block p-3 rounded-xl border border-[#E8E8E3] hover:border-[#A8D5BA] hover:bg-[#DDEDE3]/30 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-[#171717]">{rel.name}</span>
                        <span className="text-xs font-mono font-bold text-[#171717]">৳{rel.price}</span>
                      </div>
                      <span className="text-xs text-[#70706B]">{rel.sampleType}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
