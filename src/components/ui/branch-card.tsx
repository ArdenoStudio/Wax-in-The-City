"use client";

import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { type Branch, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface BranchCardProps {
  branch: Branch;
  variant?: "compact" | "full";
}

export function BranchCard({ branch, variant = "compact" }: BranchCardProps) {
  const isOpen = branch.status === "open";
  const wa = whatsappLink(
    `Hi! I'd like to book at your ${branch.name} branch.`,
    branch.whatsapp
  );

  return (
    <div className="surface flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="type-label text-brand-action">
            {isOpen ? "Open now" : "Opening soon"}
          </p>
          <h3 className="type-subtitle mt-1 text-warm">{branch.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand-mist text-brand-action">
          <MapPin className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-3 text-body-sm text-warm-grey">{branch.blurb}</p>

      <div className="mt-6 space-y-2 border-t border-warm-border pt-5 text-body-sm text-warm-grey">
        <p>{branch.area}</p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand-action" />
          <span>{branch.hours.weekday}</span>
        </p>
        {variant === "full" && (
          <>
            <p className="pl-6">Weekends · {branch.hours.weekend}</p>
            <p className="pl-6 text-caption">{branch.hours.poya}</p>
          </>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-7 sm:flex-row sm:items-center">
        {isOpen ? (
          <>
            <Button asChild size="sm">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={`/locations/${branch.slug}`}>
                Branch details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild size="sm" variant="outline">
            <Link href="/contact">Get opening updates</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
