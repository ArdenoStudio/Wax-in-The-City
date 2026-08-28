#!/usr/bin/env node
// Smart build for Cloudflare Workers + Vercel compatibility
// - When called from inside OpenNext (NEXT_PRIVATE_STANDALONE=true), run plain Next build
//   to avoid infinite recursion: opennext build -> npm run build -> opennext build -> ...
// - Otherwise (direct `npm run build` from Cloudflare dashboard, Vercel, or locally),
//   run the OpenNext Cloudflare build which will internally call `npm run build` again
//   with the env set and thus get the plain Next build path.
// This makes `npm run build` produce `.open-next/` for Cloudflare while keeping
// `npm run build:next` available for Vercel.
import { execSync } from "node:child_process";

const isInsideOpenNext = process.env.NEXT_PRIVATE_STANDALONE === "true";

if (isInsideOpenNext) {
  // Use --webpack on Windows where Turbopack native bindings are unavailable (WASM fallback)
  const nextCmd =
    process.platform === "win32"
      ? "node node_modules/next/dist/bin/next build --webpack"
      : "node node_modules/next/dist/bin/next build";
  execSync(nextCmd, { stdio: "inherit" });
} else {
  execSync("node node_modules/@opennextjs/cloudflare/dist/cli/index.js build", {
    stdio: "inherit",
  });
}
