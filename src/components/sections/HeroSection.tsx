"use client";

import { EASE_APPLE } from "@/lib/animations";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { IMAGES, VIDEOS, BLUR_DATA_URL } from "@/lib/images";
import { CARE_STANDARDS } from "@/lib/site";
import { VideoLoop } from "@/components/ui/video-loop";

const HEADLINE_LINES = ["Private", "waxing,", "quietly", "perfected."];
// BeWAXed-inspired luxury triad — boutique adaptation of "Luxurious. Effective. Conscious."
// WITC voice: calm, deliberate, editorial — not chain-scale boasting.
const HERO_TRUST_POINTS = ["Hygiene you can trust", "Fresh wax setup", "Private rooms", "Premium products"];
const HERO_DESCRIPTOR = "Private · Precise · Considered";

function scrollToServices() {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] sm:min-h-[760px] w-full items-end overflow-hidden bg-ink text-cream">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_APPLE }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center saturate-[0.94]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.82)_42%,rgba(35,12,17,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,transparent_42%,rgba(21,16,17,0.82)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/64 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-24 pt-28 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8 lg:pb-24">
        <div className="min-w-0 max-w-3xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: reduceMotion ? 0 : 0.04, ease: EASE_APPLE }}
            className="mb-6 inline-flex items-center gap-2 rounded-pill border border-cream/18 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl text-pretty will-change-transform"
          >
            <Sparkles className="h-4 w-4" />
            Ladies only · Battaramulla & Nugegoda · Colombo
          </motion.p>

          <h1 className="max-w-[10ch] text-balance font-serif text-5xl font-medium leading-[0.92] bg-gradient-to-r from-cream via-pearl-blush to-cream/90 bg-clip-text text-transparent sm:text-7xl lg:text-8xl">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line}
                className="block leading-[1.02] will-change-transform"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.46,
                  delay: reduceMotion ? 0 : 0.05 + i * 0.03,
                  ease: EASE_APPLE,
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* BeWAXed-inspired editorial triad: airy luxury credential, boutique-scaled vs chain */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.12, ease: EASE_APPLE }}
            className="mt-5 inline-flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light/90 will-change-transform"
          >
            <span className="hidden h-px w-8 bg-brand-light/50 sm:block" aria-hidden />
            {HERO_DESCRIPTOR}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.16, ease: EASE_APPLE }}
            className="mt-4 w-full max-w-[34rem] text-pretty text-body-lg leading-relaxed text-cream/90 will-change-transform"
          >
            Luxurious where it matters, considered everywhere else. Waxing,
            facials and skin care shaped around privacy, fresh preparation and
            aftercare that feels unhurried — never rushed.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.2, ease: EASE_APPLE }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center will-change-transform"
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="primary" className="w-full sm:w-auto shadow-[0_14px_34px_rgba(162,15,55,0.35)]">
                <Link href="/book">
                  <CalendarDays className="h-5 w-5" />
                  Book Your Visit
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto border border-cream/20 bg-cream/5 text-cream hover:bg-cream/15">
                <Link href="/services">
                  View Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.ul
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: reduceMotion ? 0 : 0.22, ease: EASE_APPLE }}
            className="mt-10 flex max-w-2xl flex-wrap gap-2 will-change-transform"
          >
            {HERO_TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="pressable rounded-pill border border-cream/20 bg-cream/12 px-4 py-2 text-body-sm font-semibold text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl"
              >
                {point}
              </li>
            ))}
          </motion.ul>

          {/* Mobile studio protocol — full parity with desktop */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: reduceMotion ? 0 : 0.26, ease: EASE_APPLE }}
            className="mt-8 lg:hidden will-change-transform"
          >
            <div className="glass-panel overflow-hidden rounded-2xl p-5 shadow-card border border-cream/15 bg-ink/75 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-cream/14 pb-3">
                <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-light text-pretty">
                  Studio protocol
                </p>
                <span className="rounded-pill bg-cream/12 px-2.5 py-0.5 text-caption font-semibold text-cream">
                  04 standards
                </span>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-cream/15">
                <VideoLoop
                  src={VIDEOS.brandSting.src}
                  poster={VIDEOS.brandSting.poster}
                  alt={VIDEOS.brandSting.alt}
                  className="aspect-[16/9] w-full"
                />
              </div>
              <ul className="mt-4 space-y-2.5">
                {CARE_STANDARDS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 rounded-card bg-cream/[0.08] p-3 text-body-sm leading-relaxed text-cream font-normal"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-cream/14 pt-3 font-serif text-body font-medium text-cream text-pretty">
                Specialist care without the busy salon floor.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.44, delay: reduceMotion ? 0 : 0.16, ease: EASE_APPLE }}
          className={`glass-panel hidden self-end rounded-2xl p-6 lg:block will-change-transform ${reduceMotion ? "" : "animate-float-soft"}`}
        >
          <div className="flex items-center justify-between border-b border-cream/12 pb-5">
            <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-light text-pretty">
              Studio protocol
            </p>
            <span className="rounded-pill bg-cream/10 px-3 py-1 text-caption text-cream/70">
              04 steps
            </span>
          </div>
          <VideoLoop
            src={VIDEOS.brandSting.src}
            poster={VIDEOS.brandSting.poster}
            alt={VIDEOS.brandSting.alt}
            className="mt-5 aspect-[6/5] w-full rounded-none border border-cream/12"
          />
          <ul className="mt-5 space-y-3">
            {CARE_STANDARDS.map((item) => (
              <li key={item} className="group flex gap-3 rounded-card bg-cream/[0.055] p-3 text-body-sm leading-relaxed text-cream/76 transition-colors hover:bg-cream/[0.085]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-cream/12 pt-5 font-serif text-h4 font-medium text-cream text-pretty">
            Specialist care without the busy salon floor.
          </p>
        </motion.aside>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32, delay: reduceMotion ? 0 : 0.3, ease: EASE_APPLE }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <button
          type="button"
          onClick={scrollToServices}
          aria-label="Scroll to services"
          className="pressable flex h-10 w-10 items-center justify-center rounded-pill border border-cream/16 bg-cream/8 backdrop-blur-xl hover:bg-cream/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40"
        >
          <ChevronDown className={`h-5 w-5 text-cream/70 ${reduceMotion ? "" : "animate-bob"}`} />
        </button>
      </motion.div>
    </section>
  );
}
