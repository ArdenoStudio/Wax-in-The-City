import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategory,
  servicesByCategory,
} from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/service-card";
import { BookingZone } from "@/components/sections/BookingZone";
import { AnimatedSection } from "@/components/global/AnimatedSection";

const HERO_IMAGES: Record<string, string> = {
  waxing: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1600&auto=format&fit=crop",
  facials: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop",
  moroccan: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
  "hydra-facial": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop",
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
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const services = servicesByCategory(category.slug);

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={category.name}
        subtitle={category.description}
        image={HERO_IMAGES[category.href] ?? HERO_IMAGES.facials}
        imageAlt={`${category.name} at Wax In The City`}
      />

      <section className="bg-cream px-5 py-section lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/services"
            className="nav-link mb-10 inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-action"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} variant="fadeUp" delay={i * 0.05}>
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="bg-cream-alt px-5 py-section lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-h2 text-warm">Explore other treatments</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SERVICE_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.href}`}
                className="rounded-pill border border-brand-action/40 px-5 py-2.5 text-body-sm font-medium text-brand-action transition-colors hover:bg-brand-mist"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingZone defaultBranch={undefined} heading="Ready to book?" />
    </>
  );
}
