"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, MessageSquare, ClipboardList } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { bookingSchema, type BookingInput } from "@/lib/booking";
import { submitBooking } from "@/app/actions/booking";
import {
  OPEN_BRANCHES,
  SERVICE_CATEGORIES,
  servicesByCategory,
  whatsappLink,
  type BranchSlug,
} from "@/lib/site";
import { fieldAriaProps, fieldErrorId } from "@/lib/form-a11y";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn, formatLKRFrom } from "@/lib/utils";

interface BookingFormProps {
  defaultBranch?: BranchSlug;
  defaultService?: string;
  serviceOptions?: string[];
  showChannelChoice?: boolean;
}

export function BookingForm({
  defaultBranch,
  defaultService,
  serviceOptions,
  showChannelChoice = true,
}: BookingFormProps) {
  const [channel, setChannel] = useState<"form" | "whatsapp">("form");
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const groupedServices = useMemo(() => {
    return SERVICE_CATEGORIES.map((cat) => ({
      category: cat,
      services: servicesByCategory(cat.slug).filter((s) =>
        serviceOptions ? serviceOptions.includes(s.name) : true
      ),
    })).filter((g) => g.services.length > 0);
  }, [serviceOptions]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      branch: defaultBranch ?? undefined,
      service_preference: defaultService ?? undefined,
    },
  });

  const branch = watch("branch");
  const service = watch("service_preference");

  const goToStepTwo = async () => {
    const valid = await trigger(["branch", "service_preference"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: BookingInput) => {
    setServerError(null);
    const res = await submitBooking(data);
    if (res.ok) setSubmitted(true);
    else setServerError(res.error);
  };

  if (showChannelChoice && channel === "whatsapp") {
    return (
      <div className="space-y-6">
        <ChannelPicker channel={channel} onChange={setChannel} />
        <div className="surface p-8 text-center">
          <p className="text-body text-warm-grey">
            The fastest route for urgent timing or same-day questions.
          </p>
          <Button asChild size="lg" variant="primary" className="mt-6">
            <a
              href={whatsappLink(
                branch && service
                  ? `Hi! I'd like to enquire about ${service} at ${branch}.`
                  : "Hi! I'd like to ask about a booking."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="h-5 w-5" />
              Open WhatsApp
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showChannelChoice && <ChannelPicker channel={channel} onChange={setChannel} />}

      <div className="surface p-5 sm:p-7">
        <p className="mb-6 text-center text-small text-warm-grey">
          No card required · We confirm within 24 hours
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="type-subtitle mt-5 text-warm">Request received.</h3>
              <p className="mt-2 max-w-sm text-body text-warm-grey">
                We&apos;ll reach out within 24 hours — often sooner — to confirm your visit.
              </p>
              <Button asChild variant="outline" size="md" className="mt-6">
                <a
                  href={whatsappLink("Hi! I just sent a booking request.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  Speed up on WhatsApp
                </a>
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key={`step-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              noValidate
            >
              <div className="flex items-center justify-between text-small text-warm-grey">
                <span>
                  Step {step} of 2 — {step === 1 ? "Visit" : "Contact"}
                </span>
              </div>

              {step === 1 ? (
                <>
                  <fieldset className="space-y-3">
                    <legend className="type-subtitle text-warm">Which studio?</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {OPEN_BRANCHES.map((b) => (
                        <button
                          key={b.slug}
                          type="button"
                          onClick={() => setValue("branch", b.slug, { shouldValidate: true })}
                          className={cn(
                            "rounded-card border p-4 text-left transition-colors",
                            branch === b.slug
                              ? "border-brand-action bg-cream-alt"
                              : "border-warm-border hover:border-brand-action/40"
                          )}
                        >
                          <p className="font-medium text-warm">{b.name}</p>
                          <p className="mt-1 text-small text-warm-grey">{b.hours.weekday}</p>
                        </button>
                      ))}
                    </div>
                    {errors.branch && (
                      <p className="text-small text-error" role="alert">
                        {errors.branch.message}
                      </p>
                    )}
                    <p className="text-small text-warm-grey">
                      Nugegoda is opening soon — book Battaramulla for now.
                    </p>
                  </fieldset>

                  <fieldset className="space-y-4">
                    <legend className="type-subtitle text-warm">What would you like?</legend>
                    {groupedServices.map(({ category, services }) => (
                      <div key={category.slug}>
                        <p className="type-label mb-2 text-warm-grey">{category.name}</p>
                        <div className="space-y-2">
                          {services.map((s) => (
                            <button
                              key={s.slug}
                              type="button"
                              onClick={() =>
                                setValue("service_preference", s.name, { shouldValidate: true })
                              }
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-card border px-4 py-3 text-left",
                                service === s.name
                                  ? "border-brand-action bg-cream-alt"
                                  : "border-warm-border hover:border-brand-action/40"
                              )}
                            >
                              <span className="text-body text-warm">{s.name}</span>
                              <span className="shrink-0 text-small text-warm-grey">
                                {s.duration} · {formatLKRFrom(s.priceFrom)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    {errors.service_preference && (
                      <p className="text-small text-error" role="alert">
                        {errors.service_preference.message}
                      </p>
                    )}
                  </fieldset>

                  <Button
                    type="button"
                    size="lg"
                    variant="primary"
                    disabled={!branch || !service}
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
                    className="inline-flex min-h-10 items-center gap-1.5 text-small font-medium text-brand-action"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to visit details
                  </button>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" autoComplete="name" {...register("name")} {...fieldAriaProps("name", errors.name)} />
                    {errors.name && (
                      <p id={fieldErrorId("name")} className="text-small text-error" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Mobile number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="We'll call or WhatsApp to confirm"
                      {...register("phone")}
                      {...fieldAriaProps("phone", errors.phone)}
                    />
                    {errors.phone && (
                      <p id={fieldErrorId("phone")} className="text-small text-error" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="preferred_date">
                      Preferred day <span className="font-normal text-warm-grey">(optional)</span>
                    </Label>
                    <Input id="preferred_date" type="date" {...register("preferred_date")} />
                  </div>

                  <details className="rounded-card border border-warm-border p-4">
                    <summary className="cursor-pointer text-small font-medium text-warm">
                      Anything else we should know?
                    </summary>
                    <Textarea
                      id="message"
                      className="mt-3"
                      placeholder="First visit, sensitive skin, timing — helps us prepare your room."
                      {...register("message")}
                    />
                  </details>

                  <Controller control={control} name="branch" render={({ field }) => <input type="hidden" {...field} />} />
                  <Controller
                    control={control}
                    name="service_preference"
                    render={({ field }) => <input type="hidden" {...field} />}
                  />

                  {serverError && (
                    <p className="rounded-card bg-error/10 px-4 py-3 text-small text-error" role="alert">
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
                      "Send booking request"
                    )}
                  </Button>
                </>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChannelPicker({
  channel,
  onChange,
}: {
  channel: "form" | "whatsapp";
  onChange: (c: "form" | "whatsapp") => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onChange("form")}
        className={cn(
          "surface flex flex-col items-start gap-2 p-5 text-left",
          channel === "form" && "ring-2 ring-brand-action/30"
        )}
      >
        <ClipboardList className="h-5 w-5 text-brand-action" />
        <span className="type-subtitle text-warm">Send a request</span>
        <span className="text-small text-warm-grey">We confirm within 24 hours</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("whatsapp")}
        className={cn(
          "surface flex flex-col items-start gap-2 p-5 text-left",
          channel === "whatsapp" && "ring-2 ring-brand-action/30"
        )}
      >
        <MessageSquare className="h-5 w-5 text-brand-action" />
        <span className="type-subtitle text-warm">Chat on WhatsApp</span>
        <span className="text-small text-warm-grey">Fastest for urgent timing</span>
      </button>
    </div>
  );
}
