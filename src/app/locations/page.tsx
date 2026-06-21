import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Navigation } from "lucide-react";
import { BRANCHES, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Wax In The City studios in Colombo — Battaramulla open now, Nugegoda opening soon.",
};

const BRANCH_IMAGES = {
  battaramulla: IMAGES.branches.battaramulla,
  nugegoda: IMAGES.branches.nugegoda,
} as const;

export default function LocationsPage() {
  return (
    <>
      <PageHero
        title="Choose the studio that fits your day."
        subtitle="Battaramulla is open for appointments. Nugegoda is on the way."
        image={IMAGES.branches.battaramulla}
        imageAlt="Calm private studio room prepared for an appointment"
        size="md"
      />

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            voice="sans"
            align="left"
            title="Same care standard, different side of the city."
            subtitle="Pick the branch by commute first. The appointment style stays consistent: private, clean, and reviewed before confirmation."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {BRANCHES.map((branch) => {
              const isOpen = branch.status === "open";
              return (
                <article key={branch.slug} className="surface overflow-hidden">
                  <div className="relative min-h-[220px] bg-ink">
                    <Image
                      src={BRANCH_IMAGES[branch.slug]}
                      alt={`${branch.name} studio`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(23,7,11,0.7)_100%)]" />
                    <div className="absolute bottom-0 left-0 p-5 text-cream">
                      <p className="type-label text-brand-light">
                        {isOpen ? "Open now" : "Opening soon"}
                      </p>
                      <h2 className="type-title-serif mt-1">{branch.name}</h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-body-sm text-warm-grey">{branch.blurb}</p>
                    <div className="mt-5 space-y-2 border-t border-warm-border pt-5 text-body-sm text-warm-grey">
                      <p className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-action" />
                        <span>{branch.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-action" />
                        {branch.hours.weekday}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      {isOpen ? (
                        <>
                          <Button asChild size="md">
                            <Link href={`/book?branch=${branch.slug}`}>Send request</Link>
                          </Button>
                          <Button asChild size="md" variant="outline">
                            <a
                              href={whatsappLink(
                                `Hi! I'd like to book at your ${branch.name} branch.`,
                                branch.whatsapp
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <WhatsappIcon className="h-4 w-4" />
                              WhatsApp
                            </a>
                          </Button>
                        </>
                      ) : (
                        <Button asChild size="md" variant="outline">
                          <Link href="/contact">Get opening updates</Link>
                        </Button>
                      )}
                      <Button asChild size="md" variant="outline">
                        <Link href={`/locations/${branch.slug}`}>Branch details</Link>
                      </Button>
                      {isOpen && (
                        <Button asChild size="md" variant="outline">
                          <a
                            href={branch.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-4 w-4" />
                            Directions
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
