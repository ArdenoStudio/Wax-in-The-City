import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Multiple lockfiles exist higher up the tree; pin the workspace root here.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Supabase Storage public URLs (gallery) — wildcard project ref.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
