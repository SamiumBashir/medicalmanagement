"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log safe error telemetry without exposing internal details to patient
    console.error("Diagnostic System Client Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-sm mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
        A Temporary System Error Occurred
      </h2>
      <p className="text-sm text-slate-600 max-w-md mt-2 mb-6 leading-relaxed">
        Our medical services platform encountered an unexpected issue. Please retry or contact our emergency help desk at 10678.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="medical" onClick={() => reset()} className="rounded-xl">
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>Retry Operation</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/")}
          className="rounded-xl"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
