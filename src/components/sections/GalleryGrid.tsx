"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, type GalleryCategory } from "@/lib/gallery";
import { BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

const FILTERS: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "salon", label: "Salon" },
  { key: "results", label: "Studio" },
  { key: "events", label: "Events" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const photos =
    filter === "all" ? GALLERY : GALLERY.filter((p) => p.category === filter);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab" && dialogRef.current) {
        // Focus trap
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center" role="group" aria-label="Filter gallery">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-pill min-h-11 px-4 py-2.5 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:px-5",
              "pressable",
              filter === f.key
                ? "bg-brand-action text-cream"
                : "border border-warm-border text-warm-grey hover:text-brand-action"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-4 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.button
            key={`${photo.src}-${i}`}
            ref={active === i ? triggerRef : undefined}
            layout
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image: ${photo.alt}`}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action will-change-transform"
          >
            <div className={cn("relative w-full", i % 3 === 1 ? "aspect-[3/4]" : "aspect-square")}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                placeholder={photo.src.startsWith("/") ? "blur" : "empty"}
                blurDataURL={BLUR_DATA_URL}
                unoptimized={photo.src.startsWith("http")}
                className="object-cover transition-transform duration-500 ease-[var(--ease-apple)] hover:scale-[1.02] will-change-transform"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && photos[active] && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={close}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-warm/90 p-4 backdrop-blur-sm"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-pill bg-cream/10 text-cream hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-pill bg-cream/10 text-cream hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={photos[active].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80dvh] max-h-[80dvh] w-full max-w-4xl will-change-transform"
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                placeholder={photos[active].src.startsWith("/") ? "blur" : "empty"}
                blurDataURL={BLUR_DATA_URL}
                unoptimized={photos[active].src.startsWith("http")}
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-pill bg-cream/10 text-cream hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
