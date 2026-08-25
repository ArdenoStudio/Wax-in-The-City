/**
 * Central image + video manifest — all assets are local client photography.
 * Imagery is ambience + studio protocol only; no stock. Waxing contexts use
 * real procedural frames captured from client clips (Battaramulla 7.8.26):
 * melted RICA wax poured into the warmer, gloved application on skin, tin
 * handling — cropped to hands/tools only, no faces (ladies-only privacy).
 */

export const IMAGES = {
  hero: {
    src: "/images/wax-real-optimized/Battaramulla_7.8.26_IMG_9784.jpg",
    alt: "The Wax In The City brand wall with certificates and premium wax products",
  },
  about: {
    src: "/images/studio/reception-warm.jpg",
    alt: "Warm private reception lounge at the Battaramulla studio",
  },
  book: {
    src: "/images/studio/service-prep.jpg",
    alt: "Treatment room bed prepared with fresh single-use linen in a private studio room — hygiene protocol",
  },
  services: {
    // Waxing card/hero shows a real procedural frame from client clips
    // (melted RICA wax poured into the warmer, hands/tools only, no faces).
    waxing: "/images/waxing/wax-pour-warmer.jpg",
    facials: "/images/services/facials.jpg",
    moroccan: "/images/services/moroccan.jpg",
    hydraFacial: "/images/services/hydra-facial.jpg",
  },
  branches: {
    battaramulla: "/images/studio/exterior-sign.jpg",
    nugegoda: "/images/studio/reception-warm.jpg",
  },
  studio: {
    reception: "/images/studio/reception-desk.jpg",
    hygiene: "/images/studio/service-prep.jpg",
    service: "/images/studio/service-prep.jpg",
    confidence: "/images/studio/product-shelf.jpg",
    square: "/images/studio/studio-square.jpg",
  },
  beforeAfter: {
    waxing: {
      before: "/images/studio/service-prep.jpg",
      after: "/images/wax-real-optimized/Battaramulla_7.8.26_IMG_9784.jpg",
    },
    facial: {
      before: "/images/studio/product-shelf.jpg",
      after: "/images/studio/reception-warm.jpg",
    },
  },
  og: "/images/og-image.jpg",
  logo: "/images/witc-wordmark-square.jpg",
  wordmark: "/images/witc-wordmark.jpg",
  socialProof: {
    src: "/images/studio/studio-square.jpg",
    alt: "Wax In The City studio branding and treatment room",
  },
} as const;

/** Local muted loop videos with poster frames for reduced-motion fallbacks. */
export const VIDEOS = {
  brandSting: {
    src: "/videos/brand-sting.mp4",
    poster: "/videos/brand-sting.poster.jpg",
    alt: "Brand sting for Wax In The City",
  },
  prep: {
    src: "/videos/prep-fresh-setup.mp4",
    poster: "/videos/prep-fresh-setup.poster.jpg",
    alt: "A fresh treatment setup being prepared in the studio",
  },
  wax: {
    src: "/videos/wax-melting.mp4",
    poster: "/videos/wax-melting.poster.jpg",
    alt: "Premium wax warming before an appointment",
  },
  care: {
    src: "/videos/treatment-care.mp4",
    poster: "/videos/treatment-care.poster.jpg",
    alt: "Calm, gentle treatment care in the private room",
  },
  wall: {
    src: "/videos/brand-wall.mp4",
    poster: "/videos/brand-wall.poster.jpg",
    alt: "The Wax In The City brand wall inside the Battaramulla studio",
  },
} as const;

/** Tiny blur placeholder for Next/Image while photos load. */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
