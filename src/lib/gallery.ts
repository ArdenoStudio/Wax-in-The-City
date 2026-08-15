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
    src: IMAGES.studio.reception,
    alt: "Wax In The City Battaramulla reception area with soft lighting and clean decor",
    category: "salon",
  },
  {
    src: IMAGES.studio.hygiene,
    alt: "Spotless and sanitized treatment preparation tray and towels",
    category: "salon",
  },
  {
    src: IMAGES.studio.service,
    alt: "Private waxing and treatment room with pristine linens",
    category: "salon",
  },
  {
    src: IMAGES.studio.confidence,
    alt: "Relaxing skincare and facial treatment moment",
    category: "results",
  },
  {
    src: IMAGES.studio.square,
    alt: "Wax In The City studio branding and treatment room",
    category: "salon",
  },
  {
    src: IMAGES.beforeAfter.waxing.before,
    alt: "Skincare products on a clean surface",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=900&auto=format&fit=crop",
    alt: "Botanical detail in the studio",
    category: "events",
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
