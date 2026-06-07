"use client";

import { FAQ_GROUPS } from "@/lib/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/global/AnimatedSection";

export function FAQAccordion() {
  return (
    <div className="space-y-12">
      {FAQ_GROUPS.map((group, gi) => (
        <AnimatedSection key={group.category} variant="fadeUp" delay={gi * 0.05}>
          <h2 className="mb-5 font-serif text-h3 text-warm">{group.category}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {group.items.map((item, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      ))}
    </div>
  );
}
