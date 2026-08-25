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
      <BookingZone />
    </>
  );
}
