import { AuditLog } from "@/models/AuditLog";
import { isMongoAvailable } from "./dbHelper";
import { dataStore } from "./dataStore";

export interface CreateAuditLogParams {
  userId?: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditEntry(params: CreateAuditLogParams): Promise<void> {
  try {
    const mongoReady = await isMongoAvailable();
    if (mongoReady) {
      await AuditLog.create({
        userName: params.userName,
        userRole: params.userRole,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        details: params.details || "",
        ipAddress: params.ipAddress || "127.0.0.1",
        userAgent: params.userAgent || "Internal Service",
      });
    }

    // Mirror to fallback dataStore for immediate reactive UI display in dev
    dataStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: params.userName,
      userRole: params.userRole as any,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      details: params.details || "",
    });
  } catch (error) {
    console.error("Failed to write audit log entry:", error);
  }
}

export async function getAuditLogs(page: number = 1, limit: number = 20) {
  const mongoReady = await isMongoAvailable();
  if (mongoReady) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      AuditLog.countDocuments(),
    ]);

    return {
      items: items.map((log: any) => ({
        id: log._id.toString(),
        timestamp: log.createdAt ? log.createdAt.toISOString() : new Date().toISOString(),
        userName: log.userName,
        userRole: log.userRole,
        action: log.action,
        entity: log.entity,
        entityId: log.entityId,
        details: log.details,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Fallback to in-memory store
  const start = (page - 1) * limit;
  const items = dataStore.auditLogs.slice(start, start + limit);
  return {
    items,
    total: dataStore.auditLogs.length,
    page,
    totalPages: Math.ceil(dataStore.auditLogs.length / limit),
  };
}
