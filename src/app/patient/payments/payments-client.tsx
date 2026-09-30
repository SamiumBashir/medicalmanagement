"use client";

import * as React from "react";
import { InvoiceRecord, PaymentRecord } from "@/lib/services/dataStore";
import { CreditCard, Printer, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PatientPaymentsClient({
  invoices,
  payments,
}: {
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing & Payment Receipts</h1>
        <p className="text-xs text-slate-500 font-mono">
          Financial invoices, transaction receipts, and payment settlements
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Official Diagnostic Invoices</h2>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            <Receipt className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No invoices generated</p>
            <p className="text-xs text-slate-400 mt-1">Diagnostic invoices will appear when laboratory tests are ordered.</p>
          </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-base font-bold font-mono text-slate-900">{inv.invoiceId}</span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {inv.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Associated Order: {inv.orderId} • {new Date(inv.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-xs text-slate-400 block uppercase">Settled Total</span>
                  <span className="text-2xl font-extrabold text-teal-900">৳{inv.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Billed Items
                </span>
                <div className="divide-y divide-slate-100 text-xs">
                  {inv.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between">
                      <span className="text-slate-800">{item.description}</span>
                      <span className="font-mono text-slate-900 font-medium">৳{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div className="flex gap-6">
                  <div>
                    <span className="text-slate-400 block">Subtotal</span>
                    <span className="font-bold text-slate-800">৳{inv.subtotal}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Discount</span>
                    <span className="font-bold text-emerald-600">-৳{inv.discount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Paid Amount</span>
                    <span className="font-bold text-slate-900">৳{inv.paid}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Balance Due</span>
                    <span className="font-bold text-slate-900">৳{inv.due}</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" onClick={() => window.print()} className="gap-1.5 border-slate-300">
                  <Printer className="w-3.5 h-3.5" />
                  Print Invoice
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
