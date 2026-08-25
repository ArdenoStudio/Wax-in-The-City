import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multiple lockfiles exist higher up the tree; pin the workspace root here.
  turbopack: { root: __dirname },
  // Enables React <ViewTransition> integration for buttery-smooth client-side navigations.
  experimental: {
    viewTransition: true,
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
};

export default nextConfig;
