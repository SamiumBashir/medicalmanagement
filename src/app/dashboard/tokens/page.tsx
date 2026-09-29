"use client";

import * as React from "react";
import { dataStore, TestOrderRecord } from "@/lib/services/dataStore";
import { TokenStatus } from "@/types";
import { Ticket, Volume2, SkipForward, CheckCircle2, RotateCcw, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TokenQueueDashboardPage() {
  const [orders, setOrders] = React.useState<TestOrderRecord[]>(dataStore.orders);
  const [currentToken, setCurrentToken] = React.useState<string>("TKN-043");
  const [currentPatient, setCurrentPatient] = React.useState<string>("Nusrat Jahan Chowdhury");
  const [activeStatus, setActiveStatus] = React.useState<TokenStatus>("PROCESSING");

  const waitingTokens = orders.filter((o) => o.tokenStatus === "WAITING");
  const calledTokens = orders.filter((o) => o.tokenStatus === "CALLED" || o.tokenStatus === "PROCESSING");
  const completedTokens = orders.filter((o) => o.tokenStatus === "COMPLETED");

  const handleCallNext = () => {
    const nextWaiting = waitingTokens[0];
    if (nextWaiting) {
      nextWaiting.tokenStatus = "CALLED";
      setCurrentToken(nextWaiting.tokenNumber);
      setCurrentPatient(nextWaiting.patientName);
      setActiveStatus("CALLED");
      setOrders([...dataStore.orders]);
    }
  };

  const handleRecall = () => {
    alert(`Announcement: Token ${currentToken}, Patient ${currentPatient}, please proceed to Phlebotomy Station 1.`);
  };

  const handleSkip = () => {
    const active = orders.find((o) => o.tokenNumber === currentToken);
    if (active) {
      active.tokenStatus = "CANCELLED";
      setOrders([...dataStore.orders]);
      handleCallNext();
    }
  };

  const handleComplete = () => {
    const active = orders.find((o) => o.tokenNumber === currentToken);
    if (active) {
      active.tokenStatus = "COMPLETED";
      setActiveStatus("COMPLETED");
      setOrders([...dataStore.orders]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patient Queue & Token Dispatch System</h1>
        <p className="text-xs text-slate-500 font-mono">
          Real-time phlebotomy queue management and digital waiting room display controls
        </p>
      </div>

      {/* Prominent Active Token Display Board (Television Display Screen Style) */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold block mb-2">
              Current Serving Token • Phlebotomy Sampling Desk 1
            </span>
            <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white mb-2">
              {currentToken}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 text-lg font-medium">
              <User className="w-5 h-5 text-teal-400" />
              <span>{currentPatient}</span>
              <span className="text-xs font-mono bg-teal-900/80 text-teal-300 px-2.5 py-0.5 rounded ml-2">
                {activeStatus}
              </span>
            </div>
          </div>

          {/* Action Control Panel */}
          <div className="flex flex-wrap md:flex-col gap-3 w-full sm:w-auto">
            <Button
              onClick={handleCallNext}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-6 px-8 text-base shadow-lg shadow-teal-900/40"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Call Next Patient
            </Button>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleRecall}
                className="w-1/3 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Recall
              </Button>
              <Button
                variant="outline"
                onClick={handleSkip}
                className="w-1/3 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 text-xs"
              >
                <SkipForward className="w-3.5 h-3.5 mr-1" />
                Skip
              </Button>
              <Button
                variant="outline"
                onClick={handleComplete}
                className="w-1/3 bg-slate-900 border-emerald-800 text-emerald-300 hover:bg-emerald-950 text-xs font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Columns: Waiting vs Called vs Completed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Waiting */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Waiting in Reception ({waitingTokens.length})</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="space-y-2">
            {waitingTokens.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No patients waiting in queue.</p>
            ) : (
              waitingTokens.map((w) => (
                <div key={w.id} className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex justify-between items-center text-xs font-mono">
                  <div>
                    <strong className="text-slate-900 text-sm block">{w.tokenNumber}</strong>
                    <span className="text-slate-600 font-sans">{w.patientName}</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold uppercase">{w.tokenStatus}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Processing */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Currently Sampling ({calledTokens.length})</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          </div>
          <div className="space-y-2">
            {calledTokens.map((c) => (
              <div key={c.id} className="p-3 bg-teal-50/60 border border-teal-200/60 rounded-xl flex justify-between items-center text-xs font-mono">
                <div>
                  <strong className="text-slate-900 text-sm block">{c.tokenNumber}</strong>
                  <span className="text-slate-600 font-sans">{c.patientName}</span>
                </div>
                <span className="text-[10px] text-teal-800 font-bold uppercase">{c.tokenStatus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Samples Drawn ({completedTokens.length})</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="space-y-2">
            {completedTokens.map((cp) => (
              <div key={cp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-mono">
                <div>
                  <strong className="text-slate-800 text-sm block">{cp.tokenNumber}</strong>
                  <span className="text-slate-500 font-sans">{cp.patientName}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">COMPLETED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
