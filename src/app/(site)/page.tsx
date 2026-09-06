import type { Metadata } from "next";
import Link from "next/link";
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
import { FaqJsonLd } from "@/components/global/FaqJsonLd";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { getPublicServiceContent } from "@/lib/service-content";
import { buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    path: "/",
  }),
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
};

export default async function HomePage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <FaqJsonLd />
      <div data-analytics-section="hero">
        <HeroSection />
      </div>
      <div data-analytics-section="services-grid">
        <ServicesGrid categories={serviceContent.categories} />
      </div>
      <TrustStrip />
      <StudioReel />
      <div data-analytics-section="before-after">
        <BeforeAfterShowcase />
      </div>
      <div data-analytics-section="branches">
        <BranchSelector />
      </div>
      <div data-analytics-section="reviews-testimonials">
        <ReviewThemes />
      </div>
      <section className="px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StatsCounter />
        </div>
      </section>
      <div data-analytics-section="gallery">
        <GalleryTeaser />
      </div>
      <AboutTeaser />
      <section className="bg-cream px-5 py-section-lg lg:px-8" data-analytics-section="faq">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <SectionHeading eyebrow="Good to know" title="Questions, answered." />
            <p className="mx-auto mt-7 w-full max-w-xl break-words text-center text-pretty text-body-lg text-warm-grey">
              Honest answers about treatments, hygiene and booking — the full list lives on the{" "}
              <Link href="/faq" className="font-medium text-brand-action underline-offset-4 hover:underline">
                FAQ page
              </Link>
              .
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>
      <div data-analytics-section="booking-zone">
        <BookingZone />
      </div>
    </>
  );
}
