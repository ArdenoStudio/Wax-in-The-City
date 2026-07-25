"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/booking";
import { submitContact } from "@/app/actions/booking";
import { BRANCHES, whatsappLink } from "@/lib/site";
import { fieldAriaProps, fieldErrorId } from "@/lib/form-a11y";
import { WhatsappIcon } from "@/components/icons";
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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    const res = await submitContact(data);
    if (res.ok) setSubmitted(true);
    else setServerError(res.error);
  };

  return (
    <div className="premium-surface rounded-card p-5 sm:p-7">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center py-8 text-center"
            aria-live="polite"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="text-balance mt-7 font-display text-h3 font-semibold tracking-display text-warm">
              Message sent
            </h3>
            <p className="tracking-[-0.011em] font-sans mt-2 max-w-sm text-pretty text-body text-warm-grey">
              Thank you — we&apos;ll reply within 24 hours. For urgent timing,
              WhatsApp is faster.
            </p>
            <Button asChild variant="outline" size="md" className="mt-6">
              <a
                href={whatsappLink("Hi! I just sent a contact message.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon className="h-4 w-4 shrink-0" />
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
            className="relative z-10 flex flex-col gap-6"
            noValidate
          >
            <p className="field-helper -mt-1">
              Fields marked clearly below — we only use details to reply.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-name">Your name</Label>
                <Input
                  id="c-name"
                  placeholder="e.g. Anika"
                  autoComplete="name"
                  {...register("name")}
                  {...fieldAriaProps("name", errors.name)}
                />
                <p className="field-helper">So we know who to reply to.</p>
                {errors.name && (
                  <p id={fieldErrorId("name")} className="field-error" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-email">Email (optional)</Label>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  {...fieldAriaProps("email", errors.email)}
                />
                <p className="field-helper">Useful if you prefer email over WhatsApp.</p>
                {errors.email && (
                  <p id={fieldErrorId("email")} className="field-error" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-phone">Phone</Label>
                <Input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07X XXX XXXX"
                  {...register("phone")}
                  {...fieldAriaProps("phone", errors.phone)}
                />
                <p className="field-helper">We&apos;ll only call or WhatsApp you.</p>
                {errors.phone && (
                  <p id={fieldErrorId("phone")} className="field-error" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-branch">Which branch?</Label>
                <Controller
                  control={control}
                  name="branch"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="c-branch"
                        aria-label="Select branch location"
                        aria-invalid={errors.branch ? true : undefined}
                        aria-describedby={
                          errors.branch ? fieldErrorId("branch") : "c-branch-help"
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
                <p id="c-branch-help" className="field-helper">
                  Pick the studio closest to your day.
                </p>
                {errors.branch && (
                  <p id={fieldErrorId("branch")} className="field-error" role="alert">
                    {errors.branch.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="c-message">How can we help?</Label>
              <Textarea
                id="c-message"
                placeholder="Service, timing, sensitivity, or a simple question…"
                {...register("message")}
                {...fieldAriaProps("message", errors.message)}
              />
              <p className="field-helper">
                A little context helps us reply with the right next step.
              </p>
              {errors.message && (
                <p id={fieldErrorId("message")} className="field-error" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {serverError && (
              <p
                className="tracking-[-0.011em] text-pretty font-sans rounded-card bg-error/10 px-6 py-4 text-body-sm text-error"
                role="alert"
                aria-live="polite"
              >
                {serverError}
              </p>
            )}

            <Button type="submit" size="lg" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="relative z-10 inline-flex items-center gap-2.5 text-cream">
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
                  Sending…
                </span>
              ) : (
                <span className="relative z-10 text-cream">Send message</span>
              )}
            </Button>

            <p className="tracking-[-0.011em] text-pretty font-sans text-center text-body-sm text-warm-grey">
              Prefer WhatsApp?{" "}
              <a
                href={whatsappLink("Hi! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-action underline-offset-[3px] hover:underline"
              >
                <WhatsappIcon className="h-4 w-4 shrink-0" />
                Message us
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
