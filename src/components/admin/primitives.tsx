import type { ReactNode } from "react";

export const ADMIN_LABEL_CLASS =
  "text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey";

export const ADMIN_INPUT_CLASS =
  "mt-2 block w-full rounded-card border border-cream/16 bg-cream/92 px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20";

export const ADMIN_SELECT_CLASS =
  "mt-2 block w-full rounded-card border border-cream/16 bg-cream px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20";

export const ADMIN_PRIMARY_BUTTON_CLASS =
  "inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-55";

export const ADMIN_GHOST_BUTTON_CLASS =
  "inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-cream/16 px-4 text-body-sm font-medium text-cream transition-colors hover:bg-cream/10";

export function AdminPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-cream/12 bg-cream/5 p-5 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function AdminStatusMessage({
  tone,
  children,
}: {
  tone: "success" | "error";
  children: ReactNode;
}) {
  return (
    <p
      className={
        tone === "success"
          ? "rounded-card border border-success/30 bg-success/12 px-4 py-3 text-body-sm text-cream"
          : "rounded-card border border-brand-light/25 bg-brand-light/10 px-4 py-3 text-body-sm text-brand-light"
      }
    >
      {children}
    </p>
  );
}

export function AdminEnvVar({ name }: { name: string }) {
  return (
    <code className="rounded-md bg-cream/10 px-1.5 py-0.5 font-mono text-caption text-brand-light">
      {name}
    </code>
  );
}

export function AdminFieldLabel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${ADMIN_LABEL_CLASS}`}>
      {label}
      {children}
    </label>
  );
}
