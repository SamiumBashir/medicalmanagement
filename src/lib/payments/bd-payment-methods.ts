export const PAYMENT_METHODS = [
  {
    id: "CASH",
    label: "Cash (Counter)",
    labelBn: "নগদ (কাউন্টার)",
    referenceLabel: "Receipt / voucher no. (optional)",
    referencePlaceholder: "e.g. RCP-1042",
    requiresReference: false,
  },
  {
    id: "BKASH",
    label: "bKash",
    labelBn: "বিকাশ",
    referenceLabel: "bKash Transaction ID",
    referencePlaceholder: "e.g. 8N7X2K9LMP",
    requiresReference: true,
  },
  {
    id: "NAGAD",
    label: "Nagad",
    labelBn: "নগদ (MFS)",
    referenceLabel: "Nagad Transaction ID",
    referencePlaceholder: "e.g. 74H29K1QWA",
    requiresReference: true,
  },
  {
    id: "ROCKET",
    label: "Rocket (DBBL)",
    labelBn: "রকেট",
    referenceLabel: "Rocket reference no.",
    referencePlaceholder: "e.g. 5820193847",
    requiresReference: true,
  },
  {
    id: "UPAY",
    label: "Upay",
    labelBn: "উপায়",
    referenceLabel: "Upay transaction ID",
    referencePlaceholder: "e.g. UPAY882910",
    requiresReference: true,
  },
  {
    id: "CELLFIN",
    label: "Cellfin",
    labelBn: "সেলফিন",
    referenceLabel: "Cellfin reference",
    referencePlaceholder: "e.g. CF-928173",
    requiresReference: true,
  },
  {
    id: "BANK_TRANSFER",
    label: "Bank transfer (NPSB / BEFTN)",
    labelBn: "ব্যাংক ট্রান্সফার",
    referenceLabel: "Bank reference / trace no.",
    referencePlaceholder: "e.g. NPSB-20260929-001",
    requiresReference: true,
  },
  {
    id: "CARD",
    label: "Debit / Credit card (POS)",
    labelBn: "কার্ড (POS)",
    referenceLabel: "POS approval / RRN",
    referencePlaceholder: "e.g. Auth 981240",
    requiresReference: true,
  },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["id"];

const LEGACY_ALIASES: Record<string, PaymentMethod> = {
  MOBILE_BANKING: "BKASH",
  ONLINE: "BKASH",
};

const METHOD_IDS = new Set(PAYMENT_METHODS.map((m) => m.id));

export function normalizePaymentMethod(method: string): PaymentMethod {
  const upper = method.toUpperCase();
  if (METHOD_IDS.has(upper as PaymentMethod)) {
    return upper as PaymentMethod;
  }
  return LEGACY_ALIASES[upper] ?? "CASH";
}

export function isPaymentMethod(method: string): method is PaymentMethod {
  return METHOD_IDS.has(normalizePaymentMethod(method));
}

export function getPaymentMethodMeta(method: string) {
  const id = normalizePaymentMethod(method);
  return PAYMENT_METHODS.find((m) => m.id === id) ?? PAYMENT_METHODS[0];
}

export function formatPaymentMethod(method: string): string {
  return getPaymentMethodMeta(method).label;
}

export function validatePaymentReference(method: string, reference?: string): string | null {
  const meta = getPaymentMethodMeta(method);
  const ref = reference?.trim() ?? "";
  if (meta.requiresReference && ref.length < 4) {
    return `${meta.referenceLabel} is required (min. 4 characters).`;
  }
  return null;
}

/** Merchant numbers shown on invoices / patient pay screen (configure in env later). */
export const BD_MERCHANT_ACCOUNTS = {
  bkash: "017XXXXXXXX (Merchant)",
  nagad: "017XXXXXXXX (Merchant)",
  rocket: "ROCKET No. 09XXXXXXXX",
  upay: "Upay Merchant ID: APX-DX",
} as const;
