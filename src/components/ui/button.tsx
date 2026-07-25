import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "pressable relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-sans font-medium tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:transform-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-[var(--ease-apple)]",
  {
    variants: {
      variant: {
        // Primary maroon with liquid sweep
        primary:
          "bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] text-cream shadow-card-hover hover:shadow-[0_20px_48px_rgba(162,15,55,0.30)] before:absolute before:inset-0 before:content-[''] before:-translate-x-[120%] before:skew-x-[-15deg] before:bg-gradient-to-r before:from-transparent before:via-cream/22 before:to-transparent before:transition-transform before:duration-700 before:ease-[var(--ease-apple)] hover:before:translate-x-[120%] disabled:opacity-50 disabled:before:hidden",
        // Outline — maroon hairline on cream
        outline:
          "border border-brand-action/32 bg-white/62 text-brand-action backdrop-blur-2xl hover:border-brand-action/55 hover:bg-brand-mist/90 hover:shadow-[0_14px_32px_rgba(27,14,16,0.07)]",
        // Ghost on dark hero — cream outline over photography
        ghost:
          "border border-cream/28 bg-cream/16 text-cream backdrop-blur-2xl hover:bg-cream/14 hover:shadow-[0_16px_34px_rgba(0,0,0,0.18)]",
        // Subtle text button
        link: "text-brand-action underline-offset-[3px] hover:underline",
        // Inverted — cream button on maroon sections
        inverted:
          "bg-cream text-brand-action shadow-card hover:bg-brand-mist/90 hover:shadow-[0_18px_44px_rgba(0,0,0,0.20)]",
      },
      size: {
        sm: "tracking-[-0.011em] text-pretty font-sans h-11 rounded-pill px-4 text-body-sm",
        md: "tracking-[-0.011em] text-pretty font-sans h-12 rounded-pill px-6 text-body",
        lg: "tracking-[-0.011em] text-pretty font-sans h-14 rounded-pill px-8 text-body-lg",
        icon: "h-11 w-11 rounded-pill px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
