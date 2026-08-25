"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { IMAGES } from "@/lib/images";

const BeforeAfterSlider = dynamic(
  () => import("./BeforeAfterSlider").then((mod) => mod.BeforeAfterSlider),
  {
    ssr: false,
    loading: () => <div className="aspect-[4/3] bg-brand/10 animate-pulse rounded-card" />,
  }
);

const PROOF_POINTS = [
  "Private room and prep before treatment starts",
  "Clear aftercare guidance before you leave",
  "Approved result photos can replace this panel later",
] as const;

export function BeforeAfterShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-70" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-pill border border-cream/14 bg-cream/8 px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-light">
            <Sparkles className="h-4 w-4" />
            Studio standard
          </div>
          <h2 className="mt-6 max-w-xl text-balance font-serif text-h1 font-medium leading-tight text-cream sm:text-display">
            The studio standard.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-body-lg text-cream/72">
            Slide between two sides of the same promise: a room freshly
            prepared before you arrive, and the brand behind every product we
            use. No stock result photos, no promises we cannot show.
          </p>

          <ul className="mt-7 grid gap-3">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-card border border-cream/12 bg-cream/[0.055] p-3 text-body-sm text-cream/76"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/services/waxing"
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-cream px-6 py-3 text-body-sm font-medium text-brand shadow-[0_14px_34px_rgba(162,15,55,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light"
          >
            See treatment flow
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute -inset-4 rounded-[34px] border border-cream/10 bg-cream/[0.045]" />
          <BeforeAfterSlider
            beforeSrc={IMAGES.beforeAfter.waxing.before}
            afterSrc={IMAGES.beforeAfter.waxing.after}
            beforeAlt="Treatment room prepared with fresh single-use linen in a private studio room — hygienic setup before a waxing appointment"
            afterAlt="Waxing in progress — precise gloved application on skin with fresh spatula protocol at the Battaramulla studio"
            beforeLabel="Fresh prep"
            afterLabel="The treatment"
          />
        </div>
      </div>
    </section>
  );
}
