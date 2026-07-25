import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { CareJourney } from "@/components/sections/CareJourney";
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

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-55" />
        <div className="mx-auto grid max-w-[72rem] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimatedSection variant="slideFromLeft">
            <div className="relative">
              <div className="relative min-h-[480px] overflow-hidden rounded-card-lg bg-brand shadow-card-hover sm:min-h-[520px]">
                <Image
                  src={IMAGES.about.src}
                  alt={IMAGES.about.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[50%_20%]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(23,7,11,0.74)_100%)]" />
                <div className="absolute bottom-0 left-0 max-w-sm p-6 text-cream">
                  <p className="eyebrow-label-light">Studio standard</p>
                  <p className="text-balance mt-3 font-display text-h3 font-semibold tracking-display leading-[1.1]">
                    Glamour is welcome here. Pressure is not.
                  </p>
                </div>
              </div>
              <div className="absolute -right-4 -top-5 hidden w-40 rounded-card border border-warm-border bg-cream p-5 shadow-card lg:block">
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
            <p className="min-w-0 max-w-full break-words text-balance font-display text-[clamp(1.85rem,8vw,3.6rem)] font-semibold leading-[1.05] tracking-tight-display text-warm">
              Built like a private dressing room, run like a careful appointment studio.
            </p>
            <p className="tracking-[-0.011em] font-sans mt-7 max-w-2xl text-pretty text-body-lg text-warm-grey">
              The site should say what the studio is trying to protect: comfort, privacy, hygiene, and trust before the first strip of wax or skincare product touches skin. That is why the appointment flow is quieter than a walk-in salon and why sensitive services are handled with more context.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <Link
                  key={branch.slug}
                  href={`/locations/${branch.slug}`}
                  className="ease-[var(--ease-apple)] rounded-card border border-warm-border/75 bg-cream-alt/90 p-5 transition-colors duration-300 hover:border-brand-action/25 hover:bg-brand-mist/45"
                >
                  <div className="flex items-center gap-2.5 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-action">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {branch.name}
                  </div>
                  <p className="tracking-[-0.011em] font-sans mt-3 text-pretty text-body-sm text-warm-grey">{branch.blurb}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,179,95,0.2),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,214,222,0.13),transparent_28%)]" />
        <div className="relative mx-auto max-w-[72rem]">
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="The room rules"
            title="What should feel different when you walk in."
            subtitle="The details are practical because the services are personal."
          />
          <div className="mt-12 grid gap-3.5 lg:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="h-full rounded-card border border-cream/24 bg-cream/[0.08] p-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-cream text-brand">
                      <Icon className="h-6 w-6 shrink-0" />
                    </span>
                    <h3 className="text-balance mt-6 font-display text-h3 font-semibold tracking-display text-cream">
                      {value.title}
                    </h3>
                    <p className="tracking-[-0.011em] font-sans mt-3 text-pretty text-body-sm leading-[1.7] text-cream">
                      {value.body}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <CareJourney />

      <BookingZone
        heading="Visit the studio that fits your day."
        subtitle="Choose Battaramulla or Nugegoda and tell us what you need before you arrive."
      />
    </>
  );
}
