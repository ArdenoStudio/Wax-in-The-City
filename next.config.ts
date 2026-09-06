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
    deviceSizes: [360, 390, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Supabase Storage public URLs (gallery) — wildcard project ref; must be pinned to <project>.supabase.co before public launch.
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
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://*.supabase.co https://lh3.googleusercontent.com https://www.googletagmanager.com https://*.google-analytics.com",
              "font-src 'self'",
              "connect-src 'self' https://*.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-src https://www.google.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "wax-in-the-city.suvenseoras.workers.dev" }],
        destination: "https://waxinthecity.lk/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.waxinthecity.lk" }],
        destination: "https://waxinthecity.lk/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "wax-in-the-city-website.vercel.app" }],
        destination: "https://waxinthecity.lk/:path*",
        permanent: true,
      },
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
