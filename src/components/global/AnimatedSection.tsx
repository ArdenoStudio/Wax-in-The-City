"use client";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  variant?: string;
  delay?: number;
}

/** Static wrapper — scroll animations removed for anti-slop rebuild. */
export function AnimatedSection({
  children,
  className,
  as = "div",
}: AnimatedSectionProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
