"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SERVICE_CATEGORIES,
  SERVICES,
  type ServiceCategory,
  type ServiceCategoryMeta,
  type Service,
} from "@/lib/site";
import { ServiceCard } from "@/components/ui/service-card";
import { fadeUp, staggerFast } from "@/lib/animations";

export function ServiceTabs({
  initial = "waxing",
  categories = SERVICE_CATEGORIES,
  services = SERVICES,
}: {
  initial?: ServiceCategory;
  categories?: ServiceCategoryMeta[];
  services?: Service[];
}) {
  const [active, setActive] = useState<ServiceCategory>(initial);
  const activeServices = services.filter((service) => service.category === active);
  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="mx-auto flex max-w-full flex-wrap justify-center gap-1.5 rounded-card border border-warm-border/70 bg-white/58 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_46px_rgba(39,19,21,0.06)] backdrop-blur-xl sm:w-fit sm:flex-nowrap sm:rounded-pill"
      >
        {categories.map((cat, index) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              id={`service-tab-${cat.slug}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${cat.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(cat.slug)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  const next = categories[(index + 1) % categories.length];
                  setActive(next.slug);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  const prev = categories[(index - 1 + categories.length) % categories.length];
                  setActive(prev.slug);
                }
              }}
              className={`pressable relative shrink-0 rounded-pill px-4 py-2.5 text-body-sm font-medium transition-colors sm:px-5 ${
                isActive ? "text-cream" : "text-warm-grey hover:text-brand-action"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-tab-indicator"
                  className="absolute inset-0 rounded-pill bg-[linear-gradient(135deg,var(--color-brand-action),var(--color-brand-dark))] shadow-[0_12px_28px_rgba(162,15,55,0.22)]"
                  transition={{ type: "spring", stiffness: 360, damping: 34 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          id={`service-panel-${active}`}
          aria-labelledby={`service-tab-${active}`}
          tabIndex={0}
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeServices.map((service) => (
            <motion.div key={service.slug} variants={fadeUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
