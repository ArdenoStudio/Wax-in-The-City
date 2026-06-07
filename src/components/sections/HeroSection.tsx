"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Button } from "@/components/ui/button";

const HEADLINE = ["Smooth", "skin.", "Genuine", "care."];

/**
 * Full-bleed hero (file 08 section 03, file 10 section 3).
 * Warm photo + maroon scrim, Cormorant italic headline entering word-by-word,
 * DM Sans sub-copy, shimmer + ghost CTAs. 100svh on mobile.
 */
export function HeroSection() {
  const reduce = useReducedMotion();

  const wordVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.2 + i * 0.12,
      },
    }),
  };

  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden">
      {/* Photograph */}
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
          className="object-cover object-center"
        />
        {/* Warm maroon scrim — deepens tones and lifts text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/40 to-brand/30" />
        <div className="absolute inset-0 bg-brand/10 mix-blend-multiply" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 sm:pb-28 lg:px-8 lg:pb-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-caption font-semibold uppercase tracking-[0.22em] text-brand-light"
          >
            Ladies-only beauty · Colombo
          </motion.p>

          <h1 className="font-serif text-[3.25rem] font-light italic leading-[1.05] text-cream sm:text-[4.5rem]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 max-w-md text-body-lg text-cream/85"
          >
            Waxing, facials and Moroccan care — done with genuine attention, in a
            private space made for women.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/book" className="sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto">Book Your Visit</ShimmerButton>
            </Link>
            <Button asChild variant="ghost" size="lg">
              <Link href="/services">See Our Services</Link>
            </Button>
          </motion.div>
        </div>
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
