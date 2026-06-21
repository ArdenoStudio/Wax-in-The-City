"use client";

import { Sparkles, Droplets, Flower2, Waves } from "lucide-react";
import Link from "next/link";
import { type ServiceCategoryMeta } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WaxServicesGridProps {
  categories: ServiceCategoryMeta[];
  className?: string;
}

const ICONS = [Sparkles, Droplets, Flower2, Waves];

/** shadcnblocks services4 pattern — wax themed */
export function WaxServicesGrid({ categories, className }: WaxServicesGridProps) {
  return (
    <section className={cn("band-pearl px-5 py-section-lg lg:px-8", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-left">
            <h2 className="type-title-serif text-warm">Compare timing and prices.</h2>
            <p className="max-w-2xl text-body text-warm-grey">
              Every request is reviewed before confirmation so appointments stay realistic.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <Link
                  key={category.slug}
                  href={`/services/${category.href}`}
                  className="surface group p-6 transition-shadow hover:shadow-card-hover sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-card bg-brand-mist text-brand-action">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="type-subtitle text-warm group-hover:text-brand-action">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-warm-grey">{category.short}</p>
                  <p className="mt-4 text-small font-medium text-brand-action">
                    From {formatLKRFrom(category.priceFrom)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
