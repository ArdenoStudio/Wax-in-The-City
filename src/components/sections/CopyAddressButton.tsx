"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyAddressButton({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "tracking-[-0.011em] font-sans ease-[var(--ease-apple)] text-pretty inline-flex h-11 items-center gap-3 rounded-pill border border-brand-action/36 bg-white/68 px-7 text-body-sm font-semibold text-brand-action transition-colors duration-300 hover:bg-brand-mist/90",
        className
      )}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 shrink-0" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 shrink-0" />
          Copy address
        </>
      )}
    </button>
  );
}
