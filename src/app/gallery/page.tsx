import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { InstagramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside our Colombo studios — the space, the details and the results.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="A look around"
        title="Inside our studio."
        subtitle="The space, the care and the little details that make a visit feel calm."
        image={IMAGES.hero.src}
        imageAlt={IMAGES.hero.alt}
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Browse the studio."
            subtitle="Editorial placeholders until client photography is ready — not verified client results or event coverage."
          />
          <div className="mt-12">
            <GalleryGrid />
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-2 rounded-pill border border-brand-action/40 px-6 py-3 font-medium text-brand-action transition-colors hover:bg-brand-mist"
            >
              <InstagramIcon className="h-5 w-5" />
              Follow @waxinthecitylk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
