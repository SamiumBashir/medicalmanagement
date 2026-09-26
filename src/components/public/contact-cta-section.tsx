"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactCTASection() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "Report Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Channels & Urgent Help (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif font-bold text-[#171717] w-6 h-6 rounded-full border border-[#171717]/40 flex items-center justify-center">
                  6
                </span>
                <div className="h-[1px] w-10 bg-[#171717]/30" />
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#70706B] font-semibold">
                  Contact
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] tracking-tight font-normal">
                Connect with our clinical desk
              </h2>

              <p className="text-sm text-[#70706B] leading-relaxed">
                Have questions regarding test preparation, report delivery times, or specialist visits? Our care desk is available 24/7.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-[28px] bg-[#F7F7F3] border border-[#E8E8E3] shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DDEDE3] border border-[#E8E8E3] flex items-center justify-center text-[#315C4A] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-mono tracking-wider text-[#70706B]">
                    Emergency Hotline & Dispatch
                  </p>
                  <p className="text-xl font-bold font-mono text-[#171717] mt-0.5">10678</p>
                  <p className="text-xs text-[#70706B] mt-0.5">
                    Direct line for ambulances & emergency tests (24/7)
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-[28px] bg-[#F7F7F3] border border-[#E8E8E3] shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DDEDE3] border border-[#E8E8E3] flex items-center justify-center text-[#315C4A] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-mono tracking-wider text-[#70706B]">
                    Electronic Records & Billing Desk
                  </p>
                  <p className="text-sm font-bold text-[#171717] mt-0.5">
                    support@apexdiagnostics.com.bd
                  </p>
                  <p className="text-xs text-[#70706B] mt-0.5">
                    Average email response within 30 minutes
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-[28px] bg-[#F7F7F3] border border-[#E8E8E3] shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#DDEDE3] border border-[#E8E8E3] flex items-center justify-center text-[#315C4A] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-mono tracking-wider text-[#70706B]">
                    Clinical Testing Hours
                  </p>
                  <p className="text-sm font-bold text-[#171717] mt-0.5">
                    Regular: 7:00 AM – 11:00 PM
                  </p>
                  <p className="text-xs text-[#315C4A] font-semibold mt-0.5">
                    Emergency Pathology & 3.0T MRI: 24 Hours / 7 Days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Patient Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F7F7F3] border border-[#E8E8E3] rounded-[36px] p-8 sm:p-10 lg:p-12 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DDEDE3] text-[#315C4A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">Inquiry received</h3>
                <p className="text-xs sm:text-sm text-[#70706B] max-w-md mx-auto">
                  Thank you for reaching out. A medical coordinator has received your request and will contact you via phone or email shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border-[#E8E8E3] text-xs font-semibold"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#171717]">Send an inquiry</h3>
                  <p className="text-xs text-[#70706B]">
                    Please provide your contact details and message below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#70706B] font-semibold">
                      Full name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Mahfuzur Rahman"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 bg-white border-[#E8E8E3] rounded-full px-5 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#70706B] font-semibold">
                      Email address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 bg-white border-[#E8E8E3] rounded-full px-5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#70706B] font-semibold">
                      Phone number
                    </label>
                    <Input
                      placeholder="+880 1XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 bg-white border-[#E8E8E3] rounded-full px-5 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-[#70706B] font-semibold">
                      Inquiry subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 px-4 bg-white border border-[#E8E8E3] rounded-full text-xs sm:text-sm text-[#171717] outline-none"
                    >
                      <option value="Report Inquiry">Report Delivery & Inquiry</option>
                      <option value="Test Preparation">Test Preparation Guidelines</option>
                      <option value="Home Sample">Home Sample Collection</option>
                      <option value="Doctor Appointment">Specialist Appointment</option>
                      <option value="Corporate / Billing">Corporate Health Packages</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#70706B] font-semibold">
                    Message / Test details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about the test, doctor recommendation, or questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-white border border-[#E8E8E3] rounded-2xl text-xs sm:text-sm text-[#171717] placeholder:text-[#70706B] outline-none focus:border-[#A8D5BA]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="medical"
                  size="lg"
                  className="w-full rounded-full py-6 text-xs sm:text-sm font-semibold shadow-sm"
                >
                  <span>Submit inquiry</span>
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
