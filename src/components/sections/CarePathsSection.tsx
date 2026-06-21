import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ServiceCategoryMeta } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

interface CarePathsSectionProps {
  categories: ServiceCategoryMeta[];
}

/** Act III — waxing-led paths, not a four-color card grid. */
export function CarePathsSection({ categories }: CarePathsSectionProps) {
  const waxing = categories.find((c) => c.slug === "waxing");
  const skin = categories.filter((c) => c.slug === "facial" || c.slug === "hydra-facial");
  const ritual = categories.find((c) => c.slug === "moroccan");

  return (
    <section className="band-pearl px-5 py-section-lg lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          voice="serif"
          align="left"
          title="Pick the care you need."
          subtitle="Waxing is the hero. Skin care and rituals support the same private-room standard."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {waxing && (
            <Link
              href={`/services/${waxing.href}`}
              className="surface group flex min-h-[220px] flex-col justify-between p-6 lg:col-span-2 lg:p-8"
            >
              <div>
                <p className="type-label text-brand-action">Signature</p>
                <h3 className="type-title-serif mt-3 text-warm">{waxing.name}</h3>
                <p className="mt-3 max-w-lg text-body text-warm-grey">{waxing.short}</p>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="text-small font-medium text-brand-action">
                  From {formatLKRFrom(waxing.priceFrom)}
                </span>
                <span className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-action">
                  View waxing menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}

          <div className="grid gap-4">
            {skin.length > 0 && (
              <Link
                href="/services/facials"
                className="surface group flex flex-col justify-between p-6"
              >
                <div>
                  <p className="type-label text-warm-grey">Skin reset</p>
                  <h3 className="type-subtitle mt-2 text-warm">Facials & HydraFacial</h3>
                  <p className="mt-2 text-small text-warm-grey">
                    Calm skin work and visible refresh without downtime.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand-action">
                  Explore skin care
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            )}
            {ritual && (
              <Link
                href={`/services/${ritual.href}`}
                className="surface group flex flex-col justify-between p-6"
              >
                <div>
                  <p className="type-label text-warm-grey">Deep ritual</p>
                  <h3 className="type-subtitle mt-2 text-warm">{ritual.name}</h3>
                  <p className="mt-2 text-small text-warm-grey">{ritual.short}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-brand-action">
                  View Moroccan menu
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center gap-2 text-body-sm font-medium text-brand-action hover:underline"
          >
            Full menu with timing and prices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
