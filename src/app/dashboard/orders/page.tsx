"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, TestOrderRecord } from "@/lib/services/dataStore";
import { Plus, Search, ShoppingBag, Receipt, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardOrdersPage() {
  const [orders, setOrders] = React.useState<TestOrderRecord[]>(dataStore.orders);
  const [search, setSearch] = React.useState("");

  const filtered = orders.filter(
    (o) =>
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.tokenNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Multi-Test Requisitions & Orders</h1>
          <p className="text-xs text-slate-500 font-mono">
            Diagnostic order packages, bundled investigations, payment status, and tokens
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/book-test">
            <Plus className="w-4 h-4" />
            Create Requisition Order
          </Link>
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search order ID, patient, or token..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> orders
        </span>
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-bold font-mono text-slate-900">{order.orderId}</span>
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    Queue: {order.tokenNumber}
                  </span>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {order.tokenStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Patient: <strong className="text-slate-900 font-semibold">{order.patientName}</strong> ({order.patientPhone}) • {order.branchName}
                </div>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-xs text-slate-400 block uppercase">Financial Breakdown</span>
                <span className="text-2xl font-black text-teal-900">৳{order.total.toLocaleString()}</span>
                <span
                  className={`text-[11px] font-bold block uppercase ${
                    order.paymentStatus === "PAID"
                      ? "text-emerald-600"
                      : order.paymentStatus === "PARTIAL"
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus} (Paid: ৳{order.paidAmount} | Due: ৳{order.dueAmount})
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Ordered Tests ({order.tests.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {order.tests.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs font-mono">
                    <span className="font-sans font-medium text-slate-800">{t.testName}</span>
                    <span className="text-slate-600 font-bold">৳{t.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono gap-4">
              <span>Requisition Date: {new Date(order.orderDate).toLocaleString()}</span>
              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline" onClick={() => window.print()} className="gap-1 border-slate-300">
                  <Printer className="w-3.5 h-3.5" />
                  Print Requisition Slip
                </Button>
                <Button asChild size="sm" className="bg-teal-700 hover:bg-teal-800 text-white">
                  <Link href="/dashboard/samples">Phlebotomy Status →</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
