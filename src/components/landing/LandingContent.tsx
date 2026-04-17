"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import OccasionGrid from "@/components/landing/OccasionGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import SampleGallery from "@/components/landing/SampleGallery";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function LandingContent() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <OccasionGrid />
      <HowItWorks />
      <SampleGallery />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
