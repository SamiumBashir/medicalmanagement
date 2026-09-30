"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  FlaskConical,
  Layers,
  ShoppingBag,
  Ticket,
  Droplet,
  Microscope,
  FileCheck2,
  Receipt,
  CreditCard,
  Bell,
  UserCheck,
  Building2,
  BarChart3,
  ShieldAlert,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Activity,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import {
  ROLE_PORTAL_META,
  isRouteAllowed,
  getRoleDefaultRoute,
} from "@/lib/permissions";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  adminOnly?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<{
    name: string;
    role: UserRole;
    email: string;
  }>({
    name: "Dr. Kazi Mostafa",
    role: "SUPER_ADMIN",
    email: "admin@diagnoaid.com",
  });

  // Fetch current authenticated user
  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          const userRole = data.user.role as UserRole;
          setCurrentUser({
            name: data.user.name,
            role: userRole,
            email: data.user.email,
          });

          // If a patient attempts to access the staff dashboard, redirect to patient portal
          if (userRole === "PATIENT") {
            router.push("/patient/dashboard");
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // Quick switch role (for instant testing of all separated portals)
  const handleSwitchRole = async (targetEmail: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, password: "demo" }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.user?.role === "PATIENT") {
          router.push("/patient/dashboard");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const portalMeta = ROLE_PORTAL_META[currentUser.role] || ROLE_PORTAL_META.SUPER_ADMIN;
  const isMasterAdmin = currentUser.role === "SUPER_ADMIN" || currentUser.role === "ADMIN";

  // Build role-specific navigation groups
  const navGroups: NavGroup[] = React.useMemo(() => {
    if (isMasterAdmin) {
      return [
        {
          title: "Master Clinical Core",
          items: [
            { label: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
            { label: "Patients Directory", href: "/dashboard/patients", icon: Users },
            { label: "Doctors & Specialists", href: "/dashboard/doctors", icon: Stethoscope },
            { label: "Appointments Schedule", href: "/dashboard/appointments", icon: Calendar },
          ],
        },
        {
          title: "Diagnostics & Laboratory",
          items: [
            { label: "Tests & Pricing", href: "/dashboard/tests", icon: FlaskConical },
            { label: "Dynamic Templates", href: "/dashboard/tests/templates", icon: Layers },
            { label: "Test Orders Queue", href: "/dashboard/orders", icon: ShoppingBag },
            { label: "Token Queue Monitor", href: "/dashboard/tokens", icon: Ticket },
            { label: "Phlebotomy Samples", href: "/dashboard/samples", icon: Droplet },
            { label: "Lab Workbench", href: "/dashboard/laboratory", icon: Microscope },
            { label: "Doctor Report Verification", href: "/dashboard/reports", icon: FileCheck2 },
          ],
        },
        {
          title: "Administration & Financials",
          items: [
            { label: "Billing & Invoices", href: "/dashboard/billing", icon: Receipt },
            { label: "Payment Ledger", href: "/dashboard/payments", icon: CreditCard },
            { label: "Staff & User Roles", href: "/dashboard/users", icon: UserCheck, adminOnly: true },
            { label: "Branch Network", href: "/dashboard/branches", icon: Building2, adminOnly: true },
            { label: "Revenue Analytics", href: "/dashboard/analytics", icon: BarChart3, adminOnly: true },
            { label: "Audit & Security Logs", href: "/dashboard/audit", icon: ShieldAlert, adminOnly: true },
            { label: "System Settings", href: "/dashboard/settings", icon: Settings, adminOnly: true },
          ],
        },
        {
          title: "Public & Patient Portals",
          items: [
            { label: "View Patient Portal", href: "/patient/dashboard", icon: ExternalLink },
          ],
        },
      ];
    }

    if (currentUser.role === "DOCTOR") {
      return [
        {
          title: "Doctor Clinical Suite",
          items: [
            { label: "Doctor Overview", href: "/dashboard", icon: LayoutDashboard },
            { label: "My Consultations", href: "/dashboard/appointments", icon: Calendar },
            { label: "Patient Records", href: "/dashboard/patients", icon: Users },
          ],
        },
        {
          title: "Diagnostics & Sign-Off",
          items: [
            { label: "Report Verification", href: "/dashboard/reports", icon: FileCheck2 },
            { label: "Tests Directory", href: "/dashboard/tests", icon: FlaskConical },
            { label: "Clinical Alerts", href: "/dashboard/notifications", icon: Bell },
          ],
        },
      ];
    }

    if (currentUser.role === "TECHNICIAN") {
      return [
        {
          title: "Laboratory Operations",
          items: [
            { label: "Lab Overview", href: "/dashboard", icon: LayoutDashboard },
            { label: "Lab Workbench", href: "/dashboard/laboratory", icon: Microscope },
            { label: "Specimen Samples", href: "/dashboard/samples", icon: Droplet },
            { label: "Test Orders Queue", href: "/dashboard/orders", icon: ShoppingBag },
            { label: "Token Queue", href: "/dashboard/tokens", icon: Ticket },
          ],
        },
        {
          title: "Catalogs & Reports",
          items: [
            { label: "Tests & Normal Ranges", href: "/dashboard/tests", icon: FlaskConical },
            { label: "Laboratory Reports", href: "/dashboard/reports", icon: FileCheck2 },
            { label: "Lab Alerts", href: "/dashboard/notifications", icon: Bell },
          ],
        },
      ];
    }

    if (currentUser.role === "RECEPTIONIST") {
      return [
        {
          title: "Front Desk Operations",
          items: [
            { label: "Reception Overview", href: "/dashboard", icon: LayoutDashboard },
            { label: "Token Queue Flow", href: "/dashboard/tokens", icon: Ticket },
            { label: "Register Patient", href: "/dashboard/patients", icon: Users },
            { label: "Book Appointments", href: "/dashboard/appointments", icon: Calendar },
            { label: "Test Booking", href: "/dashboard/orders", icon: ShoppingBag },
            { label: "Doctors Schedule", href: "/dashboard/doctors", icon: Stethoscope },
          ],
        },
        {
          title: "Cash Counter",
          items: [
            { label: "Billing & Invoices", href: "/dashboard/billing", icon: Receipt },
            { label: "Payment Collections", href: "/dashboard/payments", icon: CreditCard },
            { label: "Front Desk Alerts", href: "/dashboard/notifications", icon: Bell },
          ],
        },
      ];
    }

    if (currentUser.role === "ACCOUNTANT") {
      return [
        {
          title: "Accounts & Financials",
          items: [
            { label: "Invoices & Billing", href: "/dashboard/billing", icon: Receipt },
            { label: "Payment Ledger", href: "/dashboard/payments", icon: CreditCard },
            { label: "Financial Analytics", href: "/dashboard/analytics", icon: BarChart3 },
            { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
          ],
        },
      ];
    }

    return [];
  }, [currentUser.role, isMasterAdmin]);

  // Check if current route is allowed for user's role
  const isAllowed = isRouteAllowed(currentUser.role, pathname);

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#171717] flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-[#171717] text-white p-4 flex items-center justify-between sticky top-0 z-50 border-b border-[#315C4A]/40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717]">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-base tracking-tight text-white">
            Apex Diagnostics
          </span>
          <span className="text-[9px] font-mono uppercase bg-[#315C4A] text-[#DDEDE3] px-2 py-0.5 rounded-full">
            {currentUser.role}
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 text-slate-300"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 bg-[#171717] text-[#DDEDE3] flex flex-col justify-between border-r border-[#262626] transition-transform duration-200 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5">
          {/* Logo & Portal Identity */}
          <Link href="/" className="flex items-center gap-3 mb-4 group">
            <div className="w-9 h-9 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] shadow-sm group-hover:bg-[#315C4A] group-hover:text-white transition-all">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-[#FFFFFF] leading-tight">
                Apex Diagnostics
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#A8D5BA] -mt-0.5">
                {portalMeta.portalName}
              </span>
            </div>
          </Link>

          {/* Role Badge Indicator */}
          <div className="mb-6 p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                isMasterAdmin
                  ? "bg-[#A8D5BA] text-[#171717]"
                  : "bg-[#315C4A] text-white"
              }`}
            >
              {isMasterAdmin ? "👑" : "🛡️"}
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] font-semibold text-white block truncate">
                {portalMeta.portalBadge}
              </span>
              <span className="text-[9px] text-[#A8D5BA] block truncate">
                {isMasterAdmin ? "Full Access to All Modules" : "Dedicated Portal View"}
              </span>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-5">
            {navGroups.map((group, gi) => (
              <div key={gi} className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#70706B] tracking-wider px-3 block mb-1.5">
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        active
                          ? "bg-[#A8D5BA] text-[#171717] font-semibold shadow-sm"
                          : "text-[#DDEDE3]/80 hover:text-white hover:bg-[#262626]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.adminOnly && (
                        <span className="text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-[#315C4A] text-[#DDEDE3]">
                          Admin
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-[#262626] bg-[#121212] sticky bottom-0">
          <div className="flex items-center justify-between mb-2">
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-white block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-mono text-[#A8D5BA] block truncate">
                {currentUser.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-[#70706B] hover:text-red-400 rounded-lg hover:bg-[#262626] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 text-[11px] text-[#A8D5BA] hover:text-white transition-colors pt-2 border-t border-[#222222]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-[#FFFFFF] border-b border-[#E8E8E3] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Role Portal Title / Search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-[#171717] font-semibold hidden lg:inline">
                {portalMeta.portalName}
              </span>
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#70706B]" />
              <Input
                placeholder={
                  currentUser.role === "DOCTOR"
                    ? "Search patients, prescriptions..."
                    : currentUser.role === "TECHNICIAN"
                    ? "Search sample barcode, order ID..."
                    : currentUser.role === "RECEPTIONIST"
                    ? "Search patient, token, bill..."
                    : "Global master search..."
                }
                className="pl-9 h-8 text-xs bg-[#F7F7F3] border-[#E8E8E3] text-[#171717] focus:bg-white rounded-full"
              />
            </div>
          </div>

          {/* Quick Demo Role Switcher for instant testing */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 bg-[#F7F7F3] p-1 rounded-full border border-[#E8E8E3] text-xs">
              <span className="text-[10px] font-semibold text-[#70706B] px-2 uppercase tracking-wider">
                Switch Portal:
              </span>
              <button
                onClick={() => handleSwitchRole("admin@diagnoaid.com")}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  currentUser.role === "SUPER_ADMIN"
                    ? "bg-[#A8D5BA] text-[#171717] font-bold shadow-xs"
                    : "text-[#70706B] hover:text-[#171717] hover:bg-white"
                }`}
              >
                👑 Admin
              </button>
              <button
                onClick={() => handleSwitchRole("doctor@diagnoaid.com")}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  currentUser.role === "DOCTOR"
                    ? "bg-[#A8D5BA] text-[#171717] font-bold shadow-xs"
                    : "text-[#70706B] hover:text-[#171717] hover:bg-white"
                }`}
              >
                🩺 Doctor
              </button>
              <button
                onClick={() => handleSwitchRole("tech@diagnoaid.com")}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  currentUser.role === "TECHNICIAN"
                    ? "bg-[#A8D5BA] text-[#171717] font-bold shadow-xs"
                    : "text-[#70706B] hover:text-[#171717] hover:bg-white"
                }`}
              >
                🔬 Tech
              </button>
              <button
                onClick={() => handleSwitchRole("receptionist@diagnoaid.com")}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  currentUser.role === "RECEPTIONIST"
                    ? "bg-[#A8D5BA] text-[#171717] font-bold shadow-xs"
                    : "text-[#70706B] hover:text-[#171717] hover:bg-white"
                }`}
              >
                💼 Reception
              </button>
              <button
                onClick={() => handleSwitchRole("patient@diagnoaid.com")}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  currentUser.role === "PATIENT"
                    ? "bg-[#A8D5BA] text-[#171717] font-bold shadow-xs"
                    : "text-[#70706B] hover:text-[#171717] hover:bg-white"
                }`}
              >
                👤 Patient
              </button>
            </div>

            <Link
              href="/dashboard/notifications"
              className="p-2 text-[#70706B] hover:text-[#171717] hover:bg-[#DDEDE3]/50 rounded-full relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#315C4A]" />
            </Link>

            <div className="h-5 w-px bg-[#E8E8E3]" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#315C4A] text-white font-bold text-xs flex items-center justify-center">
                {currentUser.name[0]}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#171717] leading-tight">
                  {currentUser.name.split(" ")[0]}
                </span>
                <span className="text-[9px] font-mono text-[#70706B]">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content / Route Guard Restriction */}
        <main className="p-6 sm:p-8 flex-1">
          {isAllowed ? (
            children
          ) : (
            /* Dedicated Access Denied View for Unauthorized Modules */
            <div className="max-w-2xl mx-auto my-12 bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 sm:p-12 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-5">
                <Lock className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                Access Restricted • Administrator Only
              </span>
              <h2 className="font-serif text-3xl text-[#171717] font-normal tracking-tight mb-3">
                Module Restricted to System Administrators
              </h2>
              <p className="text-sm text-[#70706B] mb-6 leading-relaxed max-w-lg mx-auto">
                You are currently signed in as{" "}
                <strong className="text-[#171717]">{currentUser.name}</strong> with role{" "}
                <span className="font-mono text-xs px-2 py-0.5 bg-[#F7F7F3] rounded border border-[#E8E8E3] text-[#315C4A] font-semibold">
                  {currentUser.role}
                </span>
                . Only System Administrators have full clearance to manage hospital configurations, staff roles, and financial ledgers.
              </p>

              <div className="p-4 rounded-2xl bg-[#F7F7F3] border border-[#E8E8E3] text-left text-xs mb-8 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#70706B]">Your Authorized Portal:</span>
                  <span className="font-semibold text-[#171717]">{portalMeta.portalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70706B]">Attempted Module:</span>
                  <span className="font-mono text-red-600">{pathname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70706B]">Required Role:</span>
                  <span className="font-semibold text-[#315C4A]">SUPER_ADMIN / ADMIN</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white px-6 font-semibold"
                >
                  <Link href={getRoleDefaultRoute(currentUser.role)}>
                    Return to My Portal ({portalMeta.portalBadge})
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSwitchRole("admin@diagnoaid.com")}
                  className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]"
                >
                  👑 Switch to Admin Account
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
