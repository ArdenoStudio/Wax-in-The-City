import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookingZone } from "@/components/sections/BookingZone";
import { BRANCHES, type BranchSlug } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Visit",
  description:
    "Book your visit to Wax In The City — send a request and we'll confirm within 24 hours, or reach us instantly on WhatsApp.",
};

function isBranchSlug(value?: string): value is BranchSlug {
  return Boolean(value) && BRANCHES.some((b) => b.slug === value);
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string; service?: string }>;
}) {
  const { branch, service } = await searchParams;
  const defaultBranch = isBranchSlug(branch) ? branch : undefined;

  return (
    <>
      <PageHero
        eyebrow="Book your visit"
        title="Ready when you are."
        subtitle="Tell us what you'd like and when — we'll confirm within 24 hours."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Calm treatment space ready for a visit"
      />

      <BookingZone
        mode="form"
        defaultBranch={defaultBranch}
        defaultService={service}
        heading="Send your request."
        subtitle="No card required to enquire. Prefer WhatsApp? It's just below."
      />
    </>
  );
}
