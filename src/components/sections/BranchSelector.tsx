"use client";

import { motion } from "motion/react";
import { BRANCHES } from "@/lib/site";
import { BranchCard } from "@/components/ui/branch-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

/** Branch quick-selector (file 08, section 04). Surfaces the location decision early. */
export function BranchSelector() {
  return (
    <section className="bg-cream-alt px-5 py-section-lg lg:px-8">
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
          className="mt-12 grid gap-5 lg:grid-cols-2"
        >
          {BRANCHES.map((branch) => (
            <motion.div key={branch.slug} variants={fadeUp}>
              <BranchCard branch={branch} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
