import { HeroSection } from "@/components/sections/HeroSection";
import { BranchSelector } from "@/components/sections/BranchSelector";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { StudioReel } from "@/components/sections/StudioReel";
import { ReviewThemes } from "@/components/sections/ReviewThemes";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { BookingZone } from "@/components/sections/BookingZone";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { getPublicServiceContent } from "@/lib/service-content";

export const revalidate = 3600;

export default async function HomePage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <HeroSection />
      <ServicesGrid categories={serviceContent.categories} />
      <TrustStrip />
      <StudioReel />
      <BeforeAfterShowcase />
      <BranchSelector />
      <ReviewThemes />
      <GalleryTeaser />
      <AboutTeaser />
      <BookingZone />
    </>
  );
}
