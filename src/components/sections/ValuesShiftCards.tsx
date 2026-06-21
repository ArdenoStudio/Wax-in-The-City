"use client";

import Image from "next/image";
import { ShiftCard } from "@/components/ui/shift-card";
import { IMAGES } from "@/lib/images";

const VALUES = [
  {
    title: "Hygiene is visible",
    body: "Fresh wax handling, clean tools, and prepared surfaces — treated as normal, not a premium add-on.",
  },
  {
    title: "Privacy stays protected",
    body: "Ladies-only rooms and appointment-led timing so sensitive services feel less intimidating.",
  },
  {
    title: "Advice stays practical",
    body: "We help you choose what suits your skin and timing — not the biggest treatment on the menu.",
  },
];

export function ValuesShiftCards() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center">
      {VALUES.map((value) => (
        <ShiftCard
          key={value.title}
          className="surface min-h-[280px] w-full max-w-sm border-warm-border bg-cream md:w-[300px]"
          topContent={
            <div className="rounded-card bg-brand-mist p-4">
              <h3 className="type-subtitle text-warm">{value.title}</h3>
            </div>
          }
          middleContent={
            <Image
              src={IMAGES.socialProof.src}
              alt=""
              width={120}
              height={160}
              className="rounded-card border border-warm-border object-cover"
            />
          }
          bottomContent={
            <div className="rounded-card border-t border-warm-border bg-cream p-4">
              <p className="text-body-sm text-warm-grey">{value.body}</p>
            </div>
          }
        />
      ))}
    </div>
  );
}
