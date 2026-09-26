"use client";

import * as React from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  title: string;
  category: "Facilities" | "Laboratory" | "Equipment" | "Doctors" | "Events";
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Automated Chemistry Analyzers",
    category: "Laboratory",
    image: "/images/hero_diagnostics.jpg",
    description: "Fully automated high-throughput clinical biochemistry analyzer suite.",
  },
  {
    id: "g-2",
    title: "3.0T High-Field Silent MRI Suite",
    category: "Equipment",
    image: "/images/mri_suite.jpg",
    description: "Ultra-fast cardiac and neurological magnetic resonance imaging unit.",
  },
  {
    id: "g-3",
    title: "Executive Patient Waiting Lounge",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious, hygienic, and tranquil reception lounge for patient comfort.",
  },
  {
    id: "g-4",
    title: "Pathology Slide Microscopic Review",
    category: "Doctors",
    image: "/images/doctor_pathologist.jpg",
    description: "Senior pathologist verifying fine-needle aspiration cytology specimen.",
  },
  {
    id: "g-5",
    title: "High-Definition 4D Color Ultrasound",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    description: "Advanced vascular Doppler probe and obstetric sonography suite.",
  },
  {
    id: "g-6",
    title: "Clean-Room Molecular PCR Lab",
    category: "Laboratory",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    description: "Positive-pressure clean room dedicated to molecular viral assays.",
  },
  {
    id: "g-7",
    title: "Community Free Health Screening Camp",
    category: "Events",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    description: "Apex Diagnostics medical team hosting free diabetes and hypertension screening.",
  },
  {
    id: "g-8",
    title: "Gulshan Executive Suite Entrance",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    description: "State-of-the-art diagnostic reception center in Gulshan-2.",
  },
];

export function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [activeItem, setActiveItem] = React.useState<GalleryItem | null>(null);

  const categories = ["All", "Laboratory", "Equipment", "Facilities", "Doctors", "Events"];

  const filteredItems = React.useMemo(() => {
    if (selectedCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 ${
              selectedCategory === cat
                ? "bg-[#315C4A] text-white hover:bg-[#171717]"
                : "border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative h-80 rounded-3xl overflow-hidden border border-[#E8E8E3] shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#A8D5BA]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-5 h-5 text-[#A8D5BA]" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-mono uppercase bg-[#DDEDE3] text-[#315C4A] font-semibold px-2.5 py-0.5 rounded-md inline-block mb-2">
                {item.category}
              </span>
              <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
              <p className="text-xs text-[#DDEDE3]/80 line-clamp-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-[#171717]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative bg-[#171717] border border-[#262626] rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#222222]/80 hover:bg-[#315C4A] text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-[480px] w-full bg-[#171717]">
              <Image src={activeItem.image} alt={activeItem.title} fill className="object-cover" />
            </div>

            <div className="p-6 bg-[#171717] text-white">
              <span className="text-xs font-mono text-[#A8D5BA] uppercase tracking-widest block mb-1">
                {activeItem.category}
              </span>
              <h3 className="text-2xl font-bold mb-2">{activeItem.title}</h3>
              <p className="text-sm text-[#DDEDE3]/85 leading-relaxed">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
