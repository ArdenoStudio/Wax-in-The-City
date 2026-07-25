"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 2, label: "Colombo branches" },
  { value: 135, suffix: "+", label: "Public reviews found" },
  { value: 100, suffix: "%", label: "Ladies-only space" },
  { value: 14, suffix: "+", label: "Treatments" },
];

function Ticker({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString("en-LK"));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, reduce, count]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsCounter({ stats = DEFAULT_STATS }: { stats?: Stat[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.5 }}
          className="premium-surface micro-lift rounded-card p-7 text-center"
        >
          <p className="text-balance relative z-10 font-display tracking-[-0.028em] text-[clamp(2.25rem,4vw,2.75rem)] font-semibold leading-[0.96] text-brand-action sm:text-[clamp(2.25rem,4.5vw,3rem)]">
            <Ticker value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="tracking-[-0.011em] font-sans text-pretty relative z-10 mt-3 text-body-sm text-warm-grey">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
