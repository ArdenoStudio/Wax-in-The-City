import { NextResponse, type NextRequest } from "next/server";

// Cosmetic UX gate only — cookie presence is not authentication.
// Real admin enforcement happens in src/lib/admin-auth.ts
// isAdminAuthenticated() and requireAdminMutation() server-side.

const LEGACY_SESSION_COOKIE = "witc_admin_session";

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().trim();

  // 1. Canonical Domain Redirection
  // Ensure workers.dev, www, and vercel.app redirect to official https://waxinthecity.lk
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.includes(":3000") ||
    host.includes(":3001");

  if (!isLocal) {
    const isWorkersDev = host.includes("workers.dev");
    const isWww = host.startsWith("www.");
    const isVercel = host.endsWith(".vercel.app");

    if (isWorkersDev || isWww || isVercel) {
      const url = request.nextUrl.clone();
      url.protocol = "https:";
      url.host = "waxinthecity.lk";
      url.port = "";
      return NextResponse.redirect(url, { status: 301 });
    }
  }

  // 2. Admin Route Protection
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin" || pathname === "/admin/") {
      return NextResponse.next();
    }

    const hasLegacySession = request.cookies.has(LEGACY_SESSION_COOKIE);
    const hasSupabaseSession = request.cookies
      .getAll()
      .some((cookie) => cookie.name.startsWith("sb-"));

    if (!hasLegacySession && !hasSupabaseSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static assets)
     * - _next/image (image optimization files)
     * - favicon.ico, images/, videos/
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/).*)",
  ],
};
