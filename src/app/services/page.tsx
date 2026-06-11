import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { BookingZone } from "@/components/sections/BookingZone";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicServiceContent } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Waxing, facials, Moroccan treatments and hydra facials — done with genuine care at our ladies-only studios in Battaramulla and Nugegoda.",
};

export default async function ServicesPage() {
  const serviceContent = await getPublicServiceContent();

  return (
    <>
      <PageHero
        eyebrow="Our treatments"
        title="Treatments made for you."
        subtitle="Four kinds of care, each with fresh wax, clean tools and a private room."
        image="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Soft, editorial close-up of skincare"
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Explore by category"
            title="Choose your treatment path."
            subtitle="Compare treatments, timing and starting prices without digging through a long salon list."
          />
          <div className="mt-12">
            <ServiceTabs
              categories={serviceContent.categories}
              services={serviceContent.services}
            />
          </div>
        </div>
      </section>

      <BookingZone
        heading="Found something for you?"
        subtitle="Send a request and we'll confirm within 24 hours — or reach us on WhatsApp."
      />
    </>
  );
}
