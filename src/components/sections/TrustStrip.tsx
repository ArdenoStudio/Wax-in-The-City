"use client";

import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, MapPin, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, MapPin];

/** Why-choose-us trust pillars (file 08, section 06). Clear, lightly animated. */
export function TrustStrip() {
  return (
    <section className="bg-cream px-5 py-section lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why guests trust us"
          title="The difference is in the details."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="flex flex-col items-center rounded-card-lg border border-warm-border bg-cream-alt/60 px-5 py-8 text-center"
              >
                <motion.span
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand-mist text-brand-action"
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-5 font-serif text-h3 text-warm">{pillar.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey">{pillar.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
