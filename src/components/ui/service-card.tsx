import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Service } from "@/lib/site";
import { formatLKRFrom } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex h-full flex-col rounded-card-lg border border-warm-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <h3 className="font-serif text-h3 text-warm">{service.name}</h3>
      <p className="mt-1 text-body-sm text-warm-grey">
        {service.duration} · {formatLKRFrom(service.priceFrom)}
      </p>
      <p className="mt-4 flex-1 text-body-sm leading-relaxed text-warm-grey">
        {service.description}
      </p>
      <Link
        href={`/book?service=${encodeURIComponent(service.name)}`}
        className="mt-6 inline-flex items-center gap-1.5 self-start rounded-pill border border-brand-action/40 px-5 py-2.5 text-body-sm font-medium text-brand-action transition-colors hover:bg-brand-mist"
      >
        Book this
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
