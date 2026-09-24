import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDoctor extends Document {
  doctorId: string;
  userId?: mongoose.Types.ObjectId;
  name: string;
  qualification: string;
  specialization: string;
  registrationNumber: string;
  department: string;
  phone: string;
  email: string;
  visitingDays: string[];
  visitingHours: string;
  consultationFee: number;
  profileImageUrl?: string;
  signatureUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true, trim: true },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true, index: true },
    registrationNumber: { type: String, required: true, unique: true, trim: true, index: true },
    department: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    visitingDays: [{ type: String }],
    visitingHours: { type: String, default: "5:00 PM – 9:00 PM" },
    consultationFee: { type: Number, default: 1200 },
    profileImageUrl: { type: String },
    signatureUrl: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);
