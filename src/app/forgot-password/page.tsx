import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Mail, ShieldCheck, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Password Recovery | Apex Diagnostics",
  description: "Reset your clinical portal password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#171717] flex flex-col justify-between selection:bg-[#A8D5BA] selection:text-[#171717]">
      {/* Top Header */}
      <header className="w-full border-b border-[#E8E8E3] bg-[#FFFFFF] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] group-hover:bg-[#315C4A] group-hover:text-white transition-all duration-300">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#171717] leading-tight">
                Apex Diagnostics
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#70706B] -mt-0.5">
                Precision Medical Center
              </span>
            </div>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#70706B] hover:text-[#171717] transition-colors px-3 py-1.5 rounded-full hover:bg-[#DDEDE3]/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Recovery Card */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E8E8E3] rounded-[32px] p-8 sm:p-10 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#DDEDE3] text-[#315C4A] flex items-center justify-center mx-auto mb-4 border border-[#A8D5BA]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl text-[#171717] font-normal tracking-tight mb-2">
            Reset Password
          </h1>
          <p className="text-xs text-[#70706B] mb-6 leading-relaxed">
            Enter your registered email address. We will transmit an authorized recovery token to reset your clinical portal access.
          </p>

          <form className="space-y-4">
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#70706B]" />
              <input
                type="email"
                required
                placeholder="name@diagnoaid.com"
                className="w-full pl-11 pr-4 py-3 bg-[#F7F7F3] border border-[#E8E8E3] rounded-full text-sm text-[#171717] placeholder:text-[#70706B]/60 focus:outline-none focus:border-[#315C4A] focus:bg-[#FFFFFF] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#A8D5BA] hover:bg-[#315C4A] text-[#171717] hover:text-white py-3.5 px-6 font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-[0.99]"
            >
              Transmit Recovery Link
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#E8E8E3]">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#315C4A] hover:underline font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#E8E8E3] bg-[#FFFFFF] py-4 px-6 text-center text-xs text-[#70706B]">
        <p>© 2026 Apex Diagnostics Center. All rights reserved.</p>
      </footer>
    </div>
  );
}
