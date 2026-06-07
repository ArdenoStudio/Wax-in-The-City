import { MARQUEE_WORDS } from "@/lib/site";

function Group() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-serif text-h4 italic tracking-wide text-cream/90">
            {word}
          </span>
          <span aria-hidden className="text-brand-light">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Full-width maroon brand strip with looping text (file 08, section 7).
 * One track of two identical groups; translating the track -50% lands exactly
 * one group over for a seamless loop. Pauses on hover; stilled by reduced-motion.
 */
export function MarqueeStrip() {
  return (
    <div className="w-full select-none overflow-hidden bg-brand py-4">
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
    </div>
  );
}
