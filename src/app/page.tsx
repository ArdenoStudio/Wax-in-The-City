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
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { StatsCounter } from "@/components/sections/StatsCounter";
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
      <section className="px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StatsCounter />
        </div>
      </section>
      <GalleryTeaser />
      <AboutTeaser />
      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered."
            subtitle="Honest answers about treatments, hygiene and booking — the full list lives on the FAQ page."
            className="mb-14"
          />
          <FAQAccordion />
        </div>
      </section>
      <BookingZone />
    </>
  );
}
