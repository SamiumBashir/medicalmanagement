"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export function RegisterClient() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      setError("Please fill in all required patient registration fields.");
      return;
    }

    setLoading(true);
    setError(null);

    // Call login API with PATIENT role to create session or simulate registration
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: "PATIENT",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Registration could not be completed.");
      }

      setSuccess("Account registered successfully! Redirecting to Patient Portal...");
      setTimeout(() => {
        router.push("/patient/dashboard");
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#171717] flex flex-col justify-between selection:bg-[#A8D5BA] selection:text-[#171717]">
      {/* Top Brand Bar */}
      <header className="w-full border-b border-[#E8E8E3] bg-[#FFFFFF] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] group-hover:bg-[#315C4A] group-hover:text-white transition-all duration-300">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#171717] leading-tight">
                Apex Diagnostics
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#70706B] -mt-0.5">
                Precision Medical Center
              </span>
            </div>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#70706B] hover:text-[#171717] transition-colors px-3 py-1.5 rounded-full hover:bg-[#DDEDE3]/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Already registered? Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#DDEDE3] text-[#315C4A] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Patient Self-Service
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                Create Patient Account
              </h1>
              <p className="text-sm text-[#70706B] mt-2 max-w-sm mx-auto">
                Access your laboratory results 24/7, track previous diagnoses, and download QR-verified PDF reports.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-3.5 rounded-xl bg-[#DDEDE3] border border-[#A8D5BA] text-[#315C4A] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#315C4A]" />
                <span className="font-medium">{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700-000000"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white py-3.5 px-6 font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E8E8E3] text-center">
              <p className="text-xs text-[#70706B]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#315C4A] hover:underline"
                >
                  Sign in here →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#E8E8E3] bg-[#FFFFFF] py-4 px-6 text-center text-xs text-[#70706B]">
        <p>© 2026 Apex Diagnostics Center. All rights reserved.</p>
      </footer>
    </div>
  );
}
