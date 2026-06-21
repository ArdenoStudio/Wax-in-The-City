"use client";

import { useEffect, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { MoveHorizontal } from "lucide-react";

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
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="surface-light relative overflow-hidden rounded-card p-2">
      <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-pill border border-cream/22 bg-brand/78 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur-md">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-5 top-5 z-20 rounded-pill border border-cream/22 bg-brand-action/82 px-3 py-1 text-caption font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur-md">
        {afterLabel}
      </div>
      <div className="relative">
        {mounted ? (
          <ReactCompareSlider
            handle={<SliderHandle />}
            itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
            itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
            className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px]"
            onPointerDown={() => setHintVisible(false)}
          />
        ) : (
          <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px] bg-brand/18" />
        )}
        {hintVisible && mounted && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center"
            aria-hidden
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-cream/20 bg-brand/80 px-4 py-2 text-caption font-medium text-cream backdrop-blur-md">
              <MoveHorizontal className="h-4 w-4" />
              Drag to compare
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
