"use client";

import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { submitBooking } from "@/app/actions/booking";
import { OPEN_BRANCHES, whatsappLink, type BranchSlug } from "@/lib/site";
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
  serviceOptions?: string[];
}

export function BookingForm({
  defaultBranch,
  defaultService,
  serviceOptions = [],
}: BookingFormProps) {
  const options =
    defaultService && !serviceOptions.includes(defaultService)
      ? [defaultService, ...serviceOptions]
      : serviceOptions;

  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      branch: defaultBranch ?? undefined,
      service_preference: defaultService ?? undefined,
    },
  });

  const watchedStepOne = useWatch({
    control,
    name: ["branch", "service_preference"],
  });
  const stepOneReady = Boolean(watchedStepOne[0] && watchedStepOne[1]);

  const goToStepTwo = async () => {
    const valid = await trigger(["branch", "service_preference"]);
    if (valid) setStep(2);
  };

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
    <div className="surface-light rounded-card p-5 sm:p-7">
      <p className="mb-6 text-center text-body-sm text-warm-grey">
        No card required · We confirm within 24 hours · Urgent?{" "}
        <a
          href={whatsappLink("Hi! I'd like to ask about a booking.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-action underline-offset-4 hover:underline"
        >
          WhatsApp us
        </a>
      </p>

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
            key={`step-${step}`}
            initial={{ opacity: 0, x: step === 2 ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-caption font-medium text-warm-grey">
                <span className={step === 1 ? "text-brand-action" : "text-warm-grey"}>
                  1. Visit
                </span>
                <span aria-hidden className="text-warm-border">/</span>
                <span className={step === 2 ? "text-brand-action" : "text-warm-grey"}>
                  2. Contact
                </span>
              </div>
              <span className="text-caption text-warm-grey">Step {step} of 2</span>
            </div>

            {step === 1 ? (
              <>
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
                          {OPEN_BRANCHES.map((b) => (
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
                  <p className="text-caption text-warm-grey">
                    Nugegoda is opening soon — book Battaramulla for now.
                  </p>
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
                          aria-invalid={errors.service_preference ? true : undefined}
                          aria-describedby={
                            errors.service_preference ? fieldErrorId("service_preference") : undefined
                          }
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
                  {errors.service_preference && (
                    <p
                      id={fieldErrorId("service_preference")}
                      className="text-body-sm text-error"
                      role="alert"
                    >
                      {errors.service_preference.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  size="lg"
                  variant="primary"
                  disabled={!stepOneReady}
                  onClick={goToStepTwo}
                  className="w-full"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex min-h-10 w-fit items-center gap-1.5 text-body-sm font-medium text-brand-action"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to visit details
                </button>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    autoComplete="name"
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Your number (we'll call or WhatsApp)"
                    {...register("phone")}
                    {...fieldAriaProps("phone", errors.phone)}
                  />
                  {errors.phone && (
                    <p id={fieldErrorId("phone")} className="text-body-sm text-error" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="preferred_date">
                    Preferred visit date <span className="font-normal text-warm-grey">(optional)</span>
                  </Label>
                  <Input
                    id="preferred_date"
                    type="date"
                    lang="en-LK"
                    {...register("preferred_date")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">
                    Anything else? <span className="font-normal text-warm-grey">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Sensitivity, timing, first visit — anything that helps us prepare."
                    {...register("message")}
                  />
                </div>

                {serverError && (
                  <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error" role="alert">
                    {serverError}
                  </p>
                )}

                <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send My Request"
                  )}
                </Button>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
