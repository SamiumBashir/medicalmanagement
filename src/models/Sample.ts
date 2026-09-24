import mongoose, { Schema, Document, Model } from "mongoose";
import { SampleStatus } from "@/types";

export interface ISample extends Document {
  sampleId: string;
  orderId: mongoose.Types.ObjectId;
  orderItemId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  sampleType: string;
  containerType: string;
  status: SampleStatus;
  collectedBy?: mongoose.Types.ObjectId;
  collectedAt?: Date;
  receivedBy?: mongoose.Types.ObjectId;
  receivedAt?: Date;
  processedAt?: Date;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SampleSchema = new Schema<ISample>(
  {
    sampleId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "TestOrder", required: true, index: true },
    orderItemId: { type: Schema.Types.ObjectId, required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    sampleType: { type: String, required: true },
    containerType: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "COLLECTED", "RECEIVED", "PROCESSING", "COMPLETED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    collectedBy: { type: Schema.Types.ObjectId, ref: "User" },
    collectedAt: { type: Date },
    receivedBy: { type: Schema.Types.ObjectId, ref: "User" },
    receivedAt: { type: Date },
    processedAt: { type: Date },
    rejectionReason: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Sample: Model<ISample> =
  mongoose.models.Sample || mongoose.model<ISample>("Sample", SampleSchema);
