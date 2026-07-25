"use client";

import { useEffect, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const SliderHandle = () => (
  <ReactCompareSliderHandle
    buttonStyle={{
      background: "var(--color-cream)",
      border: "2px solid rgba(43,7,16,0.55)",
      width: 40,
      height: 40,
      boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
      transition: "transform 360ms var(--ease-apple), box-shadow 360ms var(--ease-apple)",
      outline: "none",
    }}
    linesStyle={{ background: "rgba(255,247,249,0.72)", width: 2 }}
  />
);

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before treatment",
  afterAlt = "After treatment",
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="overflow-hidden rounded-card-lg border border-cream/12 bg-cream/[0.04] p-1.5 [&_[role=slider]]:focus-visible:outline-none [&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-cream/50 [&_[role=slider]]:focus-visible:ring-offset-2 [&_[role=slider]]:focus-visible:ring-offset-brand [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-cream/50 [&_button]:focus-visible:ring-offset-2 [&_button]:focus-visible:ring-offset-brand">
      {mounted ? (
        <ReactCompareSlider
          handle={<SliderHandle />}
          itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
          itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-card"
        />
      ) : (
        <div
          className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-card bg-brand/30"
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          role="img"
        />
      )}
      <div className="relative z-10 mt-2.5 flex items-center justify-between gap-3 px-2 pb-1">
        <span className="font-sans text-caption font-semibold uppercase tracking-[0.1em] text-cream/70">
          {beforeLabel}
        </span>
        <span className="font-sans text-caption font-semibold uppercase tracking-[0.1em] text-cream/70">
          {afterLabel}
        </span>
      </div>
      <p className="relative z-10 px-2 pb-1.5 font-sans text-caption text-cream/45">
        Illustrative care imagery
      </p>
    </div>
  );
}
