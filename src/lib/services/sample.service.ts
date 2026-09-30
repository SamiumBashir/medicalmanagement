import { Sample } from "@/models/Sample";
import { isMongoAvailable } from "./dbHelper";
import { dataStore, SampleRecord } from "./dataStore";
import { createAuditEntry } from "./audit.service";
import { SampleStatus } from "@/types";

export async function getSamples(params?: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params?.page || 1);
  const limit = Math.min(50, Math.max(1, params?.limit || 20));

  let list = [...dataStore.samples];

  if (params?.status) {
    list = list.filter((s) => s.status === params.status);
  }

  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return {
    samples: items,
    total: list.length,
    page,
    totalPages: Math.ceil(list.length / limit),
  };
}

export async function updateSampleStatus(
  sampleId: string,
  newStatus: SampleStatus,
  actor: { name: string; role: string },
  rejectionReason?: string
): Promise<SampleRecord | null> {
  const sample = dataStore.samples.find(
    (s) => s.sampleId === sampleId || s.id === sampleId
  );
  if (!sample) return null;

  // Enforce state transition rules
  if (sample.status === "REJECTED" && newStatus === "COMPLETED") {
    throw new Error("Cannot transition rejected specimen directly to completed status.");
  }

  const oldStatus = sample.status;
  sample.status = newStatus;

  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    try {
      await Sample.updateOne(
        { sampleId: sample.sampleId },
        {
          status: newStatus,
          rejectionReason: rejectionReason || undefined,
        }
      );
    } catch (e) {
      console.error("Failed to update sample in MongoDB:", e);
    }
  }

  await createAuditEntry({
    userName: actor.name,
    userRole: actor.role,
    action: "SAMPLE_STATUS_UPDATED",
    entity: "Sample",
    entityId: sample.sampleId,
    details: `Transitioned sample ${sample.sampleId} (${sample.testName}) from ${oldStatus} to ${newStatus}${
      rejectionReason ? ` - Reason: ${rejectionReason}` : ""
    }`,
  });

  return sample;
}
