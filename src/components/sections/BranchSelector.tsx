"use client";

import { motion } from "motion/react";
import { BRANCHES } from "@/lib/site";
import { BranchCard } from "@/components/ui/branch-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

/** Branch quick-selector — two clean location cards early in the flow. */
export function BranchSelector() {
  return (
    <section
      id="locations-teaser"
      className="relative overflow-hidden bg-cream-alt px-5 py-section-lg lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-gradient opacity-40" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Branches"
          showEyebrow={false}
          title="Choose the easiest route in."
          subtitle="Two Colombo locations with clear hours, quick WhatsApp booking and a calmer appointment flow."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-11 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-5"
        >
          {BRANCHES.map((branch) => (
            <motion.div key={branch.slug} variants={fadeUp} className="min-w-0">
              <BranchCard branch={branch} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
