import { Gallery6 } from "@/components/gallery6";
import { IMAGES } from "@/lib/images";

const GALLERY_ITEMS = [
  {
    id: "studio-1",
    title: "Treatment room",
    summary: "Private ladies-only rooms prepared for each appointment.",
    url: "#",
    image: IMAGES.socialProof.src,
  },
  {
    id: "studio-2",
    title: "Prep station",
    summary: "Fresh wax and clean surfaces before every visit.",
    url: "#",
    image: IMAGES.book.src,
  },
  {
    id: "studio-3",
    title: "Calm details",
    summary: "The little things that make a visit feel considered.",
    url: "#",
    image: IMAGES.hero.src,
  },
  {
    id: "studio-4",
    title: "Battaramulla",
    summary: "Our open studio on Centre Road.",
    url: "/locations/battaramulla",
    image: IMAGES.branches.battaramulla,
  },
];

export function WaxGallery() {
  return (
    <Gallery6
      heading="Inside our studio."
      items={GALLERY_ITEMS}
      className="py-section-lg [&_.container]:max-w-7xl [&_h2]:type-title-serif [&_h2]:text-warm"
    />
  );
}
