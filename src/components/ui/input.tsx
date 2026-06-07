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
        "flex h-12 w-full rounded-card border border-warm-border bg-white px-4 text-body text-warm shadow-sm transition-colors placeholder:text-warm-grey/70 focus-visible:border-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
