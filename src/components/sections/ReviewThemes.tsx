"use client";

import { motion } from "motion/react";
import { REVIEW_THEMES } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerFast, viewportOnce } from "@/lib/animations";

/**
 * Public review theme section. This avoids shipping fake client testimonials
 * while still making the strongest social-proof themes visible.
 */
export function ReviewThemes() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <SectionHeading
          eyebrow="Public review themes"
          title="The proof is not loud. It is consistent."
          subtitle="Across public reviews, the same signals keep showing up: clean process, gentle handling, and careful product choice."
          align="left"
        />

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
              className="premium-surface micro-lift grid gap-4 rounded-card p-5 sm:grid-cols-[72px_1fr] sm:p-6"
            >
              <span className="relative z-10 font-serif text-h1 font-medium leading-none text-brand-action">
                0{i + 1}
              </span>
              <div className="relative z-10">
                <h3 className="text-h4 font-semibold text-warm text-balance">{theme.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey text-pretty">{theme.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
