import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { formatLKRFrom } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Waxing, facials, Moroccan treatments and HydraFacial at our ladies-only studio in Battaramulla.",
};

export default async function ServicesPage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <PageHero
        title="Treatment menu."
        subtitle="Starting prices, timing, and what to expect in the room."
        image={IMAGES.services.waxing}
        imageAlt="Private waxing treatment room"
        size="md"
      />

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            voice="sans"
            align="left"
            title="Choose your path"
            subtitle="Every request is reviewed before confirmation so appointments stay realistic."
          />

          <ul className="mt-10 divide-y divide-warm-border border-y border-warm-border">
            {serviceContent.categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/services/${category.href}`}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <div>
                    <p className="type-subtitle text-warm">{category.name}</p>
                    <p className="mt-1 text-small text-warm-grey">{category.short}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-small text-warm-grey">
                    <span>from {formatLKRFrom(category.priceFrom)}</span>
                    <ArrowRight className="h-4 w-4 text-brand-action transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-pearl border-t border-warm-border px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            voice="sans"
            align="left"
            title="Compare timing and prices."
            subtitle="Use the tabs once you know the treatment family."
          />
          <div className="mt-10">
            <ServiceTabs
              categories={serviceContent.categories}
              services={serviceContent.services}
            />
          </div>
        </div>
      </section>

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="type-title-serif text-cream">Found the right treatment?</h2>
            <p className="mt-2 max-w-md text-body text-cream/72">
              Send a request and we&apos;ll confirm within 24 hours.
            </p>
          </div>
          <Button asChild size="lg" variant="inverted">
            <Link href="/book">Send booking request</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
