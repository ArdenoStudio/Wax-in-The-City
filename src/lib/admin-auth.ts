import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";
import { getAdminIdentity } from "@/lib/admin-access";

const COOKIE_NAME = "witc_admin_session";
const FLASH_COOKIE_NAME = "witc_admin_flash";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

// In-memory rate limiting for login attempts
interface AttemptRecord {
  count: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const MAX_TRACKED_IDENTIFIERS = 1000;

let warnedMissingSecret = false;

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET must be set in production");
    }
    if (!warnedMissingSecret) {
      warnedMissingSecret = true;
      console.error(
        "[SECURITY WARNING] ADMIN_SESSION_SECRET is not set — falling back to ADMIN_PASSWORD. Set ADMIN_SESSION_SECRET in production."
      );
    }
    return adminPassword();
  }
  return secret;
}

/**
 * Resolve per-IP rate-limit identifier from x-forwarded-for when available,
 * composited with the user-agent header so a spoofable IP alone cannot rotate keys.
 * Falls back to "global" when headers are unavailable (e.g. tests).
 */
export async function getLoginIdentifier(): Promise<string> {
  try {
    const h = await headers();
    const forwarded = h.get("x-forwarded-for");
    const realIp = h.get("x-real-ip");
    let base = "global";
    if (forwarded) {
      const ip = forwarded.split(",")[0]?.trim();
      if (ip) base = `ip:${ip}`;
    } else if (realIp?.trim()) {
      base = `ip:${realIp.trim()}`;
    }
    const userAgent = h.get("user-agent")?.trim();
    if (!userAgent) return base;
    const uaFingerprint = createHash("sha256").update(userAgent).digest("hex").slice(0, 32);
    return `${base}|ua:${uaFingerprint}`;
  } catch {
    return "global";
  }
}

function sign(value: string) {
  const secret = sessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  // Hash both to fixed 32-byte digests to prevent length leakage via timing
  const aHash = createHash("sha256").update(a).digest();
  const bHash = createHash("sha256").update(b).digest();
  return timingSafeEqual(aHash, bHash);
}

export function isAdminPasswordConfigured() {
  return Boolean(adminPassword());
}

export function isLoginRateLimited(identifier: string = "global"): { limited: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);
  if (!record) return { limited: false };

  if (record.lockedUntil > now) {
    return { limited: true, retryAfterSec: Math.ceil((record.lockedUntil - now) / 1000) };
  }

  if (record.lockedUntil <= now && record.count >= MAX_FAILED_ATTEMPTS) {
    loginAttempts.delete(identifier);
  }

  return { limited: false };
}

export function recordFailedLogin(identifier: string = "global") {
  const now = Date.now();
  const record = loginAttempts.get(identifier) ?? { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
  loginAttempts.set(identifier, record);

  if (loginAttempts.size > MAX_TRACKED_IDENTIFIERS) {
    for (const [key, entry] of loginAttempts) {
      if (entry.lockedUntil <= now) loginAttempts.delete(key);
      if (loginAttempts.size <= MAX_TRACKED_IDENTIFIERS) break;
    }
  }
}

export function recordSuccessfulLogin(identifier: string = "global") {
  loginAttempts.delete(identifier);
}

export async function verifyAdminPassword(value: string, identifier: string = "global") {
  const expected = adminPassword();
  if (!expected || !value) {
    // Artificial delay on invalid attempt
    await new Promise((resolve) => setTimeout(resolve, 1000));
    recordFailedLogin(identifier);
    return false;
  }

  const isValid = safeEqual(value, expected);
  if (!isValid) {
    // Minimum 1 second penalty on wrong password
    await new Promise((resolve) => setTimeout(resolve, 1000));
    recordFailedLogin(identifier);
    return false;
  }

  recordSuccessfulLogin(identifier);
  return true;
}

export async function setAdminSession() {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `v1.${issuedAt}.${signature}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 0,
  });
}

export async function setAdminFlashMessage(message: string, tone: "error" | "success" = "error") {
  const cookieStore = await cookies();
  cookieStore.set(FLASH_COOKIE_NAME, JSON.stringify({ message, tone, ts: Date.now() }), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 30, // 30 seconds expiry
  });
}

export async function getAndClearAdminFlash(): Promise<{ message: string; tone: "error" | "success" } | null> {
  const cookieStore = await cookies();
  const flashCookie = cookieStore.get(FLASH_COOKIE_NAME)?.value;
  if (!flashCookie) return null;

  // Clear cookie immediately
  cookieStore.set(FLASH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 0,
  });

  try {
    const parsed = JSON.parse(flashCookie);
    if (Date.now() - (parsed.ts ?? 0) > 30000) return null;
    return { message: parsed.message, tone: parsed.tone ?? "error" };
  } catch {
    return null;
  }
}

export async function hasLegacyAdminSession() {
  try {
    const secret = sessionSecret();
    if (!secret) return false;

    const cookieStore = await cookies();
    const value = cookieStore.get(COOKIE_NAME)?.value;
    if (!value) return false;

    const [version, issuedAt, signature] = value.split(".");
    if (version !== "v1" || !issuedAt || !signature) return false;

    const issued = Number(issuedAt);
    if (!Number.isFinite(issued) || Date.now() - issued > SESSION_TTL_MS) {
      return false;
    }

    const expectedSignature = sign(issuedAt);
    if (!expectedSignature) return false;

    return safeEqual(signature, expectedSignature);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  if (await hasLegacyAdminSession()) return true;
  return Boolean(await getAdminIdentity());
}
