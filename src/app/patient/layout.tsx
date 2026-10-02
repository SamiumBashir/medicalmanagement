"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FileCheck2,
  CreditCard,
  User,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Activity,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { UserRole } from "@/types";

const NAV_ITEMS = [
  { label: "Health Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { label: "My Appointments", href: "/patient/appointments", icon: Calendar },
  { label: "Test Orders", href: "/patient/test-orders", icon: FileText },
  { label: "Medical Reports", href: "/patient/reports", icon: FileCheck2 },
  { label: "Payments & Invoices", href: "/patient/payments", icon: CreditCard },
  { label: "Medical Profile", href: "/patient/profile", icon: User },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<{
    name: string;
    role: UserRole;
    email: string;
    patientId?: string;
  }>({
    name: "Patient",
    role: "PATIENT",
    email: "",
  });

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const role = data.user.role as UserRole;
          setCurrentUser({
            name: data.user.name,
            role,
            email: data.user.email,
            patientId: data.user.patientId,
          });

          // Non-admin staff attempting to visit patient portal are redirected to staff dashboard
          if (role !== "PATIENT" && role !== "SUPER_ADMIN" && role !== "ADMIN") {
            router.push("/dashboard");
          }
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const isMasterAdmin = currentUser.role === "SUPER_ADMIN" || currentUser.role === "ADMIN";

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#171717] flex flex-col lg:flex-row">
      {/* Mobile / tablet header (below 1024px) */}
      <div className="lg:hidden bg-[#171717] text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-[#262626]">
        <Link href="/patient/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717]">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-base tracking-tight text-white">
            Apex Diagnostics
          </span>
          <span className="text-[9px] font-mono uppercase bg-[#315C4A] text-[#DDEDE3] px-2 py-0.5 rounded-full">
            Patient Portal
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 text-[#DDEDE3]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-[#171717]/60 backdrop-blur-[2px] lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-30 h-screen w-[min(100%,18rem)] lg:w-60 xl:w-72 shrink-0 bg-[#171717] text-[#DDEDE3] p-5 flex flex-col justify-between border-r border-[#262626] transition-transform duration-200 overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-9 h-9 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] shadow-sm group-hover:bg-[#315C4A] group-hover:text-white transition-all">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-[#FFFFFF] leading-tight">
                Apex Diagnostics
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#A8D5BA] -mt-0.5">
                Patient Health Portal
              </span>
            </div>
          </Link>

          {/* Master Admin Indicator (If admin is inspecting patient portal) */}
          {isMasterAdmin && (
            <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span>👑</span>
                <span className="font-semibold text-[11px]">Admin Inspection Mode</span>
              </div>
              <Link
                href="/dashboard"
                className="text-[10px] text-amber-300 underline font-mono"
              >
                Back to Staff
              </Link>
            </div>
          )}

          {/* Patient Card */}
          <div className="p-3.5 bg-[#222222] rounded-2xl border border-[#333333] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A8D5BA] text-[#171717] font-bold flex items-center justify-center text-sm shadow-sm">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="font-bold text-sm text-white block truncate">
                  {currentUser.name}
                </span>
                <span className="text-[11px] font-mono text-[#A8D5BA] block truncate">
                  {currentUser.patientId || "Profile pending link"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-[#A8D5BA] text-[#171717] font-semibold shadow-sm"
                      : "text-[#DDEDE3]/80 hover:text-white hover:bg-[#262626]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-[#262626] pt-4 space-y-2">
          <Link
            href="/book-test"
            className="flex items-center justify-between text-xs font-semibold text-[#171717] p-2.5 rounded-xl bg-[#A8D5BA] hover:bg-[#315C4A] hover:text-white transition-all shadow-sm"
          >
            <span>+ Book New Lab Test</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#DDEDE3]/70 hover:text-white rounded-lg hover:bg-[#262626] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#70706B] hover:text-red-400 rounded-lg hover:bg-[#262626] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 xl:p-10 max-w-7xl w-full overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
