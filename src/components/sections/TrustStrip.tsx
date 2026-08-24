"use client";

import { motion } from "motion/react";
import { ShieldCheck, Heart, BadgeCheck, Clock3, type LucideIcon } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const ICONS: LucideIcon[] = [ShieldCheck, Heart, BadgeCheck, Clock3];

/** Why-choose-us trust pillars — BeWAXed "Why Choose" adapted: boutique editorial, airy, 4 pillars. */
export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-section-lg text-cream lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      {/* Editorial ghost numeral — BeWAXed airy typography cue, scaled for boutique */}
      <span aria-hidden className="pointer-events-none absolute right-6 top-10 select-none font-serif text-8xl font-light leading-none text-cream/[0.04] sm:text-9xl lg:right-10">
        01
      </span>
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Studio standard"
          title="The difference is quiet detail."
          subtitle="Hygiene you can trust — premium Lycon & Rica, no double dipping, fresh spatula every dip and unhurried timing treated as part of care, not an afterthought."
          tone="light"
        />
        {/* Boutique presence line — echoes BeWAXed regional presence but for 2-studio intimacy */}
        <p className="mx-auto mt-6 max-w-xl text-center text-caption font-medium uppercase tracking-[0.18em] text-cream/45">
          Two studios · One standard · Colombo
        </p>

        {/* BeWAXed-inspired editorial hairline — luxury whitespace, premium pause before pillars */}
        <div className="mx-auto mt-8 h-px w-24 hairline-gradient opacity-60" aria-hidden />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                variants={scaleIn}
                className="group glass-panel micro-lift flex min-h-[308px] flex-col rounded-[20px] p-8 lg:p-7"
              >
                <div className="flex items-start justify-between">
                  <motion.span
                    initial={{ rotate: -8 }}
                    whileInView={{ rotate: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-cream/12 bg-gradient-to-br from-cream/[0.14] to-cream/[0.06] text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.03] will-change-transform"
                  >
                    <Icon className="h-[26px] w-[26px]" strokeWidth={1.75} />
                  </motion.span>
                  <span className="font-serif text-[2rem] font-light leading-none tracking-[-0.03em] text-cream/[0.14]">
                    0{i + 1}
                  </span>
                </div>
                {/* BeWAXed editorial micro-divider — airy, serif-aligned */}
                <div
                  className="mt-7 h-px w-10 bg-gradient-to-r from-gold/70 to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14"
                  aria-hidden
                />
                <h3 className="mt-4 font-serif text-[1.32rem] font-medium leading-[1.18] tracking-[-0.015em] text-cream text-balance">{pillar.title}</h3>
                <p className="mt-3 text-body-sm leading-[1.7] text-cream/72 text-pretty">{pillar.body}</p>
                <div className="mt-auto pt-7">
                  <div className="h-px w-full bg-cream/10">
                    <div className="h-px w-10 bg-gold/80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:bg-gold" />
                  </div>
                  <span className="mt-3 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cream/40">
                    Studio pillar · 0{i + 1} / 04
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BeWAXed aftercare retention echo — next appointment + aftercare impossible to miss */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-body-sm leading-relaxed text-cream/52 text-pretty">
          Aftercare guidance before you leave · Next-visit timing noted · Quiet, private rooms — never rushed.
        </p>
      </div>
    </section>
  );
}
