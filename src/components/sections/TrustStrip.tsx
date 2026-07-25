"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, Clock3, ArrowRight, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, Clock3];

/** Why-choose-us trust pillars (file 08, section 06). Clear, lightly animated. */
export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(53,16,23,0.76),rgba(21,16,17,0.96)_52%,rgba(19,9,13,1))]" />
      <div className="relative mx-auto max-w-7xl">
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
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="group glass-panel micro-lift flex min-h-[250px] flex-col rounded-card p-6"
              >
                <motion.span
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex h-14 w-14 items-center justify-center rounded-card bg-cream/10 text-gold transition-transform duration-500 group-hover:scale-105"
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-8 font-serif text-h4 font-medium text-cream">{pillar.title}</h3>
                <p className="mt-3 text-body-sm text-cream/64">{pillar.body}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 border-t border-cream/12 pt-6">
          <p className="text-center text-caption font-semibold uppercase tracking-[0.14em] text-cream/45">
            Studio standard
          </p>
          <p className="mt-4 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-sage transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Hygiene &amp; room prep questions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
