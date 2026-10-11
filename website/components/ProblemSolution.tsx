"use client";

import React, { useState } from "react";
import { 
  XCircle, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  UserX,
  UserCheck,
  EyeOff,
  Lock,
  Clock
} from "lucide-react";

export default function ProblemSolution() {
  const [viewMode, setViewMode] = useState<"comparison" | "table">("comparison");

  return (
    <section id="philosophy" className="py-24 bg-[#070B14] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-4 uppercase tracking-wider">
            <span>The Fundamental Flaw in EdTech Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Stop Staring at Red Dashboards. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Start Orchestrating Support.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Higher education does not have a prediction problem—it has an{" "}
            <span className="text-white font-semibold">intervention execution problem</span>. 
            Dashboards display alerts, but no one owns the follow-through.
          </p>
        </div>

        {/* Side by Side Comparative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-rose-950/20 via-slate-900/40 to-slate-900/60 border border-rose-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Legacy Analytics &amp; LMS Alerts
                    </h3>
                    <p className="text-xs text-rose-400/90 font-mono">Passive &amp; Disconnected</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Alert Fatigue
                </span>
              </div>

              {/* Pain points */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Opaque &quot;78% Risk&quot; Scores
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Black-box algorithms slap stigmatizing predictive badges onto students without explaining the underlying evidence or causal factors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <UserX className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Unowned Broadcasts to General Inboxes
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Automated warning emails blast 12 department staff. Because everyone received it, nobody takes responsibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <EyeOff className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Zero Privacy Guardrails &amp; Cross-Leaks
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Financial fee arrears or mental wellness notes leak across academic faculty, breaching student trust and FERPA regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <Clock className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      No SLA or Closed-Loop Accountability
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Did someone check on the student? Was tutoring scheduled? Did attendance recover? No one knows until end-of-semester exam failure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-500/10">
              <p className="text-xs text-rose-300 font-mono flex items-center gap-1.5">
                <span>Result:</span>
                <span className="text-slate-300 font-sans">
                  High student attrition, overworked faculty, and unfulfilled institutional promises.
                </span>
              </p>
            </div>
          </div>

          {/* SUTRA Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-emerald-950/20 via-slate-900/60 to-slate-900/90 border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between shadow-glow">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      The SUTRA Orchestration Engine
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">Accountable &amp; Closed-Loop</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Zero Alert Fatigue
                </span>
              </div>

              {/* SUTRA Advantages */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 shadow-subtle">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Evidence Before Label (Transparent Provenance)
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      No cryptic scores. SUTRA surfaces exact verifiable facts: &quot;Attendance dropped 23% in 3 weeks; 2 consecutive labs unsubmitted.&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 shadow-subtle">
                  <UserCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Strict Case Ownership &amp; 48h Escalation SLAs
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Every signal converts into an accountable Support Case locked to the student&apos;s assigned mentor, with automated department escalation if stalled.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 shadow-subtle">
                  <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Purpose-Aware Role Gating (Strict FERPA Fencing)
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Fee assistance is sealed to Finance. Counselling notes are encrypted exclusively for Counsellors. Faculty only sees academic growth levers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 shadow-subtle">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Auditable Closed-Loop Intervention Outcomes
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Did attendance rebound after the check-in? SUTRA tracks post-intervention trajectories, proving institutional ROI and pedagogical impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/20">
              <p className="text-xs text-emerald-300 font-mono flex items-center gap-1.5">
                <span>Result:</span>
                <span className="text-slate-200 font-sans font-medium">
                  91% Retention rate preservation, 4.8x faster intervention turnaround, total compliance.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
