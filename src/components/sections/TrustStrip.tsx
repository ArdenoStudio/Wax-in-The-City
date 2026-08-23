"use client";

import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, Clock3, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, Clock3];

/** Why-choose-us trust pillars (file 08, section 06). Clear, lightly animated. */
export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Studio standard"
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
                className="group glass-panel micro-lift flex min-h-[250px] flex-col rounded-2xl p-6"
              >
                <motion.span
                  initial={{ rotate: -8 }}
                  whileInView={{ rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-14 w-14 items-center justify-center rounded-card bg-cream/10 text-gold transition-transform duration-500 group-hover:scale-105 will-change-transform"
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-8 text-h4 font-semibold text-cream text-balance">{pillar.title}</h3>
                <p className="mt-3 text-body-sm text-cream/90 text-pretty">{pillar.body}</p>
                <div className="mt-auto pt-8">
                  <div className="h-px w-full bg-cream/10">
                    <div className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                  </div>
                  <span className="mt-4 block text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
                    0{i + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
