import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WaxBookLayout } from "@/components/sections/WaxBookLayout";
import { BRANCHES, getBranch, SERVICES, SERVICE_CATEGORIES, type BranchSlug } from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Book Your Visit",
  description:
    "Send a booking request to Wax In The City — we confirm within 24 hours, or reach us on WhatsApp for urgent timing.",
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
  const byName = services.find((s) => s.name.toLowerCase() === decoded.toLowerCase());
  if (byName) return byName.name;
  const bySlug = services.find((s) => s.slug === decoded);
  if (bySlug) return bySlug.name;
  const byCategory = categories.find(
    (c) => c.name.toLowerCase() === decoded.toLowerCase() || c.href === decoded
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
  const defaultBranch =
    isBranchSlug(branch) && getBranch(branch).status === "open" ? branch : undefined;
  const defaultService = resolveServicePreference(
    service,
    serviceContent.services,
    serviceContent.categories
  );

  return (
    <>
      <PageHero
        voice="sans"
        title="Send a booking request."
        subtitle="We confirm by call or WhatsApp before your visit. No card required."
        minimal
      />
      <WaxBookLayout
        defaultBranch={defaultBranch}
        defaultService={defaultService}
        serviceOptions={serviceContent.services.map((item) => item.name)}
      />
    </>
  );
}
