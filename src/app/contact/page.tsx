import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, Clock, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/section-heading";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { BRANCHES, SITE, whatsappLink } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wax In The City — message us on WhatsApp, send a note, or find our Battaramulla and Nugegoda branch details.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Questions before you book? Start here."
        subtitle="WhatsApp is best for urgent timing. Use the form for general questions and branch details."
        image={IMAGES.book.src}
        imageAlt={IMAGES.book.alt}
        size="md"
        priority
      />

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Fastest route"
              title="If it is about timing, message us first."
              subtitle="A WhatsApp message lets the studio confirm the right branch, service length, and available room before you travel."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Hi! I have a question before booking.")}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-cream px-6 text-body-sm font-semibold text-brand shadow-[0_14px_34px_rgba(162,15,55,0.22)]"
              >
                <WhatsappIcon className="h-5 w-5" />
                Message WhatsApp
              </a>
              <a
                href="#contact-form"
                className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-cream/20 bg-cream/8 px-6 text-body-sm font-semibold text-cream"
              >
                <Send className="h-4 w-4" />
                Send a note
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: WhatsappIcon, title: "Fast replies", body: "Best for same week booking questions." },
              { icon: CalendarCheck, title: "Requests reviewed", body: "Forms are checked before confirmation." },
              { icon: Phone, title: "One number", body: "Use the same contact path for both branches." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-card border border-cream/14 bg-cream/8 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-card bg-cream text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-h4 font-semibold text-cream text-balance">{item.title}</h2>
                  <p className="mt-2 text-body-sm text-cream/70 text-pretty">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact-form" className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <aside className="space-y-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-card bg-brand shadow-[0_26px_80px_rgba(39,19,21,0.16)]">
              <Image
                src={IMAGES.socialProof.src}
                alt={IMAGES.socialProof.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[50%_22%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(23,7,11,0.80)_100%)]" />
              <div className="absolute bottom-0 left-0 p-6 text-cream">
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-light text-pretty">
                  Private studio contact
                </p>
                <h2 className="mt-3 font-serif text-h3 font-medium leading-tight text-balance">
                  Tell us what you need before you arrive.
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {BRANCHES.map((b) => (
                <div
                  key={b.slug}
                  className="premium-surface rounded-card p-5"
                >
                  <p className="relative z-10 font-serif text-h4 font-medium text-warm text-pretty">{b.name}</p>
                  <div className="relative z-10 mt-3 space-y-2 text-body-sm text-warm-grey">
                    <p className="flex items-center gap-2 text-pretty">
                      <MapPin className="h-4 w-4 text-brand-action" />
                      {b.area}
                    </p>
                    <p className="flex items-center gap-2 text-pretty">
                      <Clock className="h-4 w-4 text-brand-action" />
                      {b.hours.weekday}
                    </p>
                    <p className="flex items-center gap-2 text-pretty">
                      <Phone className="h-4 w-4 text-brand-action" />
                      <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:underline">
                        {b.phone}
                      </a>
                    </p>
                  </div>
                  <a
                    href={whatsappLink(`Hi! I have a question about your ${b.name} branch.`, b.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] px-5 text-body-sm font-medium text-cream shadow-[0_14px_30px_rgba(151,35,58,0.20)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    WhatsApp {b.name}
                  </a>
                </div>
              ))}
            </div>
          </aside>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Message form"
              title="Send the details once, clearly."
              subtitle="Useful for questions, service matching, and booking context that does not need an instant reply."
            />
            <div className="mt-8">
              <ContactForm />
            </div>

            <div className="mt-10">
              <h3 className="font-serif text-h3 text-warm text-balance">Follow us</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={whatsappLink("Hi! I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
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
