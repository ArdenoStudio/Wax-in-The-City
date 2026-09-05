import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { getAndClearAdminFlash, hasLegacyAdminSession, isAdminPasswordConfigured } from "@/lib/admin-auth";
import { getAdminIdentity, isSupabaseAuthConfigured } from "@/lib/admin-access";
import { LoginPanel } from "@/components/admin/login-panel";
import { OverviewSection } from "@/components/admin/overview-section";
import { BookingsSection } from "@/components/admin/bookings-section";
import { ServicesSection } from "@/components/admin/services-section";
import { GallerySection } from "@/components/admin/gallery-section";
import { TestimonialsSection } from "@/components/admin/testimonials-section";
import { PricingSection } from "@/components/admin/pricing-section";
import { AnalyticsSection } from "@/components/admin/analytics-section";
import { AdminEnvVar, AdminStatusMessage } from "@/components/admin/primitives";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const TABS = [
  { slug: "overview", label: "Overview" },
  { slug: "analytics", label: "Analytics & Devices" },
  { slug: "pricing", label: "Wax Pricing & Packages" },
  { slug: "bookings", label: "Bookings" },
  { slug: "services", label: "Services" },
  { slug: "gallery", label: "Gallery" },
  { slug: "testimonials", label: "Testimonials" },
] as const;

type TabSlug = (typeof TABS)[number]["slug"];

function isTabSlug(value: string | undefined): value is TabSlug {
  return TABS.some((tab) => tab.slug === value);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawTab = typeof params.tab === "string" ? params.tab : undefined;
  const activeTab: TabSlug = isTabSlug(rawTab) ? rawTab : "overview";

  const supabaseReady = isSupabaseAuthConfigured();
  const legacyReady = isAdminPasswordConfigured();

  if (!supabaseReady && !legacyReady) {
    return (
      <section className="flex min-h-[100dvh] items-center justify-center bg-ink px-5 py-20">
        <div className="w-full max-w-xl rounded-card border border-cream/12 bg-cream/5 p-6 shadow-card">
          <h1 className="font-serif text-h3 text-cream text-balance">
            Server environment setup required
          </h1>
          <p className="mt-2 text-body-sm text-warm-grey text-pretty">
            This admin area cannot start until the hosting environment provides its required
            variables. Set <AdminEnvVar name="NEXT_PUBLIC_SUPABASE_URL" />,{" "}
            <AdminEnvVar name="NEXT_PUBLIC_SUPABASE_ANON_KEY" />, and{" "}
            <AdminEnvVar name="SUPABASE_SERVICE_ROLE_KEY" /> for identity sign in, or{" "}
            <AdminEnvVar name="ADMIN_PASSWORD" /> and{" "}
            <AdminEnvVar name="ADMIN_SESSION_SECRET" /> for the legacy fallback, then reload this
            page.
          </p>
        </div>
      </section>
    );
  }

  const flash = await getAndClearAdminFlash();

  const identity = await getAdminIdentity();
  const authenticated = identity ? true : await hasLegacyAdminSession();

  if (!authenticated) {
    return <LoginPanel flash={flash} supabaseReady={supabaseReady} legacyReady={legacyReady} />;
  }

  return (
    <section className="min-h-[100dvh] px-5 pb-24 pt-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-cream/10 pb-8">
          <p className="inline-flex items-center gap-2 rounded-pill border border-brand-light/16 bg-brand-mist/8 px-4 py-2 text-caption font-semibold uppercase tracking-[0.12em] text-brand-light">
            <ShieldCheck className="h-4 w-4" />
            Studio dashboard
          </p>
          <h1 className="mt-5 font-serif text-h1 font-medium text-cream text-balance">
            Run the studio without touching code.
          </h1>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Dashboard sections">
          {TABS.map((tab) => {
            const isActive = tab.slug === activeTab;
            return (
              <Link
                key={tab.slug}
                href={`/admin?tab=${tab.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-pill border px-4 text-body-sm font-medium transition-colors ${
                  isActive
                    ? "border-brand-action bg-brand-action text-cream"
                    : "border-cream/16 text-cream/75 hover:bg-cream/10"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {flash && (
          <div className="mt-6">
            <AdminStatusMessage tone={flash.tone}>{flash.message}</AdminStatusMessage>
          </div>
        )}

        <div className="mt-8">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "analytics" && <AnalyticsSection />}
          {activeTab === "pricing" && <PricingSection />}
          {activeTab === "bookings" && <BookingsSection />}
          {activeTab === "services" && <ServicesSection />}
          {activeTab === "gallery" && <GallerySection />}
          {activeTab === "testimonials" && <TestimonialsSection />}
        </div>
      </div>
    </section>
  );
}
