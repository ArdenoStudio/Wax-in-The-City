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
  name: z.string().min(2, { message: "We need this to get back to you." }),
  email: z
    .string()
    .email({ message: "Please check your email so we can reply." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(9, { message: "Please check your number — we want to reach you." })
    .regex(/^[0-9+\s()-]+$/, {
      message: "Please check your number — we want to reach you.",
    }),
  branch: z.enum(["battaramulla", "nugegoda"], {
    message: "Which location works for you?",
  }),
  message: z.string().min(1, { message: "Let us know how we can help." }).max(800),
});

export type ContactInput = z.infer<typeof contactSchema>;
