import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-card border border-warm-border bg-white px-4 py-3 text-body text-warm shadow-sm transition-colors placeholder:text-warm-grey/70 focus-visible:border-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
