import mongoose, { Schema, Document, Model } from "mongoose";
import { ParameterType } from "@/types";

export interface ITestParameter {
  key: string;
  name: string;
  type: ParameterType;
  unit?: string;
  generalRange?: string;
  maleRange?: {
    min?: number;
    max?: number;
    text?: string;
  };
  femaleRange?: {
    min?: number;
    max?: number;
    text?: string;
  };
  criticalLow?: number;
  criticalHigh?: number;
  options?: string[];
  calculationFormula?: string;
  displayOrder: number;
  isRequired: boolean;
  notes?: string;
}

export interface ITestTemplate extends Document {
  name: string;
  code: string;
  categoryId: mongoose.Types.ObjectId;
  department: string;
  parameters: ITestParameter[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestParameterSchema = new Schema<ITestParameter>(
  {
    key: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["NUMERIC", "TEXT", "SELECT", "BOOLEAN", "CALCULATED"],
      default: "NUMERIC",
    },
    unit: { type: String, trim: true },
    generalRange: { type: String, trim: true },
    maleRange: { min: Number, max: Number, text: String },
    femaleRange: { min: Number, max: Number, text: String },
    criticalLow: Number,
    criticalHigh: Number,
    options: [String],
    calculationFormula: String,
    displayOrder: { type: Number, default: 0 },
    isRequired: { type: Boolean, default: true },
    notes: String,
  },
  { _id: true }
);

const TestTemplateSchema = new Schema<ITestTemplate>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "TestCategory", required: true, index: true },
    department: { type: String, required: true, index: true },
    parameters: [TestParameterSchema],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const TestTemplate: Model<ITestTemplate> =
  mongoose.models.TestTemplate ||
  mongoose.model<ITestTemplate>("TestTemplate", TestTemplateSchema);
