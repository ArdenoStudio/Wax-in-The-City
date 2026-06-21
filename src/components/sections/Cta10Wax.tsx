import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Cta10WaxProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  inverted?: boolean;
}

export function Cta10Wax({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
  inverted = true,
}: Cta10WaxProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-8 overflow-hidden rounded-card border p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10",
        inverted
          ? "border-cream/14 bg-cream/8"
          : "border-warm-border bg-cream-alt",
        className
      )}
    >
      <div className="max-w-xl">
        <h2 className={cn("type-title-serif", inverted ? "text-cream" : "text-warm")}>
          {title}
        </h2>
        <p className={cn("mt-3 text-body", inverted ? "text-cream/72" : "text-warm-grey")}>
          {description}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        {secondaryLabel && secondaryHref && (
          <Button asChild size="lg" variant={inverted ? "ghost" : "outline"}>
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
        <Button asChild size="lg" variant={inverted ? "inverted" : "primary"}>
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
