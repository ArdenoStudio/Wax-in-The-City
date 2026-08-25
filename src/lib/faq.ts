export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

/** Placeholder FAQ content — refine with the client. Tone per copy guide (file 09). */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "Before your visit",
    items: [
      {
        question: "How long should my hair be before waxing?",
        answer:
          "About the length of a grain of rice — roughly two to three weeks of growth. If it's a little shorter or longer, don't worry; we'll let you know what works best.",
      },
      {
        question: "Do I need to book in advance?",
        answer:
          "We recommend it, especially on weekends. The quickest way to book is a WhatsApp message, or you can send a request through the site and we'll confirm within 24 hours.",
      },
      {
        question: "Is the studio really ladies only?",
        answer:
          "Yes — always. Our space is private and women only, so you can feel completely at ease.",
      },
    ],
  },
  {
    category: "During your visit",
    items: [
      {
        question: "Will it hurt?",
        answer:
          "Waxing can be uncomfortable, but our gentle technique and premium soft wax are designed to keep it as comfortable as possible — even for sensitive skin.",
      },
      {
        question: "Do you use fresh wax for every guest?",
        answer:
          "Always. We use single-use wax and clean tools for every single guest, with no exceptions. Hygiene is the baseline, not an upgrade.",
      },
    ],
  },
  {
    category: "Aftercare",
    items: [
      {
        question: "How should I care for my skin afterwards?",
        answer:
          "Keep the area clean and moisturised, avoid very hot showers or heavy sun for the first day, and gently exfoliate after a couple of days to prevent ingrown hairs. We'll give you tailored advice on the day.",
      },
    ],
  },
  {
    category: "Booking & pricing",
    items: [
      {
        question: "How do I see prices?",
        answer:
          "Each treatment shows a from-price on our Services pages. Final pricing depends on the treatment and area — we'll always be clear before we begin.",
      },
      {
        question: "Can I book online?",
        answer:
          "Online booking is coming soon. For now, send a request through the site or message us on WhatsApp and we'll find a time that works for you.",
      },
    ],
  },
];
