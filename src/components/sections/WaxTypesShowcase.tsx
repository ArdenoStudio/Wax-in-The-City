"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, CheckCircle2, HeartHandshake } from "lucide-react";
import { IMAGES } from "@/lib/images";

const WAX_CARDS = [
  {
    key: "lycon",
    data: IMAGES.waxProducts.lycon,
    borderAccent: "border-rose-300/40 hover:border-rose-400/60",
    badgeBg: "bg-rose-500/10 text-rose-700 border-rose-200/60",
    glowColor: "from-rose-500/10 via-pink-500/5 to-transparent",
    benefits: [
      "Shrink wrap technology (holds hair, not skin)",
      "Soothing chamomile & rose extract",
      "Strict zero double dipping protocol",
    ],
  },
  {
    key: "rica",
    data: IMAGES.waxProducts.rica,
    borderAccent: "border-amber-300/40 hover:border-amber-400/60",
    badgeBg: "bg-amber-500/10 text-amber-800 border-amber-200/60",
    glowColor: "from-amber-500/10 via-orange-500/5 to-transparent",
    benefits: [
      "98% natural origin, colophony & petroleum free",
      "Enriched with Theobroma Cacao butter",
      "Flawless grip on fine and coarse body hair",
    ],
  },
  {
    key: "brazilGold",
    data: IMAGES.waxProducts.brazilGold,
    borderAccent: "border-yellow-300/40 hover:border-yellow-400/60",
    badgeBg: "bg-yellow-500/10 text-yellow-800 border-yellow-200/60",
    glowColor: "from-yellow-500/10 via-amber-500/5 to-transparent",
    benefits: [
      "Smooth golden polymer formula with honey",
      "Reliable, clean hair removal across body areas",
      "Exceptional value for routine waxing visits",
    ],
  },
];

export function WaxTypesShowcase() {
  return (
    <section className="relative">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-pill border border-brand-action/25 bg-brand-mist/50 px-3.5 py-1 text-caption font-semibold uppercase tracking-[0.14em] text-brand-action">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Our Signature Formulas</span>
        </div>
        <h2 className="mt-3 font-serif text-h2 font-medium text-warm text-balance">
          The Three Wax Types We Use
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-body text-warm-grey text-pretty">
          Every treatment area has unique skin sensitivity. We carefully match our official
          imported and salon standard waxes to ensure gentle comfort and flawless smoothness.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {WAX_CARDS.map(({ key, data, borderAccent, badgeBg, glowColor, benefits }, idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${borderAccent} bg-white/70 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover`}
          >
            {/* Soft Ambient Glow */}
            <div
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${glowColor} blur-2xl transition-opacity group-hover:opacity-100`}
            />

            <div>
              {/* Product Header & Origin */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-caption font-semibold tracking-wide ${badgeBg}`}
                >
                  <span>{data.flag}</span>
                  <span>{data.origin}</span>
                </span>
                <span className="text-caption font-medium text-warm-grey/80">
                  {data.type}
                </span>
              </div>

              {/* Official Product Image Box */}
              <div className="relative my-5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-warm-border/50 bg-gradient-to-b from-cream/60 to-white/90 p-4 shadow-[inset_0_1px_3px_rgba(27,14,16,0.04)]">
                <div className="relative h-full w-full">
                  <Image
                    src={data.src}
                    alt={data.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                </div>
              </div>

              {/* Brand & Formula Title */}
              <div>
                <h3 className="font-serif text-h3 font-medium text-warm text-balance">
                  {data.brand}
                </h3>
                <p className="mt-0.5 text-body-sm font-semibold text-brand-action">
                  {data.formula}
                </p>
                <p className="mt-2 text-body-sm text-warm-grey text-pretty leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="mt-4 space-y-2 border-t border-warm-border/50 pt-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-caption text-warm font-medium">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-action" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Recommended Treatment Areas */}
            <div className="mt-6 border-t border-warm-border/60 pt-4">
              <span className="text-caption font-bold uppercase tracking-[0.1em] text-warm-grey">
                Recommended For:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-pill border border-warm-border bg-brand-mist/40 px-2.5 py-1 text-caption font-medium text-warm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hygiene Promise Banner */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-warm-border/70 bg-white/50 p-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-action/10 text-brand-action">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-body-sm font-semibold text-warm">
              Strict Zero Double Dipping Protocol
            </p>
            <p className="text-caption text-warm-grey">
              Every dip uses a brand new, single-use wooden spatula. Cleanliness and client hygiene come first in every room.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-caption font-medium text-brand-action">
          <HeartHandshake className="h-4 w-4" />
          <span>Tailored to Your Sensitivity</span>
        </div>
      </div>
    </section>
  );
}
