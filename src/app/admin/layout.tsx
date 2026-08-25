import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLegacyAdminSession } from "@/lib/admin-auth";
import { getAdminIdentity } from "@/lib/admin-access";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

export const metadata: Metadata = {
  title: "WITC Studio Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const identity = await getAdminIdentity();
  const legacySession = identity ? false : await hasLegacyAdminSession();

  return (
    <div className="min-h-[100dvh] bg-ink">
      {(identity || legacySession) && (
        <AdminTopBar
          email={identity?.email ?? null}
          provider={identity?.provider ?? "password"}
          avatarUrl={identity?.avatarUrl ?? null}
        />
      )}
      {children}
    </div>
  );
}
