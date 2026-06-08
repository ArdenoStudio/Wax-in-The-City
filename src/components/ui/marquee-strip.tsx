import { MARQUEE_WORDS } from "@/lib/site";

function Group() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {MARQUEE_WORDS.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-serif text-h4 italic tracking-wide text-cream/90">
            {word}
          </span>
          <span className="text-brand-light">·</span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <div className="w-full select-none overflow-hidden bg-brand py-4" aria-hidden>
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
    </div>
  );
}
