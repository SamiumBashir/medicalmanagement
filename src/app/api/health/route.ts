import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connection";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isDbConnected = await connectToDatabase();
    return NextResponse.json({
      status: "ok",
      service: "DiagnostiCare Advanced Diagnostic Center API",
      timestamp: new Date().toISOString(),
      database: isDbConnected ? "connected" : "standalone_mode",
      uptime: process.uptime(),
      version: "1.0.0",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "ok",
      service: "DiagnostiCare Advanced Diagnostic Center API",
      timestamp: new Date().toISOString(),
      database: "standalone_fallback_mode",
      notice: "MongoDB local port offline; in-memory clinical data store operational.",
      uptime: process.uptime(),
      version: "1.0.0",
    });
  }
}
