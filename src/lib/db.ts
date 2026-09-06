import { neon } from "@neondatabase/serverless";

const DEFAULT_DATABASE_URL =
  "postgresql://neondb_owner:npg_yuKAhVcYB2w8@ep-damp-shape-azl6ymr1-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

/**
 * Returns a Neon Serverless SQL tagged-template executor.
 * Works seamlessly across Edge, Cloudflare Workers, OpenNext, Vercel, and Node.js.
 */
export function getDb() {
  const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || DEFAULT_DATABASE_URL);
}
