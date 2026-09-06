import { Lock } from "lucide-react";
import Image from "next/image";
import { loginAdmin } from "@/app/admin/actions";
import {
  requestGoogleOAuthAction,
  signInWithPasswordAction,
  signUpWithPasswordAction,
} from "@/app/admin/auth-actions";
import { IMAGES } from "@/lib/images";
import {
  AdminEnvVar,
  AdminFieldLabel,
  AdminStatusMessage,
  ADMIN_INPUT_CLASS,
  ADMIN_PRIMARY_BUTTON_CLASS,
} from "@/components/admin/primitives";

interface LoginPanelProps {
  flash: { message: string; tone: "error" | "success" } | null;
  supabaseReady: boolean;
  legacyReady: boolean;
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.72 12 .72 7.44.72 3.56 3.36 1.72 7.16l3.66 2.84C6.26 7.14 8.88 5.04 12 5.04Z"
      />
      <path
        fill="#4285F4"
        d="M23.28 12.26c0-.8-.08-1.56-.2-2.26H12v4.52h6.34c-.28 1.48-1.1 2.74-2.34 3.58l3.62 2.8c2.12-1.96 3.66-4.84 3.66-8.64Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.24a7.2 7.2 0 0 1 0-4.48L1.72 6.92a11.28 11.28 0 0 0 0 10.16l3.66-2.84Z"
      />
      <path
        fill="#34A853"
        d="M12 23.28c3.04 0 5.58-1 7.44-2.72l-3.62-2.8c-1 .68-2.28 1.08-3.82 1.08-3.12 0-5.74-2.1-6.62-4.94l-3.66 2.84c1.84 3.8 5.72 6.54 10.28 6.54Z"
      />
    </svg>
  );
}

export function LoginPanel({ flash, supabaseReady, legacyReady }: LoginPanelProps) {
  return (
    <section className="flex min-h-[100dvh] items-center justify-center bg-brand px-5 py-20">
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
        <h1 className="mt-5 text-center font-serif text-h2 text-cream text-balance">
          Admin access
        </h1>
        <p className="mt-2 text-center text-body-sm text-cream/68 text-pretty">
          Approved emails only. Manage bookings, services, gallery, and testimonials.
        </p>

        {!supabaseReady && !legacyReady && (
          <p className="mt-5 rounded-card border border-gold/20 bg-gold/10 px-4 py-3 text-body-sm text-brand-light text-pretty">
            Set <AdminEnvVar name="NEXT_PUBLIC_SUPABASE_URL" />,{" "}
            <AdminEnvVar name="NEXT_PUBLIC_SUPABASE_ANON_KEY" />, or{" "}
            <AdminEnvVar name="ADMIN_PASSWORD" /> before using this page.
          </p>
        )}
        {flash && (
          <div className="mt-5">
            <AdminStatusMessage tone={flash.tone}>{flash.message}</AdminStatusMessage>
          </div>
        )}

        {supabaseReady && (
          <>
            <form action={signInWithPasswordAction} className="mt-6 grid gap-4">
              <AdminFieldLabel label="Email">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={ADMIN_INPUT_CLASS}
                />
              </AdminFieldLabel>
              <AdminFieldLabel label="Password">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className={ADMIN_INPUT_CLASS}
                />
              </AdminFieldLabel>
              <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                Sign in with email
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-cream/12" />
              <span className="text-caption uppercase tracking-[0.12em] text-cream/50">or</span>
              <span className="h-px flex-1 bg-cream/12" />
            </div>

            <form action={requestGoogleOAuthAction}>
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-pill bg-cream px-5 text-body-sm font-medium text-warm transition-colors hover:bg-brand-mist"
              >
                <GoogleGlyph />
                Continue with Google
              </button>
            </form>

            <details className="mt-5 rounded-card border border-cream/12 px-4 py-3">
              <summary className="cursor-pointer text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey">
                First time? Create your admin account
              </summary>
              <form action={signUpWithPasswordAction} className="mt-4 grid gap-4">
                <p className="text-body-sm text-warm-grey text-pretty">
                  Only emails pre approved on the studio allowlist can create an account.
                </p>
                <AdminFieldLabel label="Email">
                  <input name="email" type="email" required className={ADMIN_INPUT_CLASS} />
                </AdminFieldLabel>
                <AdminFieldLabel label="Password">
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className={ADMIN_INPUT_CLASS}
                  />
                </AdminFieldLabel>
                <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
                  Create account
                </button>
              </form>
            </details>
          </>
        )}

        {!supabaseReady && legacyReady && (
          <form action={loginAdmin} className="mt-6 grid gap-4">
            <p className="rounded-card border border-gold/20 bg-gold/10 px-4 py-3 text-body-sm text-brand-light text-pretty">
              Studio administrator password sign-in is active.
            </p>
            <AdminFieldLabel label="Studio password">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className={ADMIN_INPUT_CLASS}
              />
            </AdminFieldLabel>
            <button type="submit" className={ADMIN_PRIMARY_BUTTON_CLASS}>
              Sign in
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
