export const DEMO_PASSWORD = "demo123456";

const LEGACY = ["Password123!", "admin123", "password"] as const;

export function isValidDemoPassword(password: string): boolean {
  return (
    password === DEMO_PASSWORD ||
    (LEGACY as readonly string[]).includes(password)
  );
}
