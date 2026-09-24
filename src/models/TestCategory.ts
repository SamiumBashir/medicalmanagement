import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestCategory extends Document {
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestCategorySchema = new Schema<ITestCategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    description: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const TestCategory: Model<ITestCategory> =
  mongoose.models.TestCategory ||
  mongoose.model<ITestCategory>("TestCategory", TestCategorySchema);
