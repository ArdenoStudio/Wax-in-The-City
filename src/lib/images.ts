/**
 * Central image + video manifest — all assets are local client photography.
 * Imagery is ambience and studio protocol only; no procedural or result claims.
 */

export const IMAGES = {
  hero: {
    src: "/images/studio/brand-wall.jpg",
    alt: "The Wax In The City brand wall with certificates and premium wax products",
  },
  about: {
    src: "/images/studio/reception-warm.jpg",
    alt: "Warm private reception lounge at the Battaramulla studio",
  },
  book: {
    src: "/images/studio/service-prep.jpg",
    alt: "Treatment room prepared with fresh linens before an appointment",
  },
  services: {
    waxing: "/images/studio/service-prep.jpg",
    facials: "/images/gallery/g-reception-02.jpg",
    moroccan: "/images/studio/product-shelf.jpg",
    hydraFacial: "/images/studio/product-shelf.jpg",
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
      after: "/images/studio/brand-wall.jpg",
    },
    facial: {
      before: "/images/studio/product-shelf.jpg",
      after: "/images/gallery/g-reception-02.jpg",
    },
  },
  og: "/images/og-image.jpg",
  logo: "/images/witc-wordmark-square.jpg",
  wordmark: "/images/witc-wordmark.jpg",
  logoMark: "/images/witc-logo.png",
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
