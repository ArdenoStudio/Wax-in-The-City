import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WaxGallery } from "@/components/sections/WaxGallery";
import { SITE } from "@/lib/site";
import { InstagramIcon } from "@/components/icons";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside our Colombo studios — the space, the details and the results.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Inside our studio."
        subtitle="The space, the care and the little details that make a visit feel calm."
        image={IMAGES.socialProof.src}
        imageAlt="Soft studio interior"
      />

      <WaxGallery />

      <section className="band-pearl px-5 pb-section-lg lg:px-8">
        <div className="container flex justify-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-pill border border-brand-action/40 px-6 py-3 font-medium text-brand-action transition-colors hover:bg-brand-mist"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow @waxinthecitylk
          </a>
        </div>
      </section>
    </>
  );
}
