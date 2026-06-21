import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { BRANCHES, getBranch, whatsappLink, type BranchSlug } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { WhatsappIcon } from "@/components/icons";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { Button } from "@/components/ui/button";

const BRANCH_IMAGES: Record<BranchSlug, string> = {
  battaramulla: IMAGES.branches.battaramulla,
  nugegoda: IMAGES.branches.nugegoda,
};

function isBranchSlug(value: string): value is BranchSlug {
  return BRANCHES.some((b) => b.slug === value);
}

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ branch: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  if (!isBranchSlug(branch)) return { title: "Locations" };
  const b = getBranch(branch);
  return {
    title: `${b.name} branch`,
    description: `Visit our ${b.name} studio in Colombo. ${b.blurb}`,
    alternates: { canonical: `/locations/${branch}` },
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  if (!isBranchSlug(branch)) notFound();
  const b = getBranch(branch);
  const isOpen = b.status === "open";

  return (
    <>
      <PageHero
        title={`${b.name}.`}
        subtitle={b.blurb}
        image={BRANCH_IMAGES[b.slug]}
        imageAlt={`${b.name} branch`}
      />

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/locations"
            className="mb-10 inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All locations
          </Link>

          {!isOpen && (
            <div className="mb-10 border border-warm-border bg-cream-alt p-5 text-body text-warm-grey">
              <p className="type-subtitle text-warm">Opening soon</p>
              <p className="mt-2">
                Book at Battaramulla until we share the Nugegoda address and opening date.
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/book?branch=battaramulla">Book Battaramulla</Link>
              </Button>
            </div>
          )}

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="space-y-6">
              <Detail icon={<MapPin className="h-5 w-5" />} label="Address">
                {b.address}
              </Detail>
              <Detail icon={<Clock className="h-5 w-5" />} label="Hours">
                <span className="block">Weekdays · {b.hours.weekday}</span>
                <span className="block">Weekends · {b.hours.weekend}</span>
                <span className="block text-warm-grey">{b.hours.poya}</span>
              </Detail>
              <Detail icon={<Phone className="h-5 w-5" />} label="Phone">
                {b.phone}
              </Detail>

              {isOpen && (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href={`/book?branch=${b.slug}`}>Send booking request</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={whatsappLink(`Hi! I'd like to book at your ${b.name} branch.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={b.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4" />
                      Open in Maps
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {isOpen && (
              <div className="overflow-hidden rounded-card border border-warm-border">
                <iframe
                  title={`Map of ${b.name} branch`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(b.area)}&output=embed`}
                  className="h-80 w-full lg:h-full lg:min-h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {isOpen && <BookingZone defaultBranch={b.slug} />}
    </>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-brand-mist text-brand-action">
        {icon}
      </span>
      <div>
        <p className="type-label text-warm-grey">{label}</p>
        <div className="mt-1 text-body text-warm">{children}</div>
      </div>
    </div>
  );
}
