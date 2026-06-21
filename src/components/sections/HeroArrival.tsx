"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { PROTOCOL_POINTS } from "@/lib/wax-theme";
import { useReducedMotion } from "motion/react";

export function HeroArrival() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="band-wine relative min-h-[min(100svh,900px)] overflow-hidden pt-24 text-cream lg:pt-28">
      <div className="container mx-auto grid min-h-[min(80svh,760px)] grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-16">
        <div className="flex flex-col justify-center">
          <p className="type-label text-brand-light">Ladies-only studio · Colombo</p>

          <h1 className="mt-4 max-w-xl text-balance">
            {reduceMotion ? (
              <span className="type-display text-cream">
                Private waxing,
                <br />
                done properly.
              </span>
            ) : (
              <SplitText
                text="Private waxing, done properly."
                tag="span"
                className="type-display text-cream"
                splitType="lines"
                delay={60}
                duration={0.9}
                textAlign="left"
              />
            )}
          </h1>

          <p className="mt-5 max-w-lg text-body text-cream/78">{SITE.description}</p>
          <p className="mt-3 text-small text-cream/60">
            Battaramulla open now · Nugegoda opening soon
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/book">
                <CalendarDays className="h-5 w-5" />
                Send a booking request
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="#visit-map">
                Walk through a visit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="surface-on-wine mt-6 p-5">
            <p className="type-label text-brand-light">Studio protocol</p>
            <ul className="mt-3 space-y-2">
              {PROTOCOL_POINTS.map((point) => (
                <li key={point} className="flex gap-2 text-body-sm text-cream/80">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] overflow-hidden rounded-card border border-cream/10 lg:block">
          <Image
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            unoptimized={IMAGES.hero.src.startsWith("http")}
            className="object-cover object-center"
          />
          <div className="scrim-caption absolute inset-0" />
          <p className="absolute bottom-0 left-0 max-w-xs p-6 text-small text-cream/85">
            Private rooms, calm lighting, and therapists who explain each step before they begin.
          </p>
        </div>
      </div>

      <div className="relative mx-5 mb-8 aspect-[16/10] overflow-hidden rounded-card border border-cream/10 lg:hidden">
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          unoptimized={IMAGES.hero.src.startsWith("http")}
          className="object-cover object-center"
        />
        <div className="scrim-caption absolute inset-0" />
      </div>
    </section>
  );
}
