"use client";

import { FAQ_GROUPS } from "@/lib/faq";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQAccordion() {
  return (
    <div className="space-y-12">
      {FAQ_GROUPS.map((group) => (
        <div key={group.category}>
          <h2 className="type-subtitle mb-5 text-warm">{group.category}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {group.items.map((item, i) => (
              <AccordionItem key={i} value={`${group.category}-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
