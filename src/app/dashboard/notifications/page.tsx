"use client";

import * as React from "react";
import { Bell, AlertTriangle, CheckCircle2, Clock, Calendar, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  type: "CRITICAL" | "VERIFIED" | "APPOINTMENT" | "PAYMENT";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "CRITICAL",
    title: "Panic Value Alert: Severe Thrombocytopenia Flagged",
    message: "Platelet Count < 20,000/µL detected in specimen SMP-2026-000452 for patient Tanvir Ahmed. Immediate physician notification dispatched.",
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "VERIFIED",
    title: "Diagnostic Report Digitally Certified",
    message: "Report RPT-2026-001245 (Complete Blood Count) has been digitally verified and sealed by Prof. Dr. Mizanur Rahman.",
    timestamp: "45 mins ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "APPOINTMENT",
    title: "Specialist Appointment Scheduled",
    message: "Patient Kamrul Hasan booked an evening consultation with Dr. Tariq Ahmed Khan (Cardiology) at Dhanmondi Hub.",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "notif-4",
    type: "PAYMENT",
    title: "Payment Settlement Confirmed",
    message: "৳2,385 received via POS Card Authorization for invoice INV-2026-001245.",
    timestamp: "4 hours ago",
    read: true,
  },
];

export default function NotificationsDashboardPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hospital Notification Center</h1>
          <p className="text-xs text-slate-500 font-mono">
            Critical laboratory panic values, verification alerts, and appointment dispatches
          </p>
        </div>

        <Button onClick={markAllAsRead} variant="outline" size="sm" className="border-slate-300">
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
              !n.read
                ? n.type === "CRITICAL"
                  ? "bg-red-50/80 border-red-300 shadow-xs"
                  : "bg-teal-50/50 border-teal-200 shadow-xs"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="mt-1">
              {n.type === "CRITICAL" && (
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              )}
              {n.type === "VERIFIED" && (
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
              {n.type === "APPOINTMENT" && (
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              )}
              {n.type === "PAYMENT" && (
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[11px] font-mono text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
