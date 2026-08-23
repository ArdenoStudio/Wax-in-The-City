"use client";

import { motion } from "motion/react";
import { VIDEOS } from "@/lib/images";
import { VideoLoop } from "@/components/ui/video-loop";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/animations";

const REEL = [
  {
    video: VIDEOS.prep,
    title: "Fresh setup, every appointment",
    body: "Rooms are reset with fresh linens and covered surfaces before each guest arrives.",
  },
  {
    video: VIDEOS.wax,
    title: "Premium Lycon & Rica waxes",
    body: "Product choice is matched to your skin and service, never rushed or reused.",
  },
  {
    video: VIDEOS.care,
    title: "Gentle technique, skin first",
    body: "Steady pacing and calm handling keep sensitive services comfortable.",
  },
  {
    video: VIDEOS.wall,
    title: "Our Battaramulla studio",
    body: "A private, ladies only space designed to feel like a quiet appointment room.",
  },
] as const;

/** Homepage reel: honest studio ambience clips tied to the trust pillars. */
export function StudioReel() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Inside the studio"
          title="See how a visit takes shape."
          subtitle="Short clips of the space, the setup and the products — ambience and protocol, not procedures."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {REEL.map((item) => (
            <motion.figure
              key={item.video.src}
              variants={scaleIn}
              className="group premium-surface micro-lift flex flex-col rounded-2xl p-2"
            >
              <VideoLoop
                src={item.video.src}
                poster={item.video.poster}
                alt={item.video.alt}
                className="aspect-[9/16] w-full"
              />
              <figcaption className="flex flex-1 flex-col p-4">
                <h3 className="text-h4 font-semibold text-warm text-balance">{item.title}</h3>
                <p className="mt-2 text-body-sm text-warm-grey text-pretty">{item.body}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
