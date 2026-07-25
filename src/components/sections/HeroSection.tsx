"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsappIcon } from "@/components/icons";
import { IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { CARE_STANDARDS, whatsappLink } from "@/lib/site";

const HEADLINE_LINES = ["Private", "waxing,", "quietly", "perfected."];
const HERO_TRUST_POINTS = ["Fresh wax setup", "Private rooms", "Confirmation first"];

function scrollToServices() {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-ink text-cream">
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          unoptimized={IMAGES.hero.src.startsWith("http")}
          className="object-cover object-[58%_center] saturate-[0.96]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,13,0.94)_0%,rgba(35,12,17,0.82)_42%,rgba(35,12,17,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20)_0%,transparent_42%,rgba(21,16,17,0.82)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 pt-28 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-10 lg:pb-24">
        <div className="min-w-0 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-3 rounded-pill border border-cream/24 bg-cream/16 px-6 py-2 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-light shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl"
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>
              <span className="font-display font-semibold normal-case tracking-normal text-cream">
                Wax In The City
              </span>
              {" · Ladies-only Colombo"}
            </span>
          </motion.p>

          <h1 className="text-balance max-w-[10ch] font-display tracking-[-0.028em] text-[clamp(3rem,7.5vw,5.4rem)] font-semibold leading-[0.96] text-cream">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line}
                className="block leading-[1.05]"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.82,
                        delay: 0.16 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="tracking-[-0.011em] font-sans mt-7 w-full max-w-[34rem] text-pretty text-body-lg text-cream"
          >
            Private rooms, fresh wax for every guest, and a confirmation before
            you arrive — ladies-only care so waxing, facials and skin care feel
            calm from the first message.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex w-full max-w-sm flex-col gap-2.5 px-0.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-3"
          >
            <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
              <Link href="/book">
                <CalendarDays className="h-5 w-5 shrink-0" />
                Book Your Visit
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <a
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-5 w-5 shrink-0" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="/services">
                View Menu
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex max-w-[42rem] flex-col gap-2 sm:flex-row sm:flex-wrap"
          >
            {HERO_TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="tracking-[-0.011em] font-sans text-pretty inline-flex items-center gap-2.5 rounded-pill border border-cream/24 bg-cream/16 px-7 py-3 text-body-sm font-semibold text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {point}
              </li>
            ))}
          </motion.ul>

          {/* Mobile studio protocol */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 lg:hidden"
          >
            {/* Mobile protocol: default closed (no defaultValue); gold hygiene icons */}
            <Accordion type="single" collapsible className="glass-panel rounded-card">
              <AccordionItem value="protocol" className="border-none">
                <AccordionTrigger className="px-5 py-4 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-light hover:no-underline">
                  Studio protocol
                </AccordionTrigger>
                <AccordionContent className="px-7 pb-6">
                  <ul className="space-y-3">
                    {CARE_STANDARDS.map((item) => (
                      <li
                        key={item}
                        className="tracking-[-0.011em] font-sans text-pretty flex gap-3.5 rounded-card bg-cream/[0.08] p-3 text-body-sm leading-[1.7] text-cream"
                      >
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.78, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className={`glass-panel hidden self-end rounded-card p-6 lg:block ${reduceMotion ? "" : "animate-float-soft"}`}
        >
          <div className="flex flex-col gap-4 border-b border-cream/24 pb-5">
            <p className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-brand-light">
              Studio protocol
            </p>
            <span className="inline-flex w-fit rounded-pill bg-cream/16 px-3.5 py-1 font-sans text-caption leading-snug text-cream">
              Confirmation within 24h · WhatsApp for same-day
            </span>
          </div>
          <ul className="mt-5 space-y-3.5">
            {CARE_STANDARDS.map((item) => (
              <li key={item} className="tracking-[-0.011em] font-sans ease-[var(--ease-apple)] text-pretty group flex gap-4 rounded-card bg-cream/[0.08] p-3 text-body-sm leading-[1.7] text-cream transition-colors duration-300 hover:bg-cream/[0.085]">
                <ShieldCheck className="duration-300 ease-[var(--ease-apple)] mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform group-hover:scale-110" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-balance mt-7 border-t border-cream/24 pt-6 font-display font-semibold tracking-[-0.028em] text-h4 text-cream">
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
        <button
          type="button"
          onClick={scrollToServices}
          aria-label="Scroll to services"
          title="Scroll to services"
          className="pressable flex h-11 w-10 items-center justify-center rounded-pill px-5 border border-cream/24 bg-cream/16 backdrop-blur-2xl hover:bg-cream/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-[3px] focus-visible:ring-cream/40"
        >
          <ChevronDown className={`h-5 w-5 text-cream/70 ${reduceMotion ? "" : "animate-bob"}`} />
        </button>
      </motion.div>
    </section>
  );
}
