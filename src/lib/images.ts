/**
 * Central image manifest — swap URLs here when client photography arrives.
 * Keeps placeholders honest and deduplicated until real assets are ready.
 */

export const IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1600&auto=format&fit=crop",
    alt: "A warm, calm treatment room at Wax In The City",
  },
  about: {
    src: "/images/studio/reception.jpg",
    alt: "Wax In The City studio reception area in Battaramulla",
  },
  book: {
    src: "/images/studio/hygiene.jpg",
    alt: "Hygienic and private treatment preparation setup",
  },
  services: {
    waxing: "/images/studio/service.jpg",
    facials: "/images/studio/confidence.jpg",
    moroccan: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
    hydraFacial: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop",
  },
  branches: {
    battaramulla: "/images/studio/reception.jpg",
    nugegoda: "/images/studio/service.jpg",
  },
  studio: {
    reception: "/images/studio/reception.jpg",
    hygiene: "/images/studio/hygiene.jpg",
    service: "/images/studio/service.jpg",
    confidence: "/images/studio/confidence.jpg",
    square: "/images/studio/studio-square.jpg",
  },
  beforeAfter: {
    waxing: {
      before: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=900&auto=format&fit=crop",
    },
    facial: {
      before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop",
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

/** Tiny blur placeholder for Next/Image while photos load. */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
