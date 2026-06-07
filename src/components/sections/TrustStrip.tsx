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
    <section className="bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Studio standard"
          title="The difference is in the details."
          subtitle="A polished salon site should not just look premium. It should make the hygiene and comfort standard obvious before anyone books."
          tone="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 border border-cream/12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="flex min-h-[230px] flex-col border-b border-cream/12 bg-white/[0.03] px-6 py-8 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
              >
                <motion.span
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex h-14 w-14 items-center justify-center rounded-pill bg-cream/10 text-gold"
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-8 font-serif text-h3 text-cream">{pillar.title}</h3>
                <p className="mt-3 text-body-sm text-cream/64">{pillar.body}</p>
                <span className="mt-auto pt-8 text-caption font-semibold uppercase tracking-[0.14em] text-brand-light">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
