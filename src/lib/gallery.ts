export type GalleryCategory = "salon" | "before-after" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

/**
 * Client studio photography — exteriors, brand details, reception spaces and
 * real waxing protocol frames captured from client clips (Battaramulla 7.8.26).
 * Procedural frames are cropped to hands/tools only, no faces.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/g-exterior-01.jpg",
    alt: "Wax In The City studio signage on a quiet Colombo street",
    category: "salon",
  },
  {
    src: "/images/waxing/wax-pour-close.jpg",
    alt: "Melted RICA wax poured into the studio warmer — fresh wax prepared for every guest",
    category: "results",
  },
  {
    src: "/images/waxing/rica-tin-warmer.jpg",
    alt: "Gloved hands placing a fresh RICA wax tin into the warmer — single-brand premium wax",
    category: "results",
  },
  {
    src: "/images/waxing/leg-wax-application.jpg",
    alt: "Waxing in progress — precise gloved application on skin with fresh spatula protocol",
    category: "results",
  },
  {
    src: "/images/gallery/g-path.jpg",
    alt: "Walkway leading to the private studio entrance",
    category: "salon",
  },
  {
    src: "/images/studio/reception-desk.jpg",
    alt: "Private entrance door to the ladies only studio",
    category: "salon",
  },
  {
    src: "/images/gallery/g-brand-wall-01.jpg",
    alt: "Wax In The City brand wall styled inside the studio",
    category: "results",
  },
  {
    src: "/images/gallery/g-reception-01.jpg",
    alt: "Warm reception lounge where arriving guests are welcomed",
    category: "events",
  },
  {
    src: "/images/gallery/g-exterior-02.jpg",
    alt: "Street view of the studio entrance in daylight",
    category: "salon",
  },
  {
    src: "/images/gallery/g-products-01.jpg",
    alt: "Premium wax and skin care products on the studio shelf",
    category: "results",
  },
  {
    src: "/images/gallery/g-reception-02.jpg",
    alt: "Reception corner with soft lighting and calm decor",
    category: "events",
  },
  {
    src: "/images/gallery/g-brand-wall-02.jpg",
    alt: "Detail of the branded studio wall and lighting",
    category: "results",
  },
  {
    src: "/images/gallery/g-products-02.jpg",
    alt: "Product bottles arranged neatly in the studio",
    category: "results",
  },
  // Real studio photography from client ASSETS (Battaramulla 6.27 + 7.8) — actual treatment rooms
  {
    src: "/images/waxing/fresh-strips-bowl.jpg",
    alt: "Fresh single-use wax strips in a lined bowl — hygiene protocol before an appointment",
    category: "results",
  },
  {
    src: "/images/services/facials.jpg",
    alt: "Facial treatment setup in the private studio — calm, hygienic preparation",
    category: "results",
  },
  {
    src: "/images/services/moroccan.jpg",
    alt: "Body ritual treatment bed — authentic studio interior",
    category: "results",
  },
  {
    src: "/images/services/hydra-facial.jpg",
    alt: "Hydra facial treatment area — premium products and prepared linen",
    category: "results",
  },
  {
    src: "/images/wax-real-optimized/Battaramulla_6.27.2026_IMG_9060.jpg",
    alt: "Treatment room detail — client photography, Battaramulla",
    category: "salon",
  },
];
