import { NextRequest, NextResponse } from "next/server";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/auth/jwt";
import { UserRole } from "@/types";

// Demo user directory for instant testing of all roles
const DEMO_USERS: Record<string, { name: string; role: UserRole; branchId?: string; patientId?: string }> = {
  "admin@diagnoaid.com": { name: "Dr. Kazi Mostafa (Super Admin)", role: "SUPER_ADMIN" },
  "doctor@diagnoaid.com": { name: "Prof. Dr. Mizanur Rahman", role: "DOCTOR", branchId: "branch-dhanmondi" },
  "tech@diagnoaid.com": { name: "Rafiqul Islam (Lab Technologist)", role: "TECHNICIAN", branchId: "branch-dhanmondi" },
  "receptionist@diagnoaid.com": { name: "Anwar Hossain (Front Desk)", role: "RECEPTIONIST", branchId: "branch-dhanmondi" },
  "accountant@diagnoaid.com": { name: "Shahriar Kabir (Accounts Officer)", role: "ACCOUNTANT", branchId: "branch-dhanmondi" },
  "patient@diagnoaid.com": { name: "Tanvir Ahmed", role: "PATIENT", patientId: "PAT-2026-000001" },
};

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase().trim();
    let user = DEMO_USERS[lowerEmail];

    // If demo user matched or fallback for testing
    if (!user) {
      const selectedRole = (role as UserRole) || "PATIENT";
      user = {
        name: lowerEmail.split("@")[0].toUpperCase(),
        role: selectedRole,
        patientId: selectedRole === "PATIENT" ? "PAT-2026-000001" : undefined,
      };
    }

    const payload = {
      userId: `user-${lowerEmail.replace(/[^a-z0-9]/g, "")}`,
      email: lowerEmail,
      name: user.name,
      role: user.role,
      branchId: user.branchId,
      patientId: user.patientId,
    };

    const token = signToken(payload);

    const response = NextResponse.json({
      success: true,
      user: payload,
      message: `Welcome back, ${user.name}!`,
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
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
