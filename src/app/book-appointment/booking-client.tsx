"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_DOCTORS, MOCK_BRANCHES } from "@/lib/services/mockData";
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle2, ShieldCheck, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookingClient() {
  const searchParams = useSearchParams();
  const preselectedDoctor = searchParams.get("doctor") || "";
  const preselectedBranch = searchParams.get("branch") || "";

  const [doctorId, setDoctorId] = React.useState(preselectedDoctor || MOCK_DOCTORS[0].id);
  const [branchId, setBranchId] = React.useState(preselectedBranch || MOCK_BRANCHES[0].id);
  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [appointmentDate, setAppointmentDate] = React.useState("");
  const [preferredTime, setPreferredTime] = React.useState("10:00 AM");
  const [reason, setReason] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState<any>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Default to tomorrow's date if empty
  React.useEffect(() => {
    if (!appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setAppointmentDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [appointmentDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          patientPhone,
          patientEmail,
          doctorId,
          branchId,
          appointmentDate,
          appointmentTime: preferredTime,
          reason,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to schedule appointment");
      }

      setConfirmation(data.appointment);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <div className="py-16 max-w-2xl mx-auto px-4">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-xl p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-[#DDEDE3] text-[#315C4A] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase bg-[#DDEDE3] text-[#315C4A] px-3 py-1 rounded-full font-bold mb-2 inline-block">
            Appointment Confirmed
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-2">
            Clinical Consultation Reserved
          </h2>
          <p className="text-sm text-[#70706B] mb-6">
            Your appointment has been registered in the hospital coordination system. An SMS confirmation will be transmitted to {confirmation.patientPhone}.
          </p>

          {/* Ticket Card: Soft Green #DDEDE3 */}
          <div className="bg-[#F7F7F3] border border-[#E8E8E3] rounded-2xl p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-[#E8E8E3] pb-3">
              <span className="text-xs font-mono text-[#70706B] uppercase">Appointment ID</span>
              <span className="text-base font-bold font-mono text-[#315C4A]">{confirmation.appointmentId}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[#70706B] block">Patient Name</span>
                <span className="font-semibold text-[#171717]">{confirmation.patientName}</span>
              </div>
              <div>
                <span className="text-xs text-[#70706B] block">Consultant Specialist</span>
                <span className="font-semibold text-[#171717]">{confirmation.doctorName}</span>
              </div>
              <div>
                <span className="text-xs text-[#70706B] block">Appointment Date</span>
                <span className="font-semibold text-[#171717]">{confirmation.appointmentDate}</span>
              </div>
              <div>
                <span className="text-xs text-[#70706B] block">Scheduled Time</span>
                <span className="font-semibold text-[#171717]">{confirmation.appointmentTime}</span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-[#70706B] block">Diagnostic Center Location</span>
                <span className="font-semibold text-[#171717]">{confirmation.branchName}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="gap-2 border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]"
            >
              <Printer className="w-4 h-4" />
              Print Slip
            </Button>
            <Button asChild variant="medical">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const selectedDoctorObj = MOCK_DOCTORS.find((d) => d.id === doctorId);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-md p-8 sm:p-12">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase text-[#315C4A] font-bold tracking-wider block mb-1">
            Priority Scheduling
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">
            Book a Specialist Consultation
          </h2>
          <p className="text-sm text-[#70706B] mt-1">
            Confirm your diagnostic review or consultation with our consultant medical faculty.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Doctor and Branch Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                Select Medical Specialist *
              </label>
              <select
                className="w-full h-11 px-3 rounded-lg border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:ring-2 focus:ring-[#315C4A] focus:outline-none"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              >
                {MOCK_DOCTORS.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialization.split("&")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                Select Diagnostic Center *
              </label>
              <select
                className="w-full h-11 px-3 rounded-lg border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:ring-2 focus:ring-[#315C4A] focus:outline-none"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                {MOCK_BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedDoctorObj && (
            <div className="p-4 bg-[#DDEDE3]/50 border border-[#A8D5BA]/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-[#171717] block text-sm">{selectedDoctorObj.name}</span>
                <span className="text-[#315C4A] font-medium">{selectedDoctorObj.title}</span>
                <span className="text-[#70706B] block mt-0.5">BMDC Reg: {selectedDoctorObj.bmdcRegNo}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[#70706B] block">Consultation Fee</span>
                <span className="text-base font-bold font-mono text-[#171717]">৳{selectedDoctorObj.consultationFee}</span>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                Appointment Date *
              </label>
              <Input
                type="date"
                required
                className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                Preferred Time Slot *
              </label>
              <select
                className="w-full h-11 px-3 rounded-lg border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:ring-2 focus:ring-[#315C4A] focus:outline-none"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              >
                <option value="09:30 AM">09:30 AM - Morning</option>
                <option value="10:30 AM">10:30 AM - Morning</option>
                <option value="11:30 AM">11:30 AM - Morning</option>
                <option value="02:30 PM">02:30 PM - Afternoon</option>
                <option value="04:30 PM">04:30 PM - Evening</option>
                <option value="06:30 PM">06:30 PM - Evening</option>
              </select>
            </div>
          </div>

          {/* Step 3: Patient Information */}
          <div className="border-t border-[#E8E8E3] pt-6">
            <span className="text-xs font-mono uppercase text-[#70706B] font-bold block mb-4">
              Patient Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Patient Name *</label>
                <Input
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Phone Number *</label>
                <Input
                  required
                  placeholder="+880 1XXXXXXXXX"
                  className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Email Address</label>
                <Input
                  type="email"
                  placeholder="tanvir@example.com"
                  className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Date of Birth</label>
                <Input
                  type="date"
                  className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Reason for Consultation</label>
              <Input
                placeholder="e.g. Follow-up for abnormal blood report, second opinion on ultrasound"
                className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono">Clinical Notes / Symptoms</label>
              <textarea
                rows={3}
                placeholder="Any pre-existing medical conditions or specific questions..."
                className="w-full p-3 rounded-lg border border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] text-sm focus:ring-2 focus:ring-[#315C4A] focus:outline-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="medical"
            className="w-full py-6 text-base"
          >
            {loading ? "Registering Appointment..." : "Confirm & Schedule Appointment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
