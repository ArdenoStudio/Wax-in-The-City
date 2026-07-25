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
      background: "var(--color-brand)",
      border: "2.5px solid rgba(255,255,255,0.35)",
      backdropFilter: "blur(6px)",
      width: 44,
      height: 44,
      boxShadow: "0 4px 20px rgba(53,16,23,0.5)",
      transition: "transform 420ms var(--ease-apple), box-shadow 420ms var(--ease-apple)",
      outline: "none",
    }}
    linesStyle={{ background: "rgba(53,16,23,0.5)", width: 2 }}
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
    <div className="studio-plate micro-lift overflow-hidden rounded-card p-2 [&_[role=slider]]:focus-visible:outline-none [&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-brand-action/55 [&_[role=slider]]:focus-visible:ring-offset-2 [&_[role=slider]]:focus-visible:ring-offset-brand [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-brand-action/55 [&_button]:focus-visible:ring-offset-2 [&_button]:focus-visible:ring-offset-brand">
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
          className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-card bg-brand/18"
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          role="img"
        />
      )}
      <div className="relative z-10 mt-3 flex items-center justify-between gap-3 px-1">
        <span className="text-caption font-semibold uppercase tracking-[0.12em] text-cream/80">
          {beforeLabel}
        </span>
        <span className="text-caption font-semibold uppercase tracking-[0.12em] text-cream/80">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
