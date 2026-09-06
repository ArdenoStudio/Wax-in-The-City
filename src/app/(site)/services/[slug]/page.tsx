import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategory,
} from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { WaxPriceMatrix } from "@/components/sections/WaxPriceMatrix";
import { WaxTypesShowcase } from "@/components/sections/WaxTypesShowcase";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { BreadcrumbJsonLd } from "@/components/global/BreadcrumbJsonLd";
import { ServiceCatalogJsonLd } from "@/components/global/ServiceCatalogJsonLd";

export const revalidate = 3600;

const HERO_IMAGES: Record<string, string> = {
  waxing: IMAGES.services.waxing,
  facials: IMAGES.services.facials,
  moroccan: IMAGES.services.moroccan,
  "hydra-facial": IMAGES.services.hydraFacial,
};

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ slug: c.href }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Services" };
  return buildPageMetadata({
    title: category.name,
    description: category.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceContent = await getPublicServiceContent();
  const category =
    serviceContent.categories.find((c) => c.href === slug) ?? getCategory(slug);
  if (!category) notFound();

  const services = serviceContent.services.filter(
    (service) => service.category === category.slug
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: category.name, path: `/services/${category.href}` },
        ]}
      />
      <ServiceCatalogJsonLd
        category={category.name}
        services={services.map((service) => ({
          name: service.name,
          priceFrom: service.priceFrom,
        }))}
      />
      <PageHero
        eyebrow="Treatments"
        title={category.name}
        subtitle={category.description}
        image={HERO_IMAGES[category.href] ?? HERO_IMAGES.facials}
        imageAlt={`${category.name} at Wax In The City`}
        priority
      />

      <section className="relative overflow-hidden bg-cream px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="nav-link mb-10 inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          {category.slug === "waxing" ? (
            <div className="space-y-16">
              <WaxTypesShowcase />
              <div data-analytics-section="wax-price-matrix">
                <WaxPriceMatrix />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-serif text-h3 font-medium text-warm text-balance">Available treatments</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, i) => (
                  <AnimatedSection key={service.slug} variant="fadeUp" delay={i * 0.05}>
                    <ServiceCard service={service} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-h2 font-medium text-warm text-balance">Explore other treatments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {serviceContent.categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.href}`}
                className="rounded-pill border border-brand-action/30 bg-white/42 px-5 py-2.5 text-body-sm font-medium text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingZone heading="Ready to book?" />
    </>
  );
}
