import type { Metadata } from "next";
import { BRANCHES } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { BranchCard } from "@/components/ui/branch-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/global/AnimatedSection";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Two ladies-only Wax In The City studios in Colombo — Battaramulla and Nugegoda. Find hours, directions and WhatsApp booking.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit us"
        title="Find us in Colombo."
        subtitle="Two private studios, each easy to reach. Choose the one closest to home."
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Calm, welcoming studio interior"
      />

      <section className="bg-cream px-5 py-section lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Our branches" title="Two Colombo studios." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {BRANCHES.map((branch, i) => (
              <AnimatedSection key={branch.slug} variant="fadeUp" delay={i * 0.08}>
                <BranchCard branch={branch} variant="full" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BookingZone heading="Ready when you are." />
    </>
  );
}
