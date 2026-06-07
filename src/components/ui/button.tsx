import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary maroon — buttons on light backgrounds
        primary:
          "bg-brand-action text-cream shadow-card hover:bg-brand-dark",
        // Outline — maroon hairline on cream
        outline:
          "border border-brand-action/60 text-brand-action hover:bg-brand-mist",
        // Ghost on dark hero — cream outline over photography
        ghost:
          "border border-cream/70 text-cream hover:bg-cream/10",
        // Subtle text button
        link: "text-brand-action underline-offset-4 hover:underline",
        // Inverted — cream button on maroon sections
        inverted:
          "bg-cream text-brand-action hover:bg-brand-mist",
      },
      size: {
        sm: "h-10 rounded-pill px-4 text-body-sm",
        md: "h-12 rounded-pill px-6 text-body",
        lg: "h-14 rounded-pill px-8 text-body-lg",
        icon: "h-11 w-11 rounded-pill",
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
