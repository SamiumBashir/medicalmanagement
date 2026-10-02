import type { PaymentMethod } from "@/lib/payments/bd-payment-methods";
import { MOCK_TESTS, MOCK_DOCTORS, MOCK_BRANCHES, MOCK_REPORT_SAMPLE } from "./mockData";
import { UserRole, SampleStatus, LabResultFlag, ReportStatus, AppointmentStatus, TokenStatus } from "@/types";

export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  phone: string;
  email?: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  bloodGroup?: string;
  address?: string;
  registeredAt: string;
}

export interface AppointmentRecord {
  id: string;
  appointmentId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  branchId: string;
  branchName: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface TestOrderRecord {
  id: string;
  orderId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  branchId: string;
  branchName: string;
  tests: {
    testId: string;
    testCode: string;
    testName: string;
    price: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: "PAID" | "PARTIAL" | "DUE";
  tokenNumber: string;
  tokenStatus: TokenStatus;
  orderDate: string;
}

export interface SampleRecord {
  id: string;
  sampleId: string;
  orderId: string;
  patientId: string;
  patientName: string;
  testName: string;
  sampleType: string;
  status: SampleStatus;
  collectedAt?: string;
  collectedBy?: string;
  rejectionReason?: string;
}

export interface ReportRecord {
  id: string;
  reportId: string;
  orderId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "MALE" | "FEMALE" | "OTHER";
  testName: string;
  category: string;
  sampleType: string;
  status: ReportStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  doctorReg?: string;
  branchName: string;
  authenticityHash: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    refRange: string;
    flag: LabResultFlag;
  }[];
  clinicalRemarks?: string;
  issuedDate: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceId: string;
  orderId: string;
  patientId: string;
  patientName: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  discount: number;
  total: number;
  paid: number;
  due: number;
  status: "PAID" | "PARTIAL" | "DUE";
  date: string;
}

export interface PaymentRecord {
  id: string;
  transactionId: string;
  invoiceId: string;
  orderId: string;
  patientName: string;
  amount: number;
  method: PaymentMethod | "MOBILE_BANKING";
  transactionReference?: string;
  receivedBy: string;
  date: string;
  notes?: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  entityId: string;
  details: string;
}

// Global in-memory singleton to persist state across hot reloads and API calls
interface GlobalDataStore {
  patients: PatientRecord[];
  appointments: AppointmentRecord[];
  orders: TestOrderRecord[];
  samples: SampleRecord[];
  reports: ReportRecord[];
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
  auditLogs: AuditLogRecord[];
  currentTokenIndex: number;
}

declare global {
  var __globalDiagnosticDataStore: GlobalDataStore | undefined;
}

function initializeStore(): GlobalDataStore {
  const initialPatients: PatientRecord[] = [
    {
      id: "pat-1",
      patientId: "PAT-2026-000001",
      name: "Tanvir Ahmed",
      phone: "+880 1711 987654",
      email: "tanvir.ahmed@example.com",
      age: 42,
      gender: "MALE",
      bloodGroup: "B+",
      address: "House 12, Road 5, Dhanmondi, Dhaka",
      registeredAt: "2026-09-28T09:15:00Z",
    },
    {
      id: "pat-2",
      patientId: "PAT-2026-000002",
      name: "Nusrat Jahan Chowdhury",
      phone: "+880 1819 123456",
      email: "nusrat.c@example.com",
      age: 35,
      gender: "FEMALE",
      bloodGroup: "O+",
      address: "Flat 4B, Gulshan Lakeview, Dhaka",
      registeredAt: "2026-09-28T11:30:00Z",
    },
    {
      id: "pat-3",
      patientId: "PAT-2026-000003",
      name: "Kamrul Hasan",
      phone: "+880 1912 345678",
      email: "k.hasan@example.com",
      age: 58,
      gender: "MALE",
      bloodGroup: "A+",
      address: "Sector 11, Uttara, Dhaka",
      registeredAt: "2026-09-29T08:00:00Z",
    },
  ];

  const initialAppointments: AppointmentRecord[] = [
    {
      id: "apt-1",
      appointmentId: "APT-2026-000301",
      patientName: "Tanvir Ahmed",
      patientPhone: "+880 1711 987654",
      patientEmail: "tanvir.ahmed@example.com",
      doctorId: "doc-1",
      doctorName: "Prof. Dr. Mizanur Rahman",
      doctorSpecialization: "Clinical Pathology & Hematology",
      branchId: "branch-dhanmondi",
      branchName: "Dhanmondi Main Diagnostic Hub",
      appointmentDate: "2026-09-30",
      appointmentTime: "10:30 AM",
      reason: "Consultation regarding abnormal leukocyte variance",
      status: "CONFIRMED",
      createdAt: "2026-09-28T10:00:00Z",
    },
    {
      id: "apt-2",
      appointmentId: "APT-2026-000302",
      patientName: "Nusrat Jahan Chowdhury",
      patientPhone: "+880 1819 123456",
      patientEmail: "nusrat.c@example.com",
      doctorId: "doc-2",
      doctorName: "Dr. Farzana Chowdhury",
      doctorSpecialization: "Radiology, CT & High-Resolution USG",
      branchId: "branch-gulshan",
      branchName: "Gulshan Premium Center",
      appointmentDate: "2026-10-01",
      appointmentTime: "11:00 AM",
      reason: "Post-cholecystectomy ultrasound follow-up",
      status: "SCHEDULED",
      createdAt: "2026-09-28T14:20:00Z",
    },
    {
      id: "apt-3",
      appointmentId: "APT-2026-000303",
      patientName: "Kamrul Hasan",
      patientPhone: "+880 1912 345678",
      doctorId: "doc-3",
      doctorName: "Dr. Tariq Ahmed Khan",
      doctorSpecialization: "Preventive Cardiology & Echo Diagnostics",
      branchId: "branch-dhanmondi",
      branchName: "Dhanmondi Main Diagnostic Hub",
      appointmentDate: "2026-09-29",
      appointmentTime: "05:00 PM",
      reason: "Dyspnea on exertion and chest tightness",
      status: "CONFIRMED",
      createdAt: "2026-09-29T08:30:00Z",
    },
  ];

  const initialOrders: TestOrderRecord[] = [
    {
      id: "ord-1",
      orderId: "ORD-2026-000123",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      patientPhone: "+880 1711 987654",
      branchId: "branch-dhanmondi",
      branchName: "Dhanmondi Main Diagnostic Hub",
      tests: [
        { testId: "test-cbc", testCode: "HEM-001", testName: "Complete Blood Count (CBC) with ESR", price: 550 },
        { testId: "test-lipid", testCode: "BIO-004", testName: "Comprehensive Lipid Profile", price: 1200 },
        { testId: "test-hba1c", testCode: "BIO-008", testName: "Glycated Hemoglobin (HbA1c) HPLC", price: 900 },
      ],
      subtotal: 2650,
      discount: 265,
      total: 2385,
      paidAmount: 2385,
      dueAmount: 0,
      paymentStatus: "PAID",
      tokenNumber: "TKN-042",
      tokenStatus: "COMPLETED",
      orderDate: "2026-09-29T08:15:00Z",
    },
    {
      id: "ord-2",
      orderId: "ORD-2026-000124",
      patientId: "PAT-2026-000002",
      patientName: "Nusrat Jahan Chowdhury",
      patientPhone: "+880 1819 123456",
      branchId: "branch-gulshan",
      branchName: "Gulshan Premium Center",
      tests: [
        { testId: "test-lft", testCode: "BIO-012", testName: "Liver Function Test (LFT) Panel", price: 1400 },
        { testId: "test-usg-abdomen", testCode: "USG-002", testName: "USG Whole Abdomen with Post-Void Residual", price: 2200 },
      ],
      subtotal: 3600,
      discount: 360,
      total: 3240,
      paidAmount: 2000,
      dueAmount: 1240,
      paymentStatus: "PARTIAL",
      tokenNumber: "TKN-043",
      tokenStatus: "PROCESSING",
      orderDate: "2026-09-29T09:30:00Z",
    },
  ];

  const initialSamples: SampleRecord[] = [
    {
      id: "smp-1",
      sampleId: "SMP-2026-000451",
      orderId: "ORD-2026-000123",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      testName: "Complete Blood Count (CBC) with ESR",
      sampleType: "Whole Blood (EDTA)",
      status: "COMPLETED",
      collectedAt: "2026-09-29T08:30:00Z",
      collectedBy: "Phlebotomist Rafiqul Islam",
    },
    {
      id: "smp-2",
      sampleId: "SMP-2026-000452",
      orderId: "ORD-2026-000123",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      testName: "Comprehensive Lipid Profile",
      sampleType: "Serum (Plain Tube)",
      status: "PROCESSING",
      collectedAt: "2026-09-29T08:35:00Z",
      collectedBy: "Phlebotomist Rafiqul Islam",
    },
    {
      id: "smp-3",
      sampleId: "SMP-2026-000453",
      orderId: "ORD-2026-000124",
      patientId: "PAT-2026-000002",
      patientName: "Nusrat Jahan Chowdhury",
      testName: "Liver Function Test (LFT) Panel",
      sampleType: "Serum",
      status: "COLLECTED",
      collectedAt: "2026-09-29T09:45:00Z",
      collectedBy: "Nurse Farhana Yasmin",
    },
  ];

  const initialReports: ReportRecord[] = [
    {
      id: "rpt-1",
      reportId: MOCK_REPORT_SAMPLE.reportId,
      orderId: MOCK_REPORT_SAMPLE.orderId,
      patientId: MOCK_REPORT_SAMPLE.patientId,
      patientName: MOCK_REPORT_SAMPLE.patientName,
      patientAge: MOCK_REPORT_SAMPLE.age,
      patientGender: "MALE",
      testName: MOCK_REPORT_SAMPLE.testName,
      category: MOCK_REPORT_SAMPLE.category,
      sampleType: MOCK_REPORT_SAMPLE.sampleType,
      status: "VERIFIED",
      verifiedAt: MOCK_REPORT_SAMPLE.verifiedAt,
      verifiedBy: MOCK_REPORT_SAMPLE.verifiedBy,
      doctorReg: MOCK_REPORT_SAMPLE.doctorReg,
      branchName: MOCK_REPORT_SAMPLE.branchName,
      authenticityHash: MOCK_REPORT_SAMPLE.authenticityHash,
      results: MOCK_REPORT_SAMPLE.results as ReportRecord["results"],
      clinicalRemarks: MOCK_REPORT_SAMPLE.clinicalRemarks,
      issuedDate: "2026-09-29",
    },
    {
      id: "rpt-2",
      reportId: "RPT-2026-001246",
      orderId: "ORD-2026-000123",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      patientAge: 42,
      patientGender: "MALE",
      testName: "Glycated Hemoglobin (HbA1c) HPLC",
      category: "Clinical Biochemistry",
      sampleType: "Whole Blood (EDTA)",
      status: "PENDING_VERIFICATION",
      branchName: "Dhanmondi Main Diagnostic Hub",
      authenticityHash: "SHA256-b789123acdeff01234a56",
      results: [
        { parameter: "HbA1c Concentration", value: "5.4", unit: "%", refRange: "4.0 - 5.6", flag: "NORMAL" },
        { parameter: "Estimated Average Glucose (eAG)", value: "108", unit: "mg/dL", refRange: "70 - 115", flag: "NORMAL" },
      ],
      clinicalRemarks: "Good glycemic equilibrium noted over previous 3-month cycle.",
      issuedDate: "2026-09-29",
    },
  ];

  const initialInvoices: InvoiceRecord[] = [
    {
      id: "inv-1",
      invoiceId: "INV-2026-001245",
      orderId: "ORD-2026-000123",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      items: [
        { description: "Complete Blood Count (CBC) with ESR", amount: 550 },
        { description: "Comprehensive Lipid Profile", amount: 1200 },
        { description: "Glycated Hemoglobin (HbA1c) HPLC", amount: 900 },
      ],
      subtotal: 2650,
      discount: 265,
      total: 2385,
      paid: 2385,
      due: 0,
      status: "PAID",
      date: "2026-09-29T08:15:00Z",
    },
    {
      id: "inv-2",
      invoiceId: "INV-2026-001246",
      orderId: "ORD-2026-000124",
      patientId: "PAT-2026-000002",
      patientName: "Nusrat Jahan Chowdhury",
      items: [
        { description: "Liver Function Test (LFT) Panel", amount: 1400 },
        { description: "USG Whole Abdomen with Post-Void Residual", amount: 2200 },
      ],
      subtotal: 3600,
      discount: 360,
      total: 3240,
      paid: 2000,
      due: 1240,
      status: "PARTIAL",
      date: "2026-09-29T09:30:00Z",
    },
    {
      id: "inv-3",
      invoiceId: "INV-2026-001247",
      orderId: "ORD-2026-000125",
      patientId: "PAT-2026-000001",
      patientName: "Tanvir Ahmed",
      items: [{ description: "Thyroid Profile (T3, T4, TSH)", amount: 950 }],
      subtotal: 950,
      discount: 95,
      total: 855,
      paid: 0,
      due: 855,
      status: "DUE",
      date: "2026-09-30T10:00:00Z",
    },
  ];

  const initialPayments: PaymentRecord[] = [
    {
      id: "pay-1",
      transactionId: "TXN-2026-000891",
      invoiceId: "INV-2026-001245",
      orderId: "ORD-2026-000123",
      patientName: "Tanvir Ahmed",
      amount: 2385,
      method: "CARD",
      transactionReference: "Auth-981240",
      receivedBy: "Cashier Shahriar",
      date: "2026-09-29T08:17:00Z",
      notes: "Visa POS settlement",
    },
    {
      id: "pay-2",
      transactionId: "TXN-2026-000892",
      invoiceId: "INV-2026-001246",
      orderId: "ORD-2026-000124",
      patientName: "Nusrat Jahan Chowdhury",
      amount: 2000,
      method: "BKASH",
      transactionReference: "9JK81A78B",
      receivedBy: "Cashier Shahriar",
      date: "2026-09-29T09:32:00Z",
      notes: "bKash personal → merchant payment",
    },
  ];

  const initialAuditLogs: AuditLogRecord[] = [
    {
      id: "aud-1",
      timestamp: "2026-09-29T11:45:00Z",
      userName: "Prof. Dr. Mizanur Rahman",
      userRole: "DOCTOR",
      action: "REPORT_VERIFIED",
      entity: "Report",
      entityId: "RPT-2026-001245",
      details: "Digitally signed and certified CBC diagnostic report following review.",
    },
    {
      id: "aud-2",
      timestamp: "2026-09-29T09:32:00Z",
      userName: "Receptionist Anwar",
      userRole: "RECEPTIONIST",
      action: "PAYMENT_RECORDED",
      entity: "Payment",
      entityId: "TXN-2026-000892",
      details: "Received partial payment ৳2,000 for invoice INV-2026-001246.",
    },
    {
      id: "aud-3",
      timestamp: "2026-09-29T08:30:00Z",
      userName: "Tech. Rafiqul Islam",
      userRole: "TECHNICIAN",
      action: "SAMPLE_COLLECTED",
      entity: "Sample",
      entityId: "SMP-2026-000451",
      details: "Phlebotomy blood specimen collected in K2-EDTA vacutainer.",
    },
  ];

  return {
    patients: initialPatients,
    appointments: initialAppointments,
    orders: initialOrders,
    samples: initialSamples,
    reports: initialReports,
    invoices: initialInvoices,
    payments: initialPayments,
    auditLogs: initialAuditLogs,
    currentTokenIndex: 43,
  };
}

if (!global.__globalDiagnosticDataStore) {
  global.__globalDiagnosticDataStore = initializeStore();
}

export const dataStore = global.__globalDiagnosticDataStore;
