"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import {
  WAX_PRICE_ROWS,
  WAX_PACKAGES,
  type WaxPriceRow,
  type WaxPackage,
} from "@/lib/pricing";
import { formatLKR, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons";

type CategoryFilter = "all" | "face" | "body" | "intimate";

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Areas" },
  { id: "face", label: "Face & Brows" },
  { id: "body", label: "Arms, Legs & Body" },
  { id: "intimate", label: "Intimate & Combos" },
];

function isFaceArea(area: string) {
  const lower = area.toLowerCase();
  return (
    lower.includes("lip") ||
    lower.includes("eyebrow") ||
    lower.includes("forehead") ||
    lower.includes("nose") ||
    lower.includes("chin") ||
    lower.includes("face")
  );
}

function isIntimateArea(area: string) {
  const lower = area.toLowerCase();
  return lower.includes("brazilian") || lower.includes("underarm");
}

function isBodyArea(area: string) {
  return !isFaceArea(area) && !isIntimateArea(area);
}

export function WaxPriceMatrix() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filteredRows = WAX_PRICE_ROWS.filter((row) => {
    if (filter === "face") return isFaceArea(row.area);
    if (filter === "body") return isBodyArea(row.area);
    if (filter === "intimate") return isIntimateArea(row.area);
    return true;
  });

  return (
    <div className="space-y-16">
      {/* 1. Package Bundles Showcase */}
      <div>
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="rounded-pill border border-brand-action/25 bg-brand-mist/50 px-3.5 py-1 text-caption font-semibold uppercase tracking-[0.14em] text-brand-action">
            Curated Bundles
          </span>
          <h3 className="mt-3 font-serif text-h3 text-warm text-balance">
            Popular Wax Packages
          </h3>
          <p className="mt-2 max-w-lg text-body text-warm-grey text-pretty">
            Complete multi area waxing packages bundled for convenience and savings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {WAX_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      {/* 2. Comprehensive A-la-carte Matrix */}
      <div>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-action">
              Detailed Menu
            </span>
            <h3 className="mt-1 font-serif text-h3 text-warm text-balance">
              Waxing by Treatment Area
            </h3>
            <p className="mt-1 text-body-sm text-warm-grey text-pretty">
              Choose from Australia&apos;s award-winning Lycon wax or Italy&apos;s gentle Rica wax.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter areas">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "rounded-pill min-h-11 px-3.5 py-1.5 text-caption font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2",
                  filter === f.id
                    ? "bg-brand text-cream shadow-[0_2px_8px_rgba(43,7,16,0.14)]"
                    : "border border-warm-border/80 bg-white/50 text-warm-grey hover:bg-cream hover:text-warm"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Guide Legend */}
        <div className="mb-6 grid gap-3 rounded-card border border-warm-border/60 bg-white/40 p-4 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light/30 text-caption font-bold text-brand-action">
              L
            </span>
            <div>
              <p className="text-body-sm font-semibold text-warm text-pretty">Lycon (Australia)</p>
              <p className="text-caption text-warm-grey text-pretty">Pinkini & Superberry hot wax for delicate, sensitive skin.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-action/20 text-caption font-bold text-brand-action">
              R
            </span>
            <div>
              <p className="text-body-sm font-semibold text-warm text-pretty">Rica (Italy)</p>
              <p className="text-caption text-warm-grey text-pretty">White chocolate strip wax for gentle, flawless body waxing.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-caption font-bold text-gold">
              B
            </span>
            <div>
              <p className="text-body-sm font-semibold text-warm text-pretty">Brazil Gold</p>
              <p className="text-caption text-warm-grey text-pretty">Reliable, smooth standard body wax option.</p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-card border border-warm-border bg-white/65 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-body-sm">
              <thead>
                <tr className="border-b border-warm-border/80 bg-brand-mist/50 text-caption font-semibold uppercase tracking-[0.1em] text-warm">
                  <th className="px-5 py-3.5">Treatment Area</th>
                  <th className="px-4 py-3.5 text-right">Standard (Brazil Gold)</th>
                  <th className="px-4 py-3.5 text-right">Rica (Italy)</th>
                  <th className="px-4 py-3.5 text-right">Lycon hot wax</th>
                  <th className="px-4 py-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border/40">
                <AnimatePresence mode="popLayout">
                  {filteredRows.map((row) => (
                    <MatrixRow key={row.area} row={row} />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-caption text-warm-grey text-pretty">
          * All intimate and facial waxing uses fresh, single-use wooden spatulas with strict zero double dipping.
        </p>
      </div>
    </div>
  );
}

function MatrixRow({ row }: { row: WaxPriceRow }) {
  const biahuPrice = row.prices["biahu-gold"];
  const ricaPrice = row.prices["rica-white-choc"];
  const lyconPrice =
    row.prices["lycon-pinkini"] ??
    row.prices["lycon-superberry"] ??
    row.prices["lycon-aloe-vera"];

  const bookText = `Hi Wax In The City! I'd like to book ${row.area} waxing.`;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="transition-colors hover:bg-cream/40"
    >
      <td className="px-5 py-3.5 font-medium text-warm">
        <div>{row.area}</div>
        {row.note && (
          <div className="mt-0.5 text-caption text-warm-grey/80">{row.note}</div>
        )}
      </td>
      <td className="px-4 py-3.5 text-right font-medium tabular-nums text-warm">
        {biahuPrice ? formatLKR(biahuPrice) : <span className="text-warm-grey/40">—</span>}
      </td>
      <td className="px-4 py-3.5 text-right font-medium tabular-nums text-warm">
        {ricaPrice ? formatLKR(ricaPrice) : <span className="text-warm-grey/40">—</span>}
      </td>
      <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-brand-action">
        {lyconPrice ? formatLKR(lyconPrice) : <span className="text-warm-grey/40">—</span>}
      </td>
      <td className="px-4 py-3.5 text-center">
        <a
          href={whatsappLink(bookText)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-1 rounded-pill border border-brand-action/30 bg-brand-mist/30 px-3 py-1 text-caption font-medium text-brand-action transition-all hover:bg-brand-action hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-3 w-3" />
          <span>Book</span>
        </a>
      </td>
    </motion.tr>
  );
}

function PackageCard({ pkg }: { pkg: WaxPackage }) {
  const whatsappMsg = `Hi Wax In The City! I'd like to book the ${pkg.name} package.`;

  return (
    <div className="premium-surface relative flex flex-col justify-between rounded-2xl p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      {pkg.tag && (
        <div className="absolute -top-3 right-6 rounded-pill bg-brand px-3 py-0.5 text-caption font-semibold uppercase tracking-[0.12em] text-cream shadow-[0_2px_8px_rgba(43,7,16,0.14)]">
          {pkg.tag}
        </div>
      )}

      <div>
        <div className="flex items-baseline justify-between">
          <h4 className="font-serif text-h4 text-warm text-balance">{pkg.name}</h4>
          <span className="text-caption font-medium text-warm-grey">{pkg.duration}</span>
        </div>
        <p className="mt-2 text-body-sm text-warm-grey text-pretty">{pkg.description}</p>

        {/* Inclusions list */}
        <div className="mt-5 border-t border-warm-border/60 pt-4">
          <p className="text-caption font-semibold uppercase tracking-[0.1em] text-warm-grey text-pretty">
            Includes:
          </p>
          <ul className="mt-2 space-y-1.5">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2 text-body-sm text-warm">
                <Check className="h-4 w-4 shrink-0 text-brand-action" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing options & CTA */}
      <div className="mt-6 border-t border-warm-border/60 pt-4">
        <div className="grid grid-cols-2 gap-2 rounded-card bg-brand-mist/30 p-3 text-center">
          <div>
            <span className="block text-caption text-warm-grey">With Brazil Gold</span>
            <span className="font-serif text-h4 font-medium text-warm">
              {formatLKR(pkg.prices.essential)}
            </span>
          </div>
          <div className="border-l border-warm-border/60 pl-2">
            <span className="block text-caption text-brand-action font-medium">With Rica</span>
            <span className="font-serif text-h4 font-medium text-brand-action">
              {formatLKR(pkg.prices.premium)}
            </span>
          </div>
        </div>

        <Button asChild className="mt-4 w-full" size="md">
          <a href={whatsappLink(whatsappMsg)} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon className="h-4 w-4" />
            Book This Package
          </a>
        </Button>
      </div>
    </div>
  );
}
