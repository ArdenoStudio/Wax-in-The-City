"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Primary CTA with a slow shimmer sweep (Magic UI inspired).
 * Maroon body, cream text, GPU-only animation. Renders as <button> by default
 * or any element via `asChild` is intentionally omitted — use the `as` prop.
 */
interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(({ className, children, shimmerColor = "rgba(255,255,255,0.5)", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-8 font-sans text-body-lg font-medium text-cream shadow-[0_16px_42px_rgba(151,35,58,0.32)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_58px_rgba(151,35,58,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/50 focus-visible:ring-offset-2 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full motion-safe:animate-[witc-shimmer_3s_ease-in-out_infinite]"
        style={{
          background: `linear-gradient(110deg, transparent 30%, ${shimmerColor} 50%, transparent 70%)`,
        }}
      />
    </button>
  );
});
ShimmerButton.displayName = "ShimmerButton";
