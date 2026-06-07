"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown, ShieldCheck, Sparkles } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Button } from "@/components/ui/button";
import { CARE_STANDARDS, HOMEPAGE_STATS } from "@/lib/site";

/**
 * Full-bleed hero (file 08 section 03, file 10 section 3).
 * Warm photo + maroon scrim, Cormorant italic headline entering word-by-word,
 * DM Sans sub-copy, shimmer + ghost CTAs. 100svh on mobile.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[720px] w-full items-end overflow-hidden bg-ink text-cream sm:min-h-[760px]">
      {/* Image-led editorial background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop"
          alt="A warm, calm treatment room at Wax In The City"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,17,18,0.92)_0%,rgba(62,15,23,0.74)_42%,rgba(62,15,23,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(231,182,189,0.26),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(198,161,91,0.18),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-24 pt-28 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-pill border border-cream/20 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            Ladies-only waxing studio · Colombo
          </motion.p>

          <h1 className="max-w-[10ch] font-serif text-[3.2rem] font-light italic leading-[0.98] text-cream sm:text-[5.4rem] lg:text-[6.4rem]">
            Private waxing.
            <br />
            Done properly.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-xl text-body-lg text-cream/82"
          >
            A quieter, cleaner appointment experience for waxing, facials and
            skin care — built around comfort, hygiene and honest after-care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/book" className="sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto">Book Your Visit</ShimmerButton>
            </Link>
            <Button asChild variant="ghost" size="lg">
              <Link href="/services">View Treatment Menu</Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-card border border-cream/15 bg-cream/15 sm:grid-cols-4"
          >
            {HOMEPAGE_STATS.map((stat) => (
              <div key={stat.label} className="bg-ink/55 px-4 py-4 backdrop-blur">
                <dt className="text-caption uppercase tracking-[0.12em] text-cream/54">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-serif text-h3 text-cream">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="hidden self-end border-l border-cream/18 pl-8 lg:block"
        >
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-brand-light">
            Studio standard
          </p>
          <ul className="mt-5 space-y-4">
            {CARE_STANDARDS.map((item) => (
              <li key={item} className="flex gap-3 text-body-sm leading-relaxed text-cream/78">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-cream/15 pt-5 font-serif text-h4 italic text-cream">
            Specialist care without the awkward salon-floor feeling.
          </p>
        </motion.aside>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <ChevronDown className="h-6 w-6 animate-bob text-cream/70" />
      </motion.div>
    </section>
  );
}
