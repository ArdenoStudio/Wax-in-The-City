"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VideoLoopProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

const PREFERS_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mql = window.matchMedia(PREFERS_REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Muted looping ambience video; pauses off-screen and swaps to its poster under reduced motion. */
export function VideoLoop({ src, poster, alt, className }: VideoLoopProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(PREFERS_REDUCED_MOTION_QUERY).matches,
    () => false
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.4) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden rounded-card bg-ink shadow-[0_14px_30px_rgba(27,14,16,0.20)]",
        className
      )}
    >
      {reduceMotion ? (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
