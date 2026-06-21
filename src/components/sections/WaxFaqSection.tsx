import { FAQ_GROUPS } from "@/lib/faq";
import { Faq1 } from "@/components/faq1";

export function WaxFaqSection() {
  const items = FAQ_GROUPS.flatMap((group, gi) =>
    group.items.map((item, ii) => ({
      id: `faq-${gi}-${ii}`,
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <Faq1
      heading="Your questions, answered."
      items={items}
      className="py-section-lg [&_.container]:max-w-3xl [&_h2]:type-title-serif [&_h2]:text-warm"
    />
  );
}
