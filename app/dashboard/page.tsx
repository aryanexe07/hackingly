"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSutra } from "@/lib/store";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import {
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Layers,
  Calendar,
  Flame,
} from "lucide-react";

export default function DashboardPage() {
  const {
    currentPersona,
    signals,
    cases,
    selectedSignalId,
    setSelectedSignalId,
    loadScenario,
    resetAllData,
  } = useSutra();

  const [activeTab, setActiveTab] = useState<"ALL" | "MY_ASSIGNED" | "OVERDUE" | "NEEDS_TRIAGE">("ALL");

  // Metrics calculation
  const urgentSignals = signals.filter((s) => s.priority === "PRIORITY_REVIEW");
  const myCases = cases.filter((c) => c.status !== "RESOLVED");
  const escalations = cases.filter((c) => c.status === "ESCALATED" || c.isOverdue);
  const resolvedCasesCount = cases.filter((c) => c.status === "RESOLVED").length + 14;

  // Filter feed items
  const activeSignals = signals.filter((s) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "NEEDS_TRIAGE") return s.status === "PENDING_TRIAGE";
    if (activeTab === "OVERDUE") return s.isOverdue;
    if (activeTab === "MY_ASSIGNED") return s.mentorName.includes(currentPersona.name.split(" ")[1] || "");
    return true;
  });

  const selectedSignal = signals.find((s) => s.id === selectedSignalId) || null;

  return (
    <div className="space-y-8">
      {/* 1. HERO ACTION STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full font-mono">
              Intervention Command Center
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Academic Term Autumn 2026
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Good morning, {currentPersona.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {currentPersona.title} • {currentPersona.department}
          </p>
        </div>

        {/* Quick Scenario Rehearsal Ribbon */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-2xl">
          <span className="text-[11px] font-bold text-slate-600 px-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> One-Click Rehearsal:
          </span>
          <button
            onClick={() => loadScenario(1)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Launch STU-1042 Flow
          </button>
          <button
            onClick={() => loadScenario(4)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
          >
            Test Escalation
          </button>
        </div>
      </div>

      {/* 2. FOUR QUICK STAT COUNTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Urgent Signals */}
        <div className="bg-white border border-rose-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/70 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Urgent Signals
            </span>
            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
              &lt;24h SLA
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {urgentSignals.length}
            </span>
            <span className="text-xs text-rose-600 font-semibold font-mono">
              Needs triage today
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Multi-factor drops requiring review
          </p>
        </div>

        {/* KPI 2: Active Cases */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Active Cases
            </span>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              This Week
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {myCases.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              under ongoing SLA
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Owned support touchpoints
          </p>
        </div>

        {/* KPI 3: Escalations */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Escalations
            </span>
            <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              Action Required
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-950 font-mono">
              {escalations.length}
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              SLA breached
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Elevated to Department Chair
          </p>
        </div>

        {/* KPI 4: Follow-ups Logged */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Follow-ups Logged
            </span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
              Monthly
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {resolvedCasesCount}
            </span>
            <span className="text-xs text-emerald-700 font-semibold font-mono">
              +18% throughput
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Accountable documented actions
          </p>
        </div>
      </div>

      {/* 3. TWO-COLUMN SPLIT (60% / 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (60% ~ 7 cols): Immediate Attention Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Immediate Attention Feed
                </h2>
                <p className="text-xs text-slate-500">
                  Signals and case milestones requiring human pedagogical triage
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                {(["ALL", "NEEDS_TRIAGE", "MY_ASSIGNED", "OVERDUE"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === tab
                        ? "bg-white text-slate-900 font-bold shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Signal Action Cards */}
            <div className="space-y-3">
              {activeSignals.map((signal) => {
                const isUrgent = signal.priority === "PRIORITY_REVIEW";
                const isConverted = signal.status === "CONVERTED_TO_CASE";

                return (
                  <div
                    key={signal.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isUrgent
                        ? "bg-white border-rose-200/80 hover:border-rose-300 hover:shadow-md"
                        : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md">
                          {signal.studentId}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {signal.studentName}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({signal.program})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                            isUrgent
                              ? "bg-rose-100 text-rose-800"
                              : signal.priority === "NEEDS_REVIEW"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-sky-100 text-sky-800"
                          }`}
                        >
                          {signal.priority.replace("_", " ")}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {signal.isOverdue ? "Overdue" : `SLA: ${signal.slaHoursRemaining}h`}
                        </span>
                      </div>
                    </div>

                    {/* Explainable plain-English rationale */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 my-2.5">
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {signal.explanation}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-slate-500 font-mono">
                        <span>Rule: {signal.ruleId}</span>
                        <span>{signal.dataQuality}</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/students/${signal.studentId}`}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Student 360° Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {isConverted ? (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Case Launched
                          </span>
                        ) : (
                          <button
                            onClick={() => setSelectedSignalId(signal.id)}
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Take Action</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (40% ~ 5 cols): SLA Health & Activity Stream */}
        <div className="lg:col-span-5 space-y-6">
          {/* SLA Health Radial Progress Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                SLA Compliance Health
              </h3>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                89% On-Time
              </span>
            </div>

            {/* Circular Gauge Representation */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#5850EC"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="27.6" // ~89%
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    89%
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    SLA Met
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="block text-[11px] text-slate-500">Avg Triage Speed</span>
                <span className="block text-sm font-bold text-slate-900 font-mono">4.2 hours</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="block text-[11px] text-slate-500">Escalation Rate</span>
                <span className="block text-sm font-bold text-amber-700 font-mono">11% total</span>
              </div>
            </div>
          </div>

          {/* Activity Stream Feed */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 font-heading mb-4">
              Recent Chronological Audit Feed
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-800">
                    <strong>Prof. Sharma</strong> logged check-in touchpoint on{" "}
                    <Link href="/cases/CASE-2026-089" className="font-mono text-indigo-600 hover:underline">
                      CASE-2026-089
                    </Link>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    2 hours ago • Action verified
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0 mt-0.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-800">
                    <strong className="text-rose-700">STU-1014</strong> escalated to HOD Dr. Rao due to 72h SLA breach.
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Yesterday, 10:15 AM • Automated Policy Daemon
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs text-slate-800">
                    Case <span className="font-mono font-semibold">CASE-2026-051</span> marked <strong>RESOLVED</strong> (Karan Joshi).
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    3 days ago • Outcome verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Evidence-to-Action Drawer */}
      <EvidenceDrawer
        signal={selectedSignal}
        onClose={() => setSelectedSignalId(null)}
      />
    </div>
  );
}
