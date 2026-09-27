import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/services/dataStore";
import { MOCK_DOCTORS, MOCK_BRANCHES } from "@/lib/services/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const branchId = searchParams.get("branchId");
  const status = searchParams.get("status");

  let list = [...dataStore.appointments];

  if (doctorId) {
    list = list.filter((a) => a.doctorId === doctorId);
  }
  if (branchId) {
    list = list.filter((a) => a.branchId === branchId);
  }
  if (status) {
    list = list.filter((a) => a.status === status);
  }

  return NextResponse.json({ appointments: list });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patientName,
      patientPhone,
      patientEmail,
      doctorId,
      branchId,
      appointmentDate,
      appointmentTime,
      reason,
    } = body;

    if (!patientName || !patientPhone || !doctorId || !branchId || !appointmentDate) {
      return NextResponse.json(
        { error: "Please complete all mandatory appointment booking fields." },
        { status: 400 }
      );
    }

    const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId);
    const branch = MOCK_BRANCHES.find((b) => b.id === branchId);

    const count = dataStore.appointments.length + 1;
    const appointmentId = `APT-2026-${String(count).padStart(6, "0")}`;

    const newAppointment = {
      id: `apt-${Date.now()}`,
      appointmentId,
      patientName,
      patientPhone,
      patientEmail: patientEmail || "",
      doctorId,
      doctorName: doctor ? doctor.name : "Specialist Physician",
      doctorSpecialization: doctor ? doctor.specialization : "General Medicine",
      branchId,
      branchName: branch ? branch.name : "Main Center",
      appointmentDate,
      appointmentTime: appointmentTime || "10:00 AM",
      reason: reason || "Routine Consultation",
      status: "CONFIRMED" as const,
      createdAt: new Date().toISOString(),
    };

    dataStore.appointments.unshift(newAppointment);

    // Also log audit
    dataStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: patientName,
      userRole: "PATIENT",
      action: "APPOINTMENT_BOOKED",
      entity: "Appointment",
      entityId: appointmentId,
      details: `Booked appointment with ${newAppointment.doctorName} on ${appointmentDate} at ${newAppointment.branchName}`,
    });

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
      message: "Appointment confirmed successfully!",
    });
  } catch (error: any) {
    console.error("Appointment creation error:", error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
