import { UserRole } from "@/types";

export type Permission =
  | "patients.read"
  | "patients.create"
  | "patients.update"
  | "patients.delete"
  | "appointments.read"
  | "appointments.create"
  | "appointments.update"
  | "appointments.cancel"
  | "tests.read"
  | "tests.create"
  | "tests.update"
  | "tests.delete"
  | "samples.read"
  | "samples.collect"
  | "samples.process"
  | "results.read"
  | "results.create"
  | "results.update"
  | "reports.read"
  | "reports.verify"
  | "reports.download"
  | "billing.read"
  | "billing.create"
  | "payments.read"
  | "payments.create"
  | "payments.refund"
  | "users.create"
  | "users.update"
  | "users.disable"
  | "audit.read"
  | "analytics.read"
  | "settings.update";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "patients.read", "patients.create", "patients.update", "patients.delete",
    "appointments.read", "appointments.create", "appointments.update", "appointments.cancel",
    "tests.read", "tests.create", "tests.update", "tests.delete",
    "samples.read", "samples.collect", "samples.process",
    "results.read", "results.create", "results.update",
    "reports.read", "reports.verify", "reports.download",
    "billing.read", "billing.create",
    "payments.read", "payments.create", "payments.refund",
    "users.create", "users.update", "users.disable",
    "audit.read", "analytics.read", "settings.update"
  ],
  ADMIN: [
    "patients.read", "patients.create", "patients.update",
    "appointments.read", "appointments.create", "appointments.update", "appointments.cancel",
    "tests.read", "tests.create", "tests.update",
    "samples.read", "samples.collect", "samples.process",
    "results.read", "results.create", "results.update",
    "reports.read", "reports.verify", "reports.download",
    "billing.read", "billing.create",
    "payments.read", "payments.create", "payments.refund",
    "users.create", "users.update",
    "audit.read", "analytics.read", "settings.update"
  ],
  BRANCH_MANAGER: [
    "patients.read", "patients.create", "patients.update",
    "appointments.read", "appointments.create", "appointments.update", "appointments.cancel",
    "tests.read",
    "samples.read", "samples.collect",
    "results.read",
    "reports.read", "reports.download",
    "billing.read", "billing.create",
    "payments.read", "payments.create",
    "analytics.read"
  ],
  RECEPTIONIST: [
    "patients.read", "patients.create", "patients.update",
    "appointments.read", "appointments.create", "appointments.update", "appointments.cancel",
    "tests.read",
    "samples.read", "samples.collect",
    "reports.read", "reports.download",
    "billing.read", "billing.create",
    "payments.read", "payments.create"
  ],
  DOCTOR: [
    "patients.read",
    "appointments.read", "appointments.update",
    "tests.read",
    "results.read",
    "reports.read", "reports.verify", "reports.download"
  ],
  TECHNICIAN: [
    "patients.read",
    "tests.read",
    "samples.read", "samples.collect", "samples.process",
    "results.read", "results.create", "results.update",
    "reports.read"
  ],
  ACCOUNTANT: [
    "patients.read",
    "billing.read", "billing.create",
    "payments.read", "payments.create", "payments.refund",
    "reports.read",
    "analytics.read"
  ],
  PATIENT: [
    "appointments.read", "appointments.create", "appointments.cancel",
    "reports.read", "reports.download",
    "billing.read",
    "payments.read"
  ]
};

export interface RolePortalMeta {
  portalName: string;
  portalBadge: string;
  description: string;
  homeRoute: string;
  isMasterAdmin: boolean;
}

