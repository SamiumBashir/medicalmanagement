export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "BRANCH_MANAGER"
  | "RECEPTIONIST"
  | "DOCTOR"
  | "TECHNICIAN"
  | "ACCOUNTANT"
  | "PATIENT";

export type SampleStatus =
  | "PENDING"
  | "COLLECTED"
  | "RECEIVED"
  | "PROCESSING"
  | "COMPLETED"
  | "REJECTED";

export type LabResultFlag = "NORMAL" | "LOW" | "HIGH" | "CRITICAL";

export type ReportStatus =
  | "DRAFT"
  | "PENDING_VERIFICATION"
  | "CORRECTION_REQUESTED"
  | "VERIFIED"
  | "CANCELLED";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "WAITING"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type PaymentStatus = "PAID" | "PARTIAL" | "DUE" | "REFUNDED";

export type TokenStatus = "WAITING" | "CALLED" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export type ParameterType = "NUMERIC" | "TEXT" | "SELECT" | "BOOLEAN" | "CALCULATED";
