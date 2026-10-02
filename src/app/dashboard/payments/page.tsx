"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, PaymentRecord } from "@/lib/services/dataStore";
import { recordPaymentAction, processRefundAction } from "@/app/actions/payment.actions";
import { BdPaymentMethodFields } from "@/components/billing/bd-payment-method-fields";
import {
  formatPaymentMethod,
  type PaymentMethod,
} from "@/lib/payments/bd-payment-methods";
import { Plus, Search, X, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPaymentsPage() {
  const [payments, setPayments] = React.useState<PaymentRecord[]>(dataStore.payments);
  const [search, setSearch] = React.useState("");
  const [showPayModal, setShowPayModal] = React.useState(false);

  const [newPay, setNewPay] = React.useState({
    patientName: "Tanvir Ahmed",
    invoiceId: "INV-2026-001246",
    orderId: "ORD-2026-000124",
    amount: "1240",
    method: "BKASH" as PaymentMethod,
    transactionReference: "",
    notes: "",
  });

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await recordPaymentAction({
        invoiceId: newPay.invoiceId,
        orderId: newPay.orderId,
        patientName: newPay.patientName,
        amount: Number(newPay.amount) || 0,
        method: newPay.method,
        transactionReference: newPay.transactionReference,
        notes: newPay.notes || undefined,
      });

      if (res.success && res.payment) {
        setPayments([res.payment, ...payments]);
        setShowPayModal(false);
        setNewPay((p) => ({ ...p, transactionReference: "", notes: "" }));
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to record payment");
    }
  };

  const handleRefund = async (txId: string) => {
    try {
      const reason =
        prompt("Please provide a reason for processing this refund:") ||
        "Patient requested adjustment";
      const res = await processRefundAction(txId, reason);
      if (res.success && res.refund) {
        setPayments([res.refund, ...payments]);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to process refund");
    }
  };

  const filtered = payments.filter(
    (p) =>
      p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      (p.transactionReference || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Transactions & Audit Ledger</h1>
          <p className="text-xs text-slate-500 font-mono">
            bKash, Nagad, Rocket, Upay, bank transfer, cash & card — immutable ledger (৳ BDT)
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="border-slate-300">
            <Link href="/dashboard/billing">
              <Receipt className="w-4 h-4 mr-1.5" />
              Invoices
            </Link>
          </Button>
          <Button
            onClick={() => setShowPayModal(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2"
          >
            <Plus className="w-4 h-4" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search TXN ID, TrxID, invoice, or patient..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> transactions
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Invoice #</th>
                <th className="py-3 px-6">Patient Name</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Reference</th>
                <th className="py-3 px-6">Received By</th>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-teal-800">{p.transactionId}</td>
                  <td className="py-4 px-6 text-slate-600">{p.invoiceId}</td>
                  <td className="py-4 px-6 font-sans font-semibold text-slate-900">{p.patientName}</td>
                  <td className="py-4 px-6 font-bold text-sm">
                    <span className={p.amount < 0 ? "text-red-600" : "text-emerald-700"}>
                      ৳{Math.abs(p.amount).toLocaleString()} {p.amount < 0 && "(Refund)"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      {formatPaymentMethod(p.method)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 max-w-[8rem] truncate">
                    {p.transactionReference || "—"}
                  </td>
                  <td className="py-4 px-6 text-slate-600">{p.receivedBy}</td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(p.date).toLocaleString()}
                    {p.notes && (
                      <span className="text-[10px] text-slate-400 italic block truncate max-w-[10rem]">
                        {p.notes}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {p.amount > 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRefund(p.transactionId)}
                        className="text-xs text-red-600 hover:bg-red-50 h-7"
                      >
                        Refund
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Record payment (BDT)</h3>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Invoice reference</label>
                <Input
                  required
                  value={newPay.invoiceId}
                  onChange={(e) => setNewPay({ ...newPay, invoiceId: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Patient name</label>
                <Input
                  required
                  value={newPay.patientName}
                  onChange={(e) => setNewPay({ ...newPay, patientName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Amount (৳)</label>
                <Input
                  required
                  type="number"
                  min={1}
                  value={newPay.amount}
                  onChange={(e) => setNewPay({ ...newPay, amount: e.target.value })}
                />
              </div>

              <BdPaymentMethodFields
                method={newPay.method}
                onMethodChange={(method) => setNewPay({ ...newPay, method })}
                transactionReference={newPay.transactionReference}
                onReferenceChange={(transactionReference) =>
                  setNewPay({ ...newPay, transactionReference })
                }
                notes={newPay.notes}
                onNotesChange={(notes) => setNewPay({ ...newPay, notes })}
                idPrefix="staff-pay"
              />

              <Button
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-5 mt-2"
              >
                Commit transaction & update invoice
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
