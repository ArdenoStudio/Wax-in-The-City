"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Clock3, Loader2, ShieldCheck } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { submitBooking } from "@/app/actions/booking";
import { SERVICES, BRANCHES, getBranch, whatsappLink, type BranchSlug } from "@/lib/site";
import { fieldAriaProps, fieldErrorId } from "@/lib/form-a11y";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NOTES_MAX_HEIGHT = 200;

interface BookingFormProps {
  defaultBranch?: BranchSlug;
  defaultService?: string;
  serviceOptions?: string[];
}

function todayISODate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function BookingForm({
  defaultBranch,
  defaultService,
  serviceOptions = SERVICES.map((service) => service.name),
}: BookingFormProps) {
  const options =
    defaultService && !serviceOptions.includes(defaultService)
      ? [defaultService, ...serviceOptions]
      : serviceOptions;

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successWaMessage, setSuccessWaMessage] = useState(
    "Hi! I just sent a booking request."
  );
  const minDate = useMemo(() => todayISODate(), []);

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
  const selectedBranch = watchedFields[2] as BranchSlug | undefined;
  const filledCount = watchedFields.filter(Boolean).length;
  const progress = (filledCount / 4) * 100;
  const branchHours = selectedBranch ? getBranch(selectedBranch).hours : null;

  const growNotes = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, NOTES_MAX_HEIGHT)}px`;
  }, []);

  const { ref: messageRef, onChange: messageOnChange, ...messageField } = register(
    "message",
    {
      onChange: (e) => {
        growNotes(e.target as HTMLTextAreaElement);
      },
    }
  );

  const onSubmit = async (data: BookingInput) => {
    setServerError(null);
    const res = await submitBooking(data);
    if (res.ok) {
      const parts = [
        "Hi! I just sent a booking request.",
        data.branch ? `Branch: ${getBranch(data.branch).name}.` : null,
        data.service_preference ? `Looking for: ${data.service_preference}.` : null,
      ].filter(Boolean);
      setSuccessWaMessage(parts.join(" "));
      setSubmitted(true);
    } else {
      setServerError(res.error);
    }
  };

  return (
    <div className="premium-surface rounded-card p-7 sm:p-8">
      <div className="relative z-10 mb-6 grid gap-2.5 font-sans text-caption leading-snug font-semibold uppercase tracking-[0.1em] text-warm-grey sm:grid-cols-2">
        <span className="flex items-center gap-2.5 rounded-card border border-warm-border/80 bg-white/62 px-3.5 py-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-action" />
          Private request
        </span>
        <span className="sticky top-24 flex items-center gap-2.5 rounded-card border border-warm-border/80 bg-white/62 px-3 py-3 md:static">
          <Clock3 className="h-4 w-4 shrink-0 text-brand-action" />
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
            aria-live="polite"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="text-balance mt-6 font-display text-h3 font-semibold tracking-display text-warm">
              Request received
            </h3>
            <p className="tracking-[-0.011em] font-sans mt-2.5 max-w-sm text-pretty text-body text-warm-grey">
              We&apos;ll confirm within 24 hours. WhatsApp if timing is urgent.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild variant="outline" size="md">
                <Link href="/services">Browse services</Link>
              </Button>
              <Button asChild variant="primary" size="md">
                <a
                  href={whatsappLink(successWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon className="h-4 w-4 shrink-0" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
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
            <div className="sticky top-24 z-30 flex flex-col gap-1.5 rounded-card bg-cream/94 py-3 backdrop-blur-2xl md:static md:bg-transparent md:p-0">
              <div className="flex items-center justify-between">
                <span className="font-sans text-caption leading-snug text-warm-grey">Booking details</span>
                <span className="font-sans text-caption leading-snug font-semibold tabular-nums text-brand-action">
                  {filledCount} / 4
                </span>
              </div>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-warm-border/80"
                role="progressbar"
                aria-valuenow={filledCount}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Booking form progress"
              >
                <motion.div
                  className="h-full rounded-full bg-brand-action"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="e.g. Anika"
                autoComplete="name"
                {...register("name")}
                {...fieldAriaProps("name", errors.name)}
              />
              <p className="field-helper">As you&apos;d like it on the appointment list.</p>
              {errors.name && (
                <p id={fieldErrorId("name")} className="field-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="07X XXX XXXX"
                {...register("phone")}
                {...fieldAriaProps("phone", errors.phone)}
              />
              <p className="field-helper">
                We&apos;ll only call or WhatsApp to confirm — no marketing lists.
              </p>
              {errors.phone && (
                <p id={fieldErrorId("phone")} className="field-error" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
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
                        aria-describedby={
                          errors.branch
                            ? fieldErrorId("branch")
                            : "branch-hours-helper"
                        }
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
                <p id="branch-hours-helper" className="field-helper">
                  {branchHours
                    ? `Weekdays ${branchHours.weekday} · Weekends ${branchHours.weekend}`
                    : "Battaramulla or Nugegoda — same care standard."}
                </p>
                {errors.branch && (
                  <p id={fieldErrorId("branch")} className="field-error" role="alert">
                    {errors.branch.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="service-select">What are you looking for?</Label>
                <Controller
                  control={control}
                  name="service_preference"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="service-select"
                        aria-label="Select treatment type"
                        aria-describedby="service-helper"
                      >
                        <SelectValue placeholder="Choose a treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <p id="service-helper" className="field-helper">
                  Pick a category or specific treatment — we&apos;ll refine if needed.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="preferred_date">When do you prefer to visit?</Label>
              <Input
                id="preferred_date"
                type="date"
                min={minDate}
                {...register("preferred_date")}
                {...fieldAriaProps("preferred_date", errors.preferred_date)}
              />
              <p className="field-helper">
                A preferred date helps us check rooms — not a confirmed slot yet.
              </p>
              {errors.preferred_date && (
                <p
                  id={fieldErrorId("preferred_date")}
                  className="field-error"
                  role="alert"
                >
                  {errors.preferred_date.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Anything else? (optional)</Label>
              <Textarea
                id="message"
                placeholder="Sensitivity, first visit, preferred time of day…"
                rows={3}
                className="max-h-[200px] resize-none overflow-y-auto"
                {...messageField}
                onChange={messageOnChange}
                ref={(el) => {
                  messageRef(el);
                  growNotes(el);
                }}
                {...fieldAriaProps("message", errors.message)}
              />
              <p className="field-helper">
                Optional notes help the studio prepare the right room and pacing.
              </p>
              {errors.message && (
                <p id={fieldErrorId("message")} className="field-error" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="tracking-[-0.011em] text-pretty font-sans rounded-card bg-error/10 px-5 py-3.5 text-body-sm text-error" role="alert">
                {serverError}
              </p>
            )}

            <ShimmerButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send my request"
              )}
            </ShimmerButton>

            <p className="text-center font-sans text-caption leading-snug text-warm-grey">
              No card required · Confirmation within 24 hours
            </p>
            <p className="text-center font-sans text-caption leading-snug text-warm-grey/85">
              Reviewed privately by the studio — see our{" "}
              <a
                href="/contact#privacy"
                className="font-semibold text-brand-action underline-offset-[3px] hover:underline"
              >
                privacy note
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
