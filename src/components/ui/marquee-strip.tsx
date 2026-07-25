import { MARQUEE_WORDS } from "@/lib/site";

function Group() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {MARQUEE_WORDS.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="text-balance px-5 font-display text-h4 font-semibold tracking-[-0.024em] text-cream sm:px-6">
            {word}
          </span>
          <span aria-hidden className="text-brand-light/70">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <div className="w-full select-none overflow-hidden border-y border-brand-dark/20 bg-brand py-3.5 sm:py-4">
      <p className="sr-only">{MARQUEE_WORDS.join(" · ")}</p>
      <div className="flex w-max animate-marquee will-change-transform" aria-hidden>
        <Group />
        <Group />
      </div>
    </div>
  );
}
