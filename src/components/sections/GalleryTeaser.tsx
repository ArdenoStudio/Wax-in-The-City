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
    <section className="bg-cream-alt px-5 py-section lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Inside our studio" title="A look around." />

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 columns-2 gap-4 [column-fill:_balance] lg:columns-3"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              variants={scaleIn}
              className="mb-4 break-inside-avoid overflow-hidden rounded-card-lg"
            >
              <div className={`relative w-full ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
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

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="nav-link inline-flex items-center gap-2 font-medium text-brand-action"
          >
            See full gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
