<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 (App Router) app; package manager is **npm** (`package-lock.json`). Standard commands are in `package.json`: `npm run dev` (port 3000), `npm run lint`, `npm run build`. `npm run dev`/`build` use Turbopack.

- The app runs and builds with **zero external services**. Supabase is optional. The update script (`npm ci`) plus `.env.local` is all that's needed to dev.
- `.env.local` is created from `.env.example` (gitignored). With Supabase env vars blank, booking/contact forms intentionally **fail-honest** — they show a "not connected, use WhatsApp" message instead of a fake success. This is by design (see `src/app/actions/booking.ts`), not a bug. Service cards fall back to static data in `src/lib/site.ts`.
- Full end-to-end booking persistence + the `/admin` editor require a **hosted** Supabase project: set the 6 vars in `.env.local` and run `supabase/schema.sql` in the Supabase SQL editor. There is no local Supabase/Docker config.
