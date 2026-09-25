import * as React from "react";
import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E] shadow-sm animate-pulse">
          <Activity className="w-8 h-8 animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-2xl ring-2 ring-[#0F766E]/20 animate-ping" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 mt-6">
        Loading Diagnostic Center...
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Connecting to medical laboratory records
      </p>
    </div>
  );
}
