"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/** Before/after comparison (file 11) — react-compare-slider, consent-respecting placeholders. */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before treatment",
  afterAlt = "After treatment",
}: BeforeAfterSliderProps) {
  return (
    <div className="overflow-hidden rounded-card-lg border border-warm-border shadow-card">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
        itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
        className="aspect-[4/3] w-full"
      />
    </div>
  );
}
