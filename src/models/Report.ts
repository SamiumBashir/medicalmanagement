import mongoose, { Schema, Document, Model } from "mongoose";
import { ReportStatus } from "@/types";

export interface IReport extends Document {
  reportId: string;
  orderId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  branchId: mongoose.Types.ObjectId;
  testIds: mongoose.Types.ObjectId[];
  labResultIds: mongoose.Types.ObjectId[];
  status: ReportStatus;
  verifyingDoctorId?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  verificationToken: string;
  doctorComments?: string;
  correctionReason?: string;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "TestOrder", required: true, index: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true, index: true },
    branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
    testIds: [{ type: Schema.Types.ObjectId, ref: "Test" }],
    labResultIds: [{ type: Schema.Types.ObjectId, ref: "LabResult" }],
    status: {
      type: String,
      enum: [
        "DRAFT",
        "PENDING_VERIFICATION",
        "CORRECTION_REQUESTED",
        "VERIFIED",
        "CANCELLED",
      ],
      default: "DRAFT",
      index: true,
    },
    verifyingDoctorId: { type: Schema.Types.ObjectId, ref: "Doctor", index: true },
    verifiedAt: { type: Date },
    verificationToken: { type: String, required: true, unique: true, index: true },
    doctorComments: { type: String },
    correctionReason: { type: String },
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

export const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);
