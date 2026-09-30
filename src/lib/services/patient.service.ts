import { Patient } from "@/models/Patient";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, PatientRecord } from "./dataStore";
import { createAuditEntry } from "./audit.service";

export interface CreatePatientInput {
  name: string;
  phone: string;
  email?: string;
  age?: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  bloodGroup?: string;
  address?: string;
  notes?: string;
  userId?: any;
}

export async function getPatients(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 15));
  const search = params?.search?.trim();

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const query: any = { isActive: true };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { patientId: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Patient.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Patient.countDocuments(query),
    ]);

    const formatted: PatientRecord[] = items.map((p: any) => ({
      id: p._id.toString(),
      patientId: p.patientId,
      name: p.name,
      phone: p.phone,
      email: p.email,
      age: p.age || 30,
      gender: p.gender,
      bloodGroup: p.bloodGroup,
      registeredAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString(),
      address: p.address,
    }));

    return {
      patients: formatted,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Fallback to in-memory store
  let filtered = [...dataStore.patients];
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.phone.includes(term) ||
        p.patientId.toLowerCase().includes(term)
    );
  }

  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    patients: items,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  };
}

export async function getPatientById(patientId: string): Promise<PatientRecord | null> {
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const p = await Patient.findOne({ patientId: patientId.toUpperCase() }).lean();
    if (p) {
      return {
        id: (p as any)._id.toString(),
        patientId: (p as any).patientId,
        name: (p as any).name,
        phone: (p as any).phone,
        email: (p as any).email,
        age: (p as any).age || 30,
        gender: (p as any).gender,
        bloodGroup: (p as any).bloodGroup,
        registeredAt: (p as any).createdAt ? (p as any).createdAt.toISOString() : new Date().toISOString(),
        address: (p as any).address,
      };
    }
  }

  const found = dataStore.patients.find((p) => p.patientId.toUpperCase() === patientId.toUpperCase());
  return found || null;
}

export async function getPatientByUserId(userId: string): Promise<PatientRecord | null> {
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      const p = await Patient.findOne({ userId }).lean();
      if (p) {
        return {
          id: (p as any)._id.toString(),
          patientId: (p as any).patientId,
          name: (p as any).name,
          phone: (p as any).phone,
          email: (p as any).email,
          age: (p as any).age || 30,
          gender: (p as any).gender,
          bloodGroup: (p as any).bloodGroup,
          registeredAt: (p as any).createdAt ? (p as any).createdAt.toISOString() : new Date().toISOString(),
          address: (p as any).address,
        };
      }
    } catch {
      // Ignore if invalid ObjectId format
    }
  }

  return null;
}

export async function createPatientRecord(
  input: CreatePatientInput,
  actor?: { name: string; role: string }
): Promise<PatientRecord> {
  const mongoReady = await isMongoAvailable();
  let patientCount = dataStore.patients.length + 1;

  if (mongoReady) {
    patientCount = (await Patient.countDocuments()) + 1;
  }

  const patientId = `PAT-2026-${String(patientCount).padStart(6, "0")}`;

  const record: PatientRecord = {
    id: `pat-${Date.now()}`,
    patientId,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim().toLowerCase(),
    age: input.age || 30,
    gender: input.gender,
    bloodGroup: input.bloodGroup,
    address: input.address,
    registeredAt: new Date().toISOString(),
  };

  if (mongoReady) {
    const created = await Patient.create({
      patientId,
      userId: input.userId,
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim().toLowerCase(),
      age: input.age,
      gender: input.gender,
      bloodGroup: input.bloodGroup,
      address: input.address,
      notes: input.notes,
      isActive: true,
    });
    record.id = created._id.toString();
  }

  dataStore.patients.unshift(record);

  await createAuditEntry({
    userName: actor?.name || "System Registration",
    userRole: actor?.role || "SYSTEM",
    action: "PATIENT_CREATED",
    entity: "Patient",
    entityId: patientId,
    details: `Registered patient ${record.name} (${record.phone})`,
  });

  return record;
}
