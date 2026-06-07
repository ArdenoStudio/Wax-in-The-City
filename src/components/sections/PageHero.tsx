"use client";

import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  /** Shorter hero for inner pages (default) vs taller. */
  size?: "sm" | "md";
}

/** Reusable inner-page hero (file 08 — every page opens with a hero). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  size = "sm",
}: PageHeroProps) {
  return (
    <section
      className={`relative flex w-full items-end overflow-hidden bg-ink ${
        size === "md" ? "min-h-[560px]" : "min-h-[460px]"
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,17,18,0.88)_0%,rgba(62,15,23,0.62)_48%,rgba(62,15,23,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-20">
        {eyebrow && (
          <p className="mb-4 inline-flex rounded-pill border border-cream/15 bg-cream/10 px-4 py-2 text-caption font-semibold uppercase tracking-[0.16em] text-brand-light backdrop-blur">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-serif text-[3rem] font-light italic leading-[1.02] text-cream sm:text-[4.4rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-body-lg text-cream/85">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
