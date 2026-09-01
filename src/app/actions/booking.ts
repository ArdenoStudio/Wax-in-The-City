"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  bookingSchema,
  contactSchema,
  withHoneypot,
  type BookingResult,
} from "@/lib/booking";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionTimes = new Map<string, number[]>();

const bookingSchemaWithGuard = withHoneypot(bookingSchema);
const contactSchemaWithGuard = withHoneypot(contactSchema);

async function clientKey(): Promise<string> {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissionTimes.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionTimes.set(key, recent);
    return true;
  }
  if (submissionTimes.size > 256) {
    for (const [k, times] of submissionTimes) {
      if (!times.some((time) => now - time < RATE_LIMIT_WINDOW_MS)) {
        submissionTimes.delete(k);
      }
    }
  }
  recent.push(now);
  submissionTimes.set(key, recent);
  return false;
}

/**
 * Server action: capture a booking request into Supabase `booking_requests`.
 * Pre-Dinaya fallback (file 08). When Supabase isn't configured yet the request
 * is logged and treated as received — WhatsApp remains the reliable channel and
 * is always offered alongside this form.
 */
export async function submitBooking(
  raw: unknown
): Promise<BookingResult> {
  const key = await clientKey();
  if (rateLimited(key)) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const parsed = bookingSchemaWithGuard.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  if (parsed.data.company?.trim()) {
    return { ok: true };
  }

  const supabase = await createClient();

  if (!supabase) {
    console.warn("[booking] Supabase not configured; request not persisted");
    return {
      ok: false,
      error:
        "Online request capture is not connected yet. Please message us on WhatsApp so we receive it immediately.",
    };
  }

  const { error } = await supabase.from("booking_requests").insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    branch: parsed.data.branch,
    service_preference: parsed.data.service_preference || null,
    preferred_date: parsed.data.preferred_date || null,
    message: parsed.data.message || null,
  });

  if (error) {
    console.error("[booking] insert failed:", error.message);
    return {
      ok: false,
      error: "Something went wrong on our side. Please try WhatsApp instead.",
    };
  }

  return { ok: true };
}

/**
 * Contact enquiry — stored in `booking_requests` with the email folded into the
 * message so we keep a single table pre-Dinaya.
 */
export async function submitContact(raw: unknown): Promise<BookingResult> {
  const key = await clientKey();
  if (rateLimited(key)) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const parsed = contactSchemaWithGuard.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  if (parsed.data.company?.trim()) {
    return { ok: true };
  }

  const { name, email, phone, branch, message } = parsed.data;
  const composed = email ? `${message}\n\nEmail: ${email}` : message;

  const supabase = await createClient();
  if (!supabase) {
    console.warn("[contact] Supabase not configured; message not persisted");
    return {
      ok: false,
      error:
        "Online message capture is not connected yet. Please message us on WhatsApp so we receive it immediately.",
    };
  }

  const { error } = await supabase.from("booking_requests").insert({
    name,
    phone,
    branch,
    service_preference: "General enquiry",
    message: composed,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return {
      ok: false,
      error: "Something went wrong on our side. Please try WhatsApp instead.",
    };
  }

  return { ok: true };
}
