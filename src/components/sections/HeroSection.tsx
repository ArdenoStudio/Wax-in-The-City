"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, CalendarDays, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARE_STANDARDS, HOMEPAGE_STATS } from "@/lib/site";

const HEADLINE_LINES = ["Private waxing,", "quietly perfected."];

export function HeroSection() {
  const reduce = useReducedMotion();

  const charVariant: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.52, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.2 + i * 0.028 },
    }),
  };

  return (
    <section className="relative flex min-h-[760px] w-full items-end overflow-hidden bg-ink text-cream">
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop"
          alt="A warm, calm treatment room at Wax In The City"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[62%_center] saturate-[0.94]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.82)_42%,rgba(35,12,17,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,transparent_42%,rgba(21,16,17,0.82)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/64 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-24 pt-28 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-pill border border-cream/18 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4" />
            Ladies-only private studio · Colombo
          </motion.p>

          <h1 className="font-serif text-[3.55rem] font-medium leading-[1.0] text-cream sm:text-[5.2rem] lg:text-[6.35rem]">
            {(() => {
              let ci = 0;
              return HEADLINE_LINES.map((line, li) => (
                <span key={li} className="block overflow-hidden pb-[0.06em]">
                  {line.split(" ").map((word, wi, arr) => (
                    <span key={wi}>
                      <span className="inline-block whitespace-nowrap">
                        {word.split("").map((char) => {
                          const idx = ci++;
                          return (
                            <motion.span
                              key={idx}
                              custom={idx}
                              variants={charVariant}
                              initial="hidden"
                              animate="visible"
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </span>
                      {wi < arr.length - 1 && " "}
                    </span>
                  ))}
                </span>
              ));
            })()}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-balance text-body-lg text-cream/78"
          >
            A calmer appointment experience for waxing, facials and skin care,
            designed around privacy, prep, hygiene and after-care that feels
            considered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/book"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-8 text-body-lg font-medium text-cream shadow-[0_18px_48px_rgba(151,35,58,0.36)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_64px_rgba(151,35,58,0.42)]"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Book Your Visit
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] motion-safe:animate-[witc-shimmer_3.2s_ease-in-out_infinite]" />
            </Link>
            <Button asChild variant="ghost" size="lg">
              <Link href="/services">
                View Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-card sm:grid-cols-4"
          >
            {HOMEPAGE_STATS.map((stat) => (
              <div key={stat.label} className="bg-ink/36 px-4 py-4">
                <dt className="text-caption uppercase tracking-[0.12em] text-cream/50">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-h4 font-semibold text-cream">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.78, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel animate-float-soft hidden self-end rounded-card p-6 lg:block"
        >
          <div className="flex items-center justify-between border-b border-cream/12 pb-5">
            <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-light">
              Studio protocol
            </p>
            <span className="rounded-pill bg-cream/10 px-3 py-1 text-caption text-cream/70">
              04 steps
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {CARE_STANDARDS.map((item) => (
              <li key={item} className="group flex gap-3 rounded-card bg-cream/[0.055] p-3 text-body-sm leading-relaxed text-cream/76 transition-colors hover:bg-cream/[0.085]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-cream/12 pt-5 font-serif text-h4 italic text-cream">
            Specialist care without the awkward salon-floor feeling.
          </p>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-pill border border-cream/16 bg-cream/8 backdrop-blur-xl">
          <ChevronDown className="h-5 w-5 animate-bob text-cream/70" />
        </span>
      </motion.div>
    </section>
  );
}
