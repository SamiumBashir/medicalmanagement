import mongoose, { Schema, Document, Model } from "mongoose";
import { LabResultFlag } from "@/types";

export interface IParameterResult {
  parameterKey: string;
  parameterName: string;
  value: string | number;
  numericValue?: number;
  unit?: string;
  referenceRange?: string;
  flag: LabResultFlag;
  isAbnormal: boolean;
  notes?: string;
}

export interface ICorrectionHistory {
  parameterKey: string;
  oldValue: string | number;
  newValue: string | number;
  reason: string;
  changedBy: mongoose.Types.ObjectId;
  changedAt: Date;
}

export interface ILabResult extends Document {
  orderId: mongoose.Types.ObjectId;
  sampleId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  templateId?: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  results: IParameterResult[];
  hasAbnormal: boolean;
  hasCritical: boolean;
  status: "DRAFT" | "SUBMITTED" | "CORRECTION_REQUESTED" | "VERIFIED";
  technicianNotes?: string;
  pathologistComments?: string;
  enteredBy: mongoose.Types.ObjectId;
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  corrections: ICorrectionHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const ParameterResultSchema = new Schema<IParameterResult>(
  {
    parameterKey: { type: String, required: true },
    parameterName: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    numericValue: { type: Number },
    unit: { type: String },
    referenceRange: { type: String },
    flag: {
      type: String,
      enum: ["NORMAL", "LOW", "HIGH", "CRITICAL"],
      default: "NORMAL",
    },
    isAbnormal: { type: Boolean, default: false },
    notes: { type: String },
  },
  { _id: false }
);

const CorrectionHistorySchema = new Schema<ICorrectionHistory>(
  {
    parameterKey: { type: String, required: true },
    oldValue: { type: Schema.Types.Mixed, required: true },
    newValue: { type: Schema.Types.Mixed, required: true },
    reason: { type: String, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    changedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const LabResultSchema = new Schema<ILabResult>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "TestOrder", required: true, index: true },
    sampleId: { type: Schema.Types.ObjectId, ref: "Sample", required: true, index: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, index: true },
    templateId: { type: Schema.Types.ObjectId, ref: "TestTemplate" },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    results: [ParameterResultSchema],
    hasAbnormal: { type: Boolean, default: false, index: true },
    hasCritical: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "CORRECTION_REQUESTED", "VERIFIED"],
      default: "DRAFT",
      index: true,
    },
    technicianNotes: { type: String },
    pathologistComments: { type: String },
    enteredBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    corrections: [CorrectionHistorySchema],
  },
  { timestamps: true }
);

export const LabResult: Model<ILabResult> =
  mongoose.models.LabResult ||
  mongoose.model<ILabResult>("LabResult", LabResultSchema);
