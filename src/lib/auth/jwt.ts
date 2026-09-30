import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types";

const AUTH_SECRET = process.env.AUTH_SECRET || "development_super_secret_diagnostic_center_key_2026_auth";
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "dcms_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  patientId?: string;
}

export function signToken(payload: TokenPayload, expiresIn: string = "7d"): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as TokenPayload;
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
