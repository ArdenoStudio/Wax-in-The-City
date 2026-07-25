import { z } from "zod";

/** Booking request shape — mirrors the Supabase `booking_requests` table. */
export const bookingSchema = z.object({
  name: z.string().min(2, { message: "We need this to get back to you." }),
  phone: z
    .string()
    .min(9, { message: "Please check your number — we want to reach you." })
    .regex(/^[0-9+\s()-]+$/, {
      message: "Please check your number — we want to reach you.",
    }),
  branch: z.enum(["battaramulla", "nugegoda"], {
    message: "Which location works for you?",
  }),
  service_preference: z.string().optional(),
  preferred_date: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const preferred = new Date(`${value}T00:00:00`);
        if (Number.isNaN(preferred.getTime())) return false;
        return preferred >= today;
      },
      { message: "Please choose today or a future date." }
    ),
  message: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string };

/** Contact enquiry — captured into the same `booking_requests` table. */
export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "A first name is enough — we just need something to reply to.",
  }),
  email: z
    .string()
    .email({ message: "That email looks off — a quick check helps us reply." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(9, {
      message: "Add a few more digits so we can reach you by call or WhatsApp.",
    })
    .regex(/^[0-9+\s()-]+$/, {
      message: "Use numbers only (spaces or + are fine).",
    }),
  branch: z.enum(["battaramulla", "nugegoda"], {
    message: "Pick Battaramulla or Nugegoda so we know which studio to answer from.",
  }),
  message: z
    .string()
    .min(1, { message: "A short note is perfect — tell us what you need." })
    .max(800, { message: "Keep it under 800 characters so we can read it quickly." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
