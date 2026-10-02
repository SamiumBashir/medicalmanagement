"use client";

import * as React from "react";
import {
  PAYMENT_METHODS,
  getPaymentMethodMeta,
  type PaymentMethod,
} from "@/lib/payments/bd-payment-methods";
import { Input } from "@/components/ui/input";

type Props = {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  transactionReference: string;
  onReferenceChange: (value: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  idPrefix?: string;
};

export function BdPaymentMethodFields({
  method,
  onMethodChange,
  transactionReference,
  onReferenceChange,
  notes,
  onNotesChange,
  idPrefix = "pay",
}: Props) {
  const meta = getPaymentMethodMeta(method);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-method`} className="text-xs font-mono uppercase text-slate-500">
          Payment method (Bangladesh)
        </label>
        <select
          id={`${idPrefix}-method`}
          className="w-full h-10 px-2 rounded-md border border-slate-200 text-xs bg-white"
          value={method}
          onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
        >
          {PAYMENT_METHODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label} — {m.labelBn}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-ref`} className="text-xs font-mono uppercase text-slate-500">
          {meta.referenceLabel}
          {meta.requiresReference ? " *" : ""}
        </label>
        <Input
          id={`${idPrefix}-ref`}
          required={meta.requiresReference}
          placeholder={meta.referencePlaceholder}
          value={transactionReference}
          onChange={(e) => onReferenceChange(e.target.value)}
          className="font-mono text-xs"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-notes`} className="text-xs font-mono uppercase text-slate-500">
          Additional notes (optional)
        </label>
        <Input
          id={`${idPrefix}-notes`}
          placeholder="Sender mobile / branch counter / remarks"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="text-xs"
        />
      </div>
    </div>
  );
}
