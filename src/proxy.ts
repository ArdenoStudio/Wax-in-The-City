import { NextResponse, type NextRequest } from "next/server";

const LEGACY_SESSION_COOKIE = "witc_admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
