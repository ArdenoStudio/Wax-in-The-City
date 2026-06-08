"use client";

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
    }}
    linesStyle={{ background: "rgba(53,16,23,0.5)", width: 2 }}
  />
);

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before treatment",
  afterAlt = "After treatment",
}: BeforeAfterSliderProps) {
  return (
    <div className="premium-surface micro-lift overflow-hidden rounded-card p-2">
      <ReactCompareSlider
        handle={<SliderHandle />}
        itemOne={<ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} />}
        itemTwo={<ReactCompareSliderImage src={afterSrc} alt={afterAlt} />}
        className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[7px]"
      />
    </div>
  );
}
