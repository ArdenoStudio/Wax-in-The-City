import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WaxFaqSection } from "@/components/sections/WaxFaqSection";
import { Cta10Wax } from "@/components/sections/Cta10Wax";
import { whatsappLink } from "@/lib/site";
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
        title="Your questions, answered."
        subtitle="Honest answers about treatments, hygiene, booking and aftercare."
        image={IMAGES.socialProof.src}
        imageAlt="Calm studio detail"
      />

      <WaxFaqSection />

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <Cta10Wax
            title="Still have a question?"
            description="Message us on WhatsApp — we are happy to help before you book."
            primaryLabel="WhatsApp"
            primaryHref={whatsappLink("Hi! I have a question before booking.")}
            secondaryLabel="Send request"
            secondaryHref="/book"
          />
        </div>
      </section>
    </>
  );
}
