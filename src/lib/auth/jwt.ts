import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types";
import { getAuthSecret } from "@/lib/auth/auth-secret";

export { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  patientId?: string;
}

function secret(): string {
  return getAuthSecret();
}

export function signToken(payload: TokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, secret(), {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    algorithm: "HS256",
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret(), { algorithms: ["HS256"] }) as TokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
