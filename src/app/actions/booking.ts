"use server";

import { createClient } from "@/lib/supabase/server";
import {
  bookingSchema,
  contactSchema,
  type BookingResult,
} from "@/lib/booking";

/**
 * Server action: capture a booking request into Supabase `booking_requests`.
 * Pre-Dinaya fallback (file 08). When Supabase isn't configured yet the request
 * is logged and treated as received — WhatsApp remains the reliable channel and
 * is always offered alongside this form.
 */
export async function submitBooking(
  raw: unknown
): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
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
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
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
