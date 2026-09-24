import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/diagnostic_center_db"),
  REDIS_URL: z.string().optional().default("redis://127.0.0.1:6379"),
  AUTH_SECRET: z.string().min(16).default("development_super_secret_diagnostic_center_key_2026_auth"),
  AUTH_COOKIE_NAME: z.string().default("dcms_auth_token"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("DiagnostiCare Advanced Diagnostic Center"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URL: process.env.REDIS_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});
