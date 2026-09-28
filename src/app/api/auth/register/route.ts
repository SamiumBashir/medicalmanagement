import { NextRequest, NextResponse } from "next/server";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/auth/jwt";
import { dataStore } from "@/lib/services/dataStore";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, age, gender, bloodGroup, password } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone number are required" }, { status: 400 });
    }

    const patientCount = dataStore.patients.length + 1;
    const patientId = `PAT-2026-${String(patientCount).padStart(6, "0")}`;

    // Add to patient store
    dataStore.patients.unshift({
      id: `pat-${Date.now()}`,
      patientId,
      name,
      phone,
      email,
      age: Number(age) || 30,
      gender: gender || "MALE",
      bloodGroup: bloodGroup || "B+",
      registeredAt: new Date().toISOString(),
    });

    const payload = {
      userId: `user-${Date.now()}`,
      email: email.toLowerCase().trim(),
      name,
      role: "PATIENT" as const,
      patientId,
    };

    const token = signToken(payload);

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
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
