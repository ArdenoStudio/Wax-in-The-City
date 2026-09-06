"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  clearAdminSession,
  getLoginIdentifier,
  isLoginRateLimited,
  recordFailedLogin,
  setAdminFlashMessage,
} from "@/lib/admin-auth";
import { adminError, isEmailAllowed } from "@/lib/admin-access";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});

async function siteBaseUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  return "https://waxinthecity.lk";
}

export async function signInWithPasswordAction(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    await adminError("Enter a valid email and a password of at least 8 characters.");
    return;
  }

  const identifier = await getLoginIdentifier();
  const { limited, retryAfterSec } = isLoginRateLimited(identifier);
  if (limited) {
    await adminError(
      `Too many failed login attempts. Please wait ${retryAfterSec ?? 900} seconds before trying again.`
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    await adminError("Supabase authentication is not configured.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user?.email) {
    recordFailedLogin(identifier);
    await adminError("The email or password is not correct.");
    return;
  }

  const allowed = await isEmailAllowed(data.user.email);
  if (!allowed) {
    await supabase.auth.signOut();
    await adminError("This email is not approved for admin access.");
    return;
  }

  await setAdminFlashMessage("Signed in to the studio admin.", "success");
  redirect("/admin");
}

export async function signUpWithPasswordAction(formData: FormData) {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    await adminError("Enter a valid email and a password of at least 8 characters.");
    return;
  }

  const allowed = await isEmailAllowed(parsed.data.email);
  if (!allowed) {
    await adminError("Email not approved. Ask an owner to add this address to admin_users first.");
    return;
  }

  const supabase = await createClient();
  if (!supabase) {
    await adminError("Supabase authentication is not configured.");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    await adminError(
      error?.message === "User already registered"
        ? "An account already exists for this email. Please sign in instead."
        : "Could not create the account. Check Supabase Auth settings."
    );
    return;
  }

  if (data.session) {
    await setAdminFlashMessage("Account created and signed in.", "success");
    redirect("/admin");
  }

  await setAdminFlashMessage(
    "Account created. Confirm the verification email from Supabase, then sign in.",
    "success"
  );
  redirect("/admin");
}

export async function requestGoogleOAuthAction(formData: FormData) {
  void formData;

  const supabase = await createClient();
  if (!supabase) {
    await adminError("Supabase authentication is not configured.");
    return;
  }

  const base = await siteBaseUrl();

  const result = await supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${base}/api/auth/callback` },
    })
    .catch(() => null);

  if (!result || result.error || !result.data.url) {
    await setAdminFlashMessage(
      "Could not start Google sign in. Check the Google provider settings in Supabase.",
      "error"
    );
    redirect("/admin");
  }

  redirect(result.data.url);
}

export async function adminSignOutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut().catch(() => null);
  }

  await clearAdminSession();
  redirect("/admin");
}
