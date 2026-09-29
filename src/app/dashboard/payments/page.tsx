"use client";

import * as React from "react";
import { dataStore, PaymentRecord } from "@/lib/services/dataStore";
import { CreditCard, Plus, Search, RotateCcw, CheckCircle2, X } from "lucide-react";
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
    method: "MOBILE_BANKING" as const,
    notes: "bKash TrxID: 8KL92A",
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const count = dataStore.payments.length + 1;
    const transactionId = `TXN-2026-${String(count).padStart(6, "0")}`;

    const record: PaymentRecord = {
      id: `pay-${Date.now()}`,
      transactionId,
      invoiceId: newPay.invoiceId,
      orderId: newPay.orderId,
      patientName: newPay.patientName,
      amount: Number(newPay.amount) || 0,
      method: newPay.method,
      receivedBy: "Cashier Shahriar",
      date: new Date().toISOString(),
      notes: newPay.notes,
    };

    dataStore.payments.unshift(record);

    // Audit log
    dataStore.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: "Cashier Shahriar",
      userRole: "ACCOUNTANT",
      action: "PAYMENT_RECORDED",
      entity: "Payment",
      entityId: transactionId,
      details: `Received ৳${record.amount} via ${record.method} for ${record.invoiceId}`,
    });

    setPayments([...dataStore.payments]);
    setShowPayModal(false);
  };

  const handleRefund = (txId: string) => {
    const original = dataStore.payments.find((p) => p.id === txId);
    if (original) {
      const count = dataStore.payments.length + 1;
      const refundRecord: PaymentRecord = {
        id: `pay-${Date.now()}`,
        transactionId: `TXN-REF-${String(count).padStart(5, "0")}`,
        invoiceId: original.invoiceId,
        orderId: original.orderId,
        patientName: original.patientName,
        amount: -original.amount,
        method: original.method,
        receivedBy: "Cashier Shahriar",
        date: new Date().toISOString(),
        notes: `Refund issued for TXN ${original.transactionId}`,
      };

      dataStore.payments.unshift(refundRecord);

      dataStore.auditLogs.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userName: "Cashier Shahriar",
        userRole: "ACCOUNTANT",
        action: "PAYMENT_REFUNDED",
        entity: "Payment",
        entityId: refundRecord.transactionId,
        details: `Issued refund ৳${original.amount} against original TXN ${original.transactionId}`,
      });

      setPayments([...dataStore.payments]);
    }
  };

  const filtered = payments.filter(
    (p) =>
      p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Transactions & Audit Ledger</h1>
          <p className="text-xs text-slate-500 font-mono">
            Immutable transaction records, POS receipts, mobile banking settlements, and refunds
          </p>
        </div>

        <Button
          onClick={() => setShowPayModal(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2"
        >
          <Plus className="w-4 h-4" />
          Record Payment
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search TXN ID, invoice, or patient..."
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
                <th className="py-3 px-6">Received By</th>
                <th className="py-3 px-6">Timestamp & Notes</th>
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
                      {p.method}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{p.receivedBy}</td>
                  <td className="py-4 px-6 text-slate-500">
                    <span className="block">{new Date(p.date).toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 italic">{p.notes}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {p.amount > 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRefund(p.id)}
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

      {/* Record Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Record Transaction</h3>
              <button onClick={() => setShowPayModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Invoice Reference</label>
                <Input
                  required
                  value={newPay.invoiceId}
                  onChange={(e) => setNewPay({ ...newPay, invoiceId: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Patient Name</label>
                <Input
                  required
                  value={newPay.patientName}
                  onChange={(e) => setNewPay({ ...newPay, patientName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Amount (৳)</label>
                  <Input
                    required
                    type="number"
                    value={newPay.amount}
                    onChange={(e) => setNewPay({ ...newPay, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Payment Gateway</label>
                  <select
                    className="w-full h-10 px-2 rounded-md border border-slate-200 text-xs"
                    value={newPay.method}
                    onChange={(e: any) => setNewPay({ ...newPay, method: e.target.value })}
                  >
                    <option value="CASH">Cash</option>
                    <option value="CARD">Debit / Credit Card</option>
                    <option value="MOBILE_BANKING">bKash / Nagad</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Notes / Transaction Reference</label>
                <Input
                  placeholder="POS slip # / Mobile transaction ID"
                  value={newPay.notes}
                  onChange={(e) => setNewPay({ ...newPay, notes: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-5 mt-2">
                Commit Transaction & Print Receipt
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
