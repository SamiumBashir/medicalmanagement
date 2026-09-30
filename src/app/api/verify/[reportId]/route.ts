import { NextRequest, NextResponse } from "next/server";
import { verifyReportPublic } from "@/lib/services/report.service";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { formatErrorResponse } from "@/lib/services/dbHelper";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = checkRateLimit(ip, 60, 60 * 1000);

  if (!rateLimit.success) {
    return formatErrorResponse(
      "RATE_LIMIT_EXCEEDED",
      "Too many verification requests. Please try again in 1 minute.",
      429
    );
  }

  const { reportId } = await params;
  const result = await verifyReportPublic(reportId);

  if (!result.found) {
    return NextResponse.json(
      { success: false, found: false, error: result.error },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    found: true,
    verification: result.verification,
  });
}
