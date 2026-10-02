import { resolvePatientIdForApi } from "@/lib/auth/patient-context";
import { AuthError, getServerSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/permissions";

export async function authorizeClinicalListAccess(requestedPatientId?: string) {
  const session = await getServerSession();
  if (!session) {
    throw new AuthError("Authentication required.", 401, "UNAUTHORIZED");
  }

  if (session.role === "PATIENT") {
    if (!session.patientId) {
      throw new AuthError("Patient profile not linked.", 403, "FORBIDDEN");
    }
    return { session, patientId: session.patientId };
  }

  const allowed =
    hasPermission(session.role, "patients.read") ||
    hasPermission(session.role, "appointments.read") ||
    hasPermission(session.role, "billing.read");

  if (!allowed) {
    throw new AuthError("Permission denied.", 403, "FORBIDDEN");
  }

  return {
    session,
    patientId: resolvePatientIdForApi(session, requestedPatientId),
  };
}
