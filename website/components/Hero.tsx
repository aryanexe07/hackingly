"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Play,
  FileText,
  Lock,
  Compass,
  CheckCircle,
  Users
} from "lucide-react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"case" | "provenance" | "sla">("case");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient from-emerald-950/20 via-[#070B14] to-[#070B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid line texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 shadow-subtle backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold text-emerald-300 font-mono tracking-wide uppercase">
              New: Closed-Loop Intervention Engine
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 hidden sm:inline">
              Built for Dean of Students, Mentors & HODs
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
            No Alert Without Action. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              The Intervention Engine
            </span>{" "}
            for Higher Education.
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Traditional dashboards bombard faculty with passive, opaque &quot;risk scores&quot; that create alert fatigue.{" "}
            <span className="text-white font-medium">SUTRA orchestrates accountable, evidence-backed Support Cases</span>{" "}
            with clear ownership, humane triage, and auditable SLAs.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#simulator"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-tight shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>Test Interactive Case Sandbox</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#pilot"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>Schedule Institutional Pilot</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>FERPA & DPDP Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Algorithmic Bias / No Stigma</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Canvas, Moodle, Blackboard SIS Sync</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Mockup: Live Case Console Preview */}
        <div className="relative max-w-5xl mx-auto mt-12">
          {/* Outer glow frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-blue-500/20 rounded-2xl blur-xl opacity-75" />

          <div className="relative rounded-2xl bg-[#0B1120] border border-white/10 shadow-2xl overflow-hidden">
            {/* Top Bar of the Mockup Window */}
            <div className="px-5 py-3.5 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-700" />
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="text-emerald-400 font-bold">CASE-2026-8941</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">Academic & Attendance Check-in</span>
                </div>
              </div>

              {/* Mockup tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-950/60 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab("case")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "case"
                      ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Intervention Plan
                </button>
                <button
                  onClick={() => setActiveTab("provenance")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "provenance"
                      ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Evidence Provenance
                </button>
                <button
                  onClick={() => setActiveTab("sla")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === "sla"
                      ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  SLA & Escalation
                </button>
              </div>
            </div>

            {/* Mockup Content Body */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0B1120] to-[#070D18]">
              {activeTab === "case" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 Cols: Student Context & Evidence Summary */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header card */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-display font-bold text-lg text-emerald-400">
                          AK
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-bold text-white text-base">
                              Aarav Kapoor
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              UG-CS-2024
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            B.Tech Computer Science • Semester 4 • Assigned Mentor: Dr. Alistair Vance
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>48h SLA Active</span>
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">18h remaining</p>
                      </div>
                    </div>

                    {/* Verified Signal Card - Evidence Before Label */}
                    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                          <TrendingDown className="w-4 h-4 text-amber-400" />
                          <span>Trigger: Multi-Vector Signal Detected</span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Confidence: High (3 Data Sources)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                          <p className="text-slate-400 font-medium">Lecture Attendance Dip</p>
                          <p className="text-white font-bold text-sm mt-1">
                            84% → 61%{" "}
                            <span className="text-rose-400 font-normal text-xs">(-23% over 3 weeks)</span>
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Source: Biometric / LMS Roster Sync
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                          <p className="text-slate-400 font-medium">Assessment Submissions</p>
                          <p className="text-white font-bold text-sm mt-1">
                            2 Overdue Assignments
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            CS204: Algorithms & Data Structures
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Policy-Governed Intervention */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>Recommended Next Best Action (Institute Policy #ACA-402)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Schedule a 1-on-1 Academic Check-In with mentor. Inquire about lab workload bottleneck. 
                        Flag whether remedial tutor peer matching is requested.
                      </p>
                    </div>
                  </div>

                  {/* Right 1 Col: Accountable Action Panel */}
                  <div className="space-y-4 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-white">
                        <span>Case Ownership</span>
                        <span className="text-emerald-400">Locked to Mentor</span>
                      </div>

                      <div className="mt-4 space-y-3 text-xs">
                        <div>
                          <label className="text-slate-400 block mb-1">Assigned Case Owner</label>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                            <UserCheck className="w-4 h-4 text-emerald-400" />
                            <span>Dr. Alistair Vance (Faculty Mentor)</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-slate-400 block mb-1">Intervention Category</label>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-200">
                            Academic Advising + Remedial Support
                          </div>
                        </div>

                        <div>
                          <label className="text-slate-400 block mb-1">Escalation Threshold</label>
                          <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-800/60">
                            If unaddressed in 48h, auto-routes to Department Coordinator (Prof. S. Sen).
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-800">
                      <button className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Log 1-on-1 Consultation</span>
                      </button>

                      <button className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors">
                        Reassign or Request Welfare Check
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "provenance" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="font-semibold text-white">Signal Provenance Audit Trail</span>
                    <span className="font-mono text-emerald-400">Immutable Ledger #LGR-992</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                      <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">LMS Canvas API Webhook</span>
                          <span className="text-[11px] font-mono text-slate-400">Oct 08, 14:22</span>
                        </div>
                        <p className="text-slate-400 mt-1">
                          CS204 Assignment #3 passed deadline without submission event.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                      <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">Biometric Roster Differential</span>
                          <span className="text-[11px] font-mono text-slate-400">Oct 10, 09:15</span>
                        </div>
                        <p className="text-slate-400 mt-1">
                          Absence detected for 3 consecutive lab sessions. Baseline dropped under 75% institutional threshold.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-3">
                      <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-emerald-300">Policy Trigger Validated</span>
                          <span className="text-[11px] font-mono text-emerald-400">Automated Match</span>
                        </div>
                        <p className="text-slate-300 mt-1">
                          Synthesized signal mapped to Institutional Policy #ACA-402 (Early Academic Friction). Converted to Case with assigned mentor SLA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sla" && (
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                    <span className="font-semibold text-white">SLA Enforcement Matrix</span>
                    <span className="text-emerald-400 font-mono">Stage 1 of 3</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold block mb-1">Stage 1: Mentor Outreach</span>
                      <p className="text-slate-300">SLA: 48 Hours</p>
                      <p className="text-[11px] text-slate-400 mt-1">Status: Active (18h left)</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-1">Stage 2: HOD Notification</span>
                      <p className="text-slate-400">Trigger: T+48h if unreviewed</p>
                      <p className="text-[11px] text-slate-500 mt-1">Auto-escalation standby</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-1">Stage 3: Support Committee</span>
                      <p className="text-slate-400">Trigger: T+96h unacknowledged</p>
                      <p className="text-[11px] text-slate-500 mt-1">Executive review</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
