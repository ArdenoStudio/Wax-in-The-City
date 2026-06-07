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
    <div className="premium-surface micro-lift overflow-hidden rounded-card p-2">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
        itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
        className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px]"
      />
    </div>
  );
}
