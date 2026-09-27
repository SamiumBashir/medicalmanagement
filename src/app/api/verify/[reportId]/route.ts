import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/services/dataStore";
import { MOCK_REPORT_SAMPLE } from "@/lib/services/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const { reportId } = await params;

  // Search in memory reports or fallback to mock
  const report = dataStore.reports.find(
    (r) => r.reportId.toLowerCase() === reportId.toLowerCase()
  ) || (reportId.toLowerCase() === MOCK_REPORT_SAMPLE.reportId.toLowerCase() ? MOCK_REPORT_SAMPLE : null);

  if (!report) {
    return NextResponse.json(
      { found: false, error: "Medical report record not located in verification registry." },
      { status: 404 }
    );
  }

  // Mask patient name for privacy compliance (e.g. "T. Ahmed" or "Tanvir A.")
  const nameParts = report.patientName.split(" ");
  const maskedName =
    nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[1][0]}.***`
      : `${nameParts[0][0]}***`;

  // Return strictly minimal verification data
  return NextResponse.json({
    found: true,
    verification: {
      reportId: report.reportId,
      patientRef: `${maskedName} (${report.patientId})`,
      testName: report.testName,
      category: report.category,
      issuedDate: (report as any).issuedDate || "2026-09-29",
      verifiedAt: report.verifiedAt || "2026-09-29T11:45:00Z",
      verifiedBy: report.verifiedBy || "Certified Consultant Pathologist",
      doctorReg: report.doctorReg || "BMDC Verified",
      branchName: report.branchName,
      status: report.status,
      isAuthentic: report.status === "VERIFIED",
      authenticityHash: report.authenticityHash,
    },
  });
}
