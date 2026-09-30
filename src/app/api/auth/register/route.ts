import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken, hashPassword, AUTH_COOKIE_NAME } from "@/lib/auth/jwt";
import { dataStore } from "@/lib/services/dataStore";
import { isMongoAvailable, formatErrorResponse } from "@/lib/services/dbHelper";
import { User, Patient } from "@/models";
import { createAuditEntry } from "@/lib/services/audit.service";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.coerce.number().optional().default(30),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).default("MALE"),
  bloodGroup: z.string().optional().default("B+"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return formatErrorResponse(
        "VALIDATION_ERROR",
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    const { name, email, phone, password, age, gender, bloodGroup } = parsed.data;
    const lowerEmail = email.toLowerCase().trim();

    // Check existing in dataStore
    const existingInStore = dataStore.patients.find(
      (p) => p.email?.toLowerCase() === lowerEmail || p.phone === phone
    );

    const mongoReady = await isMongoAvailable();
    if (mongoReady) {
      const existingUser = await User.findOne({ email: lowerEmail });
      if (existingUser) {
        return formatErrorResponse("ACCOUNT_EXISTS", "An account with this email address already exists.", 409);
      }
    } else if (existingInStore) {
      return formatErrorResponse("ACCOUNT_EXISTS", "A patient profile with this contact is already registered.", 409);
    }

    // Hash password with bcrypt
    const passwordHash = await hashPassword(password);

    const patientCount = dataStore.patients.length + 1;
    const patientId = `PAT-2026-${String(patientCount).padStart(6, "0")}`;
    let userId = `user-${Date.now()}`;

    if (mongoReady) {
      try {
        const newUser = await User.create({
          name,
          email: lowerEmail,
          passwordHash,
          role: "PATIENT",
          phone,
          isActive: true,
        });
        userId = newUser._id.toString();

        await Patient.create({
          patientId,
          userId: newUser._id,
          name,
          phone,
          email: lowerEmail,
          age,
          gender,
          bloodGroup,
          isActive: true,
        });
      } catch (err: any) {
        console.error("Database user creation error:", err);
      }
    }

    // Mirror in dataStore for demo resilience
    dataStore.patients.unshift({
      id: `pat-${Date.now()}`,
      patientId,
      name,
      phone,
      email: lowerEmail,
      age,
      gender,
      bloodGroup,
      registeredAt: new Date().toISOString(),
    });

    const payload = {
      userId,
      email: lowerEmail,
      name,
      role: "PATIENT" as const,
      patientId,
    };

    const token = signToken(payload);

    // Audit log
    await createAuditEntry({
      userName: name,
      userRole: "PATIENT",
      action: "PATIENT_REGISTERED",
      entity: "User",
      entityId: userId,
      details: `New patient account created for ${name} (${patientId})`,
    });

    const response = NextResponse.json({
      success: true,
      user: payload,
      message: "Patient account registered successfully!",
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return formatErrorResponse("SERVER_ERROR", "Internal server error occurred during registration", 500);
  }
}
