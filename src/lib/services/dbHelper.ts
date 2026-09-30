import { connectToDatabase, getDbConnectionStatus } from "@/lib/db/connection";

let hasWarnedConnection = false;
let lastFailedAttempt = 0;
const RETRY_COOLDOWN_MS = 15000; // 15s cooldown between connection retry attempts

export async function isMongoAvailable(): Promise<boolean> {
  const status = getDbConnectionStatus();
  if (status === "connected") return true;

  // Don't hammer unreachable MongoDB on every fast synchronous operation
  if (Date.now() - lastFailedAttempt < RETRY_COOLDOWN_MS) {
    return false;
  }

  try {
    await connectToDatabase();
    return getDbConnectionStatus() === "connected";
  } catch (_err: any) {
    lastFailedAttempt = Date.now();
    if (!hasWarnedConnection) {
      console.warn("⚠️ [DCMS] MongoDB is currently unavailable. Operating in development fallback mode.");
      hasWarnedConnection = true;
    }
    return false;
  }
}

/**
 * Standard API error response helper
 */
export function formatErrorResponse(code: string, message: string, status: number = 400) {
  return Response.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

/**
 * Standard API success response helper
 */
export function formatSuccessResponse<T>(data: T, status: number = 200) {
  return Response.json(
    {
      success: true,
      ...data,
    },
    { status }
  );
}
