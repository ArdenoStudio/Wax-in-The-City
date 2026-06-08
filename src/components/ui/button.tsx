import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-sans font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary maroon with liquid sweep
        primary:
          "bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] text-cream shadow-[0_14px_30px_rgba(162,15,55,0.24)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(162,15,55,0.28)] before:absolute before:inset-0 before:content-[''] before:-translate-x-[110%] before:skew-x-[-15deg] before:bg-gradient-to-r before:from-transparent before:via-cream/20 before:to-transparent before:transition-[transform] before:duration-500 before:ease-out hover:before:translate-x-[110%]",
        // Outline — maroon hairline on cream
        outline:
          "border border-brand-action/35 bg-white/35 text-brand-action backdrop-blur hover:-translate-y-0.5 hover:border-brand-action/60 hover:bg-brand-mist",
        // Ghost on dark hero — cream outline over photography
        ghost:
          "border border-cream/30 bg-cream/8 text-cream backdrop-blur-md hover:-translate-y-0.5 hover:bg-cream/14",
        // Subtle text button
        link: "text-brand-action underline-offset-4 hover:underline",
        // Inverted — cream button on maroon sections
        inverted:
          "bg-cream text-brand-action shadow-[0_14px_34px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-brand-mist",
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
