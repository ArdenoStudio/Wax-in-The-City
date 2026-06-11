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
    <div className="studio-plate micro-lift overflow-hidden rounded-card p-2">
      <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-pill border border-cream/22 bg-brand/78 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur-md">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-5 top-5 z-20 rounded-pill border border-cream/22 bg-brand-action/82 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur-md">
        {afterLabel}
      </div>
      {mounted ? (
        <ReactCompareSlider
          handle={<SliderHandle />}
          itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
          itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
          className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px]"
        />
      ) : (
        <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px] bg-brand/18" />
      )}
    </div>
  );
}
