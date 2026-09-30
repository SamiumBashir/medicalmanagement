import { cookies } from "next/headers";
import { verifyToken, AUTH_COOKIE_NAME, TokenPayload } from "./jwt";
import { UserRole } from "@/types";
import { hasPermission, Permission } from "@/lib/permissions";

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401, public code: string = "UNAUTHORIZED") {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Retrieves the authenticated session from HTTP-only cookies in Server Components,
 * Server Actions, or API Route Handlers.
 */
export async function getServerSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Asserts that the current request has a valid authenticated session.
 * Throws AuthError(401) if not authenticated.
 */
export async function requireAuth(): Promise<TokenPayload> {
  const session = await getServerSession();
  if (!session) {
    throw new AuthError("Authentication required to access this resource", 401, "UNAUTHORIZED");
  }
  return session;
}

/**
 * Asserts that the authenticated user possesses one of the allowed roles.
 * Throws AuthError(403) if role is insufficient.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<TokenPayload> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new AuthError(
      `Access denied. Role '${session.role}' is not authorized for this operation.`,
      403,
      "FORBIDDEN"
    );
  }
  return session;
}

/**
 * Asserts that the authenticated user possesses the specified fine-grained permission.
 */
export async function requirePermission(permission: Permission): Promise<TokenPayload> {
  const session = await requireAuth();
  if (!hasPermission(session.role, permission)) {
    throw new AuthError(
      `Permission denied: Missing '${permission}' capability.`,
      403,
      "FORBIDDEN"
    );
  }
  return session;
}

/**
 * Asserts resource ownership.
 * Admins and Super Admins bypass ownership.
 * Doctors can access if authorized.
 * Patients can ONLY access if resourcePatientId matches their session patientId.
 */
export async function requireResourceOwnership(
  resourcePatientId: string,
  allowedRolesForBypass: UserRole[] = ["SUPER_ADMIN", "ADMIN", "DOCTOR", "RECEPTIONIST"]
): Promise<TokenPayload> {
  const session = await requireAuth();
  if (allowedRolesForBypass.includes(session.role)) {
    return session;
  }

  if (session.role === "PATIENT") {
    if (!session.patientId || session.patientId !== resourcePatientId) {
      throw new AuthError(
        "Access denied: You do not have permission to view or modify this patient record.",
        403,
        "FORBIDDEN_RESOURCE_ACCESS"
      );
    }
  }

  return session;
}
