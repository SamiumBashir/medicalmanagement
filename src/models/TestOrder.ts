import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestOrderItem {
  testId: mongoose.Types.ObjectId;
  testName: string;
  testCode: string;
  price: number;
  sampleId?: mongoose.Types.ObjectId;
  status:
    | "PENDING"
    | "SAMPLE_COLLECTED"
    | "SAMPLE_RECEIVED"
    | "PROCESSING"
    | "RESULT_ENTERED"
    | "VERIFIED"
    | "CANCELLED";
}

export interface ITestOrder extends Document {
  orderId: string;
  patientId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  referringDoctorId?: mongoose.Types.ObjectId;
  items: ITestOrderItem[];
  subtotal: number;
  discount: number;
  discountReason?: string;
  total: number;
  paidAmount: number;
  dueAmount: number;
  priority: "ROUTINE" | "URGENT" | "STAT";
  paymentStatus: "PAID" | "PARTIAL" | "DUE" | "REFUNDED";
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TestOrderItemSchema = new Schema<ITestOrderItem>(
  {
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    testName: { type: String, required: true },
    testCode: { type: String, required: true },
    price: { type: Number, required: true },
    sampleId: { type: Schema.Types.ObjectId, ref: "Sample" },
    status: {
      type: String,
      enum: [
        "PENDING",
        "SAMPLE_COLLECTED",
        "SAMPLE_RECEIVED",
        "PROCESSING",
        "RESULT_ENTERED",
        "VERIFIED",
        "CANCELLED",
      ],
      default: "PENDING",
      index: true,
    },
  },
  { _id: true }
);

const TestOrderSchema = new Schema<ITestOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    referringDoctorId: { type: Schema.Types.ObjectId, ref: "Doctor", index: true },
    items: [TestOrderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    discountReason: { type: String },
    total: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    dueAmount: { type: Number, default: 0, min: 0 },
    priority: {
      type: String,
      enum: ["ROUTINE", "URGENT", "STAT"],
      default: "ROUTINE",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "PARTIAL", "DUE", "REFUNDED"],
      default: "DUE",
      index: true,
    },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const TestOrder: Model<ITestOrder> =
  mongoose.models.TestOrder ||
  mongoose.model<ITestOrder>("TestOrder", TestOrderSchema);
