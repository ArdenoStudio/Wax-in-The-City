import { HeroSection } from "@/components/sections/HeroSection";
import { BranchSelector } from "@/components/sections/BranchSelector";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ReviewThemes } from "@/components/sections/ReviewThemes";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { BookingZone } from "@/components/sections/BookingZone";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { FAQTeaser } from "@/components/sections/FAQTeaser";
import { MarqueeStrip } from "@/components/ui/marquee-strip";
import { getPublicServiceContent } from "@/lib/service-content";

export default async function HomePage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ServicesGrid categories={serviceContent.categories} />
      <TrustStrip />
      <BeforeAfterShowcase />
      <BranchSelector />
      <ReviewThemes />
      <GalleryTeaser />
      <AboutTeaser />
      <FAQTeaser />
      <BookingZone />
    </>
  );
}
