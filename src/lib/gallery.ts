import { IMAGES } from "@/lib/images";

export type GalleryCategory = "salon" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

/**
 * Placeholder gallery — swap entries when client photos arrive.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: IMAGES.hero.src,
    alt: "Calm spa treatment room with soft lighting",
    caption: "Private treatment room · Battaramulla",
    category: "salon",
  },
  {
    src: IMAGES.book.src,
    alt: "Warm towels and spa essentials laid out",
    caption: "Prep station before each visit",
    category: "salon",
  },
  {
    src: IMAGES.beforeAfter.waxing.before,
    alt: "Skincare products on a clean surface",
    caption: "Fresh wax setup",
    category: "results",
  },
  {
    src: IMAGES.about.src,
    alt: "Soft, inviting treatment area",
    caption: "Quiet appointment room",
    category: "salon",
  },
  {
    src: IMAGES.services.facials,
    alt: "Facial care detail with natural light",
    caption: "Facial care detail",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=900&auto=format&fit=crop",
    alt: "Botanical detail in the studio",
    caption: "Studio atmosphere",
    category: "events",
  },
  {
    src: IMAGES.services.waxing,
    alt: "Soft neutral spa interior",
    caption: "Waxing room prep",
    category: "salon",
  },
  {
    src: IMAGES.beforeAfter.waxing.after,
    alt: "Glowing, healthy skin result",
    caption: "After-care moment",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop",
    alt: "Relaxing studio corner with candles",
    caption: "Calm waiting corner",
    category: "events",
  },
];
