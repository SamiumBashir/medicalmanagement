import * as React from "react";
import { HeroSection } from "@/components/public/hero-section";
import { StatsSection } from "@/components/public/stats-section";
import { ServicesSection } from "@/components/public/services-section";
import { PopularTestsSection } from "@/components/public/popular-tests-section";
import { AboutSection } from "@/components/public/about-section";
import { DoctorsSection } from "@/components/public/doctors-section";
import { BranchesSection } from "@/components/public/branches-section";
import { ReportVerificationPreview } from "@/components/public/report-verification-preview";
import { BookingCTASection } from "@/components/public/booking-cta-section";
import { BlogPreviewSection } from "@/components/public/blog-preview-section";
import { ContactCTASection } from "@/components/public/contact-cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section: Editorial Headline, Medical Photo, Metrics */}
      <HeroSection />

      {/* 2. Trust Statistics Section */}
      <StatsSection />

      {/* 3. Diagnostic Modalities & Treatment Categories */}
      <ServicesSection />

      {/* 4. Popular Tests with Transparent Pricing */}
      <PopularTestsSection />

      {/* 5. Editorial Clinical Heritage & Technology Highlights */}
      <AboutSection />

      {/* 6. Medical Faculty & Senior Consultant Team */}
      <DoctorsSection />

      {/* 7. Diagnostic Centers & Branch Network */}
      <BranchesSection />

      {/* 8. QR Code Anti-Counterfeit Verification Showcase */}
      <ReportVerificationPreview />

      {/* 9. Direct Priority Booking / Home Sample Collection */}
      <BookingCTASection />

      {/* 10. Educational Diagnostic Articles */}
      <BlogPreviewSection />

      {/* 11. Patient Assistance & Contact Details */}
      <ContactCTASection />
    </div>
  );
}
