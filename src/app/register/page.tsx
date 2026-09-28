import * as React from "react";
import { Metadata } from "next";
import { RegisterClient } from "./register-client";

export const metadata: Metadata = {
    title: "Register Patient Account | DiagnostiCare",
    description: "Create an online patient profile to access certified laboratory reports and manage appointments.",
};

export default function RegisterPage() {
    return <RegisterClient />;
}
