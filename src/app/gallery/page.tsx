import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoLoop } from "@/components/ui/video-loop";
import { SITE } from "@/lib/site";
import { IMAGES, VIDEOS } from "@/lib/images";
import { InstagramIcon } from "@/components/icons";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery",
  description:
    "A look inside our Colombo studios — the space, the details and the care.",
  path: "/gallery",
});

const REEL = [
  { video: VIDEOS.prep, caption: "Fresh setup" },
  { video: VIDEOS.wax, caption: "Premium waxes" },
  { video: VIDEOS.care, caption: "Gentle care" },
  { video: VIDEOS.wall, caption: "Our studio" },
] as const;

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="A look around"
        title="Inside our studio."
        subtitle="The space, the care and the little details that make a visit feel calm."
        image={IMAGES.hero.src}
        imageAlt={IMAGES.hero.alt}
        priority
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured reel"
            title="Watch the studio at work."
            subtitle="Short clips of the space, the setup and the products — ambience, not procedures."
            align="left"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {REEL.map((item) => (
              <figure key={item.video.src}>
                <VideoLoop
                  src={item.video.src}
                  poster={item.video.poster}
                  alt={item.video.alt}
                  className="aspect-[9/16] w-full"
                />
                <figcaption className="mt-2 text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <SectionHeading
            eyebrow="Gallery"
            title="Browse the studio."
            subtitle="Indicative studio atmosphere and treatment prep visuals. Verified client photography is updated with guest consent."
            className="mt-20"
          />
          <div className="mt-12">
            <GalleryGrid />
          </div>

          <div className="mt-14 flex justify-center">
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
        </div>
      </section>
    </>
  );
}
