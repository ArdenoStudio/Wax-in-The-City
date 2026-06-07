"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { submitBooking } from "@/app/actions/booking";
import { SERVICE_CATEGORIES, BRANCHES, whatsappLink, type BranchSlug } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingFormProps {
  defaultBranch?: BranchSlug;
  defaultService?: string;
}

export function BookingForm({ defaultBranch, defaultService }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      branch: defaultBranch ?? undefined,
      service_preference: defaultService ?? undefined,
    },
  });

  const onSubmit = async (data: BookingInput) => {
    setServerError(null);
    const res = await submitBooking(data);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setServerError(res.error);
    }
  };

  return (
    <div className="rounded-card-lg border border-warm-border bg-white p-6 shadow-card sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-serif text-h3 text-warm">Thank you!</h3>
            <p className="mt-2 max-w-sm text-body text-warm-grey">
              We&apos;ll reach out within 24 hours to confirm your booking. For
              anything urgent, message us on WhatsApp.
            </p>
            <a
              href={whatsappLink("Hi! I just sent a booking request.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-pill border border-brand-action/40 px-6 font-medium text-brand-action transition-colors hover:bg-brand-mist"
            >
              <WhatsappIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" placeholder="Your name" {...register("name")} />
              {errors.name && (
                <p className="text-body-sm text-error">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="Your number (we'll only call or WhatsApp)"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-body-sm text-error">{errors.phone.message}</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>Which location works for you?</Label>
                <Controller
                  control={control}
                  name="branch"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((b) => (
                          <SelectItem key={b.slug} value={b.slug}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.branch && (
                  <p className="text-body-sm text-error">{errors.branch.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>What are you looking for?</Label>
                <Controller
                  control={control}
                  name="service_preference"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map((c) => (
                          <SelectItem key={c.slug} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="preferred_date">When do you prefer to visit?</Label>
              <Input id="preferred_date" type="date" {...register("preferred_date")} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Anything else? (optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell us anything that helps us prepare for your visit."
                {...register("message")}
              />
            </div>

            {serverError && (
              <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-pill bg-brand-action px-8 text-body-lg font-medium text-cream shadow-card transition-colors hover:bg-brand-dark disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send My Request"
              )}
            </button>

            <p className="text-center text-caption text-warm-grey">
              No card required to enquire · We&apos;ll confirm within 24 hours
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
