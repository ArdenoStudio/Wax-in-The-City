import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { BookingZone } from "@/components/sections/BookingZone";

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
      <PageHero
        eyebrow="Good to know"
        title="Your questions, answered."
        subtitle="Honest answers about treatments, hygiene, booking and aftercare."
        image="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Calm studio detail"
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
