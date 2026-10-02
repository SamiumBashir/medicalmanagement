import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidDemoPassword } from "@/lib/auth/demo-credentials";
import { signToken, comparePassword, AUTH_COOKIE_NAME } from "@/lib/auth/jwt";
import { UserRole } from "@/types";
import { isMongoAvailable, formatErrorResponse } from "@/lib/services/dbHelper";
import { User, Patient } from "@/models";
import { createAuditEntry } from "@/lib/services/audit.service";

// Known demo directory for local development & demonstration credentials
const DEMO_USERS: Record<string, { name: string; role: UserRole; branchId?: string; patientId?: string }> = {
  "admin@diagnoaid.com": { name: "Dr. Kazi Mostafa (Super Admin)", role: "SUPER_ADMIN" },
  "doctor@diagnoaid.com": { name: "Prof. Dr. Mizanur Rahman", role: "DOCTOR", branchId: "branch-dhanmondi" },
  "tech@diagnoaid.com": { name: "Rafiqul Islam (Lab Technologist)", role: "TECHNICIAN", branchId: "branch-dhanmondi" },
  "receptionist@diagnoaid.com": { name: "Anwar Hossain (Front Desk)", role: "RECEPTIONIST", branchId: "branch-dhanmondi" },
  "accountant@diagnoaid.com": { name: "Shahriar Kabir (Accounts Officer)", role: "ACCOUNTANT", branchId: "branch-dhanmondi" },
  "patient@diagnoaid.com": { name: "Tanvir Ahmed", role: "PATIENT", patientId: "PAT-2026-000001" },
};

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return formatErrorResponse(
        "VALIDATION_ERROR",
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    const { email, password } = parsed.data;
    const lowerEmail = email.toLowerCase().trim();

    let authenticatedPayload: {
      userId: string;
      email: string;
      name: string;
      role: UserRole;
      branchId?: string;
      patientId?: string;
    } | null = null;

    const mongoReady = await isMongoAvailable();

    if (mongoReady) {
      const dbUser = await User.findOne({ email: lowerEmail });
      if (dbUser && dbUser.passwordHash) {
        const matches = await comparePassword(password, dbUser.passwordHash);
        if (!matches) {
          await createAuditEntry({
            userName: dbUser.name,
            userRole: dbUser.role,
            action: "LOGIN_FAILED",
            entity: "User",
            entityId: dbUser._id.toString(),
            details: `Failed password authentication attempt for ${lowerEmail}`,
          });

          return formatErrorResponse("INVALID_CREDENTIALS", "Invalid email address or password.", 401);
        }

        // Retrieve linked patientId if role is patient
        let patientId: string | undefined;
        if (dbUser.role === "PATIENT") {
          const pat = await Patient.findOne({ userId: dbUser._id }).lean();
          patientId = pat ? (pat as { patientId: string }).patientId : undefined;
          if (!patientId) {
            return formatErrorResponse(
              "PATIENT_PROFILE_MISSING",
              "Patient account is not linked to a medical record.",
              403,
            );
          }
        }

        // Update last login
        await User.updateOne({ _id: dbUser._id }, { lastLogin: new Date() });

        authenticatedPayload = {
          userId: dbUser._id.toString(),
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
          branchId: dbUser.branchId ? dbUser.branchId.toString() : undefined,
          patientId,
        };
      }
    }

    // If not authenticated via MongoDB, check demo credentials with password verification
    if (!authenticatedPayload) {
      const demoAccount = DEMO_USERS[lowerEmail];
      if (demoAccount) {
        // Enforce standard demo password check
        if (!isValidDemoPassword(password)) {
          return formatErrorResponse("INVALID_CREDENTIALS", "Invalid email address or password.", 401);
        }

        if (demoAccount.role === "PATIENT" && !demoAccount.patientId) {
          return formatErrorResponse(
            "PATIENT_PROFILE_MISSING",
            "Patient account is not linked to a medical record.",
            403,
          );
        }

        authenticatedPayload = {
          userId: `demo-${lowerEmail.replace(/[^a-z0-9]/g, "")}`,
          email: lowerEmail,
          name: demoAccount.name,
          role: demoAccount.role,
          branchId: demoAccount.branchId,
          patientId: demoAccount.patientId,
        };
      }
    }

    // If still not matched, reject with 401
    if (!authenticatedPayload) {
      return formatErrorResponse("INVALID_CREDENTIALS", "Invalid email address or password.", 401);
    }

    const token = signToken(authenticatedPayload);

    // Audit successful login
    await createAuditEntry({
      userName: authenticatedPayload.name,
      userRole: authenticatedPayload.role,
      action: "LOGIN_SUCCESS",
      entity: "User",
      entityId: authenticatedPayload.userId,
      details: `User successfully logged into ${authenticatedPayload.role} portal.`,
    });

    const response = NextResponse.json({
      success: true,
      user: authenticatedPayload,
      message: `Welcome back, ${authenticatedPayload.name}!`,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login route error:", error);
    return formatErrorResponse("SERVER_ERROR", "An unexpected error occurred during login.", 500);
  }
}
