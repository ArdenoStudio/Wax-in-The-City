import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { MarqueeStrip } from "@/components/ui/marquee-strip";
import { IMAGES } from "@/lib/images";
import { BRANCHES } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "A studio built by women, for women. The story and values behind Wax In The City — honest, private, genuinely kind beauty care in Colombo.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Hygiene is visible",
    body: "Fresh wax handling, clean tools, prepared surfaces, and clear after-care are treated as normal, not as a premium add-on.",
  },
  {
    icon: Heart,
    title: "Privacy stays protected",
    body: "Ladies-only rooms, appointment-led timing, and calm conversation make sensitive services feel less intimidating.",
  },
  {
    icon: Sparkles,
    title: "Advice stays practical",
    body: "The team should help you choose what suits your skin and timing, not push the biggest treatment on the menu.",
  },
];

const CARE_JOURNEY = [
  {
    title: "Arrive",
    body: "Check in calmly — the room is prepared for your service, not a walk-in queue.",
  },
  {
    title: "Prep",
    body: "Skin and timing are checked so the treatment can stay careful and unhurried.",
  },
  {
    title: "Care",
    body: "The session stays private and skin-aware, especially for first-timers or intimate waxing.",
  },
  {
    title: "After-care",
    body: "You leave with simple guidance for your skin instead of vague salon advice.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="Private care, without the salon rush."
        subtitle="Wax In The City is built for women who want beauty care to feel careful, clean, and calm."
        image={IMAGES.socialProof.src}
        imageAlt={IMAGES.socialProof.alt}
        size="md"
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimatedSection variant="slideFromLeft">
            <div className="relative">
              <div className="relative min-h-[520px] overflow-hidden rounded-card bg-brand shadow-[0_30px_90px_rgba(39,19,21,0.16)]">
                <Image
                  src={IMAGES.about.src}
                  alt={IMAGES.about.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[50%_20%]"
                  unoptimized
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
              <div className="absolute -right-4 -top-5 hidden w-44 rounded-card border border-warm-border bg-cream p-4 shadow-card lg:block">
                <Image
                  src={IMAGES.wordmark}
                  alt="Wax In The City wordmark"
                  width={320}
                  height={120}
                  className="h-auto w-full rounded-[6px]"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp">
            <p className="max-w-full break-words text-balance font-serif text-[clamp(2rem,9vw,4.9rem)] font-medium leading-[1.02] text-warm">
              Built like a private dressing room, run like a careful appointment studio.
            </p>
            <p className="mt-8 max-w-2xl text-body-lg text-warm-grey">
              The site should say what the studio is trying to protect: comfort, privacy, hygiene, and trust before the first strip of wax or skincare product touches skin. That is why the appointment flow is quieter than a walk-in salon and why sensitive services are handled with more context.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <Link
                  key={branch.slug}
                  href={`/locations/${branch.slug}`}
                  className="rounded-card border border-warm-border bg-white/58 p-5 transition-colors hover:border-brand-action/35 hover:bg-brand-mist/40"
                >
                  <div className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
                    <MapPin className="h-4 w-4" />
                    {branch.name}
                  </div>
                  <p className="mt-3 text-body-sm text-warm-grey">{branch.blurb}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,179,95,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,214,222,0.15),transparent_28%)]" />
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
                    <h3 className="mt-6 font-serif text-h3 font-medium text-cream">{value.title}</h3>
                    <p className="mt-3 text-body-sm leading-relaxed text-cream/72">{value.body}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="left"
            eyebrow="Care journey"
            title="Arrive → Prep → Care → After-care."
            subtitle="A quiet sequence — muted wine and gold — so the visit feels predictable without feeling theatrical."
          />
          <p className="mt-4 max-w-xl text-body-sm text-warm-grey">
            Most requests are reviewed the same day when possible; allow up to about a day for confirmation if the diary is full.
          </p>

          <ol className="relative mt-12 space-y-0">
            <div
              aria-hidden
              className="absolute bottom-3 left-[0.55rem] top-3 w-px bg-[linear-gradient(180deg,rgba(217,179,95,0.55),rgba(162,15,55,0.35),rgba(217,179,95,0.2))]"
            />
            {CARE_JOURNEY.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                <span className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d9b35f]/70 bg-cream">
                  <span className="h-2 w-2 rounded-full bg-brand-action/80" />
                </span>
                <div>
                  <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-serif text-h3 text-warm">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-body-sm text-warm-grey">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BookingZone
        heading="Visit the studio that fits your day."
        subtitle="Choose Battaramulla or Nugegoda and tell us what you need before you arrive."
      />
    </>
  );
}
