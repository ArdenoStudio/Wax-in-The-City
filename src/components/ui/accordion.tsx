"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "premium-surface overflow-hidden rounded-card border-warm-border/70 transition-[border-color,box-shadow] duration-500 ease-[var(--ease-apple)] data-[state=open]:border-brand-action/22 data-[state=open]:shadow-[0_16px_40px_rgba(39,19,21,0.08)]",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group relative z-10 flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-left font-display text-h4 font-semibold tracking-display text-warm transition-[color,background-color] duration-500 ease-[var(--ease-apple)] hover:bg-white/40 hover:text-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-inset sm:gap-4 sm:px-5 sm:py-5 sm:text-[1.2rem] [&[data-state=open]]:bg-white/28 [&[data-state=open]]:text-brand-action",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 text-pretty">{children}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-brand-action/80 transition-transform duration-500 ease-[var(--ease-apple)] group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body text-warm-grey data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "relative z-10 max-w-[65ch] border-t border-warm-border/80 px-5 pb-5 pt-3.5 text-pretty leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
