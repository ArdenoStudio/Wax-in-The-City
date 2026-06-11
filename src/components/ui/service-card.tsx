import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { type Service } from "@/lib/site";
import { cn, formatLKRFrom } from "@/lib/utils";

const SERVICE_CARD_TONES: Record<
  Service["category"],
  { shell: string; rail: string; chip: string; button: string; label: string }
> = {
  waxing: {
    shell: "bg-[linear-gradient(145deg,rgba(255,247,249,0.98),rgba(252,229,236,0.82))]",
    rail: "bg-brand-action",
    chip: "border-brand-action/22 bg-brand-action/8 text-brand-action",
    button: "border-brand-action/30 bg-brand-action text-cream hover:bg-brand-dark",
    label: "Signature waxing",
  },
  facial: {
    shell: "bg-[linear-gradient(145deg,rgba(255,247,249,0.98),rgba(246,232,226,0.9))]",
    rail: "bg-gold",
    chip: "border-gold/40 bg-gold/12 text-warm",
    button: "border-gold/40 bg-white/56 text-warm hover:bg-brand-mist",
    label: "Skin care",
  },
  moroccan: {
    shell: "bg-[linear-gradient(145deg,rgba(255,247,249,0.98),rgba(238,239,224,0.88))]",
    rail: "bg-sage",
    chip: "border-sage/40 bg-sage/16 text-warm",
    button: "border-sage/40 bg-white/56 text-warm hover:bg-sage/18",
    label: "Ritual care",
  },
  "hydra-facial": {
    shell: "bg-[linear-gradient(145deg,rgba(255,247,249,0.98),rgba(238,230,239,0.9))]",
    rail: "bg-brand",
    chip: "border-brand/16 bg-brand/8 text-brand",
    button: "border-brand/20 bg-brand text-cream hover:bg-brand-action",
    label: "Hydration",
  },
};

export function ServiceCard({ service }: { service: Service }) {
  const tone = SERVICE_CARD_TONES[service.category];

  return (
    <div className={cn("group micro-lift studio-plate flex h-full flex-col overflow-hidden rounded-card p-6", tone.shell)}>
      <div className="relative z-10">
        <div className={cn("mb-5 h-px w-12 transition-all duration-500 group-hover:w-20", tone.rail)} />
        <p className="mb-2 text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
          {tone.label}
        </p>
        <h3 className="text-h4 font-semibold text-warm">{service.name}</h3>
      </div>
      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2">
        <span className={cn("rounded-pill border px-3 py-1 text-caption font-semibold", tone.chip)}>
          {formatLKRFrom(service.priceFrom)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-pill border border-warm-border/70 bg-white/48 px-3 py-1 text-caption text-warm-grey">
          <Clock3 className="h-3.5 w-3.5 text-brand-action" />
          {service.duration}
        </span>
      </div>
      <p className="relative z-10 mt-4 flex-1 text-body-sm leading-relaxed text-warm-grey">
        {service.description}
      </p>
      <Link
        href={`/book?service=${encodeURIComponent(service.name)}`}
        className={cn("pressable icon-drift relative z-10 mt-6 inline-flex items-center gap-1.5 self-start rounded-pill border px-5 py-2.5 text-body-sm font-medium shadow-[0_10px_24px_rgba(39,19,21,0.05)]", tone.button)}
      >
        Book this
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
