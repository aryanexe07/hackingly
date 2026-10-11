"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Filter,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AnalyticsPage() {
  const [dateWindow, setDateWindow] = useState("CURRENT_TERM");
  const [cohortFilter, setCohortFilter] = useState("ALL_BTECH");

  const workflowMetrics = [
    {
      label: "Avg Time: Signal → Case Assignment",
      value: "4.2 hrs",
      subtext: "Well within 24h institutional benchmark",
      icon: Clock,
      trend: "-1.1h vs previous semester",
    },
    {
      label: "On-Time Follow-up SLA Rate",
      value: "89.4%",
      subtext: "143 of 160 cases reviewed on schedule",
      icon: CheckCircle2,
      trend: "+6.2% improvement",
    },
    {
      label: "Automated Escalation Rate",
      value: "10.6%",
      subtext: "Cases elevated to HOD on due-date breach",
      icon: AlertTriangle,
      trend: "-3.4% reduction in overdue cases",
    },
  ];

  const interventionMatrix = [
    {
      type: "Mentor Check-in & Course Review",
      sampleSize: "N = 64",
      positiveRate: 78,
      ongoingRate: 16,
      escalatedRate: 6,
    },
    {
      type: "Academic Remedial Tutoring",
      sampleSize: "N = 42",
      positiveRate: 71,
      ongoingRate: 21,
      escalatedRate: 8,
    },
    {
      type: "Peer Study Group Placement",
      sampleSize: "N = 38",
      positiveRate: 84,
      ongoingRate: 11,
      escalatedRate: 5,
    },
    {
      type: "Welfare & Tuition Aid Counseling",
      sampleSize: "N = 22",
      positiveRate: 86,
      ongoingRate: 14,
      escalatedRate: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold text-indigo-600 uppercase font-mono tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
            Evidence-Based Evaluation
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
          Cohort Outcomes & Workflow Insights
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Auditable accountability tracking without pseudo-scientific automated causation claims.
        </p>
      </div>

      {/* MANDATORY CAVEAT BANNER (PRD §4.6) */}
      <div className="bg-slate-100/90 border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3 text-slate-800">
        <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Mandatory Institutional Governance Note
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed">
            <strong>Descriptive Cohort Summary:</strong> Trends reflect observed changes among students receiving structured support. They do not represent randomized causal claims or deterministic predictions.
          </p>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600" /> Scope:
          </span>
          <select
            value={dateWindow}
            onChange={(e) => setDateWindow(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
          >
            <option value="CURRENT_TERM">Autumn Term 2026 (Active)</option>
            <option value="PAST_TERM">Spring Term 2026 (Closed)</option>
            <option value="FULL_YEAR">Academic Year 2025-26</option>
          </select>

          <select
            value={cohortFilter}
            onChange={(e) => setCohortFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
          >
            <option value="ALL_BTECH">All B.Tech Engineering Cohorts</option>
            <option value="CS_DEPT">Computer Science & Engineering</option>
            <option value="YEAR_2">Year 2 (Semesters 3 & 4)</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Minimum Sample Size Threshold: <strong>N &ge; 20 students</strong>
        </div>
      </div>

      {/* Workflow Health Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {workflowMetrics.map((met, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {met.label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <met.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {met.value}
              </span>
              <span className="text-xs font-bold text-emerald-600 font-mono">
                {met.trend}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">{met.subtext}</p>
          </div>
        ))}
      </div>

      {/* Intervention Outcome Matrix (Bar comparison with explicit N= labels) */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Intervention Resolution Matrix (By Support Track)
            </h3>
            <p className="text-xs text-slate-500">
              Comparative outcome distribution across active intervention pathways.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Positive Improvement
            </span>
            <span className="flex items-center gap-1.5 text-indigo-800">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Support Ongoing
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Escalated
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {interventionMatrix.map((intv, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">{intv.type}</span>
                <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {intv.sampleSize}
                </span>
              </div>

              {/* Stacked bar */}
              <div className="w-full h-7 bg-slate-100 rounded-xl overflow-hidden flex text-[11px] font-bold text-white font-mono">
                <div
                  style={{ width: `${intv.positiveRate}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center transition-all duration-500"
                  title={`Positive: ${intv.positiveRate}%`}
                >
                  {intv.positiveRate}%
                </div>
                <div
                  style={{ width: `${intv.ongoingRate}%` }}
                  className="bg-indigo-500 h-full flex items-center justify-center transition-all duration-500"
                  title={`Ongoing: ${intv.ongoingRate}%`}
                >
                  {intv.ongoingRate}%
                </div>
                {intv.escalatedRate > 0 && (
                  <div
                    style={{ width: `${intv.escalatedRate}%` }}
                    className="bg-amber-500 h-full flex items-center justify-center transition-all duration-500"
                    title={`Escalated: ${intv.escalatedRate}%`}
                  >
                    {intv.escalatedRate}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Trajectory: Before vs After Trendline */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Supported Cohort Trajectory (Pre- vs Post-Intervention)
            </h3>
            <p className="text-xs text-slate-500">
              Aggregate attendance trendline across 164 students receiving structured check-ins.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
            Avg Recovery: +18.4 pts
          </span>
        </div>

        {/* Visual Timeline chart */}
        <div className="grid grid-cols-6 gap-3 pt-3">
          {[
            { period: "Week -3 (Pre)", attendance: 82, note: "Baseline" },
            { period: "Week -2 (Pre)", attendance: 71, note: "Initial Drop" },
            { period: "Week -1 (Pre)", attendance: 59, note: "Signal Fired", isSignal: true },
            { period: "Week +1 (Post)", attendance: 68, note: "Check-in Held", isIntervention: true },
            { period: "Week +2 (Post)", attendance: 79, note: "Remedial Track" },
            { period: "Week +3 (Post)", attendance: 85, note: "Stabilized", isResolved: true },
          ].map((pt, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all ${
                pt.isSignal
                  ? "bg-rose-50/70 border-rose-200 text-rose-900"
                  : pt.isIntervention
                  ? "bg-indigo-50/70 border-indigo-200 text-indigo-900"
                  : pt.isResolved
                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}
            >
              <span className="block text-[11px] font-mono text-slate-500 mb-1">
                {pt.period}
              </span>
              <span className="block text-xl font-bold font-mono">
                {pt.attendance}%
              </span>
              <span className="block text-[10px] font-semibold mt-1">
                {pt.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
