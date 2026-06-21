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
        imageAlt={`${b.name} branch interior`}
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/locations"
            className="nav-link mb-10 inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All locations
          </Link>

          {!isOpen && (
            <div className="mb-8 rounded-card border border-brand-action/20 bg-brand-mist px-5 py-4 text-body-sm text-warm">
              This studio is opening soon. Book at{" "}
              <Link href="/locations/battaramulla" className="font-medium text-brand-action hover:underline">
                Battaramulla
              </Link>{" "}
              in the meantime, or leave your details for opening updates.
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

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {isOpen ? (
                  <>
                    <Button asChild size="md" variant="primary">
                      <a
                        href={whatsappLink(`Hi! I'd like to book at your ${b.name} branch.`, b.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsappIcon className="h-4 w-4" />
                        Book at {b.name}
                      </a>
                    </Button>
                    <Button asChild size="md" variant="outline">
                      <a href={b.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        <MapPin className="h-4 w-4" />
                        Open in Maps
                      </a>
                    </Button>
                  </>
                ) : (
                  <Button asChild size="md" variant="primary">
                    <Link href="/contact">Get opening updates</Link>
                  </Button>
                )}
              </div>
            </div>

            {isOpen && (
              <div className="overflow-hidden rounded-card-lg border border-warm-border shadow-card">
                <iframe
                  title={`Map of ${b.name} branch`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(b.area)}&output=embed`}
                  className="h-80 w-full lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {isOpen ? (
        <BookingZone defaultBranch={b.slug} heading={`Book at ${b.name}.`} />
      ) : (
        <section className="bg-cream-alt px-5 py-section-lg lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-h2 font-medium text-warm">Opening soon.</h2>
            <p className="mt-4 text-body-lg text-warm-grey">
              We&apos;ll announce the Nugegoda address and booking slots when the studio is ready.
            </p>
            <Button asChild size="lg" variant="primary" className="mt-8">
              <Link href="/contact">Contact us for updates</Link>
            </Button>
          </div>
        </section>
      )}
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
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-warm-grey">
          {label}
        </p>
        <div className="mt-1 text-body text-warm">{children}</div>
      </div>
    </div>
  );
}
