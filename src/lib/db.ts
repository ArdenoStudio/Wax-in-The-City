import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

/** True when a Neon connection string is available. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Lazy Neon SQL client — avoids throwing during `next build` when DATABASE_URL
 * is not yet provisioned (e.g. before Marketplace setup).
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}
