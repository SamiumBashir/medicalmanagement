import * as React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/services/dataStore";
import { User, Phone, Mail, MapPin, ShieldCheck, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PatientProfilePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?from=/patient/profile");
  }

  const patientId = session.patientId || "PAT-2026-000001";
  const patient = dataStore.patients.find((p) => p.patientId === patientId) || {
    name: session.name,
    patientId,
    phone: "+880 1711 000000",
    email: session.email,
    age: 35,
    gender: "MALE" as const,
    bloodGroup: "B+",
    address: "Registered Diagnostic Facility Client",
  };

  const name = patient.name || session.name;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#171717]">Personal Medical Profile</h1>
        <p className="text-xs text-[#70706B] font-mono mt-1">
          Patient identity information, registered emergency contacts, and vital medical history
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-8 sm:p-10 space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-[#E8E8E3]">
          <div className="w-16 h-16 rounded-2xl bg-[#315C4A] text-[#DDEDE3] font-bold text-2xl flex items-center justify-center">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#171717]">{name}</h2>
            <span className="text-xs font-mono text-[#315C4A] bg-[#DDEDE3] px-2.5 py-0.5 rounded border border-[#A8D5BA]/40 font-semibold inline-block mt-1">
              {patient.patientId}
            </span>
          </div>
        </div>

        {/* Demographics */}
        <div>
          <span className="text-xs font-mono uppercase text-[#70706B] font-bold block mb-4">
            Demographic Information
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-xs text-[#70706B] block">Biological Age</span>
              <span className="font-semibold text-[#171717]">{patient.age} Years</span>
            </div>
            <div>
              <span className="text-xs text-[#70706B] block">Gender</span>
              <span className="font-semibold text-[#171717] capitalize">{patient.gender.toLowerCase()}</span>
            </div>
            <div>
              <span className="text-xs text-[#70706B] block">Blood Group</span>
              <span className="font-bold text-[#315C4A] font-mono">{patient.bloodGroup || "B+"}</span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="border-t border-[#E8E8E3] pt-6">
          <span className="text-xs font-mono uppercase text-[#70706B] font-bold block mb-4">
            Contact & Address
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-xs text-[#70706B] block">Phone Number</span>
              <span className="font-mono text-[#171717] font-semibold">{patient.phone}</span>
            </div>
            <div>
              <span className="text-xs text-[#70706B] block">Email Address</span>
              <span className="font-mono text-[#171717] font-semibold">{patient.email || session.email}</span>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-[#70706B] block">Residential Address</span>
              <span className="text-[#171717]">{patient.address || "Dhaka, Bangladesh"}</span>
            </div>
          </div>
        </div>

        {/* Emergency contact */}
        <div className="border-t border-[#E8E8E3] pt-6">
          <span className="text-xs font-mono uppercase text-[#70706B] font-bold block mb-4">
            Designated Emergency Contact
          </span>
          <div className="p-4 bg-[#F7F7F3] rounded-2xl border border-[#E8E8E3] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#70706B] block uppercase">Name</span>
              <strong className="text-[#171717] text-sm">Designated Family Contact</strong>
            </div>
            <div>
              <span className="text-[#70706B] block uppercase">Relationship</span>
              <span className="text-[#171717] font-semibold">Primary Kin</span>
            </div>
            <div>
              <span className="text-[#70706B] block uppercase">Phone Number</span>
              <span className="font-mono text-[#171717] font-semibold">{patient.phone}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8E8E3] pt-6 flex justify-end">
          <Button variant="outline" className="border-[#E8E8E3] hover:bg-[#DDEDE3]/30 text-[#171717]">
            Request Information Update
          </Button>
        </div>
      </div>
    </div>
  );
}
