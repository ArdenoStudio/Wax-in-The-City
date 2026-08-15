import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { BRANCHES, whatsappLink } from "@/lib/site";
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
  alternates: {
    canonical: "/locations",
  },
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
        subtitle="Two ladies-only Colombo locations with the same private-room standard."
        image={IMAGES.branches.battaramulla}
        imageAlt="Calm private studio room prepared for an appointment"
        size="md"
      />

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,179,95,0.22),transparent_34%),radial-gradient(circle_at_80%_34%,rgba(255,214,222,0.14),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Branch selector"
              title="Same care standard, different side of the city."
              subtitle="Pick the branch by commute first. The appointment style stays consistent: private, clean, and reviewed before confirmation."
            />
            <div className="mt-8 grid gap-3 text-body-sm text-cream/74">
              <div className="rounded-card border border-cream/14 bg-cream/8 p-4">
                Battaramulla works best if your day runs through the parliament, Pelawatte, or Koswatta side.
              </div>
              <div className="rounded-card border border-cream/14 bg-cream/8 p-4">
                Nugegoda is the easier choice if High Level Road is already part of your route.
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {BRANCHES.map((branch, i) => (
              <AnimatedSection key={branch.slug} variant="fadeUp" delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-card border border-cream/14 bg-cream text-warm shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
                  <div className="relative min-h-[260px] overflow-hidden bg-ink">
                    <Image
                      src={BRANCH_IMAGES[branch.slug]}
                      alt={`${branch.name} studio atmosphere`}
                      fill
                      sizes="(max-width: 768px) 100vw, 34vw"
                      className="image-polish object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(23,7,11,0.72)_100%)]" />
                    <div className="absolute bottom-0 left-0 p-5 text-cream">
                      <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
                        {branch.area}
                      </p>
                      <h2 className="mt-2 font-serif text-[2.25rem] font-medium leading-none">
                        {branch.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-body-sm text-warm-grey">{branch.blurb}</p>
                    <div className="mt-5 space-y-3 border-t border-warm-border pt-5 text-body-sm text-warm-grey">
                      <p className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
                        <span>{branch.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-action" />
                        {branch.hours.weekday}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-brand-action" />
                        {branch.phone}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <a
                        href={whatsappLink(`Hi! I'd like to book at your ${branch.name} branch.`, branch.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-5 text-body-sm font-medium text-cream shadow-[0_14px_30px_rgba(151,35,58,0.20)]"
                      >
                        <WhatsappIcon className="h-4 w-4" />
                        WhatsApp
                      </a>
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-drift inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-brand-action/24 px-5 text-body-sm font-medium text-brand-action"
                      >
                        <Navigation className="h-4 w-4" />
                        Directions
                      </a>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Before you travel"
            title="Message the branch first if timing is tight."
            subtitle="For waxing and facial appointments, a short WhatsApp message helps the studio confirm the right therapist, room, and session length."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {["Choose branch", "Confirm service", "Arrive relaxed"].map((step, index) => (
              <div key={step} className="premium-surface rounded-card p-5">
                <p className="relative z-10 font-serif text-h2 text-brand-action/40">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="relative z-10 mt-3 text-h4 font-semibold text-warm">{step}</h3>
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
