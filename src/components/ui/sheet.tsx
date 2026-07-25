"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[60] bg-warm/48 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
    description?: string;
  }
>(({ className, children, title = "Menu", description = "Site navigation menu", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-[60] flex h-full w-[86%] max-w-sm flex-col border-l border-warm-border/65 bg-[linear-gradient(180deg,rgba(255,247,249,0.96),rgba(248,237,241,0.94))] shadow-card-hover backdrop-blur-2xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-320 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        className
      )}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        {description}
      </DialogPrimitive.Description>
      <DialogPrimitive.Close className="ease-[var(--ease-apple)] absolute right-5 top-5 z-10 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-pill border border-warm-border/60 bg-white/70 text-warm-grey shadow-[0_8px_20px_rgba(27,14,16,0.06)] transition-colors duration-300 hover:border-brand-action/25 hover:bg-brand-mist hover:text-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-action/40">
        <X className="h-5 w-5 shrink-0" />
        <span className="sr-only">Close menu</span>
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

export { Sheet, SheetTrigger, SheetClose, SheetContent };
