import type { Metadata } from "next";
import { BookingZone } from "@/components/sections/BookingZone";
import { BRANCHES, SERVICES, SERVICE_CATEGORIES, type BranchSlug } from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";

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
    <BookingZone
      mode="form"
      defaultBranch={defaultBranch}
      defaultService={defaultService}
      serviceOptions={serviceContent.services.map((item) => item.name)}
      heading="Book your visit."
      subtitle="Tell us what you'd like and when — we'll confirm within 24 hours. No card required to enquire."
    />
  );
}
