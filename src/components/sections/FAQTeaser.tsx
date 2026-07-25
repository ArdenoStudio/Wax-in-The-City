"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQ_GROUPS, type FaqGroup } from "@/lib/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { AnimatedSection } from "@/components/global/AnimatedSection";

const DEFAULT_TEASER_QUESTIONS = [
  "Is the studio really ladies-only?",
  "Do you use fresh wax for every guest?",
  "How long should my hair be before waxing?",
  "Do I need to book in advance?",
] as const;

function pickTeaserGroups(
  groups: FaqGroup[] = FAQ_GROUPS,
  questions: readonly string[] = DEFAULT_TEASER_QUESTIONS
): FaqGroup[] {
  const wanted = new Set(questions);
  const items = groups
    .flatMap((g) => g.items)
    .filter((item) => wanted.has(item.question))
    .slice(0, 4);

  if (!items.length) {
    return [
      {
        category: "Quick answers",
        items: groups.flatMap((g) => g.items).slice(0, 4),
      },
    ];
  }

  return [{ category: "Quick answers", items }];
}

/** Homepage FAQ preview — calm, narrow teaser with link to full FAQ. */
export function FAQTeaser({
  groups,
}: {
  groups?: FaqGroup[];
}) {
  const teaserGroups = pickTeaserGroups(groups);

  return (
    <section
      id="faq-teaser"
      className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-35" />
      <div className="mx-auto max-w-2xl">
        <AnimatedSection variant="fadeUpFast">
          <SectionHeading
            eyebrow="FAQ"
            showEyebrow={false}
            title="Questions before you book."
            subtitle="A few of the answers guests ask most often — hygiene, privacy and how to prepare."
          />
        </AnimatedSection>

        <AnimatedSection variant="fadeUpFast" delay={0.06} className="mt-9">
          <div className="rounded-card-lg border border-warm-border/70 bg-white/60 px-1 py-1 sm:px-2 sm:py-2">
            <FAQAccordion groups={teaserGroups} defaultOpen="0-0" />
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUpFast" delay={0.1}>
          <p className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-sans text-body-sm font-medium text-brand-action transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-alt"
            >
              All questions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
