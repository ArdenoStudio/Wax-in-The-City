import { cache } from "react";
import { redirect } from "next/navigation";
import { setAdminFlashMessage } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminIdentity {
  email: string;
  provider: string;
  avatarUrl: string | null;
}

export function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function isEmailAllowed(email: string): Promise<boolean> {
  const supabase = createAdminClient();
  if (!supabase) return false;

  const normalized = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("email")
    .ilike("email", normalized)
    .limit(1);

  if (error) return false;
  return Boolean(data && data.length > 0);
}

export const getAdminIdentity = cache(
  async (): Promise<AdminIdentity | null> => {
    if (!isSupabaseAuthConfigured()) return null;

    try {
      const supabase = await createClient();
      if (!supabase) return null;

      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user?.email) return null;
      if (!(await isEmailAllowed(user.email))) return null;

      const provider =
        typeof user.app_metadata?.provider === "string"
          ? user.app_metadata.provider
          : "email";

      const avatarUrl =
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : null;

      return {
        email: user.email.toLowerCase(),
        provider,
        avatarUrl,
      };
    } catch {
      return null;
    }
  }
);

export async function adminError(
  message: string,
  tab?: string
): Promise<never> {
  await setAdminFlashMessage(message, "error");
  redirect(tab ? `/admin?tab=${tab}` : "/admin");
}
