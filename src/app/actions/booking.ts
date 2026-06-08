"use server";

import { getSql } from "@/lib/db";
import {
  bookingSchema,
  contactSchema,
  type BookingResult,
} from "@/lib/booking";

/**
 * Server action: capture a booking request into Neon `booking_requests`.
 * Pre-Dinaya fallback. When DATABASE_URL isn't configured the request is not
 * persisted — WhatsApp remains the reliable channel.
 */
export async function submitBooking(
  raw: unknown
): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const sql = getSql();

  if (!sql) {
    console.warn("[booking] DATABASE_URL not configured; request not persisted");
    return {
      ok: false,
      error:
        "Online request capture is not connected yet. Please message us on WhatsApp so we receive it immediately.",
    };
  }

  try {
    await sql`
      insert into booking_requests (
        name,
        phone,
        branch,
        service_preference,
        preferred_date,
        message
      )
      values (
        ${parsed.data.name},
        ${parsed.data.phone},
        ${parsed.data.branch},
        ${parsed.data.service_preference || null},
        ${parsed.data.preferred_date || null},
        ${parsed.data.message || null}
      )
    `;
  } catch (error) {
    console.error("[booking] insert failed:", error);
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

  const sql = getSql();
  if (!sql) {
    console.warn("[contact] DATABASE_URL not configured; message not persisted");
    return {
      ok: false,
      error:
        "Online message capture is not connected yet. Please message us on WhatsApp so we receive it immediately.",
    };
  }

  try {
    await sql`
      insert into booking_requests (
        name,
        phone,
        branch,
        service_preference,
        message
      )
      values (
        ${name},
        ${phone},
        ${branch},
        ${"General enquiry"},
        ${composed}
      )
    `;
  } catch (error) {
    console.error("[contact] insert failed:", error);
    return {
      ok: false,
      error: "Something went wrong on our side. Please try WhatsApp instead.",
    };
  }

  return { ok: true };
}
