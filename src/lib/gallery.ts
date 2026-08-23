export type GalleryCategory = "salon" | "results" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

/**
 * Client studio photography — exteriors, brand details and reception spaces.
 * Ambience only; no procedural or result imagery.
 */
export const GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/g-exterior-01.jpg",
    alt: "Wax In The City studio signage on a quiet Colombo street",
    category: "salon",
  },
  {
    src: "/images/gallery/g-path.jpg",
    alt: "Walkway leading to the private studio entrance",
    category: "salon",
  },
  {
    src: "/images/gallery/g-door.jpg",
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
];
