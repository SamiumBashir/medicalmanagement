import * as React from "react";
import { Metadata } from "next";
import { LoginClient } from "./login-client";

export const metadata: Metadata = {
  title: "Clinical Portal Sign In | Apex Diagnostics",
  description:
    "Secure role-based access for patients, medical consultants, lab technologists, and clinic administration.",
};

export default function LoginPage() {
  return <LoginClient />;
}
