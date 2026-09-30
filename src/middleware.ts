import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@/types";
import { isRouteAllowed, getRoleDefaultRoute } from "@/lib/permissions";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "dcms_auth_token";

/**
 * Safely decodes JWT payload without external dependencies for Edge runtime compatibility.
 */
function decodeJwtPayload(token: string): { role: UserRole; exp?: number; patientId?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);
    // Check expiration
    if (parsed.exp && Date.now() >= parsed.exp * 1000) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const user = token ? decodeJwtPayload(token) : null;

  // Protect /dashboard and /patient routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPatientRoute = pathname.startsWith("/patient");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // If already authenticated and accessing login/register, redirect to appropriate portal
  if (isAuthPage && user) {
    const destination = user.role === "PATIENT" ? "/patient/dashboard" : getRoleDefaultRoute(user.role);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // If trying to access protected dashboard routes
  if (isDashboardRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Patients cannot access /dashboard
    if (user.role === "PATIENT") {
      return NextResponse.redirect(new URL("/patient/dashboard", request.url));
    }

    // Role-based route authorization
    if (!isRouteAllowed(user.role, pathname)) {
      const defaultRoute = getRoleDefaultRoute(user.role);
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }
  }

  // If trying to access protected patient routes
  if (isPatientRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Only PATIENT, SUPER_ADMIN, and ADMIN can access patient portal
    if (user.role !== "PATIENT" && user.role !== "SUPER_ADMIN" && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL(getRoleDefaultRoute(user.role), request.url));
    }
  }

  // Add Security Headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(self), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes handle their own auth checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
