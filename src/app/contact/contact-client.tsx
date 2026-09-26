"use client";

import * as React from "react";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_BRANCHES } from "@/lib/services/mockData";

export function ContactClient() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form: Pure White #FFFFFF */}
        <div className="lg:col-span-2 bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315C4A] font-bold block mb-2">
            Online Communication
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
            Send an Inquiry or Feedback
          </h2>

          {submitted ? (
            <div className="bg-[#DDEDE3] border border-[#A8D5BA]/60 rounded-2xl p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#315C4A] mx-auto" />
              <h3 className="text-xl font-bold text-[#171717]">Message Received</h3>
              <p className="text-[#70706B] max-w-md mx-auto text-sm">
                Thank you for contacting Apex Diagnostics. Our patient coordination desk will respond to your inquiry within 2 to 4 business hours.
              </p>
              <Button
                variant="outline"
                className="border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                }}
              >
                Send Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Full Name *</label>
                  <Input
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-[#E8E8E3] focus:border-[#315C4A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Phone Number *</label>
                  <Input
                    required
                    placeholder="+880 1XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-[#E8E8E3] focus:border-[#315C4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Email Address</label>
                  <Input
                    type="email"
                    placeholder="tanvir@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-[#E8E8E3] focus:border-[#315C4A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Inquiry Topic</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:border-[#315C4A]"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Home Sample Collection">Home Sample Collection</option>
                    <option value="Test Pricing & Prep">Test Pricing & Preparation</option>
                    <option value="Corporate Health Packages">Corporate Health Packages</option>
                    <option value="Doctor Appointment Support">Doctor Appointment Support</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Message Details *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your inquiry or requirement..."
                  className="w-full p-3 rounded-md border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:outline-none focus:ring-2 focus:ring-[#315C4A]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" disabled={loading} variant="medical" className="w-full sm:w-auto px-8 py-6">
                {loading ? "Transmitting..." : "Submit Inquiry"}
              </Button>
            </form>
          )}
        </div>

        {/* Hotlines and Branch Quick Contacts */}
        <div className="space-y-8">
          <div className="bg-[#171717] text-white p-8 rounded-3xl border border-[#262626] shadow-xl space-y-6">
            <span className="text-xs font-mono uppercase text-[#A8D5BA] font-bold block">
              Emergency Services
            </span>
            <h3 className="text-2xl font-bold text-white">24/7 Clinical Hotlines</h3>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-[#222222] rounded-2xl border border-[#315C4A]/40">
                <span className="text-xs font-mono text-[#70706B] block mb-1">Central Ambulance & Urgent Sampling</span>
                <a href="tel:+8801819000111" className="text-xl font-bold font-mono text-[#A8D5BA] hover:underline">
                  +880 1819 000 111
                </a>
              </div>

              <div className="p-4 bg-[#222222] rounded-2xl border border-[#315C4A]/40">
                <span className="text-xs font-mono text-[#70706B] block mb-1">Dedicated Reception & Appointments</span>
                <a href="tel:+88029668400" className="text-lg font-bold font-mono text-[#DDEDE3] hover:underline">
                  +880 2 966 8400
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E8E8E3] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#171717]">Branch Locators</h3>
            <div className="space-y-3">
              {MOCK_BRANCHES.map((b) => (
                <div key={b.id} className="p-3 bg-[#F7F7F3] rounded-xl border border-[#E8E8E3] text-xs">
                  <strong className="block text-[#171717] text-sm mb-0.5">{b.name}</strong>
                  <span className="text-[#70706B] block mb-1">{b.address}</span>
                  <span className="font-mono text-[#315C4A] font-semibold">{b.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
