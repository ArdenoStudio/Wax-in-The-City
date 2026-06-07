import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-card border border-warm-border/80 bg-white/86 px-4 text-body text-warm shadow-[inset_0_1px_0_rgba(255,255,255,0.76),0_10px_28px_rgba(39,19,21,0.05)] backdrop-blur transition-all duration-300 placeholder:text-warm-grey/62 focus-visible:border-brand-action/70 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-action/12 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
