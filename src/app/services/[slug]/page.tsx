import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  SITE,
  getCategory,
} from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { AnimatedSection } from "@/components/global/AnimatedSection";
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

          {processStrip && !comparison && (
            <AnimatedSection variant="fadeUp" className="mb-12 max-w-3xl">
              <h2 className="font-serif text-h3 font-medium text-warm">
                {processStrip.title}
              </h2>
              <p className="mt-2 text-body-sm text-warm-grey">
                No staged before/after set yet — here is the real session shape instead.
              </p>
              <ol className="mt-6 space-y-3">
                {processStrip.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 border-l-2 border-[#d9b35f]/55 pl-4"
                  >
                    <span className="font-serif text-h4 text-brand-action/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body-sm text-warm-grey">{step}</p>
                  </li>
                ))}
              </ol>
            </AnimatedSection>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <BookingZone
        defaultService={category.name}
        serviceOptions={serviceContent.services.map((item) => item.name)}
        heading="Ready to book?"
      />
    </>
  );
}
