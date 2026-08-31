"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { ArrowLeft, MessageCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[witc-app-error]", error);
  }, [error]);

  return (
    <section className="flex min-h-[75dvh] flex-col items-center justify-center bg-cream px-5 py-section-lg text-center lg:px-8">
      <div className="mx-auto max-w-md">
        <p className="text-caption font-semibold uppercase tracking-[0.18em] text-brand-action">
          Studio Notice
        </p>
        <h1 className="mt-4 font-serif text-h2 font-medium text-warm text-balance">
          Something didn&apos;t load as expected.
        </h1>
        <p className="mt-4 text-body text-warm-grey text-pretty">
          We apologize for the interruption. Please try refreshing, or contact our studio directly on WhatsApp for immediate assistance.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="lg" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href={whatsappLink("Hello! I had an issue on the website and would like to get in touch.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
