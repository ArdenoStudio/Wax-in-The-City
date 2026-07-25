"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { REVIEW_THEMES } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/animations";

/**
 * Review theme section. Avoids shipping fake client testimonials
 * while still making the strongest social-proof themes visible.
 * No star ratings — themes with editorial index only (not scores).
 */
export function ReviewThemes() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-cream px-6 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="What guests notice"
            showEyebrow={false}
            title="The proof is not loud. It is consistent."
            subtitle="Across guest feedback, the same signals keep showing up: clean process, gentle handling, and careful product choice."
            align="left"
          />
          <p className="mt-4 max-w-xl font-sans text-caption leading-snug text-warm-grey/75">
            Themes summarised from public feedback — not individual quotes or star ratings.
          </p>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-3"
        >
          {REVIEW_THEMES.map((theme, i) => (
            <motion.article
              key={theme.title}
              variants={fadeUp}
              className="ease-[var(--ease-apple)] grid gap-4 rounded-card border border-warm-border/80 bg-white/65 p-4 transition-colors duration-300 hover:border-warm-border hover:bg-white/90 sm:grid-cols-[56px_1fr] sm:gap-4 sm:p-5"
            >
              <span className="text-balance font-display text-[clamp(1.75rem,3.2vw,2rem)] font-semibold leading-[0.96] tracking-[-0.032em] text-brand-action/55 sm:text-[2.25rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-balance font-display text-h4 font-semibold tracking-[-0.024em] text-warm">
                  {theme.title}
                </h3>
                <p className="tracking-[-0.011em] text-pretty mt-1.5 font-sans text-body-sm leading-[1.7] text-warm-grey">
                  {theme.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[72rem] flex-wrap items-center gap-3.5">
        <Button asChild variant="outline" size="md">
          <Link href="/faq">Hygiene FAQ</Link>
        </Button>
        <Button asChild variant="link" size="md">
          <Link href="/gallery">Gallery</Link>
        </Button>
      </div>
    </section>
  );
}
