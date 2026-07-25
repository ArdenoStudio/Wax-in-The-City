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

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-45" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <Link
              href="/locations"
              className="tracking-[-0.011em] text-pretty font-sans nav-link inline-flex min-h-11 items-center gap-1.5 text-body-sm font-semibold text-brand-action"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              All locations
            </Link>
            {sibling && (
              <Link
                href={`/locations/${sibling.slug}`}
                className="tracking-[-0.011em] ease-[var(--ease-apple)] text-pretty font-sans inline-flex h-11 items-center rounded-pill border border-brand-action/36 bg-brand-mist/85 px-4 text-body-sm font-semibold text-brand-action transition-colors duration-300 hover:bg-brand-mist/90"
              >
                Also in {sibling.name}
              </Link>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="space-y-6">
              <Detail icon={<MapPin className="h-5 w-5 shrink-0" />} label="Address">
                <span className="block">{b.address}</span>
                {pending && (
                  <span className="tracking-[-0.011em] text-pretty font-sans mt-1 block text-body-sm text-warm-grey">
                    Exact street address pending confirmation — WhatsApp for
                    directions.
                  </span>
                )}
                {!pending && (
                  <CopyAddressButton address={b.address} className="mt-3" />
                )}
              </Detail>
              <Detail icon={<Clock className="h-5 w-5 shrink-0" />} label="Hours">
                <dl className="space-y-2.5">
                  <div>
                    <dt className="eyebrow-label">Weekdays</dt>
                    <dd className="tracking-[-0.011em] text-pretty font-sans mt-0.5 text-body text-warm">{b.hours.weekday}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow-label">Weekends</dt>
                    <dd className="tracking-[-0.011em] text-pretty font-sans mt-0.5 text-body text-warm">{b.hours.weekend}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-warm-grey">
                      Poya &amp; holidays
                    </dt>
                    <dd className="tracking-[-0.011em] text-pretty font-sans mt-0.5 text-body-sm text-warm-grey">{b.hours.poya}</dd>
                  </div>
                </dl>
              </Detail>
              <Detail icon={<Phone className="h-5 w-5 shrink-0" />} label="Phone">
                <a
                  href={telHref(b.phone)}
                  className="text-brand-action underline-offset-[3px] hover:underline"
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
                  className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] px-6 font-semibold text-cream shadow-[0_14px_30px_rgba(151,35,58,0.2)]"
                >
                  <WhatsappIcon className="h-4 w-4 shrink-0" />
                  Book at {b.name}
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ease-[var(--ease-apple)] pressable inline-flex h-12 items-center justify-center gap-3 rounded-pill border border-brand-action/45 px-6 font-semibold text-brand-action transition-colors duration-300 hover:bg-brand-mist/90"
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-card-lg border border-warm-border/80 shadow-card">
              <iframe
                title={`Map of ${b.name} branch`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`}
                className="h-80 w-full lg:h-full lg:min-h-[420px]"
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
    <div className="flex gap-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill px-5 bg-brand-mist text-brand-action">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-warm-grey">
          {label}
        </p>
        <div className="tracking-[-0.011em] font-sans mt-1 text-pretty text-body text-warm">{children}</div>
      </div>
    </div>
  );
}