export const ROLE_PORTAL_META: Record<UserRole, RolePortalMeta> = {
  SUPER_ADMIN: {
    portalName: "Master Administrative Suite",
    portalBadge: "Super Admin (Full System Access)",
    description: "Complete control of all medical operations, diagnostics, billing, staff, and system telemetry.",
    homeRoute: "/dashboard",
    isMasterAdmin: true,
  },
  ADMIN: {
    portalName: "Hospital Administrator Suite",
    portalBadge: "Clinic Admin",
    description: "Full management of hospital branches, billing, tests, and operational analytics.",
    homeRoute: "/dashboard",
    isMasterAdmin: true,
  },
  DOCTOR: {
    portalName: "Doctor Clinical Portal",
    portalBadge: "Specialist Consultant",
    description: "Consultation queue, patient diagnostic histories, and laboratory report verification.",
    homeRoute: "/dashboard",
    isMasterAdmin: false,
  },
  TECHNICIAN: {
    portalName: "Laboratory Technologist Workbench",
    portalBadge: "Lab Technologist",
    description: "Phlebotomy samples intake, automated analyzer queue, and biochemical result entry.",
    homeRoute: "/dashboard",
    isMasterAdmin: false,
  },
  RECEPTIONIST: {
    portalName: "Front Desk & Reception Portal",
    portalBadge: "Front Desk Officer",
    description: "Patient check-in, token issuance, test booking, cash counter, and appointments.",
    homeRoute: "/dashboard",
    isMasterAdmin: false,
  },
  ACCOUNTANT: {
    portalName: "Accounts & Financial Portal",
    portalBadge: "Accounts Officer",
    description: "Invoicing, payment ledgers, daily collections, and revenue reconciliation.",
    homeRoute: "/dashboard/billing",
    isMasterAdmin: false,
  },
  BRANCH_MANAGER: {
    portalName: "Branch Management Portal",
    portalBadge: "Branch Manager",
    description: "Branch floor operations, patient throughput, and staff scheduling.",
    homeRoute: "/dashboard",
    isMasterAdmin: false,
  },
  PATIENT: {
    portalName: "Patient Health Portal",
    portalBadge: "Verified Patient",
    description: "Personal test history, verified lab reports, appointment bookings, and receipts.",
    homeRoute: "/patient/dashboard",
    isMasterAdmin: false,
  },
};

/**
 * Strict whitelist of dashboard routes allowed per role.
 * SUPER_ADMIN has full access to ALL paths.
 */
export const ROLE_ALLOWED_ROUTES: Record<UserRole, string[]> = {
  SUPER_ADMIN: ["*"], // Wildcard: Full access to the whole site
  ADMIN: ["*"],
  DOCTOR: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/patients",
    "/dashboard/reports",
    "/dashboard/tests",
    "/dashboard/notifications",
  ],
  TECHNICIAN: [
    "/dashboard",
    "/dashboard/laboratory",
    "/dashboard/samples",
    "/dashboard/orders",
    "/dashboard/tokens",
    "/dashboard/tests",
    "/dashboard/reports",
    "/dashboard/notifications",
  ],
  RECEPTIONIST: [
    "/dashboard",
    "/dashboard/tokens",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/orders",
    "/dashboard/billing",
    "/dashboard/payments",
    "/dashboard/doctors",
    "/dashboard/notifications",
  ],
  ACCOUNTANT: [
    "/dashboard",
    "/dashboard/billing",
    "/dashboard/payments",
    "/dashboard/analytics",
    "/dashboard/notifications",
  ],
  BRANCH_MANAGER: [
    "/dashboard",
    "/dashboard/patients",
    "/dashboard/appointments",
    "/dashboard/orders",
    "/dashboard/tokens",
    "/dashboard/samples",
    "/dashboard/billing",
    "/dashboard/payments",
    "/dashboard/analytics",
    "/dashboard/notifications",
  ],
  PATIENT: [
    "/patient",
    "/patient/dashboard",
    "/patient/appointments",
    "/patient/test-orders",
    "/patient/reports",
    "/patient/payments",
    "/patient/profile",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}

export function isRouteAllowed(role: UserRole, pathname: string): boolean {
  if (role === "SUPER_ADMIN" || role === "ADMIN") {
    return true; // Admin has full access to the entire site!
  }

  // Patients cannot access /dashboard
  if (role === "PATIENT" && pathname.startsWith("/dashboard")) {
    return false;
  }

  // Non-patients cannot access /patient unless they are Super Admin
  if (role !== "PATIENT" && pathname.startsWith("/patient")) {
    return false;
  }

  const allowedRoutes = ROLE_ALLOWED_ROUTES[role] || [];
  if (allowedRoutes.includes("*")) return true;

  return allowedRoutes.some((allowed) => {
    if (allowed === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === allowed || pathname.startsWith(`${allowed}/`);
  });
}

export function getRoleDefaultRoute(role: UserRole): string {
  return ROLE_PORTAL_META[role]?.homeRoute || "/dashboard";
}
