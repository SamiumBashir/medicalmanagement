"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, InvoiceRecord } from "@/lib/services/dataStore";
import { Plus, Search, Receipt, Printer, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardBillingPage() {
  const [invoices, setInvoices] = React.useState<InvoiceRecord[]>(dataStore.invoices);
  const [search, setSearch] = React.useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Billing & Invoice Ledger</h1>
          <p className="text-xs text-slate-500 font-mono">
            Line-item diagnostic invoicing, promotional discounts, and payment settlements
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="border-slate-300">
            <Link href="/dashboard/payments">
              <CreditCard className="w-4 h-4 mr-1.5" />
              Transactions Ledger
            </Link>
          </Button>
          <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium">
            <Link href="/book-test">
              <Plus className="w-4 h-4 mr-1.5" />
              Generate Invoice
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search invoice number, patient, or order..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> invoices
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Invoice # & Date</th>
                <th className="py-3 px-6">Patient Name</th>
                <th className="py-3 px-6">Subtotal</th>
                <th className="py-3 px-6">Discount</th>
                <th className="py-3 px-6">Total Billed</th>
                <th className="py-3 px-6">Paid Amount</th>
                <th className="py-3 px-6">Balance Due</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-teal-800 block text-sm">{inv.invoiceId}</span>
                    <span className="text-slate-400 text-[10px]">{new Date(inv.date).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 block font-semibold">{inv.patientName}</strong>
                    <span className="text-xs text-slate-400 font-mono">{inv.patientId}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-700">৳{inv.subtotal}</td>
                  <td className="py-4 px-6 text-emerald-600 font-bold">-৳{inv.discount}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">৳{inv.total}</td>
                  <td className="py-4 px-6 text-teal-800 font-bold">৳{inv.paid}</td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${inv.due > 0 ? "text-red-600" : "text-slate-400"}`}>
                      ৳{inv.due}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.print()}
                      className="text-xs h-8 border-slate-300 gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Slip
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
