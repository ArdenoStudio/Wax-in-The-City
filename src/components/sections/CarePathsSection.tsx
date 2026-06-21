"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { type ServiceCategoryMeta } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { formatLKRFrom } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

interface CarePathsSectionProps {
  categories: ServiceCategoryMeta[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  waxing: IMAGES.services.waxing,
  facial: IMAGES.services.facials,
  facials: IMAGES.services.facials,
  moroccan: IMAGES.services.moroccan,
  "hydra-facial": IMAGES.services.hydraFacial,
};

export function CarePathsSection({ categories }: CarePathsSectionProps) {
  const waxing = categories.find((c) => c.slug === "waxing");
  const facials = categories.find((c) => c.slug === "facial" || c.href === "facials");
  const moroccan = categories.find((c) => c.slug === "moroccan");

  const cards = [
    waxing && {
      category: "Signature",
      title: waxing.name,
      slug: waxing.href,
      src: CATEGORY_IMAGES.waxing,
      short: waxing.short,
      price: waxing.priceFrom,
      content: (
        <p className="text-body text-warm-grey">
          {waxing.description} Starting from {formatLKRFrom(waxing.priceFrom)}. Private
          rooms, careful prep, and therapists who match pressure to your skin.
        </p>
      ),
    },
    facials && {
      category: "Skin reset",
      title: "Facials & HydraFacial",
      slug: facials.href === "facials" ? "facials" : facials.href,
      src: CATEGORY_IMAGES.facials,
      short: facials.short,
      price: facials.priceFrom,
      content: (
        <p className="text-body text-warm-grey">
          Calm skin work and visible refresh without downtime. We help you choose the right
          facial for your skin and timing.
        </p>
      ),
    },
    moroccan && {
      category: "Deep ritual",
      title: moroccan.name,
      slug: moroccan.href,
      src: CATEGORY_IMAGES.moroccan,
      short: moroccan.short,
      price: moroccan.priceFrom,
      content: (
        <p className="text-body text-warm-grey">
          {moroccan.description} A longer appointment with the same private-room standard.
        </p>
      ),
    },
  ].filter(Boolean) as Array<{
    category: string;
    title: string;
    slug: string;
    src: string;
    short: string;
    price: number;
    content: React.ReactNode;
  }>;

  return (
    <section className="band-pearl overflow-hidden px-5 py-section-lg lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          voice="serif"
          align="left"
          title="Pick the care you need."
          subtitle="Waxing is the hero. Skin care and rituals support the same private-room standard."
        />

        <div className="mt-8 w-full">
          <Carousel
            items={cards.map((card, index) => (
              <Card
                key={card.slug}
                card={{
                  src: card.src,
                  title: card.title,
                  category: card.category,
                  content: (
                    <div className="space-y-6">
                      {card.content}
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-small font-medium text-brand-action">
                          From {formatLKRFrom(card.price)}
                        </span>
                        <Button asChild variant="primary">
                          <Link href={`/services/${card.slug}`}>
                            View menu
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ),
                }}
                index={index}
              />
            ))}
          />
        </div>

        <div className="mt-6">
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center gap-2 text-body-sm font-medium text-brand-action hover:underline"
          >
            Full menu with timing and prices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
