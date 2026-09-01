import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { BRANCHES, getBranch, isBranchSlug, whatsappLink } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { WhatsappIcon } from "@/components/icons";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { BreadcrumbJsonLd } from "@/components/global/BreadcrumbJsonLd";

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
  return buildPageMetadata({
    title: `${b.name} Branch`,
    description: `Visit our ${b.name} studio in Colombo. ${b.blurb}`,
    path: `/locations/${branch}`,
  });
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  if (!isBranchSlug(branch)) notFound();
  const b = getBranch(branch);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: `${b.name} Branch`, path: `/locations/${b.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Our studio"
        title={`${b.name}.`}
        subtitle={b.blurb}
        image={IMAGES.branches[b.slug]}
        imageAlt={`${b.name} branch interior`}
        priority
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

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* Details */}
            <div className="space-y-6">
              <Detail icon={<MapPin className="h-5 w-5" />} label="Address">
                {b.address.includes("(")
                  ? "Address — final details to be confirmed. WhatsApp us for directions."
                  : b.address}
              </Detail>
              <Detail icon={<Clock className="h-5 w-5" />} label="Hours">
                {/* BeWAXed MON–SUN 9–18 clarity — single Mon–Sun line when weekday==weekend */}
                {b.hours.weekday === b.hours.weekend ? (
                  <>
                    <span className="block tabular-nums">Mon–Sun · {b.hours.weekday}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-caption text-warm-grey">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-warm-grey/40" />
                      {b.hours.poya}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block tabular-nums">Mon–Fri · {b.hours.weekday}</span>
                    <span className="block tabular-nums">Sat–Sun · {b.hours.weekend}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-caption text-warm-grey">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-warm-grey/40" />
                      {b.hours.poya}
                    </span>
                  </>
                )}
              </Detail>
              <Detail icon={<Phone className="h-5 w-5" />} label="Phone">
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {b.phone}
                </a>
              </Detail>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={whatsappLink(`Hi! I'd like to book at your ${b.name} branch.`, b.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-brand-action px-6 font-medium text-cream transition-colors hover:bg-brand-dark"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Book at {b.name}
                </a>
                <a
                  href={b.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-brand-action/40 px-6 font-medium text-brand-action transition-colors hover:bg-brand-mist"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="overflow-hidden rounded-card-lg border border-warm-border shadow-card">
              <iframe
                title={`Map of ${b.name} branch`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(b.area)}&output=embed`}
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
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-warm-grey text-pretty">
          {label}
        </p>
        <div className="mt-1 text-body text-warm text-pretty">{children}</div>
      </div>
    </div>
  );
}
