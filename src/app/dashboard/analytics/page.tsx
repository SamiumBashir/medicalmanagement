"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, TrendingUp, DollarSign, Clock, ShieldCheck } from "lucide-react";

const MONTHLY_REVENUE = [
  { month: "Apr", revenue: 840, target: 800 },
  { month: "May", revenue: 920, target: 850 },
  { month: "Jun", revenue: 1050, target: 900 },
  { month: "Jul", revenue: 1180, target: 1000 },
  { month: "Aug", revenue: 1340, target: 1100 },
  { month: "Sep", revenue: 1480, target: 1200 },
];

const TEST_DEMAND = [
  { name: "CBC with ESR", count: 480 },
  { name: "Lipid Profile", count: 320 },
  { name: "HbA1c HPLC", count: 290 },
  { name: "LFT Panel", count: 240 },
  { name: "USG Abdomen", count: 180 },
  { name: "Chest X-Ray", count: 160 },
  { name: "Creatinine", count: 210 },
];

const SLA_COMPLIANCE = [
  { name: "Within SLA (<4 hrs)", value: 89, color: "#0F766E" },
  { name: "Delayed SLA (>4 hrs)", value: 11, color: "#DC2626" },
];

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hospital Clinical Analytics & KPIs</h1>
        <p className="text-xs text-slate-500 font-mono">
          Diagnostic turnaround performance, test utilization volume, and revenue forecasting
        </p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Monthly Growth</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">+18.4%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">SLA Turnaround Rate</span>
            <span className="text-2xl font-bold text-emerald-700 font-mono">89.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 block">Average Order Value</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">৳2,140</span>
          </div>
        </div>
      </div>

      {/* Chart 1: Revenue vs Target */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Monthly Revenue Trajectory (in &apos;000 BDT)</h3>
        <p className="text-xs text-slate-500 font-mono mb-6">Actual billing receipts vs projected revenue targets</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeDasharray="5 5" name="Target" />
              <Line type="monotone" dataKey="revenue" stroke="#0F766E" strokeWidth={3} name="Actual Revenue (৳k)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Test Demand Histogram & SLA Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1">Most Frequent Diagnostic Investigations</h3>
          <p className="text-xs text-slate-500 font-mono mb-6">Patient volume per investigation modality</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEST_DEMAND} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#64748B" }} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="count" fill="#0F766E" radius={[0, 4, 4, 0]} name="Orders Processed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Report SLA Compliance</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">Turnaround fidelity rate</p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SLA_COMPLIANCE}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {SLA_COMPLIANCE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-600">Within SLA (&lt;4 Hours)</span>
              <strong className="text-teal-700">89%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Extended Culture SLA</span>
              <strong className="text-red-600">11%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
