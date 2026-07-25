"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsappIcon } from "@/components/icons";
import { IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { CARE_STANDARDS, SITE, whatsappLink } from "@/lib/site";

const HERO_TRUST_POINTS = ["Fresh wax setup", "Private rooms", "Confirmation first"];

function scrollToServices() {
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink text-cream">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
          className="object-cover object-[62%_center] saturate-[0.92]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(18,12,13,0.96)_0%,rgba(35,12,17,0.78)_48%,rgba(35,12,17,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,transparent_40%,rgba(18,10,12,0.88)_100%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-24 pt-28 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:px-8 lg:pb-24">
        <div className="min-w-0 max-w-3xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-display text-[clamp(1.5rem,3.4vw,2rem)] font-semibold tracking-[-0.03em] text-cream"
          >
            {SITE.shortName}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center rounded-pill border border-cream/16 bg-cream/8 px-3.5 py-1.5 font-sans text-caption font-medium tracking-[0.04em] text-brand-light backdrop-blur-md"
          >
            Ladies-only private studio · Colombo
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[14ch] font-display text-[clamp(3rem,7.5vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.035em] text-cream"
          >
            Private waxing, quietly perfected.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 w-full max-w-[32rem] text-pretty font-sans text-body-lg text-cream/78"
          >
            Private rooms, fresh wax for every guest, and confirmation before you
            arrive — calm care for waxing, facials and skin.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex w-full max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row sm:items-center"
          >
            <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
              <Link href="/book">
                <CalendarDays className="h-5 w-5" />
                Book Your Visit
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <a
                href={whatsappLink("Hi! I'd like to ask about a booking.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="/services">
                View Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex max-w-2xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-5"
          >
            {HERO_TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-2 font-sans text-body-sm font-medium text-cream/76"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 lg:hidden"
          >
            <Accordion type="single" collapsible className="glass-panel rounded-card">
              <AccordionItem value="protocol" className="border-none">
                <AccordionTrigger className="px-5 py-4 font-sans text-caption font-semibold uppercase tracking-[0.12em] text-brand-light hover:no-underline">
                  Studio protocol
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <ul className="space-y-3">
                    {CARE_STANDARDS.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-card bg-cream/[0.055] p-3 font-sans text-body-sm leading-relaxed text-cream/76"
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
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel hidden self-end rounded-card-lg p-6 lg:block"
        >
          <div className="border-b border-cream/12 pb-4">
            <p className="font-display text-h4 font-semibold tracking-[-0.02em] text-cream">
              Studio protocol
            </p>
            <p className="mt-2 font-sans text-caption text-cream/68">
              Confirmation within 24h · WhatsApp for same-day
            </p>
          </div>
          <ul className="mt-4 space-y-2.5">
            {CARE_STANDARDS.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-card bg-cream/[0.05] p-3 font-sans text-body-sm leading-relaxed text-cream/76"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-cream/12 pt-4 font-sans text-body-sm text-cream/72">
            Specialist care without the awkward salon-floor feeling.
          </p>
        </motion.aside>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <button
          type="button"
          onClick={scrollToServices}
          aria-label="Scroll to services"
          title="Scroll to services"
          className="pressable flex h-10 w-10 items-center justify-center rounded-pill border border-cream/16 bg-cream/8 backdrop-blur-xl hover:bg-cream/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40"
        >
          <ChevronDown className={`h-5 w-5 text-cream/70 ${reduceMotion ? "" : "animate-bob"}`} />
        </button>
      </motion.div>
    </section>
  );
}
