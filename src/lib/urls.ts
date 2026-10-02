import { env } from "@/lib/env";

export function publicVerifyUrl(reportOrToken: string): string {
  const base = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  return `${base}/verify/${encodeURIComponent(reportOrToken)}`;
}
