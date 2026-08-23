import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { BookingZone } from "@/components/sections/BookingZone";
import { FaqJsonLd } from "@/components/global/FaqJsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Your questions about waxing, facials, hygiene, booking and aftercare — honestly answered.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHero
        eyebrow="Good to know"
        title="Your questions, answered."
        subtitle="Honest answers about treatments, hygiene, booking and aftercare."
        image="/images/studio/reception-warm.jpg"
        imageAlt="Calm studio detail"
        priority
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion />
        </div>
      </section>

      <BookingZone mode="whatsapp-only" heading="Still have a question?" subtitle="Message us on WhatsApp — we're happy to help before you book." />
    </>
  );
}
