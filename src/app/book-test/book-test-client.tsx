"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_TESTS, MOCK_BRANCHES, MockTest } from "@/lib/services/mockData";
import { Search, Plus, Trash2, CheckCircle2, Droplets, Clock, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookTestClient() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("selected");
  const preselectedBranch = searchParams.get("branch");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTests, setSelectedTests] = React.useState<MockTest[]>(() => {
    if (preselected) {
      const found = MOCK_TESTS.find((t) => t.id === preselected);
      return found ? [found] : [MOCK_TESTS[0]];
    }
    return [MOCK_TESTS[0]];
  });

  const [branchId, setBranchId] = React.useState(preselectedBranch || MOCK_BRANCHES[0].id);
  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [preferredDate, setPreferredDate] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [orderConfirmation, setOrderConfirmation] = React.useState<any>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (!preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [preferredDate]);

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return MOCK_TESTS.filter(
      (t) =>
        (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.code.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedTests.some((st) => st.id === t.id)
    ).slice(0, 5);
  }, [searchQuery, selectedTests]);

  const toggleTest = (test: MockTest) => {
    if (selectedTests.some((t) => t.id === test.id)) {
      setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
    setSearchQuery("");
  };

  const removeTest = (id: string) => {
    setSelectedTests(selectedTests.filter((t) => t.id !== id));
  };

  const subtotal = selectedTests.reduce((acc, t) => acc + t.price, 0);
  const discount = Math.round(subtotal * 0.1); // 10% online savings
  const total = subtotal - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTests.length) {
      setErrorMsg("Please select at least one diagnostic investigation.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          patientPhone,
          patientEmail,
          branchId,
          testIds: selectedTests.map((t) => t.id),
          preferredDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process test booking");
      }

      setOrderConfirmation(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmation) {
    const { order, invoiceId, tokenNumber } = orderConfirmation;
    return (
      <div className="py-16 max-w-2xl mx-auto px-4">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-xl p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-[#DDEDE3] text-[#315C4A] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase bg-[#DDEDE3] text-[#315C4A] px-3 py-1 rounded-full font-bold mb-2 inline-block">
            Order Request Registered
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-2">
            Diagnostic Investigation Confirmed
          </h2>
          <p className="text-sm text-[#70706B] mb-6">
            Your laboratory order slip has been issued. Show your Token Number or Order ID upon arrival at the branch reception.
          </p>

          <div className="bg-[#F7F7F3] border border-[#E8E8E3] rounded-2xl p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-[#E8E8E3] pb-3">
              <div>
                <span className="text-xs font-mono text-[#70706B] block">Queue Token</span>
                <span className="text-2xl font-black font-mono text-[#315C4A]">{tokenNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#70706B] block">Order ID</span>
                <span className="text-sm font-bold font-mono text-[#171717]">{order.orderId}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[#70706B] block">Patient Name</span>
                <span className="font-semibold text-[#171717]">{order.patientName}</span>
              </div>
              <div>
                <span className="text-xs text-[#70706B] block">Diagnostic Center</span>
                <span className="font-semibold text-[#171717]">{order.branchName}</span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-[#70706B] block mb-1">Investigations Ordered ({order.tests.length})</span>
                <ul className="list-disc list-inside text-xs text-[#171717] space-y-0.5">
                  {order.tests.map((t: any, i: number) => (
                    <li key={i}>{t.testName} (৳{t.price})</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#E8E8E3] pt-3 flex justify-between items-baseline font-mono">
              <span className="text-sm font-bold text-[#171717]">Estimated Total (10% Online Off)</span>
              <span className="text-xl font-bold text-[#315C4A]">৳{order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="gap-2 border-[#E8E8E3] bg-[#FFFFFF] text-[#171717] hover:bg-[#DDEDE3]"
            >
              <Printer className="w-4 h-4" />
              Print Order Slip
            </Button>
            <Button asChild variant="medical">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form and Test Selector */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-sm p-8 sm:p-10">
            <span className="text-xs font-mono uppercase text-[#315C4A] font-bold tracking-wider block mb-1">
              Multi-Test Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-6">
              Select Tests & Specimen Location
            </h2>

            {errorMsg && (
              <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Test Search & Autocomplete */}
            <div className="mb-6 relative">
              <label className="text-xs font-semibold text-[#171717] uppercase font-mono block mb-2">
                Add More Tests to Tray
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#70706B]" />
                <Input
                  placeholder="Type to search and add tests (e.g. CBC, Thyroid, USG, Lipid)..."
                  className="pl-10 h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-1 bg-[#FFFFFF] border border-[#E8E8E3] rounded-xl shadow-xl overflow-hidden divide-y divide-[#E8E8E3]">
                  {searchResults.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => toggleTest(st)}
                      className="p-3 hover:bg-[#DDEDE3]/50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-semibold text-sm text-[#171717] block">{st.name}</span>
                        <span className="text-xs text-[#70706B] font-mono">{st.code} • {st.sampleType}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold font-mono text-[#315C4A]">৳{st.price}</span>
                        <Plus className="w-4 h-4 text-[#315C4A]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tests List */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase text-[#70706B] font-bold block mb-3">
                Selected Diagnostic Investigations ({selectedTests.length})
              </span>

              {selectedTests.length === 0 ? (
                <div className="p-6 text-center border-2 border-dashed border-[#E8E8E3] rounded-2xl text-[#70706B] text-sm">
                  No tests added yet. Search above to add investigations to your booking.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTests.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-4 bg-[#F7F7F3] border border-[#E8E8E3] rounded-2xl"
                    >
                      <div>
                        <span className="text-xs font-mono text-[#315C4A] font-semibold block">{t.code}</span>
                        <h4 className="font-bold text-[#171717] text-sm">{t.name}</h4>
                        <span className="text-xs text-[#70706B]">{t.sampleType} • {t.turnaroundTime}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-base font-bold font-mono text-[#171717]">৳{t.price}</span>
                        <button
                          type="button"
                          onClick={() => removeTest(t.id)}
                          className="text-[#70706B] hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Patient & Center Details Form */}
            <form onSubmit={handleSubmit} className="space-y-6 border-t border-[#E8E8E3] pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                    Select Collection Branch *
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

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#171717] uppercase font-mono">
                    Preferred Collection Date *
                  </label>
                  <Input
                    type="date"
                    required
                    className="h-11 border-[#E8E8E3] focus:border-[#315C4A]"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

              <Button
                type="submit"
                disabled={loading || selectedTests.length === 0}
                variant="medical"
                className="w-full py-6 text-base"
              >
                {loading ? "Registering Investigation Order..." : "Confirm & Submit Test Order"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Price Estimation Summary */}
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-sm p-6 sticky top-24">
            <span className="text-xs font-mono uppercase text-[#315C4A] font-bold tracking-wider block mb-2">
              Fee Estimate
            </span>
            <h3 className="text-xl font-bold text-[#171717] mb-6">Order Calculation</h3>

            <div className="space-y-3 text-sm border-b border-[#E8E8E3] pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-[#70706B]">Investigations Subtotal</span>
                <span className="font-mono font-bold text-[#171717]">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#315C4A] font-medium">
                <span>Online Privilege Discount (10%)</span>
                <span className="font-mono">- ৳{discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-[#70706B]">
                <span>Phlebotomy & Disposables</span>
                <span className="text-[#315C4A] font-bold">FREE</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <span className="text-base font-bold text-[#171717]">Estimated Total</span>
              <span className="text-3xl font-extrabold font-mono text-[#315C4A]">৳{total.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-[#DDEDE3] rounded-2xl text-xs text-[#315C4A] leading-relaxed mb-4">
              Includes digital verification report with tamper-proof QR code accessible via the online patient portal.
            </div>

            <p className="text-[11px] text-[#70706B] text-center font-mono">
              Pay upon sample collection at reception via Cash, Visa, Mastercard, bKash, or Nagad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
