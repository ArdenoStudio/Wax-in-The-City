"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, Clock3, ArrowRight, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, Clock3];

/** Hygiene gold; private rooms cream; skin/after-care sage; timing pearl. */
const ICON_TONES = [
  "text-gold",
  "text-brand-light",
  "text-sage",
  "text-cream",
] as const;

/** Why-choose-us trust pillars — Cult panel fields, less glass. */
export function TrustStrip() {
  return (
    <section id="trust" className="relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(43,7,16,0.92),rgba(21,16,17,0.98)_55%,rgba(18,6,10,1))]" />
      <div className="relative mx-auto max-w-[72rem]">
        <SectionHeading
          eyebrow="Studio standard"
          showEyebrow={false}
          title="The difference is quiet detail."
          subtitle="Hygiene, timing and comfort are treated as part of the appointment, not an afterthought."
          tone="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="ease-[var(--ease-apple)] group flex min-h-[230px] flex-col rounded-card-lg border border-cream/24 bg-cream/[0.06] p-6 transition-colors duration-300 hover:border-cream/16 hover:bg-cream/[0.07] sm:p-6"
              >
                <span
                  className={cn(
                    "ease-[var(--ease-apple)] flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-cream/24 bg-cream/[0.08] transition-transform duration-300 group-hover:scale-[1.03]",
                    ICON_TONES[i] ?? "text-brand-light"
                  )}
                >
                  <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} />
                </span>
                <h3 className="text-balance mt-7 font-display text-h4 font-semibold tracking-[-0.024em] text-cream">
                  {pillar.title}
                </h3>
                <p className="tracking-[-0.011em] text-pretty mt-2.5 font-sans text-body-sm leading-[1.7] text-cream">
                  {pillar.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 border-t border-cream/24 pt-6">
          <p className="text-center font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-cream-muted">
            Studio standard
          </p>
          <p className="mt-4 text-center">
            <Link
              href="/faq"
              className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty inline-flex items-center gap-2.5 font-sans text-body-sm font-semibold text-sage transition-colors duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/45 focus-visible:ring-offset-[3px] focus-visible:ring-offset-ink"
            >
              Hygiene &amp; room prep questions
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
