"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  SERVICE_CATEGORIES,
  servicesByCategory,
  type ServiceCategory,
} from "@/lib/site";
import { ServiceCard } from "@/components/ui/service-card";
import { fadeUp, staggerFast } from "@/lib/animations";

/**
 * Category tabs with an animated indicator (layoutId) and cross-faded content
 * (file 10, section 4). Mobile-friendly horizontal scroll for the tab row.
 */
export function ServiceTabs({
  initial = "waxing",
}: {
  initial?: ServiceCategory;
}) {
  const [active, setActive] = useState<ServiceCategory>(initial);
  const services = servicesByCategory(active);

  return (
    <div>
      {/* Tab row */}
      <div className="flex justify-start gap-1 overflow-x-auto pb-2 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SERVICE_CATEGORIES.map((cat) => {
          const isActive = active === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActive(cat.slug)}
              className={`relative shrink-0 rounded-pill px-5 py-2.5 text-body-sm font-medium transition-colors ${
                isActive ? "text-cream" : "text-warm-grey hover:text-brand-action"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-tab-indicator"
                  className="absolute inset-0 rounded-pill bg-brand-action"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={fadeUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
