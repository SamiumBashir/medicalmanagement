"use client";

import * as React from "react";
import { UserRole } from "@/types";
import { UserCheck, Plus, Shield, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch: string;
  isActive: boolean;
}

const INITIAL_USERS: UserRecord[] = [
  { id: "u-1", name: "Dr. Kazi Mostafa", email: "admin@diagnoaid.com", role: "SUPER_ADMIN", branch: "All Branches", isActive: true },
  { id: "u-2", name: "Prof. Dr. Mizanur Rahman", email: "doctor@diagnoaid.com", role: "DOCTOR", branch: "Dhanmondi Main Hub", isActive: true },
  { id: "u-3", name: "Rafiqul Islam", email: "tech@diagnoaid.com", role: "TECHNICIAN", branch: "Dhanmondi Main Hub", isActive: true },
  { id: "u-4", name: "Anwar Hossain", email: "receptionist@diagnoaid.com", role: "RECEPTIONIST", branch: "Dhanmondi Main Hub", isActive: true },
  { id: "u-5", name: "Shahriar Kabir", email: "accountant@diagnoaid.com", role: "ACCOUNTANT", branch: "Dhanmondi Main Hub", isActive: true },
  { id: "u-6", name: "Farhana Yasmin", email: "manager.gulshan@diagnoaid.com", role: "BRANCH_MANAGER", branch: "Gulshan Premium Center", isActive: true },
];

export default function DashboardUsersPage() {
  const [users, setUsers] = React.useState<UserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = React.useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Access & Role Privileges</h1>
          <p className="text-xs text-slate-500 font-mono">
            Staff access provisioning, clinical role assignments, and branch security boundaries
          </p>
        </div>

        <Button className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Plus className="w-4 h-4" />
          Add Staff Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search staff by name, email, or role..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> active staff
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Staff Member</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">System Role</th>
                <th className="py-3 px-6">Branch Jurisdiction</th>
                <th className="py-3 px-6">Account Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 block font-semibold">{u.name}</strong>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">{u.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-sans">{u.branch}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button size="sm" variant="ghost" className="text-xs text-teal-700 h-7">
                      Edit Role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
