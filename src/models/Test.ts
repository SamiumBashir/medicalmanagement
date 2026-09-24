import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITest extends Document {
  name: string;
  code: string;
  categoryId: mongoose.Types.ObjectId;
  templateId?: mongoose.Types.ObjectId;
  department: string;
  sampleType: string;
  containerType: string;
  price: number;
  turnaroundTimeHours: number;
  fastingRequired: boolean;
  preparationInstructions?: string;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema = new Schema<ITest>(
  {
    name: { type: String, required: true, trim: true, index: true },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    categoryId: { type: Schema.Types.ObjectId, ref: "TestCategory", required: true, index: true },
    templateId: { type: Schema.Types.ObjectId, ref: "TestTemplate", index: true },
    department: { type: String, required: true, index: true },
    sampleType: { type: String, required: true, trim: true },
    containerType: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    turnaroundTimeHours: { type: Number, default: 4 },
    fastingRequired: { type: Boolean, default: false },
    preparationInstructions: { type: String },
    isPopular: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Test: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);
