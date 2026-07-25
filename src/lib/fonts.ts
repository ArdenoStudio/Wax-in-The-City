import localFont from "next/font/local";
import { Inter } from "next/font/google";

/** Display / headlines — Cal Sans (local, self-hosted). */
export const calSans = localFont({
  src: [
    {
      path: "../../public/fonts/CalSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/CalSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cal-sans",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

/** Body / UI — Inter (self-hosted via next/font). */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
