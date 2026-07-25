import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import {
  BRANCHES,
  getBranch,
  isAddressPending,
  telHref,
  whatsappLink,
  SITE,
  type BranchSlug,
} from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { WhatsappIcon } from "@/components/icons";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { CopyAddressButton } from "@/components/sections/CopyAddressButton";
import { BreadcrumbJsonLd } from "@/components/global/JsonLd";

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
  const ogImage = BRANCH_IMAGES[b.slug];
  return {
    title: `${b.name} branch`,
    description: `Visit our ${b.name} studio in Colombo. ${b.blurb}`,
    alternates: { canonical: `/locations/${branch}` },
    openGraph: {
      title: `${b.name} · ${SITE.shortName}`,
      description: b.blurb,
      url: `${SITE.url}/locations/${branch}`,
      images: [{ url: ogImage, alt: `${b.name} studio` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${b.name} · ${SITE.shortName}`,
      description: b.blurb,
      images: [ogImage],
    },
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
  const sibling = BRANCHES.find((other) => other.slug !== b.slug);
  const pending = isAddressPending(b);
  const mapsQuery = pending ? b.area : b.address;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
          { name: b.name, href: `/locations/${b.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Our studio"
        title={`${b.name}.`}
        subtitle={b.blurb}
        image={BRANCH_IMAGES[b.slug]}
        imageAlt={`${b.name} branch interior`}
      />

      <section className="bg-cream px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Link
              href="/locations"
              className="nav-link inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
            >
              <ArrowLeft className="h-4 w-4" />
              All locations
            </Link>
            {sibling && (
              <Link
                href={`/locations/${sibling.slug}`}
                className="inline-flex h-10 items-center rounded-pill border border-brand-action/28 bg-brand-mist/70 px-4 text-body-sm font-medium text-brand-action"
              >
                Also in {sibling.name}
              </Link>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="space-y-6">
              <Detail icon={<MapPin className="h-5 w-5" />} label="Address">
                <span className="block">{b.address}</span>
                {pending && (
                  <span className="mt-1 block text-body-sm text-warm-grey">
                    Exact street address pending confirmation — WhatsApp for
                    directions.
                  </span>
                )}
                {!pending && (
                  <CopyAddressButton address={b.address} className="mt-3" />
                )}
              </Detail>
              <Detail icon={<Clock className="h-5 w-5" />} label="Hours">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-brand-action/75">
                      Weekdays
                    </dt>
                    <dd className="mt-0.5 text-body text-warm">{b.hours.weekday}</dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-brand-action/75">
                      Weekends
                    </dt>
                    <dd className="mt-0.5 text-body text-warm">{b.hours.weekend}</dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                      Poya &amp; holidays
                    </dt>
                    <dd className="mt-0.5 text-body-sm text-warm-grey">{b.hours.poya}</dd>
                  </div>
                </dl>
              </Detail>
              <Detail icon={<Phone className="h-5 w-5" />} label="Phone">
                <a
                  href={telHref(b.phone)}
                  className="text-brand-action underline-offset-4 hover:underline"
                >
                  {b.phone}
                </a>
              </Detail>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={whatsappLink(
                    `Hi! I'd like to book at your ${b.name} branch.`,
                    b.whatsapp
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-brand-dark"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Book at {b.name}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-brand-action/40 px-6 font-medium text-brand-action transition-colors hover:bg-brand-mist"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-card-lg border border-warm-border shadow-card">
              <iframe
                title={`Map of ${b.name} branch`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`}
                className="h-80 w-full lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <BookingZone defaultBranch={b.slug} heading={`Book at ${b.name}.`} />
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
