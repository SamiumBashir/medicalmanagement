"use client";

import * as React from "react";
import { dataStore, PatientRecord } from "@/lib/services/dataStore";
import { Search, Plus, User, Phone, Mail, Calendar, Eye, X, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PatientsManagementClient({ initialPatients }: { initialPatients: PatientRecord[] }) {
  const [patients, setPatients] = React.useState<PatientRecord[]>(initialPatients);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<PatientRecord | null>(null);

  const [newPatient, setNewPatient] = React.useState({
    name: "",
    phone: "",
    email: "",
    age: "35",
    gender: "MALE" as const,
    bloodGroup: "B+",
    address: "",
  });

  const filteredPatients = React.useMemo(() => {
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery)
    );
  }, [patients, searchQuery]);

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const count = dataStore.patients.length + 1;
    const patientId = `PAT-2026-${String(count).padStart(6, "0")}`;

    const created: PatientRecord = {
      id: `pat-${Date.now()}`,
      patientId,
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email,
      age: Number(newPatient.age) || 30,
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      address: newPatient.address,
      registeredAt: new Date().toISOString(),
    };

    dataStore.patients.unshift(created);
    setPatients([...dataStore.patients]);
    setShowAddModal(false);
    setNewPatient({ name: "", phone: "", email: "", age: "35", gender: "MALE", bloodGroup: "B+", address: "" });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Registry & Records</h1>
          <p className="text-xs text-slate-500 font-mono">
            Demographic records, unique identifiers, and investigation history
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-medium gap-2"
        >
          <Plus className="w-4 h-4" />
          Register New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search patient by name, PAT ID, or phone number..."
            className="pl-10 h-10 border-slate-200 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filteredPatients.length}</strong> patients
        </span>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Patient Identifier</th>
                <th className="py-3 px-6">Full Name</th>
                <th className="py-3 px-6">Contact Number</th>
                <th className="py-3 px-6">Age / Gender</th>
                <th className="py-3 px-6">Blood Group</th>
                <th className="py-3 px-6">Registration Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-teal-800">{p.patientId}</td>
                  <td className="py-4 px-6 font-sans font-semibold text-slate-900">{p.name}</td>
                  <td className="py-4 px-6 text-slate-600">{p.phone}</td>
                  <td className="py-4 px-6 text-slate-600">{p.age} Yrs / {p.gender}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-red-600">{p.bloodGroup || "N/A"}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{new Date(p.registeredAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedPatient(p)}
                      className="text-teal-700 hover:text-teal-800 hover:bg-teal-50"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Dossier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Dossier Drawer / Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded">
                  {selectedPatient.patientId}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{selectedPatient.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div>
                <span className="text-slate-400 block uppercase">Phone</span>
                <span className="text-slate-900 font-bold">{selectedPatient.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Email</span>
                <span className="text-slate-900">{selectedPatient.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Age & Gender</span>
                <span className="text-slate-900">{selectedPatient.age} Yrs • {selectedPatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase">Blood Group</span>
                <span className="font-bold text-red-600">{selectedPatient.bloodGroup}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block uppercase">Address</span>
                <span className="text-slate-700 font-sans">{selectedPatient.address || "Dhaka, Bangladesh"}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-end">
              <Button onClick={() => setSelectedPatient(null)} className="bg-slate-900 text-white">
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Register New Patient</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Patient Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Phone *</label>
                  <Input
                    required
                    placeholder="+880 1XXXXXXXXX"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Email</label>
                  <Input
                    type="email"
                    placeholder="tanvir@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Age</label>
                  <Input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Gender</label>
                  <select
                    className="w-full h-10 px-2 rounded-md border border-slate-200 text-xs"
                    value={newPatient.gender}
                    onChange={(e: any) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-500">Blood</label>
                  <select
                    className="w-full h-10 px-2 rounded-md border border-slate-200 text-xs"
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-500">Residential Address</label>
                <Input
                  placeholder="Street / Sector / City"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-5 mt-2">
                Generate Patient Record
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
