import { IMAGES } from "@/lib/images";

export type GalleryCategory = "salon" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

/**
 * Placeholder gallery — swap entries in this array when client photos arrive.
 * Imagery is editorial and interior-focused until real studio photography is ready.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: IMAGES.hero.src,
    alt: "Calm spa treatment room with soft lighting",
    category: "salon",
  },
  {
    src: IMAGES.book.src,
    alt: "Warm towels and spa essentials laid out",
    category: "salon",
  },
  {
    src: IMAGES.beforeAfter.waxing.before,
    alt: "Skincare products on a clean surface",
    category: "results",
  },
  {
    src: IMAGES.about.src,
    alt: "Soft, inviting treatment area",
    category: "salon",
  },
  {
    src: IMAGES.services.facials,
    alt: "Facial care detail with natural light",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=900&auto=format&fit=crop",
    alt: "Botanical detail in the studio",
    category: "events",
  },
  {
    src: IMAGES.services.waxing,
    alt: "Soft neutral spa interior",
    category: "salon",
  },
  {
    src: IMAGES.beforeAfter.waxing.after,
    alt: "Glowing, healthy skin result",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
    alt: "Relaxing studio corner with candles",
    category: "events",
  },
];
