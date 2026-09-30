import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/services/dataStore";
import { connectToDatabase, getDbConnectionStatus } from "@/lib/db/connection";
import { Branch, TestCategory, User } from "@/models";
import { MOCK_BRANCHES, MOCK_CATEGORIES } from "@/lib/services/mockData";
import { hashPassword } from "@/lib/auth/jwt";
import { getServerSession } from "@/lib/auth/session";
import { formatErrorResponse } from "@/lib/services/dbHelper";

export async function POST(req: NextRequest) {
  try {
    // In production, strictly require SUPER_ADMIN authentication
    if (process.env.NODE_ENV === "production") {
      const session = await getServerSession();
      if (!session || session.role !== "SUPER_ADMIN") {
        return formatErrorResponse("FORBIDDEN", "Database seeding is restricted to Super Administrators.", 403);
      }
    }

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
        ? "MongoDB collections seeded with diagnostic categories, branches, and verified test accounts."
        : "Data store refreshed with complete clinical diagnostic catalog and demo records.",
    });
  } catch (error: any) {
    console.error("Seed route execution error:", error);
    return formatErrorResponse("SEED_ERROR", "Database seeding routine encountered an error.", 500);
  }
}
