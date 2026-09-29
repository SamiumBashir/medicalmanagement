"use client";

import * as React from "react";
import { dataStore, AuditLogRecord } from "@/lib/services/dataStore";
import { ShieldAlert, Search, Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardAuditLogsPage() {
  const [logs, setLogs] = React.useState<AuditLogRecord[]>(dataStore.auditLogs);
  const [search, setSearch] = React.useState("");

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.userName.toLowerCase().includes(search.toLowerCase()) ||
      l.entityId.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase bg-slate-900 text-teal-400 px-2 py-0.5 rounded font-bold">
              Append-Only Forensic Ledger
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Hospital Compliance & Audit Logs</h1>
          <p className="text-xs text-slate-500 font-mono">
            Immutable tracking of diagnostic modifications, digital report verifications, payments, and role authorizations
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search action, user, or entity ID..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> immutable events
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Timestamp (UTC)</th>
                <th className="py-3 px-6">Actor / Staff User</th>
                <th className="py-3 px-6">Security Action</th>
                <th className="py-3 px-6">Target Entity & Ref</th>
                <th className="py-3 px-6">Audit Forensic Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 block font-semibold">{log.userName}</strong>
                    <span className="text-[10px] font-mono text-teal-700 font-bold uppercase">{log.userRole}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action.includes("VERIFIED")
                          ? "bg-emerald-100 text-emerald-800"
                          : log.action.includes("FLAGGED")
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <span className="text-slate-500 text-xs block">{log.entity}</span>
                    <strong className="text-slate-900 font-mono text-xs">{log.entityId}</strong>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-sans text-xs leading-relaxed max-w-md">
                    {log.details}
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
