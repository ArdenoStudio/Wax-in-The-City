"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/booking";
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
import { z } from "zod";

const contactFormSchema = contactSchema.extend({ company: z.string().optional() });
type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await submitContact(data);
      if (res.ok) setSubmitted(true);
      else setServerError(res.error);
    } catch {
      setServerError("Network issue — please retry or message us on WhatsApp.");
    }
  };

  return (
    <div className="premium-surface rounded-card p-5 sm:p-7">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center py-8 text-center will-change-transform"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-success/15 text-success">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-serif text-h3 text-warm text-balance">Message sent</h3>
            <p className="mt-2 max-w-sm text-body text-warm-grey text-pretty">
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
                  autoComplete="name"
                  placeholder="Your name"
                  aria-required="true"
                  {...register("name")}
                  {...fieldAriaProps("name", errors.name)}
                />
                {errors.name && (
                  <p id={fieldErrorId("name")} className="text-body-sm text-error text-pretty" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="c-email">Email (optional)</Label>
                <Input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  {...fieldAriaProps("email", errors.email)}
                />
                {errors.email && (
                  <p id={fieldErrorId("email")} className="text-body-sm text-error text-pretty" role="alert">
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
                  autoComplete="tel"
                  placeholder="Your number"
                  aria-required="true"
                  {...register("phone")}
                  {...fieldAriaProps("phone", errors.phone)}
                />
                {errors.phone && (
                  <p id={fieldErrorId("phone")} className="text-body-sm text-error text-pretty" role="alert">
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
                        aria-required="true"
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
                  <p id={fieldErrorId("branch")} className="text-body-sm text-error text-pretty" role="alert">
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
                aria-required="true"
                {...register("message")}
                {...fieldAriaProps("message", errors.message)}
              />
              {errors.message && (
                <p id={fieldErrorId("message")} className="text-body-sm text-error text-pretty" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error text-pretty" role="alert">
                {serverError}
              </p>
            )}

            <div className="hidden" aria-hidden="true">
              <Label htmlFor="company">Company</Label>
              <Input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

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

            <p className="text-center text-body-sm text-warm-grey text-pretty">
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
