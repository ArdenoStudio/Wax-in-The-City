import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { MarqueeStrip } from "@/components/ui/marquee-strip";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "A studio built by women, for women. The story and values behind Wax In The City — honest, private, genuinely kind beauty care in Colombo.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety",
    body: "Fresh wax and clean tools for every guest. Hygiene isn't a feature — it's the baseline.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    body: "No false promises, no hard sell. We tell you the truth and do careful work.",
  },
  {
    icon: Sparkles,
    title: "Care",
    body: "A private, ladies-only space where you can genuinely relax, every visit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A studio built for women."
        subtitle="The people and the promise behind Wax In The City."
        image={IMAGES.about.src}
        imageAlt="The warm, welcoming Wax In The City studio"
      />

      {/* Founder story */}
      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection variant="slideFromLeft">
            <div className="group premium-surface micro-lift relative aspect-[4/5] overflow-hidden rounded-card p-2">
              <div className="relative z-10 h-full overflow-hidden rounded-[7px]">
                <Image
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1100&auto=format&fit=crop"
                  alt="A calm corner of the studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="image-polish object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/26 via-transparent to-transparent" />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp">
            <span className="text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
              How we started
            </span>
            <blockquote className="mt-5 font-serif text-h2 font-light italic leading-snug text-warm">
              “I wanted a place where any woman could feel completely at ease — no
              judgement, no shortcuts, just genuine care.”
            </blockquote>
            <p className="mt-6 text-body-lg text-warm-grey">
              Wax In The City began with a simple frustration — beauty care in
              Colombo too often felt rushed, impersonal, or careless about hygiene.
              We set out to build the opposite: a warm, private, ladies-only studio
              where fresh wax, clean tools and honest advice are never optional.
            </p>
            <p className="mt-4 text-body-lg text-warm-grey">
              Today we welcome guests across two branches in Battaramulla and
              Nugegoda — and the promise is the same at both.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <MarqueeStrip />

      {/* Stats */}
      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-5xl">
          <StatsCounter />
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What we stand for"
            title="Three things we never compromise."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} variant="fadeUp" delay={i * 0.08}>
                  <div className="premium-surface micro-lift flex h-full flex-col items-center rounded-card px-6 py-9 text-center">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-card bg-brand-mist text-brand-action shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="relative z-10 mt-5 text-h4 font-semibold text-warm">{value.title}</h3>
                    <p className="relative z-10 mt-2 text-body-sm text-warm-grey">{value.body}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <BookingZone heading="Come visit us." />
    </>
  );
}
