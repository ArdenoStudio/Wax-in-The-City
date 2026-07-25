"use client";

import { FAQ_GROUPS, type FaqGroup } from "@/lib/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/global/AnimatedSection";

interface FAQAccordionProps {
  groups?: FaqGroup[];
  /** Accordion item value to open by default, e.g. `"0-0"`. */
  defaultOpen?: string;
}

export function FAQAccordion({
  groups = FAQ_GROUPS,
  defaultOpen,
}: FAQAccordionProps) {
  return (
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <AnimatedSection key={group.category} variant="fadeUp" delay={gi * 0.05}>
          {groups.length > 1 && (
            <h2 className="mb-5 font-serif text-h3 text-warm">{group.category}</h2>
          )}
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen}
            className="space-y-3"
          >
            {group.items.map((item, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`}>
                <AccordionTrigger className="text-h4 sm:text-h4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      ))}
    </div>
  );
}
