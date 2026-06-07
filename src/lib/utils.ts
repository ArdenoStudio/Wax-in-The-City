import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an LKR amount, e.g. "LKR 2,500". */
export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString("en-US")}`;
}

/** "From LKR 2,500" — approachable pricing per the copy guide (file 09). */
export function formatLKRFrom(amount: number): string {
  return `From ${formatLKR(amount)}`;
}
