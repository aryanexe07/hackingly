"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSutra } from "@/lib/store";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { SignalPriority, SignalFamily } from "@/lib/data";
import {
  Filter,
  Search,
  BellRing,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Database,
  Moon,
  Trash2,
  FileCheck2,
} from "lucide-react";

export default function SignalsPage() {
  const {
    signals,
    selectedSignalId,
    setSelectedSignalId,
    snoozeSignal,
    dismissSignal,
    currentPersona,
  } = useSutra();

  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [familyFilter, setFamilyFilter] = useState<string>("ALL");
  const [dataQualityFilter, setDataQualityFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSignals = signals.filter((s) => {
    if (priorityFilter !== "ALL" && s.priority !== priorityFilter) return false;
    if (familyFilter !== "ALL" && s.family !== familyFilter) return false;
    if (dataQualityFilter === "COMPLETE" && s.dataQualityState !== "complete") return false;
    if (dataQualityFilter === "FLAGGED" && s.dataQualityState !== "flagged") return false;
    if (
      searchQuery &&
      !s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.explanation.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // Gating check: if Fee signal and persona cannot view fee, hide or mark restricted
    if (s.family === "Fees" && !currentPersona.canViewFee) {
      // In SUTRA, non-finance staff see a redacted notice or it is filtered
      return false;
    }
    return true;
  });

  const selectedSignal = signals.find((s) => s.id === selectedSignalId) || null;

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase font-mono tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Triage Engine
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Explainable Signals Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deterministic rule triggers paired with provenance data. No unexplainable ML risk scores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
            <span className="text-xs text-slate-500">Active Signals:</span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {filteredSignals.length}
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Filter Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-indigo-600" /> Filters:
          </div>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="PRIORITY_REVIEW">Priority Review (Urgent)</option>
            <option value="NEEDS_REVIEW">Needs Review</option>
            <option value="MONITOR">Monitor (Info)</option>
          </select>

          {/* Family Filter */}
          <select
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Indicator Families</option>
            <option value="Attendance">Attendance Divergence</option>
            <option value="Academic">Academic Assessment Drop</option>
            <option value="Multi-Factor">Multi-Factor (Attendance + Score)</option>
            <option value="Submissions">Missed Submissions</option>
            {currentPersona.canViewFee && <option value="Fees">Tuition Installments (Finance)</option>}
          </select>

          {/* Data Quality Filter */}
          <select
            value={dataQualityFilter}
            onChange={(e) => setDataQualityFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Data Quality</option>
            <option value="COMPLETE">Complete Window (28d)</option>
            <option value="FLAGGED">Missing LMS Sync (Flagged)</option>
          </select>

          {/* Search Bar */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search student pseudonym (STU-1042)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((signal) => {
          const isUrgent = signal.priority === "PRIORITY_REVIEW";
          const isConverted = signal.status === "CONVERTED_TO_CASE";
          const isFlaggedData = signal.dataQualityState === "flagged";

          return (
            <div
              key={signal.id}
              className={`bg-white rounded-3xl p-6 border transition-all ${
                isUrgent
                  ? "border-rose-200 shadow-sm hover:shadow-md hover:border-rose-300"
                  : "border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold bg-slate-900 text-white px-3 py-1 rounded-xl">
                    {signal.studentId}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {signal.studentName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        • {signal.program} ({signal.semester})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Mentor: {signal.mentorName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full font-mono uppercase tracking-wider ${
                      isUrgent
                        ? "bg-rose-100 text-rose-800"
                        : signal.priority === "NEEDS_REVIEW"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-sky-100 text-sky-800"
                    }`}
                  >
                    {signal.priority.replace("_", " ")}
                  </span>
                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {signal.isOverdue ? "Overdue" : `SLA: ${signal.slaHoursRemaining}h`}
                  </span>
                </div>
              </div>

              {/* Rationale / Data State Banner */}
              <div className="my-4">
                {isFlaggedData ? (
                  <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                    <Database className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Insufficient Baseline Data — System Refuses to Hallucinate Risk
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {signal.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {signal.explanation}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-200/50 text-[11px] text-slate-500 font-mono">
                      <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg text-slate-700 font-semibold">
                        Rule: {signal.ruleId}
                      </span>
                      <span>Quality: {signal.dataQuality}</span>
                      <span>Family: {signal.family}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Cluster Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <Link
                  href={`/students/${signal.studentId}`}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Inspect Student 360° Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => snoozeSignal(signal.id)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
                    title="Snooze signal for 7 days"
                  >
                    <Moon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Snooze 7d</span>
                  </button>

                  <button
                    onClick={() => dismissSignal(signal.id, "Pedagogically addressed")}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 font-medium"
                    title="Dismiss with reason"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dismiss</span>
                  </button>

                  {isConverted ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Case Launched
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedSignalId(signal.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Review & Match Intervention</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drawer */}
      <EvidenceDrawer
        signal={selectedSignal}
        onClose={() => setSelectedSignalId(null)}
      />
    </div>
  );
}
