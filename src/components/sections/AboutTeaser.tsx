"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fadeUp, slideFromLeft, viewportOnce } from "@/lib/animations";

/** About teaser (file 08, section 11). Image + short story + CTA. */
export function AboutTeaser() {
  return (
    <section className="bg-cream-alt px-5 py-section lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative aspect-[4/5] overflow-hidden rounded-card-lg sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <Image
            src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=1100&auto=format&fit=crop"
            alt="The calm, welcoming space at Wax In The City"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/5" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
            Our story
          </span>
          <h2 className="mt-4 font-serif text-h1 font-light leading-tight text-warm">
            A studio built for women.
          </h2>
          <p className="mt-6 max-w-md text-body-lg text-warm-grey">
            Wax In The City was founded on a simple belief — that beauty care
            should feel honest, private and genuinely kind. Fresh wax for every
            guest, certified therapists, and a space where you can truly relax.
          </p>
          <Link
            href="/about"
            className="nav-link mt-8 inline-flex items-center gap-2 font-medium text-brand-action"
          >
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
