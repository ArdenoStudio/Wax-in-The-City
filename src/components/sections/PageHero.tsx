import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  size?: "sm" | "md";
  voice?: "serif" | "sans";
  /** Text-only hero — no background photo */
  minimal?: boolean;
}

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt = "",
  size = "sm",
  voice = "serif",
  minimal = false,
}: PageHeroProps) {
  if (minimal || !image) {
    return (
      <section
        className={cn(
          "band-pearl border-b border-warm-border px-5 pt-28 pb-12 lg:px-8 lg:pb-16",
          size === "md" ? "lg:pt-32" : "lg:pt-28"
        )}
      >
        <div className="mx-auto max-w-3xl">
          <h1
            className={cn(
              "text-balance",
              voice === "serif" ? "type-title-serif" : "type-title-sans"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-body text-warm-grey">{subtitle}</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "band-wine relative flex w-full items-end overflow-hidden",
        size === "md" ? "min-h-[480px]" : "min-h-[400px]"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          unoptimized={image.startsWith("http")}
          className="object-cover object-center"
        />
        <div className="scrim-hero-ltr absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-16">
        <h1
          className={cn(
            "max-w-2xl text-balance text-cream",
            voice === "serif" ? "type-title-serif" : "type-title-sans"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-body text-cream/78">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
