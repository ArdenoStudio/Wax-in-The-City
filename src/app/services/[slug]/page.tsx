import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SITE,
  formatPriceFrom,
  getCategory,
  whatsappLink,
} from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { BreadcrumbJsonLd } from "@/components/global/JsonLd";
import { WhatsappIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const PROCESS_STRIPS: Partial<
  Record<string, { title: string; steps: string[] }>
> = {
  moroccan: {
    title: "Honest process — Moroccan ritual",
    steps: [
      "Skin is assessed and the room prepared for a slower body-care pace.",
      "Black soap cleanses and softens before clay draws impurities.",
      "Rinse, nourish, and leave with simple after-care — no staged before/after photos claimed.",
    ],
  },
  "hydra-facial": {
    title: "Honest process — HydraFacial",
    steps: [
      "Cleanse and prep so extraction stays controlled.",
      "Extract and hydrate with active serums suited to your skin.",
      "Finish with calm skin and clear after-care — results vary; no unverified glow claims.",
    ],
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
  const ogImage = HERO_IMAGES[category.href] ?? IMAGES.services.facials;
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${category.name} · ${SITE.shortName}`,
      description: category.description,
      url: `${SITE.url}/services/${slug}`,
      images: [{ url: ogImage, alt: `${category.name} at ${SITE.shortName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} · ${SITE.shortName}`,
      description: category.description,
      images: [ogImage],
    },
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
  const processStrip = PROCESS_STRIPS[category.href];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: category.name, href: `/services/${category.href}` },
        ]}
      />
      <PageHero
        eyebrow="Treatments"
        title={category.name}
        subtitle={category.description}
        image={HERO_IMAGES[category.href] ?? HERO_IMAGES.facials}
        imageAlt={`${category.name} at Wax In The City`}
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <Link
              href="/services"
              className="tracking-[-0.011em] text-pretty font-sans nav-link mb-10 inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-brand-action"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              All services
            </Link>

            <p className="text-pretty font-sans mb-8 text-body-sm font-semibold tracking-[-0.01em] text-brand-action">
              {formatPriceFrom(category.priceFrom)}
            </p>

            {comparison && (
              <AnimatedSection variant="fadeUp" className="mb-12 max-w-[48rem]">
                <h2 className="text-balance font-display text-h3 font-semibold tracking-display text-warm">Treatment flow preview</h2>
                <p className="tracking-[-0.011em] font-sans mt-2 text-pretty text-body-sm text-warm-grey">
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

            {processStrip && !comparison && (
              <AnimatedSection variant="fadeUp" className="mb-12 max-w-[48rem]">
                <h2 className="text-balance font-display text-h3 font-semibold tracking-display text-warm">
                  {processStrip.title}
                </h2>
                <p className="tracking-[-0.011em] font-sans mt-2 text-pretty text-body-sm text-warm-grey">
                  No staged before/after set yet — here is the real session shape instead.
                </p>
                <ol className="mt-6 space-y-3.5">
                  {processStrip.steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-5 border-l-2 border-gold/55 pl-4"
                    >
                      <span className="text-balance font-display text-h4 font-semibold tracking-display text-brand-action/55">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="tracking-[-0.011em] font-sans text-pretty text-body-sm text-warm-grey">{step}</p>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>
            )}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service, i) => (
                <AnimatedSection key={service.slug} variant="fadeUp" delay={i * 0.05}>
                  <ServiceCard service={service} />
                </AnimatedSection>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-2xl">
              <Accordion type="single" collapsible>
                <AccordionItem value="after-care">
                  <AccordionTrigger>After-care tip</AccordionTrigger>
                  <AccordionContent>
                    Keep the treated area clean, skip heavy heat and friction for the first day when
                    advised, and follow any product guidance your therapist gives. If your skin reacts
                    unusually, message the studio on WhatsApp before trying a new product.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-card border border-warm-border/75 bg-cream-alt/85 p-5 shadow-card">
              <p className="eyebrow-label">
                Book {category.name}
              </p>
              <p className="tracking-[-0.011em] text-pretty font-sans mt-1 text-body-sm text-warm-grey">
                {formatPriceFrom(category.priceFrom)}
              </p>
              <p className="text-balance mt-2 font-display text-h4 font-semibold tracking-display text-warm">
                Request a time — we confirm before you travel.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild size="md" variant="primary" className="w-full">
                  <Link href={`/book?service=${encodeURIComponent(category.name)}`}>
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    Request a time
                  </Link>
                </Button>
                <Button asChild size="md" variant="outline" className="w-full">
                  <a
                    href={whatsappLink(
                      `Hi! I'd like to ask about ${category.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon className="h-4 w-4 shrink-0" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance font-display text-h2 font-semibold tracking-tight-display text-warm">Explore other treatments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {serviceContent.categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.href}`}
                className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty font-sans pressable rounded-pill border border-brand-action/34 bg-white/68 px-5 py-2.5 text-body-sm font-semibold text-brand-action shadow-card backdrop-blur-2xl transition-colors duration-300 hover:bg-brand-mist/90"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingZone
        defaultService={category.name}
        serviceOptions={serviceContent.services.map((item) => item.name)}
        heading="Ready to book?"
      />
    </>
  );
}
