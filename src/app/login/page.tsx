import { Metadata } from "next";
import { LoginClient } from "./login-client";

export const metadata: Metadata = {
  title: "Clinical Portal Sign In | Apex Diagnostics",
  description:
    "Secure role-based access for patients, medical consultants, lab technologists, and clinic administration.",
};

type LoginPageProps = {
  searchParams: Promise<{ portal?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { portal } = await searchParams;
  const patientOnly = portal === "patient";

  return <LoginClient patientOnly={patientOnly} />;
}
