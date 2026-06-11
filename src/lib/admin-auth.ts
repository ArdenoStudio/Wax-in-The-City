import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "witc_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || adminPassword();
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function isAdminPasswordConfigured() {
  return Boolean(adminPassword());
}

export function verifyAdminPassword(value: string) {
  const expected = adminPassword();
  if (!expected || !value) return false;
  return safeEqual(value, expected);
}

export async function setAdminSession() {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `v1.${issuedAt}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
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

  return safeEqual(signature, sign(issuedAt));
}
