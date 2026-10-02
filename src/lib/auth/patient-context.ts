import { redirect } from "next/navigation";

import type { TokenPayload } from "@/lib/auth/jwt";
import { getServerSession } from "@/lib/auth/session";

export async function requirePatientIdFromSession(): Promise<{
  session: TokenPayload;
  patientId: string;
}> {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?error=auth_required");
  }

  if (session.role === "PATIENT" && !session.patientId) {
    redirect("/login?error=patient_profile");
  }

  if (session.role === "PATIENT" && session.patientId) {
    return { session, patientId: session.patientId };
  }

  if (
    (session.role === "SUPER_ADMIN" || session.role === "ADMIN") &&
    session.patientId
  ) {
    return { session, patientId: session.patientId };
  }

  if (session.role === "PATIENT") {
    redirect("/login?error=patient_profile");
  }

  redirect("/dashboard");
}

export function resolvePatientIdForApi(
  session: TokenPayload,
  requestedPatientId?: string,
): string | undefined {
  if (session.role === "PATIENT") return session.patientId;
  return requestedPatientId;
}
