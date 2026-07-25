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
    <section id="reviews" className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <SectionHeading
            eyebrow="What guests notice"
            showEyebrow={false}
            title="The proof is not loud. It is consistent."
            subtitle="Across guest feedback, the same signals keep showing up: clean process, gentle handling, and careful product choice."
            align="left"
          />
          <p className="mt-4 max-w-xl text-caption text-warm-grey/80">
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
              className="premium-surface micro-lift grid gap-4 rounded-card p-5 sm:grid-cols-[72px_1fr] sm:p-6"
            >
              <span className="relative z-10 font-serif text-[2.5rem] font-medium leading-none text-brand-action">
                0{i + 1}
              </span>
              <div className="relative z-10">
                <h3 className="text-h4 font-semibold text-warm">{theme.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey">{theme.body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center gap-3">
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
