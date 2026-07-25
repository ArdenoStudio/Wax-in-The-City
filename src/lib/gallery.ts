import { IMAGES } from "@/lib/images";

export type GalleryCategory = "salon" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Optional editorial caption — placeholders stay honest until client photos land. */
  caption?: string;
}

/**
 * Placeholder gallery — swap entries when client photos arrive.
 * Imagery is editorial and interior-focused until real studio photography is ready.
 * The "events" category currently uses atmospheric placeholders, not documented events.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: IMAGES.hero.src,
    alt: "Calm spa treatment room with soft lighting",
    category: "salon",
    caption: "Editorial placeholder — private treatment room atmosphere.",
  },
  {
    src: IMAGES.book.src,
    alt: "Warm towels and spa essentials laid out",
    category: "salon",
    caption: "Editorial placeholder — prep details before a visit.",
  },
  {
    src: IMAGES.beforeAfter.waxing.before,
    alt: "Skincare products on a clean surface",
    category: "results",
    caption: "Editorial placeholder — not a client before/after result.",
  },
  {
    src: IMAGES.about.src,
    alt: "Soft, inviting treatment area",
    category: "salon",
    caption: "Editorial placeholder — soft studio corner.",
  },
  {
    src: IMAGES.services.facials,
    alt: "Facial care detail with natural light",
    category: "results",
    caption: "Editorial placeholder — facial care mood, not a verified result.",
  },
  {
    src: IMAGES.services.moroccan,
    alt: "Warm spa atmosphere used as an events-category placeholder",
    category: "events",
    caption:
      "Placeholder only — not a documented studio event. Swap when real event photos arrive.",
  },
  {
    src: IMAGES.services.waxing,
    alt: "Soft neutral spa interior",
    category: "salon",
    caption: "Editorial placeholder — calm interior framing.",
  },
  {
    src: IMAGES.beforeAfter.waxing.after,
    alt: "Glowing, healthy skin mood reference",
    category: "results",
    caption: "Editorial placeholder — illustrative finish, not a client photo.",
  },
  {
    src: IMAGES.services.hydraFacial,
    alt: "Hydrating treatment atmosphere used as an events-category placeholder",
    category: "events",
    caption:
      "Placeholder only — atmospheric stand-in until client event photography is ready.",
  },
];
