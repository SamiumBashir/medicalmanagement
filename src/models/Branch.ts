import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBranch extends Document {
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  facilities: string[];
  managerId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    openingHours: { type: String, default: "7:00 AM – 11:00 PM" },
    facilities: [{ type: String }],
    managerId: { type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Branch: Model<IBranch> =
  mongoose.models.Branch || mongoose.model<IBranch>("Branch", BranchSchema);
