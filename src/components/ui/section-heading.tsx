import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  voice?: "serif" | "sans";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  tone = "dark",
  voice = "sans",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <h2
        className={cn(
          "max-w-2xl text-balance",
          voice === "serif" ? "type-title-serif" : "type-title-sans",
          light ? "text-cream" : "text-warm"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-xl text-balance text-body",
            light ? "text-cream/72" : "text-warm-grey"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
