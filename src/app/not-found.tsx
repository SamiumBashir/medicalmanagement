import * as React from "react";
import Link from "next/link";
import { FileQuestion, Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E] shadow-sm mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-1">
        Error 404
      </span>
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Medical Record or Page Not Found
      </h2>
      <p className="text-sm text-slate-600 max-w-md mt-2 mb-6 leading-relaxed">
        The diagnostic service, doctor profile, or report page you requested does not exist or has been relocated to our digital archives.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button variant="medical" asChild className="rounded-xl">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Link>
        </Button>
        <Button variant="outline" asChild className="rounded-xl">
          <a href="tel:10678">
            <Phone className="w-4 h-4 mr-2 text-[#0F766E]" />
            <span>Call Hotline: 10678</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
