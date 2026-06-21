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
  service_preference: z.string().min(1, { message: "What are you looking for?" }),
  preferred_date: z.string().optional(),
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
