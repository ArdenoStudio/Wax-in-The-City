import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategory,
} from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { WaxPriceMatrix } from "@/components/sections/WaxPriceMatrix";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { SectionHeading } from "@/components/ui/section-heading";

const HERO_IMAGES: Record<string, string> = {
  waxing: IMAGES.services.waxing,
  facials: IMAGES.services.facials,
  moroccan: IMAGES.services.moroccan,
  "hydra-facial": IMAGES.services.hydraFacial,
};

const BEFORE_AFTER: Partial<
  Record<string, { before: string; after: string; beforeAlt: string; afterAlt: string }>
> = {
  waxing: {
    before: IMAGES.beforeAfter.waxing.before,
    after: IMAGES.beforeAfter.waxing.after,
    beforeAlt: "Illustrative clean preparation before a waxing visit",
    afterAlt: "Illustrative smooth finish after a waxing visit",
  },
  facials: {
    before: IMAGES.beforeAfter.facial.before,
    after: IMAGES.beforeAfter.facial.after,
    beforeAlt: "Illustrative facial preparation before treatment",
    afterAlt: "Illustrative calm skin-care finish after treatment",
  },
};

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ slug: c.href }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Services" };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceContent = await getPublicServiceContent();
  const category =
    serviceContent.categories.find((c) => c.href === slug) ?? getCategory(slug);
  if (!category) notFound();

  const services = serviceContent.services.filter(
    (service) => service.category === category.slug
  );
  const comparison = BEFORE_AFTER[category.href];

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={category.name}
        subtitle={category.description}
        image={HERO_IMAGES[category.href] ?? HERO_IMAGES.facials}
        imageAlt={`${category.name} at Wax In The City`}
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="nav-link mb-10 inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          {comparison && (
            <AnimatedSection variant="fadeUp" className="mb-12 max-w-3xl">
              <h2 className="font-serif text-h3 font-medium text-warm">Treatment flow preview</h2>
              <p className="mt-2 text-body-sm text-warm-grey">
                An honest process preview until client-approved result photos are available.
              </p>
              <div className="mt-6">
                <BeforeAfterSlider
                  beforeSrc={comparison.before}
                  afterSrc={comparison.after}
                  beforeAlt={comparison.beforeAlt}
                  afterAlt={comparison.afterAlt}
                  beforeLabel="Before care"
                  afterLabel="After care"
                />
              </div>
            </AnimatedSection>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} variant="fadeUp" delay={i * 0.05}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>

          {category.slug === "waxing" && (
            <AnimatedSection variant="fadeUp" className="mt-16">
              <SectionHeading
                align="left"
                eyebrow="Full price list"
                title="Wax pricing by product."
                subtitle="Each area can be done with different premium wax brands. Prices below match our current menu."
              />
              <div className="mt-8">
                <WaxPriceMatrix />
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-h2 font-medium text-warm">Explore other treatments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceContent.categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.href}`}
                className="rounded-pill border border-brand-action/30 bg-white/42 px-5 py-2.5 text-body-sm font-medium text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingZone defaultBranch={undefined} heading="Ready to book?" />
    </>
  );
}
