import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Multiple lockfiles exist higher up the tree; pin the workspace root here.
  // Use import.meta.dirname (Node 22+) for ESM compatibility; fallback to process.cwd() for safety.
  turbopack: { root: (import.meta as unknown as { dirname: string }).dirname ?? process.cwd() },
  // React <ViewTransition> is available in Next 16.3+ without experimental flag
  // (was `experimental.viewTransition` in 16.2). Remove invalid key to avoid config warning.
  experimental: {
    optimizePackageImports: [
      "motion",
      "lucide-react",
      "react-icons",
      "@radix-ui/react-dialog",
      "@radix-ui/react-accordion",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "zod",
      "react-hook-form",
      "@hookform/resolvers",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [640, 1080, 1920],
    remotePatterns: [
      // Supabase Storage public URLs (gallery) — wildcard project ref (Security review: consider pinning to <project>.supabase.co).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://*.supabase.co https://lh3.googleusercontent.com",
              "font-src 'self'",
              "connect-src 'self' https://*.supabase.co",
              "frame-src https://www.google.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/booking", destination: "/book", permanent: true },
      { source: "/pricing", destination: "/services", permanent: true },
      { source: "/wax-types", destination: "/services/waxing", permanent: true },
      { source: "/treatments", destination: "/services", permanent: true },
      { source: "/services/body-waxing", destination: "/services/waxing", permanent: true },
      { source: "/services/facial-waxing", destination: "/services/waxing", permanent: true },
      { source: "/services/intimate-waxing", destination: "/services/waxing", permanent: true },
    ];
  },
};

export default nextConfig;
