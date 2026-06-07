import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Service } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group premium-surface micro-lift flex h-full flex-col overflow-hidden rounded-card p-6">
      <div className="relative z-10">
        <div className="mb-5 h-px w-12 bg-brand-action/55 transition-all duration-500 group-hover:w-20" />
        <h3 className="text-h4 font-semibold text-warm">{service.name}</h3>
      </div>
      <p className="relative z-10 mt-2 text-body-sm text-warm-grey">
        {service.duration} · {formatLKRFrom(service.priceFrom)}
      </p>
      <p className="relative z-10 mt-4 flex-1 text-body-sm leading-relaxed text-warm-grey">
        {service.description}
      </p>
      <Link
        href={`/book?service=${encodeURIComponent(service.name)}`}
        className="relative z-10 mt-6 inline-flex items-center gap-1.5 self-start rounded-pill border border-brand-action/30 bg-white/42 px-5 py-2.5 text-body-sm font-medium text-brand-action shadow-[0_10px_24px_rgba(39,19,21,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-mist"
      >
        Book this
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
