"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQ_GROUPS, type FaqGroup } from "@/lib/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

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

/** Homepage FAQ preview — top questions with a link to the full FAQ page. */
export function FAQTeaser({
  groups,
}: {
  groups?: FaqGroup[];
}) {
  const teaserGroups = pickTeaserGroups(groups);

  return (
    <section className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-50" />
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          showEyebrow={false}
          title="Questions before you book."
          subtitle="A few of the answers guests ask most often — hygiene, privacy and how to prepare."
        />

        <div className="mt-10">
          <FAQAccordion groups={teaserGroups} defaultOpen="0-0" />
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-action transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2"
          >
            All questions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
