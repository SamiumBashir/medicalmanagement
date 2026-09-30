import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { dataStore } from "@/lib/services/dataStore";
import { getServerSession } from "@/lib/auth/session";
import { FileText, Plus, Clock, CheckCircle2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PatientTestOrdersPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?from=/patient/test-orders");
  }

  const patientId = session.patientId || "PAT-2026-000001";
  const orders = dataStore.orders.filter((o) => o.patientId === patientId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnostic Test Orders</h1>
          <p className="text-xs text-slate-500 font-mono">
            Laboratory requisitions, queue token tickets, and sampling progress
          </p>
        </div>

        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Link href="/book-test">
            <Plus className="w-4 h-4" />
            Book New Tests
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No test orders located</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">You have not booked any laboratory investigations yet.</p>
            <Button asChild size="sm" className="bg-teal-700 text-white">
              <Link href="/book-test">Explore Diagnostic Tests</Link>
            </Button>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-base font-bold font-mono text-slate-900">{order.orderId}</span>
                    <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-teal-100 text-teal-800">
                      Token: {order.tokenNumber}
                    </span>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Status: {order.tokenStatus}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {order.branchName} • Ordered on {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono uppercase text-slate-400 block">Total Amount</span>
                  <span className="text-xl font-bold font-mono text-slate-900">৳{order.total.toLocaleString()}</span>
                  <span className="text-[11px] font-bold text-emerald-600 block uppercase">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Investigations Included ({order.tests.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.tests.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800">{t.testName}</span>
                      <span className="font-mono text-slate-600">৳{t.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500">
                  Show token <strong className="text-slate-800">{order.tokenNumber}</strong> at the diagnostic reception counter.
                </span>
                <Button asChild size="sm" variant="outline" className="border-slate-300">
                  <Link href="/patient/reports">Check Reports →</Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
