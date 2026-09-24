import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISetting extends Document {
  centerName: string;
  logoUrl?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  reportHeader?: string;
  reportFooter?: string;
  patientIdPrefix: string;
  orderIdPrefix: string;
  sampleIdPrefix: string;
  reportIdPrefix: string;
  invoiceIdPrefix: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    centerName: { type: String, required: true, default: "DiagnostiCare Reference Center" },
    logoUrl: { type: String },
    address: { type: String, required: true, default: "Plot 42, Health Avenue, Dhaka 1212" },
    phone: { type: String, required: true, default: "+880 1700-000000" },
    email: { type: String, required: true, default: "info@diagnosticare.com" },
    website: { type: String, default: "https://diagnosticare.com" },
    reportHeader: { type: String, default: "DIAGNOSTICARE ADVANCED MOLECULAR & CLINICAL LABORATORY" },
    reportFooter: { type: String, default: "Reports are electronically verified and valid without physical signature." },
    patientIdPrefix: { type: String, default: "DC" },
    orderIdPrefix: { type: String, default: "ORD" },
    sampleIdPrefix: { type: String, default: "SMP" },
    reportIdPrefix: { type: String, default: "REP" },
    invoiceIdPrefix: { type: String, default: "INV" },
    currency: { type: String, default: "BDT" },
  },
  { timestamps: true }
);

export const Setting: Model<ISetting> =
  mongoose.models.Setting ||
  mongoose.model<ISetting>("Setting", SettingSchema);
