import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, CheckCircle2, Clock3, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { MarqueeStrip } from "@/components/ui/marquee-strip";
import { IMAGES } from "@/lib/images";
import { BRANCHES } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "A studio built by women, for women. The story and values behind Wax In The City — honest, private, genuinely kind beauty care in Colombo.",
  path: "/about",
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Hygiene is visible",
    body: "Fresh wax handling, clean tools, prepared surfaces, and clear aftercare are treated as normal, not as a premium addition.",
  },
  {
    icon: Heart,
    title: "Privacy stays protected",
    body: "Ladies only rooms, appointment led timing, and calm conversation make sensitive services feel less intimidating.",
  },
  {
    icon: Sparkles,
    title: "Advice stays practical",
    body: "The team should help you choose what suits your skin and timing, not push the biggest treatment on the menu.",
  },
];

const CARE_FLOW = [
  {
    icon: CalendarCheck,
    title: "Request",
    body: "You tell us the service, branch, timing, and anything sensitive we should know before confirming.",
  },
  {
    icon: ShieldCheck,
    title: "Prepare",
    body: "The room, products, tools, and therapist time are arranged around that service before you arrive.",
  },
  {
    icon: Sparkles,
    title: "Treat",
    body: "The session stays private, skin aware, and steady, especially for first time guests or intimate waxing.",
  },
  {
    icon: CheckCircle2,
    title: "Aftercare",
    body: "You leave with simple guidance for your skin instead of vague salon advice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="Private care, without the salon rush."
        subtitle="Wax In The City is built for women who want beauty care to feel careful, clean, and calm."
        image={IMAGES.about.src}
        imageAlt={IMAGES.about.alt}
        size="md"
        priority
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimatedSection variant="slideFromLeft">
            <div className="relative">
              <div className="relative min-h-[520px] overflow-hidden rounded-card bg-brand shadow-[0_30px_90px_rgba(39,19,21,0.16)]">
                <Image
                  src={IMAGES.studio.hygiene}
                  alt="Spotless and sanitized treatment preparation setup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(23,7,11,0.72)_100%)]" />
                <div className="absolute bottom-0 left-0 max-w-sm p-6 text-cream">
                  <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
                    Studio standard
                  </p>
                  <p className="mt-3 font-serif text-h3 leading-tight">
                    Glamour is welcome here. Pressure is not.
                  </p>
                </div>
              </div>
              <div className="absolute -right-4 -top-5 hidden w-44 rounded-[22px] border border-warm-border bg-cream p-4 shadow-card lg:block">
                <Image
                  src={IMAGES.wordmark}
                  alt="Wax In The City wordmark"
                  width={320}
                  height={320}
                  className="h-auto w-full rounded-[6px]"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp">
            <h2 className="max-w-full break-words text-balance font-serif text-4xl font-medium leading-[1.02] text-warm sm:text-6xl lg:text-7xl">
              Built like a private dressing room, run like a careful appointment studio.
            </h2>
            <p className="mt-8 max-w-2xl text-body-lg text-warm-grey text-pretty">
              Comfort, privacy and hygiene are protected at every step — from fresh wax and covered surfaces to a clear, confirmed booking before you travel.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <div key={branch.slug} className="rounded-card border border-warm-border bg-white/58 p-5">
                  <div className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
                    <MapPin className="h-4 w-4" />
                    {branch.name}
                  </div>
                  <p className="mt-3 text-body-sm text-warm-grey text-pretty">{branch.blurb}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="The room rules"
            title="What should feel different when you walk in."
            subtitle="The details are practical because the services are personal."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="h-full rounded-card border border-cream/14 bg-cream/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-card bg-cream text-brand">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-serif text-h3 font-medium text-cream text-balance">{value.title}</h3>
                    <p className="mt-3 text-body-sm leading-relaxed text-cream/72 text-pretty">{value.body}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Care flow"
              title="The appointment has a shape."
              subtitle="A polished studio is not only how it looks. It is how predictable and considered the visit feels."
            />
            <div className="mt-8 flex items-center gap-3 text-body-sm text-warm-grey">
              <Clock3 className="h-5 w-5 text-brand-action" />
              Most requests are confirmed within 24 hours.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CARE_FLOW.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="premium-surface rounded-card p-6">
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-card bg-brand text-cream">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-h2 text-brand-action/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative z-10 mt-5 text-h4 font-semibold text-warm text-balance">{step.title}</h3>
                  <p className="relative z-10 mt-2 text-body-sm text-warm-grey text-pretty">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingZone
        heading="Two studios, one standard of care."
        subtitle="Choose Battaramulla or Nugegoda and tell us what you need before you arrive."
      />
    </>
  );
}
