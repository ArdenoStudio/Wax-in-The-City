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
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center py-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-serif text-h3 text-warm">Message sent</h3>
            <p className="mt-2 max-w-sm text-body text-warm-grey">
              Thank you! We&apos;ll get back to you within 24 hours.
            </p>
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="c-name">Your name</Label>
                <Input
                  id="c-name"
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
                <Label htmlFor="c-email">Email (optional)</Label>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  {...fieldAriaProps("email", errors.email)}
                />
                {errors.email && (
                  <p id={fieldErrorId("email")} className="text-body-sm text-error" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="c-phone">Phone</Label>
                <Input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Your number"
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
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="c-message">How can we help?</Label>
              <Textarea
                id="c-message"
                placeholder="Tell us what you'd like to ask."
                {...register("message")}
                {...fieldAriaProps("message", errors.message)}
              />
              {errors.message && (
                <p id={fieldErrorId("message")} className="text-body-sm text-error" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error" role="alert">
                {serverError}
              </p>
            )}

            <Button type="submit" size="lg" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="relative z-10 inline-flex items-center gap-2 text-cream">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="relative z-10 text-cream">Send Message</span>
              )}
            </Button>

            <p className="text-center text-body-sm text-warm-grey">
              Prefer WhatsApp?{" "}
              <a
                href={whatsappLink("Hi! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1 font-medium text-brand-action underline-offset-4 hover:underline"
              >
                <WhatsappIcon className="h-4 w-4" />
                Message us
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
