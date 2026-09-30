"use client";

import * as React from "react";
import Link from "next/link";
import { dataStore, SampleRecord, ReportRecord } from "@/lib/services/dataStore";
import { submitLabResultsAction } from "@/app/actions/lab.actions";
import { MOCK_TESTS, MockTest } from "@/lib/services/mockData";
import { LabResultFlag } from "@/types";
import { Microscope, AlertTriangle, CheckCircle2, Save, Send, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LaboratoryWorkbenchPage() {
  const [selectedSample, setSelectedSample] = React.useState<SampleRecord | null>(
    dataStore.samples.find((s) => s.status === "PROCESSING" || s.status === "COLLECTED") || dataStore.samples[0]
  );

  const matchedTest = MOCK_TESTS.find(
    (t) => t.name.toLowerCase() === selectedSample?.testName.toLowerCase()
  ) || MOCK_TESTS[0];

  // Dynamic parameters state based on test template
  const [parametersData, setParametersData] = React.useState<
    { name: string; value: string; unit: string; refRange: string; flag: LabResultFlag }[]
  >([]);

  const [clinicalRemarks, setClinicalRemarks] = React.useState(
    "Automated analyzer run complete. Controls and calibrations are valid."
  );
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);

  // Initialize parameters when sample changes
  React.useEffect(() => {
    if (matchedTest && matchedTest.parameters) {
      const initial = matchedTest.parameters.map((p) => {
        const maleRange = p.referenceRanges?.[0];
        const low = maleRange?.low || 0;
        const high = maleRange?.high || 100;
        const defaultVal = ((low + high) / 2).toFixed(1);

        return {
          name: p.name,
          value: defaultVal,
          unit: p.unit,
          refRange: `${low} – ${high}`,
          flag: "NORMAL" as LabResultFlag,
        };
      });
      setParametersData(initial);
    }
  }, [selectedSample, matchedTest]);

  // Dynamic value change with automatic flag calculation (NORMAL, LOW, HIGH, CRITICAL)
  const handleValueChange = (index: number, val: string) => {
    const updated = [...parametersData];
    const num = parseFloat(val);
    const paramDef = matchedTest.parameters?.[index];

    let flag: LabResultFlag = "NORMAL";

    if (!isNaN(num) && paramDef) {
      const low = paramDef.referenceRanges?.[0]?.low ?? 0;
      const high = paramDef.referenceRanges?.[0]?.high ?? 9999;
      const critLow = paramDef.criticalLow;
      const critHigh = paramDef.criticalHigh;

      if (critHigh !== undefined && num >= critHigh) {
        flag = "CRITICAL";
      } else if (critLow !== undefined && num <= critLow) {
        flag = "CRITICAL";
      } else if (num < low) {
        flag = "LOW";
      } else if (num > high) {
        flag = "HIGH";
      }
    }

    updated[index].value = val;
    updated[index].flag = flag;
    setParametersData(updated);
  };

  const handleSubmitForVerification = async () => {
    if (!selectedSample) return;

    try {
      const res = await submitLabResultsAction(
        selectedSample.sampleId,
        parametersData.map((p) => ({
          name: p.name,
          value: p.value,
          unit: p.unit,
          refRange: p.refRange,
          flag: p.flag,
        })),
        clinicalRemarks
      );

      if (res.success) {
        selectedSample.status = "COMPLETED";
        setSubmissionSuccess(true);
        setTimeout(() => setSubmissionSuccess(false), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to submit laboratory results");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laboratory Analytical Workbench</h1>
          <p className="text-xs text-slate-500 font-mono">
            Medical technologist result entry, automated reference interval validation, and doctor verification dispatch
          </p>
        </div>

        <Button asChild variant="outline" className="border-slate-300">
          <Link href="/dashboard/reports">
            Doctor Verification Hub →
          </Link>
        </Button>
      </div>

      {submissionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Analytical findings transmitted to Consultant Pathologist review queue successfully!</span>
          </div>
          <Button asChild size="sm" className="bg-emerald-700 text-white">
            <Link href="/dashboard/reports">View Report</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sample Selection List */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Analyzer Specimens Queue</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {dataStore.samples.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedSample(s)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedSample?.id === s.id
                    ? "bg-teal-50 border-teal-600 shadow-xs"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono font-bold text-teal-800">{s.sampleId}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 font-bold">
                    {s.status}
                  </span>
                </div>
                <strong className="block text-slate-900 text-xs font-semibold">{s.patientName}</strong>
                <span className="text-[11px] text-slate-600">{s.testName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Parameter Entry Form */}
        <div className="lg:col-span-2 space-y-6">
          {selectedSample && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {selectedSample.sampleId}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Order: {selectedSample.orderId}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedSample.testName}</h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Patient: <strong className="text-slate-900">{selectedSample.patientName}</strong> ({selectedSample.patientId}) • Specimen: {selectedSample.sampleType}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSubmitForVerification}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Submit to Doctor
                  </Button>
                </div>
              </div>

              {/* Dynamic Parameter Fields */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                  Dynamic Parameter Results Entry
                </span>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                        <th className="py-2.5 px-3">Analyte Parameter</th>
                        <th className="py-2.5 px-3">Numeric Result</th>
                        <th className="py-2.5 px-3">Metric Unit</th>
                        <th className="py-2.5 px-3">Standard Reference Interval</th>
                        <th className="py-2.5 px-3 text-right">Diagnostic Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {parametersData.map((param, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-semibold text-slate-900 font-sans">{param.name}</td>
                          <td className="py-3 px-3 w-32">
                            <Input
                              type="text"
                              className="h-9 font-bold font-mono text-slate-900 bg-slate-50 border-slate-300"
                              value={param.value}
                              onChange={(e) => handleValueChange(idx, e.target.value)}
                            />
                          </td>
                          <td className="py-3 px-3 text-slate-600">{param.unit}</td>
                          <td className="py-3 px-3 text-slate-600">{param.refRange}</td>
                          <td className="py-3 px-3 text-right">
                            <span
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                param.flag === "NORMAL"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : param.flag === "CRITICAL"
                                  ? "bg-red-100 text-red-800 font-black animate-pulse border border-red-300"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {param.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Technologist Remarks */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <label className="text-xs font-mono uppercase text-slate-500 font-semibold block">
                  Technologist Laboratory Observations
                </label>
                <textarea
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-600"
                  value={clinicalRemarks}
                  onChange={(e) => setClinicalRemarks(e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSubmitForVerification}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-5"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Transmit to Doctor for Digital Verification
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
