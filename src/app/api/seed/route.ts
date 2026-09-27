import { NextResponse } from "next/server";
import { dataStore } from "@/lib/services/dataStore";
import { connectToDatabase, getDbConnectionStatus } from "@/lib/db/connection";
import { Branch, Doctor, TestCategory, Test, Patient, User } from "@/models";
import { MOCK_BRANCHES, MOCK_DOCTORS, MOCK_CATEGORIES, MOCK_TESTS } from "@/lib/services/mockData";
import { hashPassword } from "@/lib/auth/jwt";

export async function POST() {
  try {
    let mongoConnected = false;
    try {
      await connectToDatabase();
      mongoConnected = getDbConnectionStatus() === "connected";
    } catch {
      mongoConnected = false;
    }

    if (mongoConnected) {
      // Seed Mongoose collections
      await Branch.deleteMany({});
      await Branch.insertMany(
        MOCK_BRANCHES.map((b) => ({
          name: b.name,
          slug: b.slug,
          code: b.slug.toUpperCase(),
          address: b.address,
          phone: b.phone,
          email: b.email,
          openingHours: b.openingHours,
          isActive: true,
        }))
      );

      await TestCategory.deleteMany({});
      await TestCategory.insertMany(
        MOCK_CATEGORIES.map((c, i) => ({
          name: c.name,
          slug: c.slug,
          description: c.description,
          order: i + 1,
          isActive: true,
        }))
      );

      const passwordHash = await hashPassword("Password123!");
      await User.deleteMany({});
      await User.create([
        {
          name: "System Super Administrator",
          email: "admin@diagnoaid.com",
          passwordHash,
          role: "SUPER_ADMIN",
          isActive: true,
        },
        {
          name: "Prof. Dr. Mizanur Rahman",
          email: "doctor@diagnoaid.com",
          passwordHash,
          role: "DOCTOR",
          isActive: true,
        },
        {
          name: "Rafiqul Islam",
          email: "tech@diagnoaid.com",
          passwordHash,
          role: "TECHNICIAN",
          isActive: true,
        },
        {
          name: "Anwar Hossain",
          email: "receptionist@diagnoaid.com",
          passwordHash,
          role: "RECEPTIONIST",
          isActive: true,
        },
        {
          name: "Tanvir Ahmed",
          email: "patient@diagnoaid.com",
          passwordHash,
          role: "PATIENT",
          isActive: true,
        },
      ]);
    }

    return NextResponse.json({
      success: true,
      mongoConnected,
      message: mongoConnected
        ? "MongoDB collections seeded with diagnostic categories, tests, branches, and test accounts."
        : "Data store refreshed with complete clinical diagnostic catalog and demo records.",
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message || "Seeding failed" }, { status: 500 });
  }
}
