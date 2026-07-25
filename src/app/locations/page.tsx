import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { BRANCHES, telHref, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { WhatsappIcon } from "@/components/icons";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Two ladies-only Wax In The City studios in Colombo — Battaramulla and Nugegoda. Find hours, directions and WhatsApp booking.",
};

const BRANCH_IMAGES = {
  battaramulla: IMAGES.branches.battaramulla,
  nugegoda: IMAGES.branches.nugegoda,
} as const;

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit us"
        title="Choose the studio that fits your day."
        subtitle="Battaramulla and Nugegoda — same private-room care, pick by your commute."
        image={IMAGES.branches.battaramulla}
        imageAlt="Calm private studio room prepared for an appointment"
        size="md"
      />

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,179,95,0.2),transparent_34%),radial-gradient(circle_at_80%_34%,rgba(255,214,222,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Branch selector"
              title="Same care standard, different side of the city."
              subtitle="Pick the branch by commute first. The appointment style stays consistent: private, clean, and reviewed before confirmation."
            />
            <div className="text-pretty font-sans mt-8 grid gap-2.5 text-body-sm text-cream/78">
              <div className="rounded-card border border-cream/12 bg-cream/[0.07] p-4">
                Battaramulla works best if your day runs through the parliament, Pelawatte, or Koswatta side.
              </div>
              <div className="rounded-card border border-cream/12 bg-cream/[0.07] p-4">
                Nugegoda is the easier choice if High Level Road is already part of your route.
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {BRANCHES.map((branch, i) => (
              <AnimatedSection key={branch.slug} variant="fadeUp" delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-card-lg border border-cream/12 bg-cream text-warm shadow-[0_28px_90px_rgba(0,0,0,0.26)]">
                  <div className="relative min-h-[240px] overflow-hidden bg-ink sm:min-h-[260px]">
                    <Image
                      src={BRANCH_IMAGES[branch.slug]}
                      alt={`${branch.name} studio atmosphere`}
                      fill
                      sizes="(max-width: 768px) 100vw, 34vw"
                      className="image-polish object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(23,7,11,0.74)_100%)]" />
                    <div className="absolute bottom-0 left-0 p-5 text-cream">
                      <p className="eyebrow-label-light">{branch.area}</p>
                      <h2 className="mt-2 font-display text-[2.15rem] font-semibold leading-[0.96] tracking-tight-display">
                        {branch.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="font-sans text-pretty text-body-sm text-warm-grey">{branch.blurb}</p>
                    <div className="text-pretty font-sans mt-5 space-y-3 border-t border-warm-border pt-5 text-body-sm text-warm-grey">
                      <p className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
                        <span>{branch.address}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
                        <span>
                          <span className="block">Weekdays · {branch.hours.weekday}</span>
                          <span className="block">Weekends · {branch.hours.weekend}</span>
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-brand-action" />
                        <a
                          href={telHref(branch.phone)}
                          className="text-brand-action underline-offset-4 hover:underline"
                        >
                          {branch.phone}
                        </a>
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                      <Link
                        href={`/locations/${branch.slug}`}
                        className="text-pretty font-sans icon-drift inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-brand-action/24 px-5 text-body-sm font-semibold text-brand-action"
                      >
                        View studio
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <a
                          href={whatsappLink(
                            `Hi! I'd like to book at your ${branch.name} branch.`,
                            branch.whatsapp
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pretty font-sans pressable inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-5 text-body-sm font-semibold text-cream shadow-[0_14px_30px_rgba(151,35,58,0.18)]"
                        >
                          <WhatsappIcon className="h-4 w-4 shrink-0" />
                          WhatsApp
                        </a>
                        <a
                          href={branch.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pretty font-sans icon-drift inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-brand-action/24 px-5 text-body-sm font-semibold text-brand-action"
                        >
                          <Navigation className="h-4 w-4 shrink-0" />
                          Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-45" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Before you travel"
            title="Message the branch first if timing is tight."
            subtitle="For waxing and facial appointments, a short WhatsApp message helps the studio confirm the right therapist, room, and session length."
          />
          <div className="grid gap-2.5 sm:grid-cols-3">
            {["Choose branch", "Confirm service", "Arrive relaxed"].map((step, index) => (
              <div key={step} className="premium-surface rounded-card p-5">
                <p className="text-balance relative z-10 font-display text-h2 font-semibold tracking-tight-display text-brand-action/35">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-balance relative z-10 mt-2 font-display text-h4 font-semibold tracking-display text-warm">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingZone
        heading="Ready when you are."
        subtitle="Send the branch, service, and preferred time. We will confirm what is realistic."
      />
    </>
  );
}
