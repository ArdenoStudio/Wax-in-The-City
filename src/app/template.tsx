"use client";

import { motion } from "motion/react";

/**
 * Page-transition wrapper (file 10, section 10). template.tsx re-mounts on each
 * navigation, so this plays an enter animation on every route change.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
