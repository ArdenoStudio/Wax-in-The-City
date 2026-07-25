import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Lock, LogOut, ShieldCheck, Sparkles } from "lucide-react";
import { loginAdmin, logoutAdmin, seedServices, updateService } from "@/app/admin/actions";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/admin-auth";
import { isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { getAdminServices } from "@/lib/service-content";
import { SERVICE_CATEGORIES } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { formatLKRFrom } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; seeded?: string; updated?: string }>;
}) {
  const params = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <LoginPanel error={params.error} />;
  }

  const supabaseReady = isAdminSupabaseConfigured();
  const services = supabaseReady ? await getAdminServices() : [];

  return (
    <section className="min-h-screen bg-cream px-5 pb-20 pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-warm-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="relative mb-6 h-16 w-16 rounded-pill border border-brand/10 bg-brand p-1">
              <Image
                src={IMAGES.wordmark}
                alt="Wax In The City"
                fill
                sizes="64px"
                loading="eager"
                fetchPriority="high"
                className="object-contain"
              />
            </div>
            <p className="inline-flex items-center gap-2 rounded-pill border border-brand-action/16 bg-brand-mist px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-action">
              <ShieldCheck className="h-4 w-4" />
              Admin price editor
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-h1 font-medium text-warm">
              Change service prices without editing code.
            </h1>
            <p className="mt-4 max-w-2xl text-body text-warm-grey">
              This is intentionally narrow: update services, prices, durations,
              visibility, and sort order. Booking requests remain private.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-warm-border bg-white px-5 text-body-sm font-medium text-warm transition-colors hover:bg-brand-mist"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>

        {params.seeded && (
          <StatusMessage tone="success">Service seed rows were added to Supabase.</StatusMessage>
        )}
        {params.updated && (
          <StatusMessage tone="success">Service updated. Public pages will use the new value when Supabase is connected.</StatusMessage>
        )}
        {params.error && <StatusMessage tone="error">{params.error}</StatusMessage>}

        {!supabaseReady && (
          <div className="studio-plate mt-8 rounded-card p-6">
            <h2 className="font-display text-h3 text-warm">Connect Supabase admin access</h2>
            <p className="mt-2 text-body-sm text-warm-grey">
              Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
              `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and
              `ADMIN_SESSION_SECRET` to enable editing.
            </p>
          </div>
        )}

        {supabaseReady && services.length === 0 && (
          <div className="studio-plate mt-8 rounded-card p-6">
            <h2 className="font-display text-h3 text-warm">No services in Supabase yet</h2>
            <p className="mt-2 max-w-2xl text-body-sm text-warm-grey">
              Seed the current static menu into the `services` table, then edit
              prices from this page.
            </p>
            <form action={seedServices} className="mt-5">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark"
              >
                <Sparkles className="h-4 w-4" />
                Seed current service menu
              </button>
            </form>
          </div>
        )}

        {services.length > 0 && (
          <div className="mt-8 grid gap-5">
            {services.map((service) => (
              <form
                key={service.id}
                action={updateService}
                className="studio-plate rounded-card p-5"
              >
                <input type="hidden" name="id" value={service.id} />
                <div className="grid gap-5 lg:grid-cols-[1fr_140px_150px]">
                  <div>
                    <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                      Service
                      <input
                        name="name"
                        defaultValue={service.name}
                        className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                      Price
                      <input
                        name="priceFrom"
                        type="number"
                        min="0"
                        defaultValue={service.priceFrom}
                        className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                      Duration
                      <input
                        name="duration"
                        defaultValue={service.duration}
                        className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-4 grid gap-5 lg:grid-cols-[180px_1fr_110px]">
                  <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                    Category
                    <select
                      name="category"
                      defaultValue={service.category}
                      className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                    >
                      {SERVICE_CATEGORIES.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                    Slug
                    <input
                      name="slug"
                      defaultValue={service.slug}
                      className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                    />
                  </label>
                  <label className="text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                    Order
                    <input
                      name="sortOrder"
                      type="number"
                      min="0"
                      defaultValue={service.sortOrder}
                      className="mt-2 block h-11 w-full rounded-card border border-warm-border bg-white px-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                  Description
                  <textarea
                    name="description"
                    defaultValue={service.description}
                    rows={3}
                    className="mt-2 block w-full rounded-card border border-warm-border bg-white px-3 py-3 text-body-sm text-warm outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/20"
                  />
                </label>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-4 text-body-sm text-warm-grey">
                    <label className="inline-flex items-center gap-2">
                      <input
                        name="active"
                        type="checkbox"
                        defaultChecked={service.active}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Visible on site
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        name="featured"
                        type="checkbox"
                        defaultChecked={service.featured}
                        className="h-4 w-4 accent-brand-action"
                      />
                      Featured
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-body-sm font-medium text-brand-action">
                      {formatLKRFrom(service.priceFrom)}
                    </span>
                    <button
                      type="submit"
                      className="inline-flex h-11 items-center justify-center rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark"
                    >
                      Save service
                    </button>
                  </div>
                </div>
              </form>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LoginPanel({ error }: { error?: string }) {
  const configured = isAdminPasswordConfigured();

  return (
    <section className="flex min-h-screen items-center justify-center bg-brand px-5 py-20 text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,222,0.16),transparent_38%),linear-gradient(135deg,rgba(43,7,16,1),rgba(23,7,11,1))]" />
      <div className="glass-panel relative w-full max-w-md rounded-card p-6">
        <div className="relative mx-auto mb-6 h-20 w-20 rounded-pill border border-cream/12 bg-brand p-1">
          <Image
            src={IMAGES.wordmark}
            alt="Wax In The City"
            fill
            sizes="80px"
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
        </div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-cream/10 text-brand-light">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-center font-display text-h2 text-cream">
          Admin access
        </h1>
        <p className="mt-2 text-center text-body-sm text-cream/68">
          Manage service prices and menu details from the site backend.
        </p>

        {!configured && (
          <p className="mt-5 rounded-card border border-gold/20 bg-gold/10 px-4 py-3 text-body-sm text-brand-light">
            Set `ADMIN_PASSWORD` before using this page.
          </p>
        )}
        {error && (
          <p className="mt-5 rounded-card border border-brand-light/20 bg-brand-light/10 px-4 py-3 text-body-sm text-brand-light">
            {error}
          </p>
        )}

        <form action={loginAdmin} className="mt-6 grid gap-4">
          <label className="text-caption font-semibold uppercase tracking-[0.12em] text-cream/62">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-2 block h-12 w-full rounded-card border border-cream/16 bg-cream/92 px-4 text-body text-warm outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/24"
            />
          </label>
          <button
            type="submit"
            disabled={!configured}
            className="inline-flex h-12 items-center justify-center rounded-pill bg-brand-action px-5 text-body-sm font-medium text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-55"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}

function StatusMessage({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "success" | "error";
}) {
  return (
    <p
      className={
        tone === "success"
          ? "mt-6 rounded-card border border-success/20 bg-success/10 px-4 py-3 text-body-sm text-warm"
          : "mt-6 rounded-card border border-error/20 bg-error/10 px-4 py-3 text-body-sm text-error"
      }
    >
      {children}
    </p>
  );
}
