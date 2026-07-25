"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, scaleIn, viewportOnce } from "@/lib/animations";

/** Gallery teaser — Apple-carousel clean media planes, 6 photos. */
export function GalleryTeaser() {
  const photos = GALLERY.slice(0, 6);

  return (
    <section
      id="gallery-teaser"
      className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Visual proof"
            showEyebrow={false}
            title="A closer look at the studio rhythm."
            subtitle="Treatment rooms, product details and quiet prep moments help clients understand what the visit feels like before they arrive."
            align="left"
          />
          <Link
            href="/gallery"
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand-action px-6 py-3 font-sans text-body-sm font-medium text-cream transition-colors duration-300 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-alt"
          >
            View gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3"
        >
          {photos.map((photo, i) => {
            const tallOnLg = i === 0 || i === 5;
            return (
              <motion.div
                key={`${photo.src}-${i}`}
                variants={scaleIn}
                className={`group overflow-hidden rounded-card ${
                  tallOnLg ? "lg:row-span-2" : ""
                }`}
              >
                <Link
                  href="/gallery"
                  aria-label={`View gallery: ${photo.alt}`}
                  className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-alt"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-warm-border/40 aspect-[4/5] ${
                      tallOnLg ? "lg:aspect-auto lg:h-full lg:min-h-[280px]" : "lg:aspect-square"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      unoptimized={photo.src.startsWith("http")}
                      className="object-cover transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
