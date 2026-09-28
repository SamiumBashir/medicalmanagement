"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Stethoscope,
  FlaskConical,
  User,
  Shield,
  Briefcase,
  ArrowRight,
} from "lucide-react";

interface DemoRole {
  id: string;
  name: string;
  label: string;
  email: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const DEMO_ROLES: DemoRole[] = [
  {
    id: "admin",
    name: "Dr. Kazi Mostafa",
    label: "Super Admin",
    email: "admin@diagnoaid.com",
    role: "SUPER_ADMIN",
    icon: Shield,
    description: "Full clinic control, billing, analytics, staff management",
  },
  {
    id: "doctor",
    name: "Prof. Dr. Mizanur Rahman",
    label: "Doctor / Consultant",
    email: "doctor@diagnoaid.com",
    role: "DOCTOR",
    icon: Stethoscope,
    description: "Doctor consultations, prescriptions, patient history",
  },
  {
    id: "tech",
    name: "Rafiqul Islam",
    label: "Lab Technologist",
    email: "tech@diagnoaid.com",
    role: "TECHNICIAN",
    icon: FlaskConical,
    description: "Specimen processing, report verification, analyzer queue",
  },
  {
    id: "reception",
    name: "Anwar Hossain",
    label: "Receptionist",
    email: "receptionist@diagnoaid.com",
    role: "RECEPTIONIST",
    icon: Briefcase,
    description: "Patient check-in, token issuance, test bookings",
  },
  {
    id: "patient",
    name: "Tanvir Ahmed",
    label: "Patient Portal",
    email: "patient@diagnoaid.com",
    role: "PATIENT",
    icon: User,
    description: "Self-service test reports, appointment history, bills",
  },
];

export function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@diagnoaid.com");
  const [password, setPassword] = React.useState("demo123456");
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<DemoRole>(DEMO_ROLES[0]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSelectDemoRole = (roleItem: DemoRole) => {
    setSelectedRole(roleItem);
    setEmail(roleItem.email);
    setPassword("demo123456");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: selectedRole.role,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      setSuccess(`Signed in as ${data.user?.name || "User"}. Redirecting...`);

      setTimeout(() => {
        if (data.user?.role === "PATIENT") {
          router.push("/patient/dashboard");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
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
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#70706B] hover:text-[#171717] transition-colors px-3 py-1.5 rounded-full hover:bg-[#DDEDE3]/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Card Container */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-6 sm:p-10 shadow-sm">
            {/* Header Badge & Title */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#DDEDE3] text-[#315C4A] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Clinical Portal Access
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-[#70706B] mt-2 max-w-md mx-auto">
                Access diagnostic records, lab order processing, consultations, or patient self-service.
              </p>
            </div>

            {/* Quick Demo Switcher */}
            <div className="mb-8 p-4 rounded-2xl bg-[#F7F7F3] border border-[#E8E8E3]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#315C4A]">
                  Select Demo Role (1-Click Fill)
                </span>
                <span className="text-[11px] text-[#70706B]">Click to test role</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DEMO_ROLES.map((roleItem) => {
                  const Icon = roleItem.icon;
                  const isSelected = selectedRole.id === roleItem.id;
                  return (
                    <button
                      key={roleItem.id}
                      type="button"
                      onClick={() => handleSelectDemoRole(roleItem)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col gap-1 ${
                        isSelected
                          ? "bg-[#FFFFFF] border-[#315C4A] shadow-sm ring-1 ring-[#315C4A]/20"
                          : "bg-[#FFFFFF]/60 border-[#E8E8E3] hover:border-[#A8D5BA] hover:bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected
                              ? "bg-[#A8D5BA] text-[#171717]"
                              : "bg-[#DDEDE3] text-[#315C4A]"
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                        </div>
                        <span
                          className={`font-semibold truncate ${
                            isSelected ? "text-[#171717]" : "text-[#70706B]"
                          }`}
                        >
                          {roleItem.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#70706B] truncate font-mono">
                        {roleItem.email}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Role Description */}
              <div className="mt-3 pt-2.5 border-t border-[#E8E8E3] flex items-center justify-between text-xs">
                <div className="text-[#70706B] text-[11px] flex items-center gap-1.5">
                  <span className="font-medium text-[#171717]">{selectedRole.name}:</span>
                  <span>{selectedRole.description}</span>
                </div>
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div className="mb-6 p-3.5 rounded-xl bg-[#DDEDE3] border border-[#A8D5BA] text-[#315C4A] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#315C4A]" />
                <span className="font-medium">{success}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="user@diagnoaid.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Security Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#315C4A] hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#70706B] hover:text-[#171717] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
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
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {selectedRole.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Links & Register */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E3] text-center space-y-3">
              <p className="text-xs text-[#70706B]">
                New patient at Apex Diagnostics?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#315C4A] hover:underline inline-flex items-center gap-1"
                >
                  Create Patient Account →
                </Link>
              </p>
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#70706B]">
                <Link href="/verify/REP-2026-001" className="hover:text-[#171717] hover:underline">
                  Online Report Verification
                </Link>
                <span>•</span>
                <Link href="/book-appointment" className="hover:text-[#171717] hover:underline">
                  Book Home Collection
                </Link>
                <span>•</span>
                <Link href="/contact" className="hover:text-[#171717] hover:underline">
                  Help Desk
                </Link>
              </div>
            </div>
          </div>

          {/* Security Assurance Badge */}
          <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-[#70706B]">
            <ShieldCheck className="w-4 h-4 text-[#315C4A]" />
            <span>ISO 15189:2022 Certified & HIPAA Compliant Healthcare Portal</span>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="w-full border-t border-[#E8E8E3] bg-[#FFFFFF] py-4 px-6 text-center text-xs text-[#70706B]">
        <p>© 2026 Apex Diagnostics Center. All rights reserved. Emergency Contact: 10678</p>
      </footer>
    </div>
  );
}
