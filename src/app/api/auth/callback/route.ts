import { NextResponse, type NextRequest } from "next/server";
import { setAdminFlashMessage } from "@/lib/admin-auth";
import { isEmailAllowed } from "@/lib/admin-access";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function adminUrl(request: NextRequest): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL("/admin", base || request.url).toString();
}

async function reject(
  request: NextRequest,
  supabase: Awaited<ReturnType<typeof createClient>> | null,
  message: string
) {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {}
  }
  await setAdminFlashMessage(message, "error");
  return NextResponse.redirect(adminUrl(request));
}

export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get("code");

  const supabase = await createClient();
  if (!supabase) {
    return reject(request, null, "Supabase authentication is not configured.");
  }

  if (!code) {
    return reject(request, supabase, "Sign in did not complete. Please try again.");
  }

  let email: string | null = null;

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw new Error(error.message);
    email = data?.user?.email ?? null;
  } catch {
    return reject(request, supabase, "The sign in link expired. Please try again.");
  }

  const admin = createAdminClient();
  if (!admin) {
    return reject(request, supabase, "Supabase admin env vars are not configured.");
  }

  const allowed = await isEmailAllowed(email ?? "");
  if (!allowed) {
    return reject(
      request,
      supabase,
      `The account ${email ?? "you signed in with"} is not approved for admin access.`
    );
  }

  await setAdminFlashMessage("Signed in to the studio admin.", "success");
  return NextResponse.redirect(adminUrl(request));
}
