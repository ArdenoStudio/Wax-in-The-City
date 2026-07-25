"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, type GalleryCategory } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/** Labels match honest gallery.ts categories (studio interiors, editorial results, event placeholders). */
const FILTERS: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "salon", label: "Studio" },
  { key: "results", label: "Results" },
  { key: "events", label: "Events" },
];

const SWIPE_HINT_KEY = "witc-gallery-swipe-hint";

function shouldShowSwipeHint(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia("(max-width: 767px)").matches) return false;
  return !sessionStorage.getItem(SWIPE_HINT_KEY);
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(shouldShowSwipeHint);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
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

  const setFilterAndReset = useCallback((key: GalleryCategory | "all") => {
    setFilter(key);
    setActive(null);
  }, []);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (current === first || !dialogRef.current.contains(current)) {
            e.preventDefault();
            last.focus();
          }
        } else if (current === last || !dialogRef.current.contains(current)) {
          e.preventDefault();
          first.focus();
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
      {showSwipeHint && (
        <p className="mb-4 text-center text-caption text-warm-grey md:hidden">
          Tap a photo to open — swipe or use arrows to browse.
        </p>
      )}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center" role="group" aria-label="Filter gallery">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              if (showSwipeHint) {
                sessionStorage.setItem(SWIPE_HINT_KEY, "1");
                setShowSwipeHint(false);
              }
              setFilterAndReset(f.key);
            }}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-pill px-4 py-2.5 text-body-sm font-medium transition-colors sm:px-5",
              "pressable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action/45 focus-visible:ring-offset-2",
              filter === f.key
                ? "bg-brand-action text-cream shadow-[0_12px_28px_rgba(162,15,55,0.22)] ring-2 ring-brand-mist"
                : "border border-warm-border bg-white/50 text-warm-grey hover:border-brand-action/30 hover:bg-brand-mist/60 hover:text-brand-action"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter === "events" && (
        <p className="mx-auto mt-5 max-w-2xl text-center text-body-sm text-warm-grey">
          Events imagery here is atmospheric placeholder only — not coverage of a documented studio event.
        </p>
      )}

      <div className="mt-10 columns-2 gap-4 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.button
            key={`${photo.src}-${i}`}
            ref={active === i ? triggerRef : undefined}
            layout
            type="button"
            onClick={() => {
              if (showSwipeHint) {
                sessionStorage.setItem(SWIPE_HINT_KEY, "1");
                setShowSwipeHint(false);
              }
              setActive(i);
            }}
            aria-label={`View image: ${photo.alt}`}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action"
          >
            <div className={cn("relative w-full", i % 3 === 1 ? "aspect-[3/4]" : "aspect-square")}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                unoptimized={photo.src.startsWith("http")}
                className="object-cover transition-transform duration-500 hover:scale-105"
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
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-warm/90 p-4 backdrop-blur-sm"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-pill bg-cream/10 text-cream hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[80vh] w-full max-w-4xl flex-col"
            >
              <div className="relative min-h-0 flex-1">
                <Image
                  src={photos[active].src}
                  alt={photos[active].alt}
                  fill
                  sizes="100vw"
                  unoptimized={photos[active].src.startsWith("http")}
                  className="object-contain"
                />
              </div>
              {(photos[active].caption || photos[active].alt) && (
                <p className="mt-3 text-center text-body-sm text-cream/80">
                  {photos[active].caption ?? photos[active].alt}
                </p>
              )}
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
