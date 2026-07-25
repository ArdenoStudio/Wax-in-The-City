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
        "field-surface flex min-h-28 w-full rounded-card border border-warm-border/80 bg-white/88 px-4 py-3 font-sans text-body text-warm backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[var(--ease-apple)] placeholder:text-warm-grey/70 hover:border-brand-action/32 hover:bg-white focus-visible:-translate-y-px focus-visible:border-brand-action focus-visible:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-action/14 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none aria-[invalid=true]:border-error/55 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-error/12",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
