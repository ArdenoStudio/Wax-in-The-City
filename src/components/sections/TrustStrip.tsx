"use client";

import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, Clock3, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS, REVIEW_THEMES } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, fadeUp, staggerFast, viewportOnce } from "@/lib/animations";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, Clock3];

/** Trust pillars + public review themes in one section. */
export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(53,16,23,0.76),rgba(21,16,17,0.96)_52%,rgba(19,9,13,1))]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="The difference is quiet detail."
          subtitle="Hygiene, timing and comfort are treated as part of the appointment, not an afterthought."
          tone="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="group surface-dark flex min-h-[250px] flex-col rounded-card p-6"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-card bg-cream/10 text-gold">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-8 text-h4 font-semibold text-cream">{pillar.title}</h3>
                <p className="mt-3 text-body-sm text-cream/64">{pillar.body}</p>
                <div className="mt-auto pt-8">
                  <div className="h-px w-full bg-cream/10">
                    <div className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 border-t border-cream/10 pt-14">
          <h3 className="max-w-xl font-serif text-h2 font-medium leading-tight text-cream">
            The proof is not loud. It is consistent.
          </h3>
          <p className="mt-4 max-w-xl text-body-lg text-cream/70">
            Across public reviews, the same signals keep showing up: clean process,
            gentle handling, and careful product choice.
          </p>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 grid gap-3 lg:grid-cols-3"
          >
            {REVIEW_THEMES.map((theme) => (
              <motion.article
                key={theme.title}
                variants={fadeUp}
                className="surface-dark rounded-card p-5 sm:p-6"
              >
                <h4 className="text-h4 font-semibold text-cream">{theme.title}</h4>
                <p className="mt-2 text-body-sm text-cream/64">{theme.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
