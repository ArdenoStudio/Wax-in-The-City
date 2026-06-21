import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, getCategory } from "@/lib/site";
import { getPublicServiceContent } from "@/lib/service-content";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";

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
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/services/${slug}` },
  };
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
      <PageHero
        title={category.name}
        subtitle={category.description}
        image={HERO_IMAGES[category.href] ?? HERO_IMAGES.facials}
        imageAlt={`${category.name} at Wax In The City`}
      />

      <section className="band-pearl px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="mb-10 inline-flex min-h-10 items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="band-pearl border-t border-warm-border px-5 py-section-lg lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="type-title-serif text-warm">Explore other treatments</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {serviceContent.categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${c.href}`}
                  className="inline-flex items-center gap-2 rounded-pill border border-warm-border px-5 py-2.5 text-body-sm font-medium text-brand-action hover:bg-cream-alt"
                >
                  {c.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="band-wine px-5 py-section-lg lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="type-title-serif text-cream">Ready to book {category.name.toLowerCase()}?</h2>
            <p className="mt-2 max-w-md text-body text-cream/72">
              Send a request and we&apos;ll confirm within 24 hours.
            </p>
          </div>
          <Button asChild size="lg" variant="inverted">
            <Link href={`/book?service=${encodeURIComponent(category.name)}`}>
              Send booking request
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
