"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  asChild?: boolean;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(({ className, children, shimmerColor = "rgba(255,255,255,0.5)", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "tracking-[-0.011em] text-pretty group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] px-8 font-sans text-body-lg font-semibold text-cream shadow-card-hover transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_22px_58px_rgba(162,15,55,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-[3px] active:scale-[0.985]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-[witc-shimmer_3s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-0"
        style={{
          background: `linear-gradient(110deg, transparent 30%, ${shimmerColor} 50%, transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[110%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-cream/25 to-transparent transition-[transform] duration-300 ease-out group-hover:translate-x-[110%]"
      />
    </Comp>
  );
});
ShimmerButton.displayName = "ShimmerButton";
