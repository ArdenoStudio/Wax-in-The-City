import { HeroSection } from "@/components/sections/HeroSection";
import { BranchSelector } from "@/components/sections/BranchSelector";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BookingZone } from "@/components/sections/BookingZone";
import { BeforeAfterShowcase } from "@/components/sections/BeforeAfterShowcase";
import { getPublicServiceContent } from "@/lib/service-content";

export default async function HomePage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <HeroSection />
      <ServicesGrid categories={serviceContent.categories} />
      <TrustStrip />
      <BeforeAfterShowcase />
      <BranchSelector />
      <BookingZone />
    </>
  );
}
