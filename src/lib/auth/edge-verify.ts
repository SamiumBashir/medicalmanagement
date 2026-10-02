import { jwtVerify } from "jose";

import { getAuthSecretOrNull } from "@/lib/auth/auth-secret";
import type { TokenPayload } from "@/lib/auth/jwt";
import type { UserRole } from "@/types";

export async function verifyTokenEdge(
  token: string,
): Promise<TokenPayload | null> {
  const secret = getAuthSecretOrNull();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.role !== "string"
    ) {
      return null;
    }
    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role as UserRole,
      branchId: typeof payload.branchId === "string" ? payload.branchId : undefined,
      patientId:
        typeof payload.patientId === "string" ? payload.patientId : undefined,
    };
  } catch {
    return null;
  }
}
