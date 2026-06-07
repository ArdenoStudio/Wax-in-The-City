import type { Metadata } from "next";
import { MapPin, Clock, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/section-heading";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { BRANCHES, SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wax In The City — message us on WhatsApp, send a note, or find our Battaramulla and Nugegoda branch details.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="We're here for you."
        subtitle="Questions before you book? Reach us whichever way is easiest."
        image="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Soft botanical studio detail"
      />

      <section className="bg-cream px-5 py-section lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Form */}
          <div>
            <SectionHeading align="left" eyebrow="Send a message" title="Drop us a note." />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Branch details */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-h3 text-warm">Our branches</h3>
              <div className="mt-5 space-y-6">
                {BRANCHES.map((b) => (
                  <div
                    key={b.slug}
                    className="rounded-card-lg border border-warm-border bg-white p-6 shadow-card"
                  >
                    <p className="font-serif text-h4 text-warm">{b.name}</p>
                    <div className="mt-3 space-y-2 text-body-sm text-warm-grey">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-action" />
                        {b.area}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-action" />
                        {b.hours.weekday}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-brand-action" />
                        {b.phone}
                      </p>
                    </div>
                    <a
                      href={whatsappLink(`Hi! I have a question about your ${b.name} branch.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      WhatsApp {b.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-h3 text-warm">Follow us</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-warm-border text-brand-action transition-colors hover:bg-brand-mist"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-warm-border text-brand-action transition-colors hover:bg-brand-mist"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={whatsappLink("Hi! I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-warm-border text-brand-action transition-colors hover:bg-brand-mist"
                >
                  <WhatsappIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
