"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { SITE } from "@/lib/site";

export function HeroArrival() {
  return (
    <section className="band-wine relative min-h-[min(100svh,820px)]">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          unoptimized={IMAGES.hero.src.startsWith("http")}
          className="object-cover object-[62%_center]"
        />
        <div className="scrim-hero-ltr absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[min(100svh,820px)] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <p className="type-label text-brand-light">Ladies-only studio · Colombo</p>
        <h1 className="type-display mt-5 max-w-[14ch] text-balance text-cream">
          Private waxing,
          <br />
          done properly.
        </h1>
        <p className="mt-6 max-w-md text-body-lg text-cream/78">
          {SITE.description}
        </p>
        <p className="mt-3 text-small text-cream/60">
          Battaramulla open now · Nugegoda opening soon
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" variant="primary">
            <Link href="/book">
              <CalendarDays className="h-5 w-5" />
              Send a booking request
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="#visit-map">
              Walk through a visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
