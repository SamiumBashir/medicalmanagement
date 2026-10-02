const DEV_FALLBACK =
  "development_super_secret_diagnostic_center_key_2026_auth";

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production.");
  }
  return DEV_FALLBACK;
}

export function getAuthSecretOrNull(): string | null {
  const secret = process.env.AUTH_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") return null;
  return DEV_FALLBACK;
}
