import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAppointmentRecord, getAppointments } from "@/lib/services/appointment.service";
import { getServerSession } from "@/lib/auth/session";
import { formatErrorResponse } from "@/lib/services/dbHelper";

const createAppointmentSchema = z.object({
  patientName: z.string().min(2, "Patient full name is required"),
  patientPhone: z.string().min(6, "Contact phone number is required"),
  patientEmail: z.string().email().optional().or(z.literal("")),
  doctorId: z.string().min(1, "Physician selection is mandatory"),
  branchId: z.string().min(1, "Branch selection is mandatory"),
  appointmentDate: z.string().min(4, "Consultation date is required"),
  appointmentTime: z.string().min(1, "Time slot selection is required"),
  reason: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId") || undefined;
    const branchId = searchParams.get("branchId") || undefined;
    const status = searchParams.get("status") || undefined;
    const patientPhone = searchParams.get("patientPhone") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await getAppointments({
      doctorId,
      branchId,
      status,
      patientPhone,
      page,
      limit,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Fetch appointments error:", error);
    return formatErrorResponse("FETCH_FAILED", "Failed to retrieve appointments", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return formatErrorResponse(
        "VALIDATION_ERROR",
        parsed.error.issues.map((i) => i.message).join(", "),
        400
      );
    }

    const session = await getServerSession();
    const actor = session
      ? { name: session.name, role: session.role }
      : { name: parsed.data.patientName, role: "PATIENT" };

    const newAppointment = await createAppointmentRecord(
      {
        patientName: parsed.data.patientName,
        patientPhone: parsed.data.patientPhone,
        patientEmail: parsed.data.patientEmail || undefined,
        doctorId: parsed.data.doctorId,
        branchId: parsed.data.branchId,
        appointmentDate: parsed.data.appointmentDate,
        appointmentTime: parsed.data.appointmentTime,
        reason: parsed.data.reason,
      },
      actor
    );

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
      message: `Consultation confirmed with ${newAppointment.doctorName} on ${newAppointment.appointmentDate} at ${newAppointment.appointmentTime}.`,
    });
  } catch (error: any) {
    console.error("Appointment booking error:", error);
    return formatErrorResponse("BOOKING_FAILED", error.message || "Failed to confirm appointment", 500);
  }
}
