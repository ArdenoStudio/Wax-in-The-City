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
  const display = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));

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
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="premium-surface micro-lift rounded-card p-5 text-center"
        >
          <p className="relative z-10 font-serif text-[2.75rem] font-medium leading-none text-brand-action sm:text-[3.25rem]">
            <Ticker value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="relative z-10 mt-3 text-body-sm text-warm-grey">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
