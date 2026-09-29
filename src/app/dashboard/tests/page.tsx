"use client";

import * as React from "react";
import Link from "next/link";
import { MOCK_TESTS, MockTest } from "@/lib/services/mockData";
import { Plus, Search, Layers, Clock, Droplets, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardTestsPage() {
  const [tests, setTests] = React.useState<MockTest[]>(MOCK_TESTS);
  const [search, setSearch] = React.useState("");

  const filtered = tests.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnostic Tests & Tariff Catalog</h1>
          <p className="text-xs text-slate-500 font-mono">
            Clinical investigation catalog, specimen guidelines, pricing, and active templates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="border-slate-300">
            <Link href="/dashboard/tests/templates">
              <Layers className="w-4 h-4 mr-2" />
              Dynamic Template Builder
            </Link>
          </Button>
          <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white font-medium">
            <Link href="/book-test">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Investigation
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by test name, code, or department..."
            className="pl-9 h-10 border-slate-200 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total: <strong className="text-slate-900">{filtered.length}</strong> active tests
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-6">Code & Category</th>
                <th className="py-3 px-6">Investigation Name</th>
                <th className="py-3 px-6">Specimen Type</th>
                <th className="py-3 px-6">Turnaround SLA</th>
                <th className="py-3 px-6">Tariff Price</th>
                <th className="py-3 px-6">Template Parameters</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-teal-800 block">{t.code}</span>
                    <span className="text-[11px] text-slate-500 font-sans">{t.category}</span>
                  </td>
                  <td className="py-4 px-6 font-sans">
                    <strong className="text-slate-900 font-bold block">{t.name}</strong>
                    <span className="text-xs text-slate-500 line-clamp-1">{t.description}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{t.sampleType}</td>
                  <td className="py-4 px-6 text-slate-600">{t.turnaroundTime}</td>
                  <td className="py-4 px-6 font-bold font-mono text-slate-900 text-sm">
                    ৳{t.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-100">
                      {t.parameters ? t.parameters.length : 0} Parameters
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button asChild size="sm" variant="ghost" className="text-teal-700 hover:bg-teal-50">
                      <Link href={`/tests/${t.slug}`}>View Public</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
