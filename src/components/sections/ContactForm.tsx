"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/booking";
import { submitContact } from "@/app/actions/booking";
import { BRANCHES, whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons";
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
                <Input id="c-name" placeholder="Your name" {...register("name")} />
                {errors.name && (
                  <p className="text-body-sm text-error">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="c-email">Email (optional)</Label>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-body-sm text-error">{errors.email.message}</p>
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
                />
                {errors.phone && (
                  <p className="text-body-sm text-error">{errors.phone.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Which branch?</Label>
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
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="c-message">How can we help?</Label>
              <Textarea
                id="c-message"
                placeholder="Tell us what you'd like to ask."
                {...register("message")}
              />
              {errors.message && (
                <p className="text-body-sm text-error">{errors.message.message}</p>
              )}
            </div>

            {serverError && (
              <p className="rounded-card bg-error/10 px-4 py-3 text-body-sm text-error">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-pill bg-[linear-gradient(135deg,#a5273f,#6f1726)] px-8 text-body-lg font-medium text-cream shadow-[0_16px_42px_rgba(151,35,58,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(151,35,58,0.32)] disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            <p className="text-center text-body-sm text-warm-grey">
              Prefer WhatsApp?{" "}
              <a
                href={whatsappLink("Hi! I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-brand-action underline-offset-4 hover:underline"
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
