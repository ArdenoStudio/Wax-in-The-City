"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerFast, scaleIn, viewportOnce } from "@/lib/animations";

/** Gallery teaser (file 08, section 09). 6 photos, masonry-ish columns. */
export function GalleryTeaser() {
  const photos = GALLERY.slice(0, 6);

  return (
    <section className="bg-cream-alt px-5 py-section-lg lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Visual proof"
            title="Replace the stock later. Design for the real studio now."
            subtitle="This layout is ready for actual salon photography: details, rooms, products, and result-safe closeups without making the page feel like a template."
          />
          <Link
            href="/gallery"
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-brand-action/40 px-6 py-3 font-medium text-brand-action transition-colors hover:bg-brand-mist"
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
              key={photo.src}
              variants={scaleIn}
              className={`overflow-hidden border border-warm-border bg-white ${
                i === 0 || i === 5 ? "row-span-2" : ""
              }`}
            >
              <div className={`relative w-full ${i === 0 || i === 5 ? "h-full min-h-[260px]" : "aspect-square"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
