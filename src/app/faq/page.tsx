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
        subtitle="Honest answers about treatments, hygiene, booking and aftercare."
        image={IMAGES.about.src}
        imageAlt={IMAGES.about.alt}
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Suspense
            fallback={
              <p className="text-body text-warm-grey">Loading questions…</p>
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
