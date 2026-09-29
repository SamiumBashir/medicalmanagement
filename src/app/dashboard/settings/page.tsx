"use client";

import * as React from "react";
import { Settings, Save, CheckCircle2, Shield, Building2, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardSettingsPage() {
  const [saved, setSaved] = React.useState(false);
  const [settings, setSettings] = React.useState({
    centerName: "DiagnostiCare Advanced Diagnostic Center",
    tagline: "Precision Diagnostics. Better Healthcare Decisions.",
    hotline: "+880 2 966 8400",
    emergencyPhone: "+880 1819 000 111",
    email: "contact@diagnoaid.com",
    reportPrefix: "RPT-2026-",
    patientPrefix: "PAT-2026-",
    invoicePrefix: "INV-2026-",
    samplePrefix: "SMP-2026-",
    requireDualSignature: false,
    autoNotifyCriticalValues: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hospital System Configuration</h1>
          <p className="text-xs text-slate-500 font-mono">
            Institution metadata, numbering prefix formats, panic value thresholds, and security parameters
          </p>
        </div>

        <Button onClick={handleSave} className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>System configuration parameters committed and active!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Center Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <h3>Center Identity & Public Letterhead</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-500">Institution Name</label>
              <Input
                value={settings.centerName}
                onChange={(e) => setSettings({ ...settings, centerName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-500">Public Tagline</label>
              <Input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-500">Reception Hotline</label>
              <Input
                value={settings.hotline}
                onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-500">Emergency Phone</label>
              <Input
                value={settings.emergencyPhone}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-500">Inquiry Email</label>
              <Input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Numbering Prefixes */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
            <FileText className="w-5 h-5 text-teal-700" />
            <h3>Automated Identifier Prefixes</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase">Report Prefix</label>
              <Input
                value={settings.reportPrefix}
                onChange={(e) => setSettings({ ...settings, reportPrefix: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase">Patient Prefix</label>
              <Input
                value={settings.patientPrefix}
                onChange={(e) => setSettings({ ...settings, patientPrefix: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase">Invoice Prefix</label>
              <Input
                value={settings.invoicePrefix}
                onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase">Sample Prefix</label>
              <Input
                value={settings.samplePrefix}
                onChange={(e) => setSettings({ ...settings, samplePrefix: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Clinical Policies & Safety */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
            <Shield className="w-5 h-5 text-teal-700" />
            <h3>Clinical Safety & Panic Value Dispatch</h3>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoNotifyCriticalValues}
                onChange={(e) => setSettings({ ...settings, autoNotifyCriticalValues: e.target.checked })}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Trigger instant SMS & dashboard panic alert on critical / panic laboratory values</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireDualSignature}
                onChange={(e) => setSettings({ ...settings, requireDualSignature: e.target.checked })}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>Require dual-pathologist digital authorization for malignant histology biopsy reports</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-5">
            Commit System Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
