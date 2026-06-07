import { HeroSection } from "@/components/sections/HeroSection";
import { BranchSelector } from "@/components/sections/BranchSelector";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { BookingZone } from "@/components/sections/BookingZone";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <TrustStrip />
      <BranchSelector />
      <TestimonialsCarousel />
      <GalleryTeaser />
      <AboutTeaser />
      <BookingZone />
    </>
  );
}
