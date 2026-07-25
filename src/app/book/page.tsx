import type { Metadata } from "next";
import { BookingZone } from "@/components/sections/BookingZone";
import { PageHero } from "@/components/sections/PageHero";
import {
  BOOKING_STEPS,
  BRANCHES,
  SERVICES,
  SERVICE_CATEGORIES,
  type BranchSlug,
} from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Book Your Visit",
  description:
    "Book your visit to Wax In The City — send a request and we'll confirm within 24 hours, or reach us instantly on WhatsApp.",
};

function isBranchSlug(value?: string): value is BranchSlug {
  return Boolean(value) && BRANCHES.some((b) => b.slug === value);
}

function resolveServicePreference(
  value: string | undefined,
  services = SERVICES,
  categories = SERVICE_CATEGORIES
): string | undefined {
  if (!value) return undefined;
  const decoded = decodeURIComponent(value);
  const byName = services.find(
    (s) => s.name.toLowerCase() === decoded.toLowerCase()
  );
  if (byName) return byName.name;
  const bySlug = services.find((s) => s.slug === decoded);
  if (bySlug) return bySlug.name;
  const byCategory = categories.find(
    (c) =>
      c.name.toLowerCase() === decoded.toLowerCase() || c.href === decoded
  );
  if (byCategory) return byCategory.name;
  return decoded;
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string; service?: string }>;
}) {
  const { branch, service } = await searchParams;
  const serviceContent = await getPublicServiceContent();
  const defaultBranch = isBranchSlug(branch) ? branch : undefined;
  const defaultService = resolveServicePreference(
    service,
    serviceContent.services,
    serviceContent.categories
  );

  return (
    <>
      <PageHero
        eyebrow="Book"
        title="Request your visit."
        subtitle="Tell us what you need — the team reviews every request before confirming. For urgent same-day timing, WhatsApp is fastest."
        image={IMAGES.book.src}
        imageAlt={IMAGES.book.alt}
        size="sm"
      />

      <section className="relative overflow-hidden bg-cream px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ol className="grid gap-3 sm:grid-cols-3">
            {BOOKING_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-card border border-warm-border/80 bg-white/55 px-4 py-4"
              >
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action/70">
                  Step {index + 1}
                </p>
                <h2 className="mt-2 font-serif text-h4 text-warm">{step.title}</h2>
                <p className="mt-1.5 text-body-sm text-warm-grey">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BookingZone
        defaultBranch={defaultBranch}
        defaultService={defaultService}
        serviceOptions={serviceContent.services.map((item) => item.name)}
        heading="Book your visit."
        subtitle="Tell us what you'd like and when — we'll confirm within 24 hours. No card required to enquire."
      />
    </>
  );
}
