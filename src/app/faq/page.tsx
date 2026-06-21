import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons";
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

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion />
        </div>
      </section>

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="type-title-serif text-cream">Still have a question?</h2>
            <p className="mt-2 text-body text-cream/72">
              Message us on WhatsApp — we are happy to help before you book.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg" variant="inverted">
              <a
                href={whatsappLink("Hi! I have a question before booking.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/book">Send request</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
