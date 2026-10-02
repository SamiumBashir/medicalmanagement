"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { InvoiceRecord, PaymentRecord } from "@/lib/services/dataStore";
import { submitPatientInvoicePaymentAction } from "@/app/actions/payment.actions";
import { BdPaymentMethodFields } from "@/components/billing/bd-payment-method-fields";
import {
  BD_MERCHANT_ACCOUNTS,
  formatPaymentMethod,
  type PaymentMethod,
} from "@/lib/payments/bd-payment-methods";
import { CreditCard, Printer, Receipt, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PatientPaymentsClient({
  invoices,
  payments,
}: {
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
}) {
  const router = useRouter();
  const [payInvoice, setPayInvoice] = React.useState<InvoiceRecord | null>(null);
  const [amount, setAmount] = React.useState("");
  const [method, setMethod] = React.useState<PaymentMethod>("BKASH");
  const [transactionReference, setTransactionReference] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const openPay = (inv: InvoiceRecord) => {
    setPayInvoice(inv);
    setAmount(String(inv.due));
    setMethod("BKASH");
    setTransactionReference("");
    setNotes("");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payInvoice) return;
    setSubmitting(true);
    try {
      const res = await submitPatientInvoicePaymentAction({
        invoiceId: payInvoice.invoiceId,
        amount: Number(amount),
        method,
        transactionReference,
        notes: notes || undefined,
      });
      if (res.success) {
        setPayInvoice(null);
        router.refresh();
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Payment could not be recorded");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing & payment receipts</h1>
        <p className="text-xs text-slate-500 font-mono">
          Pay dues via bKash, Nagad, Rocket, Upay, bank transfer, or at the branch (৳ BDT)
        </p>
      </div>

      <div className="bg-[#DDEDE3]/40 border border-[#A8D5BA]/50 rounded-2xl p-4 text-xs text-[#315C4A] space-y-1">
        <p className="font-semibold flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Online payment (Send Money / Pay Bill)
        </p>
        <p>
          <strong>bKash:</strong> {BD_MERCHANT_ACCOUNTS.bkash} · <strong>Nagad:</strong>{" "}
          {BD_MERCHANT_ACCOUNTS.nagad}
        </p>
        <p>
          <strong>Rocket:</strong> {BD_MERCHANT_ACCOUNTS.rocket} · <strong>Upay:</strong>{" "}
          {BD_MERCHANT_ACCOUNTS.upay}
        </p>
        <p className="text-[#70706B]">
          After paying, enter the TrxID below so we can match your invoice.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Official diagnostic invoices</h2>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            <Receipt className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No invoices generated</p>
            <p className="text-xs text-slate-400 mt-1">
              Invoices appear when laboratory tests are ordered.
            </p>
          </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-base font-bold font-mono text-slate-900">{inv.invoiceId}</span>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                        inv.status === "PAID"
                          ? "bg-emerald-100 text-emerald-800"
                          : inv.status === "PARTIAL"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    Order: {inv.orderId} · {new Date(inv.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-xs text-slate-400 block uppercase">Total billed</span>
                  <span className="text-2xl font-extrabold text-teal-900">
                    ৳{inv.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Billed items
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
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="text-slate-400 block">Paid</span>
                    <span className="font-bold text-slate-900">৳{inv.paid}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Balance due</span>
                    <span className={`font-bold ${inv.due > 0 ? "text-red-600" : "text-emerald-700"}`}>
                      ৳{inv.due}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {inv.due > 0 && (
                    <Button
                      size="sm"
                      className="bg-teal-700 hover:bg-teal-800 text-white gap-1.5"
                      onClick={() => openPay(inv)}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Pay due (৳{inv.due})
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.print()}
                    className="gap-1.5 border-slate-300"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print invoice
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {payments.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Your payment history</h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs font-mono">
            {payments.map((p) => (
              <div key={p.id} className="p-4 flex flex-wrap justify-between gap-2">
                <span className="font-bold text-teal-800">{p.transactionId}</span>
                <span>{formatPaymentMethod(p.method)}</span>
                <span className="font-bold text-emerald-700">৳{p.amount.toLocaleString()}</span>
                <span className="text-slate-500">{new Date(p.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {payInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Pay invoice {payInvoice.invoiceId}</h3>
              <button type="button" onClick={() => setPayInvoice(null)} className="text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Amount (৳)</label>
                <Input
                  type="number"
                  min={1}
                  max={payInvoice.due}
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-[10px] text-slate-400">Maximum due: ৳{payInvoice.due}</p>
              </div>

              <BdPaymentMethodFields
                method={method}
                onMethodChange={setMethod}
                transactionReference={transactionReference}
                onReferenceChange={setTransactionReference}
                notes={notes}
                onNotesChange={setNotes}
                idPrefix="patient-pay"
              />

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-5"
              >
                {submitting ? "Submitting…" : "Submit payment for verification"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
