import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { BookingZone } from "@/components/sections/BookingZone";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Your questions about waxing, facials, hygiene, booking and aftercare — honestly answered.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Your questions, answered."
        subtitle="Honest answers about treatments, hygiene, booking and aftercare — search or jump by topic."
        image={IMAGES.about.src}
        imageAlt={IMAGES.about.alt}
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-45" />
        <div className="mx-auto max-w-3xl">
          <Suspense
            fallback={
              <div className="space-y-3" aria-busy="true" aria-label="Loading questions">
                <div className="h-12 animate-pulse rounded-card bg-warm-border/40" />
                <div className="h-9 animate-pulse rounded-pill bg-warm-border/30" />
                <p className="text-pretty font-sans pt-4 text-body text-warm-grey">Loading questions…</p>
              </div>
            }
          >
            <FAQAccordion enhanced />
          </Suspense>
        </div>
      </section>

      <BookingZone
        mode="whatsapp-only"
        heading="Still have a question?"
        subtitle="Message us on WhatsApp — we're happy to help before you book."
      />
    </>
  );
}
