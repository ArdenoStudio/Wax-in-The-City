"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import {
  HeroColorPanelsRoot,
  HeroColorPanelsContainer,
  HeroColorPanelsContent,
  HeroColorPanelsHeading,
  HeroColorPanelsDescription,
  HeroColorPanelsActions,
  HeroColorPanelsVisual,
  HeroColorPanelsMobileVisual,
} from "@/components/ui/hero-color-panel";
import SplitText from "@/components/SplitText";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import {
  PROTOCOL_POINTS,
  WAX_SHADER_DESKTOP,
  WAX_SHADER_MOBILE,
} from "@/lib/wax-theme";
import { useReducedMotion } from "motion/react";

export function HeroArrival() {
  const reduceMotion = useReducedMotion();

  return (
    <HeroColorPanelsRoot
      className="band-wine min-h-[min(100svh,900px)] pt-24 text-cream lg:pt-28"
      srTitle="Private waxing, done properly"
      title={
        reduceMotion ? (
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
        )
      }
      subtitle=""
      description={SITE.description}
      showBadges={false}
      showCta={false}
      desktopShaderProps={WAX_SHADER_DESKTOP}
      mobileShaderProps={WAX_SHADER_MOBILE}
    >
      <HeroColorPanelsContainer className="min-h-[min(80svh,760px)] items-center">
        <HeroColorPanelsContent>
          <p className="type-label text-brand-light lg:text-left">Ladies-only studio · Colombo</p>
          <HeroColorPanelsHeading headingClassName="font-serif text-cream" />
          <HeroColorPanelsDescription descriptionClassName="text-cream/78" />
          <p className="text-small text-cream/60 lg:text-left">
            Battaramulla open now · Nugegoda opening soon
          </p>

          <HeroColorPanelsActions className="flex-col gap-3 sm:flex-row">
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
          </HeroColorPanelsActions>

          <div className="surface-on-wine mt-4 p-5 lg:mt-6">
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
        </HeroColorPanelsContent>

        <HeroColorPanelsVisual
          desktopClassName="hidden lg:block min-h-[420px] rounded-card overflow-hidden border border-cream/10"
        />
      </HeroColorPanelsContainer>
      <HeroColorPanelsMobileVisual className="px-5 pb-8 lg:hidden" />
    </HeroColorPanelsRoot>
  );
}
