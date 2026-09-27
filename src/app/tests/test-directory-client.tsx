"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_TESTS, MOCK_CATEGORIES, MockTest } from "@/lib/services/mockData";
import { Search, Clock, Droplets, ArrowRight, Check, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TestDirectoryClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);

  const filteredTests = React.useMemo(() => {
    return MOCK_TESTS.filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || test.categorySlug === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Filters Bar: Pure White #FFFFFF */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E3] shadow-sm mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#70706B]" />
            <Input
              type="text"
              placeholder="Search tests (e.g. CBC, Lipid, HbA1c, LFT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-[#E8E8E3] focus:border-[#315C4A]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-[#315C4A] text-white hover:bg-[#171717]" : "border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]"}
            >
              All Modalities
            </Button>
            {MOCK_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap ${selectedCategory === cat.slug ? "bg-[#315C4A] text-white hover:bg-[#171717]" : "border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]"}`}
              >
                {cat.name.split(" ")[0]}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tests Results Count */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[#70706B]">
          Showing <span className="text-[#171717] font-bold">{filteredTests.length}</span> diagnostic tests
        </span>
        <Link href="/book-test" className="text-sm font-semibold text-[#315C4A] hover:underline">
          Book multiple tests at once →
        </Link>
      </div>

      {/* Tests Grid: Pure White #FFFFFF Cards with Soft Gray #E8E8E3 borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E8E3] shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-[#A8D5BA] transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-medium text-[#315C4A] bg-[#DDEDE3] px-2.5 py-0.5 rounded-md border border-[#A8D5BA]/40">
                  {test.code}
                </span>
                <span className="text-xs font-medium text-[#70706B]">{test.category}</span>
              </div>

              <h3 className="text-lg font-bold text-[#171717] mb-2 group-hover:text-[#315C4A] transition-colors">
                <Link href={`/tests/${test.slug}`}>{test.name}</Link>
              </h3>

              <p className="text-sm text-[#70706B] mb-4 line-clamp-2 leading-relaxed">
                {test.description}
              </p>

              <div className="space-y-1.5 mb-6 text-xs text-[#70706B]">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#315C4A]" />
                  <span>Specimen: <strong className="text-[#171717]">{test.sampleType}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#315C4A]" />
                  <span>Report in: <strong className="text-[#171717]">{test.turnaroundTime}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E8E3] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#70706B] block uppercase font-mono">Test Fee</span>
                <span className="text-xl font-bold text-[#171717] font-mono">৳{test.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="ghost" className="text-[#171717] hover:text-[#315C4A] hover:bg-[#DDEDE3]">
                  <Link href={`/tests/${test.slug}`}>Details</Link>
                </Button>
                <Button asChild size="sm" variant="medical">
                  <Link href={`/book-test?selected=${test.id}`}>Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
