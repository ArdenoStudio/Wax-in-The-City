"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { IMAGES } from "@/lib/images";
import {
  WAX_PRICE_ROWS,
  WAX_PACKAGES,
  type WaxPriceRow,
  type WaxPackage,
} from "@/lib/pricing";
import { EASE_APPLE } from "@/lib/animations";
import { formatLKR, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons";
import { WhatsAppBranchPicker } from "@/components/sections/WhatsAppBranchPicker";

type CategoryFilter = "all" | "face" | "body" | "intimate";

const LEGEND_ACCENTS = {
  lycon: {
    thumb: "border-rose-200/60 bg-rose-50/60",
    chip: "border-rose-200 bg-rose-50 text-rose-700",
  },
  rica: {
    thumb: "border-amber-200/60 bg-amber-50/60",
    chip: "border-amber-200 bg-amber-50 text-amber-800",
  },
  brazilGold: {
    thumb: "border-yellow-200/60 bg-yellow-50/60",
    chip: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
} as const;

const PRODUCT_LEGEND = [
  { key: "lycon" as const, product: IMAGES.waxProducts.lycon, blurb: "Pinkini & Superberry hot wax for delicate zones." },
  { key: "rica" as const, product: IMAGES.waxProducts.rica, blurb: "White chocolate strip wax for body waxing." },
  { key: "brazilGold" as const, product: IMAGES.waxProducts.brazilGold, blurb: "Reliable, smooth standard body wax option." },
];

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
        <div className="mb-6 grid gap-3 rounded-card border border-warm-border/60 bg-white/60 p-3 sm:grid-cols-3">
          {PRODUCT_LEGEND.map(({ key, product, blurb }) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-lg border border-warm-border/50 bg-white/70 p-2.5 shadow-[0_4px_12px_rgba(27,14,16,0.06)]"
            >
              <div className={cn("relative h-12 w-12 shrink-0 overflow-hidden rounded-md border p-1", LEGEND_ACCENTS[key].thumb)}>
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-body-sm font-semibold text-warm">{product.brand}</span>
                  <span className={cn("rounded-pill border px-1.5 py-0.5 text-caption font-semibold", LEGEND_ACCENTS[key].chip)}>
                    {product.origin} {product.flag}
                  </span>
                </div>
                <p className="text-caption text-warm-grey text-pretty">{blurb}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Clean Card List (< 640px) */}
        <div className="space-y-3 sm:hidden">
          <AnimatePresence mode="popLayout">
            {filteredRows.map((row) => (
              <MobileMatrixCard key={row.area} row={row} />
            ))}
          </AnimatePresence>
        </div>

        {/* Desktop View: Comprehensive Matrix Table (>= 640px) */}
        <div className="hidden sm:block overflow-hidden rounded-card border border-warm-border bg-white/65 shadow-card">
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

function MobileMatrixCard({ row }: { row: WaxPriceRow }) {
  const biahuPrice = row.prices["biahu-gold"];
  const ricaPrice = row.prices["rica-white-choc"];
  const lyconPrice =
    row.prices["lycon-pinkini"] ??
    row.prices["lycon-superberry"] ??
    row.prices["lycon-aloe-vera"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE_APPLE }}
      className="rounded-card border border-warm-border/80 bg-white/80 p-3.5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-serif text-body font-semibold text-warm leading-snug">{row.area}</h4>
          {row.note && (
            <p className="mt-0.5 text-caption text-warm-grey leading-tight">{row.note}</p>
          )}
        </div>
        <WhatsAppBranchPicker
          service={`${row.area} waxing`}
          className="pressable inline-flex min-h-9 shrink-0 items-center gap-1 rounded-pill border border-brand-action/35 bg-brand-mist/40 px-3 py-1 text-caption font-semibold text-brand-action active:bg-brand-action active:text-cream"
        >
          <WhatsappIcon className="h-3 w-3" />
          <span>Book</span>
        </WhatsAppBranchPicker>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-warm-border/40 pt-2.5 text-center">
        <div className="rounded-md border border-yellow-200/50 bg-yellow-50/60 px-1 py-1.5">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-warm-grey">Brazil Gold</span>
          <span className="mt-0.5 block text-caption font-semibold text-warm">
            {biahuPrice ? formatLKR(biahuPrice) : "—"}
          </span>
        </div>
        <div className="rounded-md border border-amber-200/50 bg-amber-50/60 px-1 py-1.5">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-amber-800">Rica Italy</span>
          <span className="mt-0.5 block text-caption font-semibold text-warm">
            {ricaPrice ? formatLKR(ricaPrice) : "—"}
          </span>
        </div>
        <div className="rounded-md border border-rose-200/60 bg-rose-50/70 px-1 py-1.5">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-rose-700">Lycon Hot</span>
          <span className="mt-0.5 block text-caption font-semibold text-brand-action">
            {lyconPrice ? formatLKR(lyconPrice) : "—"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function MatrixRow({ row }: { row: WaxPriceRow }) {
  const biahuPrice = row.prices["biahu-gold"];
  const ricaPrice = row.prices["rica-white-choc"];
  const lyconPrice =
    row.prices["lycon-pinkini"] ??
    row.prices["lycon-superberry"] ??
    row.prices["lycon-aloe-vera"];

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_APPLE }}
      className="transition-colors hover:bg-cream/40"
    >
      <td className="px-5 py-3.5 font-medium text-warm">
        <div>{row.area}</div>
        {row.note && (
          <div className="mt-0.5 text-caption text-warm-grey">{row.note}</div>
        )}
      </td>
      <td className="px-4 py-3.5 text-right font-medium tabular-nums text-warm">
        {biahuPrice ? formatLKR(biahuPrice) : (<><span className="sr-only">Not offered</span><span aria-hidden="true" className="text-warm-grey/70">—</span></>)}
      </td>
      <td className="px-4 py-3.5 text-right font-medium tabular-nums text-warm">
        {ricaPrice ? formatLKR(ricaPrice) : (<><span className="sr-only">Not offered</span><span aria-hidden="true" className="text-warm-grey/70">—</span></>)}
      </td>
      <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-brand-action">
        {lyconPrice ? formatLKR(lyconPrice) : (<><span className="sr-only">Not offered</span><span aria-hidden="true" className="text-warm-grey/70">—</span></>)}
      </td>
      <td className="px-4 py-3.5 text-center">
        <WhatsAppBranchPicker
          service={`${row.area} waxing`}
          className="inline-flex min-h-10 items-center gap-1 rounded-pill border border-brand-action/30 bg-brand-mist/30 px-3 py-1 text-caption font-medium text-brand-action transition-all hover:bg-brand-action hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2"
        >
          <WhatsappIcon className="h-3 w-3" />
          <span>Book</span>
        </WhatsAppBranchPicker>
      </td>
    </motion.tr>
  );
}

function PackageCard({ pkg }: { pkg: WaxPackage }) {

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

        <WhatsAppBranchPicker
          service={`the ${pkg.name} package`}
          className={cn(buttonVariants({ size: "md" }), "mt-4 w-full")}
        >
          <WhatsappIcon className="h-4 w-4" />
          Book This Package
        </WhatsAppBranchPicker>
      </div>
    </div>
  );
}
