import { neon } from "@neondatabase/serverless";

/**
 * Returns a Neon Serverless SQL tagged-template executor.
 * Works seamlessly across Edge, Cloudflare Workers, OpenNext, Vercel, and Node.js.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
