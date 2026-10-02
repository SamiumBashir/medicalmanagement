import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authorizeClinicalListAccess } from "@/lib/auth/api-access";
import { AuthError } from "@/lib/auth/session";
import { getServerSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/permissions";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { createOrderTransaction, getOrders } from "@/lib/services/order.service";
import { formatErrorResponse } from "@/lib/services/dbHelper";

const createOrderSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  patientPhone: z.string().min(6, "Valid contact number is required"),
  patientEmail: z.string().email().optional().or(z.literal("")),
  branchId: z.string().min(1, "Branch selection is required"),
  testIds: z.array(z.string()).min(1, "At least one diagnostic investigation must be selected"),
  preferredDate: z.string().optional(),
  patientAge: z.coerce.number().optional().default(35),
  patientGender: z.enum(["MALE", "FEMALE", "OTHER"]).default("MALE"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedPatientId = searchParams.get("patientId") || undefined;
    const branchId = searchParams.get("branchId") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const { patientId } = await authorizeClinicalListAccess(requestedPatientId);
    const result = await getOrders({ patientId, branchId, page, limit });
    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return formatErrorResponse(error.code, error.message, error.statusCode);
    }
    console.error("Fetch orders error:", error);
    return formatErrorResponse("FETCH_FAILED", "Failed to retrieve orders", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return formatErrorResponse(
        "VALIDATION_ERROR",
        parsed.error.issues.map((i) => i.message).join(", "),
        400,
      );
    }

    const session = await getServerSession();
    if (session) {
      const ok =
        session.role === "PATIENT" ||
        hasPermission(session.role, "billing.create") ||
        hasPermission(session.role, "patients.create");
      if (!ok) {
        return formatErrorResponse("FORBIDDEN", "Permission denied.", 403);
      }
    } else {
      const rl = checkRateLimit(`order-post:${ip}`, 20, 60_000);
      if (!rl.success) {
        return formatErrorResponse("RATE_LIMIT", "Too many requests.", 429);
      }
    }

    const actor = session
      ? { name: session.name, role: session.role }
      : { name: parsed.data.patientName, role: "PATIENT" };

    const result = await createOrderTransaction(
      {
        patientName: parsed.data.patientName,
        patientPhone: parsed.data.patientPhone,
        patientEmail: parsed.data.patientEmail || undefined,
        branchId: parsed.data.branchId,
        testIds: parsed.data.testIds,
        preferredDate: parsed.data.preferredDate,
        patientAge: parsed.data.patientAge,
        patientGender: parsed.data.patientGender,
      },
      actor,
    );

    return NextResponse.json({
      success: true,
      order: result.order,
      invoice: result.invoice,
      tokenNumber: result.tokenNumber,
      message: `Diagnostic requisition ${result.order.orderId} registered successfully. Queue token ${result.tokenNumber} issued.`,
    });
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    const msg = error instanceof Error ? error.message : "Failed to process order";
    return formatErrorResponse("ORDER_FAILED", msg, 500);
  }
}
