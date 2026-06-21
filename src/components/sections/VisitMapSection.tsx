"use client";

import Link from "next/link";
import { useRef } from "react";
import { Asterisk, CornerDownRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Button } from "@/components/ui/button";
import { VISIT_STEPS } from "@/lib/site";
import { WAX_BEAM } from "@/lib/wax-theme";
import { cn } from "@/lib/utils";

export function VisitMapSection() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const stepRefs = [step0Ref, step1Ref, step2Ref, step3Ref];

  return (
    <section id="visit-map" className="band-pearl px-5 py-section-lg lg:px-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-16">
          <div className="top-24 col-span-2 h-fit space-y-6 lg:sticky">
            <div className="relative w-fit">
              <h2 className="type-title-serif text-warm">What happens in the room.</h2>
              <Asterisk className="absolute -top-2 -right-6 size-5 text-gold lg:-right-10 lg:size-8" />
            </div>
            <p className="max-w-sm text-body text-warm-grey">
              A quieter appointment flow than a walk-in salon — from your first message to
              after-care guidance.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/about">
                <CornerDownRight className="h-4 w-4 text-brand-action" />
                Full studio standards
              </Link>
            </Button>
          </div>

          <div ref={containerRef} className="relative col-span-4">
            {!reduceMotion && (
              <>
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={step0Ref}
                  toRef={step1Ref}
                  curvature={-40}
                  {...WAX_BEAM}
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={step1Ref}
                  toRef={step2Ref}
                  curvature={-40}
                  delay={0.5}
                  {...WAX_BEAM}
                />
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={step2Ref}
                  toRef={step3Ref}
                  curvature={-40}
                  delay={1}
                  {...WAX_BEAM}
                />
              </>
            )}

            <ul className="relative space-y-0">
              {VISIT_STEPS.map((step, index) => (
                <li
                  key={step.step}
                  className={cn(
                    "grid gap-6 border-t border-warm-border py-8 md:grid-cols-[72px_1fr] md:gap-8 lg:py-10",
                    index === 0 && "border-t-0 pt-0"
                  )}
                >
                  <div
                    ref={stepRefs[index]}
                    className="flex size-14 items-center justify-center border border-warm-border bg-cream-alt font-sans text-h3 font-semibold tabular-nums text-brand-action/40"
                  >
                    {step.step}
                  </div>
                  <div>
                    <h3 className="type-subtitle text-warm">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-body text-warm-grey">{step.body}</p>
                    <p className="mt-3 text-small italic text-warm-grey/90">{step.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
