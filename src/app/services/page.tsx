import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { type ServiceCategory } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Waxing, facials, Moroccan treatments and hydra facials — done with genuine care at our ladies-only studios in Battaramulla and Nugegoda.",
};

const CATEGORY_VISUALS: Record<
  ServiceCategory,
  { image: string; alt: string; label: string; note: string }
> = {
  waxing: {
    image: IMAGES.services.waxing,
    alt: "A calm private treatment room prepared for waxing",
    label: "Signature smooth",
    note: "Fresh wax setup, private handling, clear after-care.",
  },
  facial: {
    image: IMAGES.services.facials,
    alt: "A facial treatment with soft studio light",
    label: "Skin reset",
    note: "Cleanse, calm, brighten, and keep the skin barrier respected.",
  },
  moroccan: {
    image: IMAGES.services.moroccan,
    alt: "Spa treatment products arranged for a Moroccan ritual",
    label: "Deep ritual",
    note: "Black soap, clay, and slower body-care pacing.",
  },
  "hydra-facial": {
    image: IMAGES.services.hydraFacial,
    alt: "Close-up of skincare tools and hydrated skin treatment",
    label: "Visible refresh",
    note: "Cleanse, extract, hydrate, and leave without downtime.",
  },
};

const SERVICE_GUIDE = [
  {
    icon: ShieldCheck,
    title: "If privacy matters most",
    body: "Choose waxing or intimate services through the booking request so the team can prepare the right room and timing.",
  },
  {
    icon: Sparkles,
    title: "If your skin feels dull",
    body: "Start with a classic or brightening facial, then ask the therapist what maintenance rhythm fits your skin.",
  },
  {
    icon: Clock3,
    title: "If you need a fast glow",
    body: "Express HydraFacial is the quickest route when you need a visible refresh without planning recovery time.",
  },
];

export default async function ServicesPage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <PageHero
        eyebrow="Treatment menu"
        title="Choose the room, the ritual, the result."
        subtitle="Private-room waxing, facials, Moroccan rituals, and HydraFacial — clear choices, careful prep."
        image={IMAGES.services.facials}
        imageAlt="Soft skincare treatment close-up in a private studio"
        size="md"
      />

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(217,179,95,0.22),transparent_32%),radial-gradient(circle_at_88%_24%,rgba(255,214,222,0.16),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[72rem] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="min-w-0">
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Four ways in"
              title="A visual menu, not a price dump."
              subtitle="Start with the kind of care you want. Each path keeps the practical details close: starting price, timing, and how it feels in the room."
            />
            <div className="tracking-[-0.011em] font-sans mt-8 max-w-full rounded-card border border-cream/24 bg-cream/[0.07] p-5 text-pretty text-body-sm text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
              Every service request is reviewed before confirmation, so appointments stay realistic and the studio can prepare properly.
            </div>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {serviceContent.categories.map((category) => {
              const visual = CATEGORY_VISUALS[category.slug];
              return (
                <Link
                  key={category.slug}
                  href={`/services/${category.href}`}
                  className="group relative block min-h-[320px] w-full min-w-0 overflow-hidden rounded-card-lg border border-cream/24 bg-ink shadow-card-hover"
                >
                  <Image
                    src={visual.image}
                    alt={visual.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="image-polish object-cover"
                    unoptimized={visual.image.startsWith("http")}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,7,10,0.08)_0%,rgba(16,7,10,0.42)_46%,rgba(16,7,10,0.92)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="eyebrow-label-light">
                      {visual.label}
                    </p>
                    <h2 className="text-balance mt-3 font-display text-[clamp(1.75rem,3.2vw,2rem)] font-semibold leading-[0.96] tracking-tight-display text-cream">
                      {category.name}
                    </h2>
                    <p className="tracking-[-0.011em] min-w-0 font-sans mt-3.5 max-w-[24rem] break-words text-pretty text-body-sm text-cream">{visual.note}</p>
                    <p className="tracking-[-0.011em] text-pretty font-sans mt-3 text-body-sm font-semibold text-cream">
                      {formatLKRFrom(category.priceFrom)}
                    </p>
                    <span className="tracking-[-0.011em] text-pretty font-sans icon-drift mt-5 inline-flex items-center gap-2 text-body-sm font-semibold text-brand-light">
                      View {category.name}
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-[0.72fr_1fr]">
            <div className="relative min-h-[340px] overflow-hidden rounded-card-lg bg-ink shadow-card-hover sm:min-h-[520px]">
              <Image
                src={IMAGES.socialProof.src}
                alt={IMAGES.socialProof.alt}
                fill
                sizes="(max-width: 768px) 100vw, 36vw"
                className="object-cover object-[50%_24%]"
              />
            </div>
            <div className="grid gap-4">
              {[IMAGES.services.moroccan, IMAGES.services.hydraFacial].map((image, index) => (
                <div
                  key={image}
                  className="relative min-h-[240px] overflow-hidden rounded-card-lg bg-brand shadow-card"
                >
                  <Image
                    src={image}
                    alt={index === 0 ? "Moroccan body-care products in warm light" : "Hydrating facial treatment detail"}
                    fill
                    sizes="(max-width: 768px) 100vw, 32vw"
                    className="image-polish object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(23,7,11,0.52))]" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="How to choose"
              title="Tell us what your skin needs, not just the service name."
              subtitle="The best booking request gives the team context: sensitivity, timing, branch, and whether this is maintenance or a first visit."
            />
            <div className="mt-9 space-y-7">
              {SERVICE_GUIDE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-card border border-warm-border/75 bg-white/65 p-5 shadow-[0_14px_36px_rgba(27,14,16,0.045)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand text-cream">
                      <Icon className="h-5 w-5 shrink-0" />
                    </span>
                    <div>
                      <h3 className="text-balance font-display text-h4 font-semibold tracking-display text-warm">{item.title}</h3>
                      <p className="tracking-[-0.011em] font-sans mt-1 text-pretty text-body-sm text-warm-grey">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Full menu"
            title="Compare timing and starting prices."
            subtitle="Use the tabs for the practical list once you know the treatment family."
          />
          <div className="mt-12">
            <ServiceTabs
              categories={serviceContent.categories}
              services={serviceContent.services}
            />
          </div>
        </div>
      </section>

      <BookingZone
        heading="Found the right treatment?"
        subtitle="Send a request and we'll confirm within 24 hours, or reach us on WhatsApp for urgent timing."
      />
    </>
  );
}
