import { Appointment } from "@/models/Appointment";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, AppointmentRecord } from "./dataStore";
import { MOCK_DOCTORS, MOCK_BRANCHES } from "./mockData";
import { createAuditEntry } from "./audit.service";
import { AppointmentStatus } from "@/types";

export interface CreateAppointmentInput {
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  branchId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
}

export async function getAppointments(params?: {
  doctorId?: string;
  branchId?: string;
  status?: string;
  patientPhone?: string;
  patientId?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const query: any = {};
    if (params?.status) query.status = params.status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Appointment.find(query).sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Appointment.countDocuments(query),
    ]);

    if (items.length > 0) {
      const formatted: AppointmentRecord[] = items.map((a: any) => ({
        id: a._id.toString(),
        appointmentId: a.appointmentId,
        patientName: a.patientName || "Patient",
        patientPhone: a.patientPhone || "",
        patientEmail: a.patientEmail || "",
        doctorId: a.doctorId ? a.doctorId.toString() : "",
        doctorName: a.doctorName || "Specialist",
        doctorSpecialization: a.specialty || "Medicine",
        branchId: a.branchId ? a.branchId.toString() : "",
        branchName: a.branchName || "Main Branch",
        appointmentDate: a.date ? a.date.toISOString().split("T")[0] : "",
        appointmentTime: a.timeSlot || "10:00 AM",
        status: (a.status || "CONFIRMED") as AppointmentStatus,
        reason: a.reason || "",
        createdAt: a.createdAt ? a.createdAt.toISOString() : new Date().toISOString(),
      }));

      return {
        appointments: formatted,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
  }

  // Fallback to dataStore
  let list = [...dataStore.appointments];

  if (params?.doctorId) {
    list = list.filter((a) => a.doctorId === params.doctorId);
  }
  if (params?.branchId) {
    list = list.filter((a) => a.branchId === params.branchId);
  }
  if (params?.status) {
    list = list.filter((a) => a.status === params.status);
  }
  if (params?.patientPhone) {
    list = list.filter((a) => a.patientPhone.trim() === params.patientPhone?.trim());
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    appointments: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}

export async function createAppointmentRecord(
  input: CreateAppointmentInput,
  actor?: { name: string; role: string }
): Promise<AppointmentRecord> {
  const doctor = MOCK_DOCTORS.find((d) => d.id === input.doctorId);
  const branch = MOCK_BRANCHES.find((b) => b.id === input.branchId);

  const count = dataStore.appointments.length + 1;
  const appointmentId = `APT-2026-${String(count).padStart(6, "0")}`;

  const record: AppointmentRecord = {
    id: `apt-${Date.now()}`,
    appointmentId,
    patientName: input.patientName.trim(),
    patientPhone: input.patientPhone.trim(),
    patientEmail: input.patientEmail?.trim() || "",
    doctorId: input.doctorId,
    doctorName: doctor ? doctor.name : "Specialist Physician",
    doctorSpecialization: doctor ? doctor.specialization : "General Medicine",
    branchId: input.branchId,
    branchName: branch ? branch.name : "Diagnostic Hub",
    appointmentDate: input.appointmentDate,
    appointmentTime: input.appointmentTime,
    status: "CONFIRMED",
    reason: input.reason || "General Consultation",
    createdAt: new Date().toISOString(),
  };

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await Appointment.create({
        appointmentId,
        date: new Date(input.appointmentDate),
        timeSlot: input.appointmentTime,
        status: "CONFIRMED",
        reason: input.reason,
      });
    } catch (e) {
      console.error("Failed to persist appointment in MongoDB:", e);
    }
  }

  dataStore.appointments.unshift(record);

  await createAuditEntry({
    userName: actor?.name || input.patientName,
    userRole: actor?.role || "PATIENT",
    action: "APPOINTMENT_BOOKED",
    entity: "Appointment",
    entityId: appointmentId,
    details: `Booked consultation with ${record.doctorName} for ${record.patientName} on ${record.appointmentDate}`,
  });

  return record;
}
