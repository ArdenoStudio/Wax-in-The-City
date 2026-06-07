export type GalleryCategory = "salon" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

/**
 * Placeholder gallery — warm, editorial Unsplash imagery (no European models per
 * the photography brief; these are interiors/details until client photos arrive).
 * Replace with Supabase Storage URLs once real photos are uploaded.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=900&auto=format&fit=crop",
    alt: "Calm spa treatment room with soft lighting",
    category: "salon",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop",
    alt: "Warm towels and spa essentials laid out",
    category: "salon",
  },
  {
    src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
    alt: "Skincare products on a clean surface",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop",
    alt: "Soft, inviting treatment area",
    category: "salon",
  },
  {
    src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=900&auto=format&fit=crop",
    alt: "Facial care detail with natural light",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=900&auto=format&fit=crop",
    alt: "Botanical detail in the studio",
    category: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=900&auto=format&fit=crop",
    alt: "Soft neutral spa interior",
    category: "salon",
  },
  {
    src: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=900&auto=format&fit=crop",
    alt: "Glowing, healthy skin result",
    category: "results",
  },
  {
    src: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=900&auto=format&fit=crop",
    alt: "Relaxing studio corner with candles",
    category: "events",
  },
];
