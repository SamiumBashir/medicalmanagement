"use client";

import * as React from "react";
import Link from "next/link";
import { MOCK_TESTS, MockTest, MockTestParameter } from "@/lib/services/mockData";
import { Plus, Trash2, Layers, CheckCircle2, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestTemplateBuilderPage() {
  const [selectedTestId, setSelectedTestId] = React.useState(MOCK_TESTS[0].id);
  const selectedTest = MOCK_TESTS.find((t) => t.id === selectedTestId) || MOCK_TESTS[0];

  const [parameters, setParameters] = React.useState<MockTestParameter[]>(selectedTest.parameters || []);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  React.useEffect(() => {
    setParameters(selectedTest.parameters || []);
    setSavedSuccess(false);
  }, [selectedTestId]);

  const addParameter = () => {
    const newParam: MockTestParameter = {
      name: "New Biochemical Parameter",
      code: `PARAM_${parameters.length + 1}`,
      unit: "mg/dL",
      parameterType: "NUMERIC",
      referenceRanges: [
        { gender: "MALE", low: 10, high: 50 },
        { gender: "FEMALE", low: 10, high: 45 },
      ],
      criticalLow: 5,
      criticalHigh: 100,
    };
    setParameters([...parameters, newParam]);
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    selectedTest.parameters = parameters;
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard/tests" className="text-xs text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Tests
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Dynamic Test Template Architecture</h1>
          <p className="text-xs text-slate-500 font-mono">
            Define dynamic laboratory parameters, metric units, gender-specific reference intervals, and critical alarm thresholds
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} className="bg-teal-700 hover:bg-teal-800 text-white gap-2 font-medium">
            <Save className="w-4 h-4" />
            Save Template Schema
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Dynamic test template parameters updated! The lab result form will automatically render these fields.</span>
        </div>
      )}

      {/* Select Test Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-slate-400 font-bold block">
            Select Investigation to Configure
          </label>
          <select
            className="h-11 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
          >
            {MOCK_TESTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.code})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500 text-right">
          Department: <strong className="text-slate-900">{selectedTest.category}</strong>
          <span className="block mt-0.5">Specimen: {selectedTest.sampleType}</span>
        </div>
      </div>

      {/* Parameters Builder */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Configured Parameters ({parameters.length})</h3>
            <p className="text-xs text-slate-500 font-mono">
              The technician lab workbench dynamically adapts to these fields without source code changes.
            </p>
          </div>

          <Button onClick={addParameter} size="sm" variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 gap-1.5 font-medium">
            <Plus className="w-4 h-4" />
            Add Parameter
          </Button>
        </div>

        <div className="space-y-4">
          {parameters.map((param, index) => (
            <div
              key={index}
              className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs font-mono"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <Input
                    className="font-bold text-slate-900 h-9 font-sans text-sm bg-white border-slate-300 w-64"
                    value={param.name}
                    onChange={(e) => {
                      const updated = [...parameters];
                      updated[index].name = e.target.value;
                      setParameters(updated);
                    }}
                  />
                  <Input
                    className="h-9 w-24 bg-white border-slate-300 font-mono text-xs"
                    placeholder="Unit"
                    value={param.unit}
                    onChange={(e) => {
                      const updated = [...parameters];
                      updated[index].unit = e.target.value;
                      setParameters(updated);
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    className="h-9 px-2 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                    value={param.parameterType}
                    onChange={(e: any) => {
                      const updated = [...parameters];
                      updated[index].parameterType = e.target.value;
                      setParameters(updated);
                    }}
                  >
                    <option value="NUMERIC">Numeric Value</option>
                    <option value="TEXT">Descriptive Text</option>
                    <option value="SELECT">Status Select</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeParameter(index)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Biological Reference Ranges Male / Female */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3 bg-white rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Male Reference Low–High</span>
                  <span className="text-slate-800 font-bold">
                    {param.referenceRanges?.[0]?.low !== undefined
                      ? `${param.referenceRanges[0].low} – ${param.referenceRanges[0].high} ${param.unit}`
                      : "General Reference"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Female Reference Low–High</span>
                  <span className="text-slate-800 font-bold">
                    {param.referenceRanges?.[1]?.low !== undefined
                      ? `${param.referenceRanges[1].low} – ${param.referenceRanges[1].high} ${param.unit}`
                      : "Same as Male"}
                  </span>
                </div>
                <div>
                  <span className="text-amber-600 block text-[10px] uppercase font-bold">Panic Low Threshold</span>
                  <span className="text-slate-700">{param.criticalLow !== undefined ? `< ${param.criticalLow}` : "None"}</span>
                </div>
                <div>
                  <span className="text-red-600 block text-[10px] uppercase font-bold">Panic High Threshold</span>
                  <span className="text-slate-700">{param.criticalHigh !== undefined ? `> ${param.criticalHigh}` : "None"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
