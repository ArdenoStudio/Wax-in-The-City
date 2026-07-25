import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clock, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/section-heading";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "@/components/icons";
import { BRANCHES, SITE, telHref, whatsappLink } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { HoursTable } from "@/components/sections/HoursTable";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wax In The City — message us on WhatsApp, send a note, or find our Battaramulla and Nugegoda branch details.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Questions before you book? Start here."
        subtitle="WhatsApp is best for urgent timing. Use the form for non-urgent questions and branch details."
        image={IMAGES.book.src}
        imageAlt={IMAGES.book.alt}
        size="md"
      />

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(217,179,95,0.24),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,214,222,0.14),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Fastest route"
              title="If it is about timing, message us first."
              subtitle="A WhatsApp message lets the studio confirm the right branch, service length, and available room before you travel."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink("Hi! I have a question before booking.")}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex h-14 items-center justify-center gap-2 rounded-pill bg-cream px-8 text-body font-semibold text-brand shadow-[0_18px_42px_rgba(0,0,0,0.28)]"
              >
                <WhatsappIcon className="h-5 w-5" />
                Message on WhatsApp
              </a>
              <a
                href="#contact-form"
                className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-cream/20 bg-transparent px-6 text-body-sm font-medium text-cream/85 hover:bg-cream/8"
              >
                <Send className="h-4 w-4" />
                Or send a note
              </a>
            </div>
            <p className="mt-4 max-w-md text-body-sm text-cream/62">
              WhatsApp is the primary path for timing and same-week questions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: WhatsappIcon, title: "Fast replies", body: "Best for same-week booking questions." },
              { icon: CalendarCheck, title: "Requests reviewed", body: "Forms are checked before confirmation." },
              { icon: Phone, title: "One number", body: "Use the same contact path for both branches." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-card border border-cream/14 bg-cream/8 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-card bg-cream text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-h4 font-semibold text-cream">{item.title}</h2>
                  <p className="mt-2 text-body-sm text-cream/70">{item.body}</p>
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
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
                  Private studio contact
                </p>
                <h2 className="mt-3 font-display text-h3 font-medium leading-tight">
                  Tell us what you need before you arrive.
                </h2>
              </div>
            </div>

            <HoursTable />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {BRANCHES.map((b) => (
                <div
                  key={b.slug}
                  className="premium-surface rounded-card p-5"
                >
                  <Link
                    href={`/locations/${b.slug}`}
                    className="relative z-10 font-display text-h4 font-medium text-warm underline-offset-4 hover:text-brand-action hover:underline"
                  >
                    {b.name}
                  </Link>
                  <div className="relative z-10 mt-3 space-y-2 text-body-sm text-warm-grey">
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
                      <a
                        href={telHref(b.phone)}
                        className="text-brand-action underline-offset-4 hover:underline"
                      >
                        {b.phone}
                      </a>
                    </p>
                  </div>
                  <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/locations/${b.slug}`}
                      className="inline-flex h-11 items-center rounded-pill border border-brand-action/30 px-5 text-body-sm font-medium text-brand-action transition-colors hover:bg-brand-mist"
                    >
                      View studio
                    </Link>
                    <a
                      href={whatsappLink(`Hi! I have a question about your ${b.name} branch.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-5 text-body-sm font-medium text-cream shadow-[0_14px_30px_rgba(151,35,58,0.20)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      WhatsApp {b.name}
                    </a>
                  </div>
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

            <aside
              id="privacy"
              className="mt-10 scroll-mt-28 rounded-card border border-warm-border/80 bg-white/50 px-5 py-5"
            >
              <h3 className="font-display text-h4 text-warm">Privacy note</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-warm-grey">
                Messages and booking requests are reviewed privately by the
                studio team. We use your details only to reply and confirm
                visits — not for public display or third-party marketing.
              </p>
            </aside>

            <div className="mt-10">
              <h3 className="font-display text-h3 text-warm">Follow us</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="pressable flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:bg-brand-mist"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="pressable flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:bg-brand-mist"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={whatsappLink("Hi! I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="pressable flex h-12 w-12 items-center justify-center rounded-pill border border-brand-action/30 bg-white/42 text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:bg-brand-mist"
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
