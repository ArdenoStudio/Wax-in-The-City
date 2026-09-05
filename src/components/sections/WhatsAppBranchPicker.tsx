"use client";

import { useId, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Clock, MapPin, X } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import {
  BRANCHES,
  bookingWhatsAppMessage,
  getBranch,
  whatsappLink,
  type Branch,
  type BranchSlug,
} from "@/lib/site";

interface WhatsAppBranchPickerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  defaultBranch?: BranchSlug;
  service?: string;
  children: ReactNode;
}

function branchHref(branch: Branch, service?: string): string {
  return whatsappLink(
    bookingWhatsAppMessage({ branchName: branch.name, service }),
    branch.whatsapp
  );
}

export function BranchWhatsAppOption({
  branch,
  service,
  onNavigate,
}: {
  branch: Branch;
  service?: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={branchHref(branch, service)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="pressable group flex flex-col rounded-card border border-warm-border/80 bg-white/90 p-4 text-left shadow-[0_10px_24px_rgba(39,19,21,0.05)] transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:border-brand-action/35 hover:bg-white hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40"
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="block font-serif text-h3 text-warm text-balance">{branch.name}</span>
          <span className="mt-1 block text-body-sm text-warm-grey text-pretty">{branch.area}</span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-ink text-cream">
          <MapPin className="h-4 w-4" />
        </span>
      </span>
      <span className="mt-3 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
        <Clock className="h-3.5 w-3.5" />
        <span className="tabular-nums">Mon–Sun · {branch.hours.weekday}</span>
      </span>
      <span className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] px-4 text-body-sm font-medium text-cream">
        <WhatsappIcon className="h-4 w-4" />
        Chat for {branch.name}
      </span>
    </a>
  );
}

export function StudioWhatsAppChoices({
  service,
  onNavigate,
  className,
}: {
  service?: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div className={className ?? "grid gap-3 sm:grid-cols-2"}>
      {BRANCHES.map((branch) => (
        <BranchWhatsAppOption
          key={branch.slug}
          branch={branch}
          service={service}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

/**
 * Compact WhatsApp CTA that asks for Battaramulla or Nugegoda when the
 * studio is not already known, then opens that branch's number.
 *
 * Uses the native Popover API so the studio choice still appears even when
 * client JavaScript is blocked.
 */
export function WhatsAppBranchPicker({
  defaultBranch,
  service,
  className,
  children,
  ...triggerProps
}: WhatsAppBranchPickerProps) {
  const reactId = useId();
  const popoverId = `studio-picker-${reactId.replace(/:/g, "")}`;
  const knownBranch = defaultBranch ? getBranch(defaultBranch) : undefined;
  const ariaLabel = triggerProps["aria-label"];

  if (knownBranch) {
    return (
      <a
        href={branchHref(knownBranch, service)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        {...triggerProps}
        popoverTarget={popoverId}
        aria-haspopup="dialog"
        className={className}
      >
        {children}
      </button>
      <div
        id={popoverId}
        popover="auto"
        role="dialog"
        aria-label="Which studio?"
        className="w-[min(calc(100vw-2rem),28rem)] rounded-card-lg border border-warm-border/80 bg-cream p-6 text-warm shadow-card-hover [&::backdrop]:bg-warm/44 [&::backdrop]:backdrop-blur-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-serif text-h2 text-warm text-balance">Which studio?</p>
            <p className="mt-2 text-body-sm text-warm-grey text-pretty">
              Pick Battaramulla or Nugegoda and we will open WhatsApp for that branch.
            </p>
          </div>
          <button
            type="button"
            popoverTarget={popoverId}
            popoverTargetAction="hide"
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-warm-grey transition-colors hover:bg-brand-mist hover:text-brand-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <StudioWhatsAppChoices service={service} className="mt-6 grid gap-3" />
      </div>
    </>
  );
}
