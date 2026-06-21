"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, scaleIn, viewportOnce } from "@/lib/animations";

/** Gallery teaser — 6 photos with captions. */
export function GalleryTeaser() {
  const photos = GALLERY.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            title="A closer look at the studio rhythm."
            subtitle="Treatment rooms, product details and quiet prep moments help you understand the visit before you arrive."
            align="left"
          />
          <Link
            href="/gallery"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-pill border border-brand-action/35 bg-white/40 px-6 py-3 font-medium text-brand-action shadow-[0_14px_34px_rgba(39,19,21,0.05)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
          >
            See full gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={`${photo.src}-${i}`}
              variants={scaleIn}
              className={`group surface-light overflow-hidden rounded-card ${
                i === 0 || i === 5 ? "row-span-2" : ""
              }`}
            >
              <div className={`relative z-10 w-full overflow-hidden rounded-[7px] ${i === 0 || i === 5 ? "h-full min-h-[280px]" : "aspect-square"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  unoptimized={photo.src.startsWith("http")}
                  className="image-polish object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <p className="absolute inset-x-0 bottom-0 z-10 p-3 text-body-sm font-medium text-cream">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
