"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Clock3, Loader2, ShieldCheck } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { submitBooking } from "@/app/actions/booking";
import { SERVICE_CATEGORIES, BRANCHES, whatsappLink, type BranchSlug } from "@/lib/site";
import { fieldAriaProps, fieldErrorId } from "@/lib/form-a11y";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

  const watchedFields = useWatch({
    control,
    name: ["name", "phone", "branch", "service_preference"],
  });
  const filledCount = watchedFields.filter(Boolean).length;
  const progress = (filledCount / 4) * 100;

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
    <div className="premium-surface rounded-card p-5 sm:p-7">
      <div className="relative z-10 mb-6 grid gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-warm-grey sm:grid-cols-2">
        <span className="flex items-center gap-2 rounded-card border border-warm-border/70 bg-white/58 px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-brand-action" />
          Private request
        </span>
        <span className="sticky top-24 flex items-center gap-2 rounded-card border border-warm-border/70 bg-white/58 px-3 py-2 md:static">
          <Clock3 className="h-4 w-4 text-brand-action" />
          Confirmation first
        </span>
      </div>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center py-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-serif text-h3 text-warm">Thank you!</h3>
            <p className="mt-2 max-w-sm text-body text-warm-grey">
              We&apos;ll reach out within 24 hours to confirm your booking. For
              anything urgent, message us on WhatsApp.
            </p>
            <Button asChild variant="outline" size="md" className="mt-6">
              <a
                href={whatsappLink("Hi! I just sent a booking request.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 flex flex-col gap-5"
            noValidate
          >
            <div className="sticky top-20 z-20 -mx-1 flex flex-col gap-1.5 rounded-card bg-cream/92 px-1 py-2 backdrop-blur-md md:static md:bg-transparent md:p-0">
              <div className="flex items-center justify-between">
                <span className="text-caption text-warm-grey">Booking details</span>
                <span className="text-caption font-medium text-brand-action">{filledCount} / 4</span>
              </div>
              <div className="h-px w-full overflow-hidden rounded-full bg-warm-border">
                <motion.div
                  className="h-full rounded-full bg-brand-action"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="name">Your name</Label>
                {watchedFields[0] && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-caption font-medium text-brand-action">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-action" />Done
                  </motion.span>
                )}
              </div>
              <Input
                id="name"
                placeholder="Your name"
                {...register("name")}
                {...fieldAriaProps("name", errors.name)}
              />
              {errors.name && (
                <p id={fieldErrorId("name")} className="text-body-sm text-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="phone">Phone</Label>
                {watchedFields[1] && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-caption font-medium text-brand-action">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-action" />Done
                  </motion.span>
                )}
              </div>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="Your number (we'll only call or WhatsApp)"
                {...register("phone")}
                {...fieldAriaProps("phone", errors.phone)}
              />
              {errors.phone && (
                <p id={fieldErrorId("phone")} className="text-body-sm text-error" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="branch-select">Which location works for you?</Label>
                <Controller
                  control={control}
                  name="branch"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="branch-select"
                        aria-label="Select branch location"
                        aria-invalid={errors.branch ? true : undefined}
                        aria-describedby={errors.branch ? fieldErrorId("branch") : undefined}
                      >
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
                  <p id={fieldErrorId("branch")} className="text-body-sm text-error" role="alert">
                    {errors.branch.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="service-select">What are you looking for?</Label>
                <Controller
                  control={control}
                  name="service_preference"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="service-select"
                        aria-label="Select treatment type"
                      >
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
              <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" size="lg" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send My Request"
              )}
            </Button>

            <p className="text-center text-caption text-warm-grey">
              No card required to enquire · We&apos;ll confirm within 24 hours
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
