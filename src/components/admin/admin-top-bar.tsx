import Image from "next/image";
import { adminSignOutAction } from "@/app/admin/auth-actions";

interface AdminTopBarProps {
  email: string | null;
  provider: string;
  avatarUrl: string | null;
}

export function AdminTopBar({ email, provider, avatarUrl }: AdminTopBarProps) {
  return (
    <header className="border-b border-cream/10 bg-brand-dark">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-serif text-h5 font-medium text-cream">
          WITC Studio Admin
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-pill border border-cream/12 bg-cream/8 px-4 py-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={24}
                height={24}
                unoptimized
                referrerPolicy="no-referrer"
                className="h-6 w-6 rounded-pill object-cover"
              />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-pill bg-brand-action text-caption font-semibold text-cream">
                {(email ?? "S").charAt(0).toUpperCase()}
              </span>
            )}
            <span className="text-caption font-medium text-cream/85">
              {email ?? "Studio manager"}
            </span>
            <span className="rounded-pill bg-brand-mist px-2 py-0.5 text-caption font-semibold uppercase tracking-[0.08em] text-brand-action">
              {provider === "google" ? "Google" : provider === "password" ? "Email" : "Password"}
            </span>
          </span>

          <form action={adminSignOutAction}>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-pill border border-cream/16 px-4 text-body-sm font-medium text-cream transition-colors hover:bg-cream/10"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
