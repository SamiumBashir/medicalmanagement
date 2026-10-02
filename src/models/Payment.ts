import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  paymentId: string;
  invoiceId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  amount: number;
  method:
    | "CASH"
    | "BKASH"
    | "NAGAD"
    | "ROCKET"
    | "UPAY"
    | "CELLFIN"
    | "BANK_TRANSFER"
    | "CARD"
    | "MOBILE_BANKING"
    | "ONLINE";
  transactionReference?: string;
  isRefund: boolean;
  refundReason?: string;
  receivedBy: mongoose.Types.ObjectId;
  receivedAt: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      required: true,
      enum: [
        "CASH",
        "BKASH",
        "NAGAD",
        "ROCKET",
        "UPAY",
        "CELLFIN",
        "BANK_TRANSFER",
        "CARD",
        "MOBILE_BANKING",
        "ONLINE",
      ],
      default: "CASH",
    },
    transactionReference: { type: String, trim: true },
    isRefund: { type: Boolean, default: false, index: true },
    refundReason: { type: String },
    receivedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receivedAt: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
