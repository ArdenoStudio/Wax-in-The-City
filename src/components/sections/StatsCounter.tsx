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
import { SERVICES } from "@/lib/site";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 2, label: "Colombo branches" },
  { value: 135, suffix: "+", label: "Public reviews found" },
  { value: 100, suffix: "%", label: "Ladies only space" },
  { value: SERVICES.length, suffix: "+", label: "Treatments" },
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
    // Apple-timed ticker: 1.0s feels crisp vs the prior 1.4s drag.
    const controls = animate(count, value, { duration: 1.0, ease: [0.16, 1, 0.3, 1] });
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
    <div className="relative">
      {/* BeWAXed stats inspiration — editorial hairline + boutique credential */}
      <p className="mb-8 text-center text-caption font-semibold uppercase tracking-[0.18em] text-warm/45">
        Two studios · Colombo · Ladies only
      </p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="premium-surface micro-lift rounded-2xl p-6 text-center will-change-transform sm:p-7"
          >
            <p className="relative z-10 font-serif text-5xl font-medium leading-none tracking-[-0.02em] text-brand-action sm:text-6xl">
              <Ticker value={stat.value} suffix={stat.suffix} />
            </p>
            <span aria-hidden className="mx-auto mt-4 block h-px w-10 hairline-gradient opacity-60" />
            <p className="relative z-10 mt-4 text-caption font-semibold uppercase tracking-[0.16em] text-warm-grey text-pretty">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
