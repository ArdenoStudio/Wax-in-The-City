import { FAQ_GROUPS } from "@/lib/faq";

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: (item as unknown as { q: string }).q ?? item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: (item as unknown as { a: string }).a ?? item.answer,
        },
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
