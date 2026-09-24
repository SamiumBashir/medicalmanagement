import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
  recipientId: mongoose.Types.ObjectId;
  recipientModel: "User" | "Patient";
  type:
    | "APPOINTMENT"
    | "SAMPLE_COLLECTED"
    | "RESULT_READY"
    | "REPORT_VERIFIED"
    | "CRITICAL_ALERT"
    | "PAYMENT_RECEIVED"
    | "CORRECTION_REQUEST";
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipientId: { type: Schema.Types.ObjectId, required: true, index: true },
    recipientModel: { type: String, enum: ["User", "Patient"], default: "User" },
    type: {
      type: String,
      required: true,
      enum: [
        "APPOINTMENT",
        "SAMPLE_COLLECTED",
        "RESULT_READY",
        "REPORT_VERIFIED",
        "CRITICAL_ALERT",
        "PAYMENT_RECEIVED",
        "CORRECTION_REQUEST",
      ],
      index: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    actionUrl: { type: String },
    isRead: { type: Boolean, default: false, index: true },
    readAt: { type: Date },
  },
  { timestamps: true }
);

export const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);
