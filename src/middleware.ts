import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import { verifyTokenEdge } from "@/lib/auth/edge-verify";
import { isRouteAllowed, getRoleDefaultRoute } from "@/lib/permissions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const user = token ? await verifyTokenEdge(token) : null;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPatientRoute = pathname.startsWith("/patient");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage && user) {
    const destination =
      user.role === "PATIENT"
        ? "/patient/dashboard"
        : getRoleDefaultRoute(user.role);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (isDashboardRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (user.role === "PATIENT") {
      return NextResponse.redirect(new URL("/patient/dashboard", request.url));
    }
    if (!isRouteAllowed(user.role, pathname)) {
      return NextResponse.redirect(
        new URL(getRoleDefaultRoute(user.role), request.url),
      );
    }
  }

  if (isPatientRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (
      user.role !== "PATIENT" &&
      user.role !== "SUPER_ADMIN" &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(getRoleDefaultRoute(user.role), request.url),
      );
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(), geolocation=()",
  );
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
