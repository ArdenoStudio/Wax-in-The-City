import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-action text-cream shadow-[0_10px_24px_rgba(162,15,55,0.22)] hover:bg-[#8e0d30]",
        outline:
          "border border-brand-action/35 bg-cream text-brand-action hover:bg-cream-alt",
        ghost:
          "border border-cream/28 bg-transparent text-cream hover:bg-cream/10",
        link: "text-brand-action underline-offset-4 hover:underline",
        inverted: "bg-cream text-brand-action hover:bg-cream-alt",
      },
      size: {
        sm: "h-10 rounded-pill px-4 text-small",
        md: "h-12 rounded-pill px-6 text-body",
        lg: "h-14 rounded-pill px-8 text-body-lg",
        icon: "h-12 w-12 rounded-pill",
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
