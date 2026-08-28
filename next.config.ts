import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multiple lockfiles exist higher up the tree; pin the workspace root here.
  // Use import.meta.dirname (Node 22+) for ESM compatibility; fallback to process.cwd() for safety.
  turbopack: { root: (import.meta as unknown as { dirname: string }).dirname ?? process.cwd() },
  // React <ViewTransition> is available in Next 16.3+ without experimental flag
  // (was `experimental.viewTransition` in 16.2). Remove invalid key to avoid config warning.
  // Keep experimental.optimizePackageImports to trim Worker bundle for Cloudflare 3 MiB free limit
  // (handler was 9584 KiB + resvg.wasm 1346 KiB -> gzip 3121 KiB >3 MiB). This is safe, only improves tree-shaking.
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
  // Exclude @vercel/og wasm (1346 KiB resvg.wasm + 70 KiB yoga.wasm) - not used (no ImageResponse in src)
  // This saves ~1.4 MiB raw / ~300 KiB gzipped and is safe when not using next/og.
  serverExternalPackages: ["@vercel/og"],
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
