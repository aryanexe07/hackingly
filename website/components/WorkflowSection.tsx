"use client";

import React, { useState } from "react";
import {
  Database,
  Binary,
  UserCheck,
  ShieldCheck,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Share2,
  Workflow
} from "lucide-react";

interface Step {
  step: string;
  title: string;
  description: string;
  details: string[];
  icon: any;
  color: string;
}

const workflowSteps: Step[] = [
  {
    step: "01",
    title: "Authorized Telemetry Ingestion",
    description:
      "Ingests academic events, LMS assignment deadlines, and biometric roster logs through secure, encrypted university webhooks.",
    details: [
      "No invasive keystroke tracking or webcams",
      "Canvas, Blackboard, Moodle & SIS zero-latency sync",
      "Built-in 'Insufficient Data' handling to prevent false alerts",
    ],
    icon: Database,
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    step: "02",
    title: "Explainable Signal Synthesis",
    description:
      "Translates raw telemetry into plain-English verifiable evidence with immutable provenance. Zero black-box probability scores.",
    details: [
      "Evidence before label: factual differentials (e.g. -23% in 3 weeks)",
      "Multi-vector cross-validation across subjects",
      "Timestamped signal fingerprint stored in institutional ledger",
    ],
    icon: Binary,
    color: "from-teal-500/20 to-emerald-500/10",
  },
  {
    step: "03",
    title: "Human Triage & Role-Gated Review",
    description:
      "Signals surface on dedicated role queues (Mentors, Instructors, Welfare Officers) protected by strict FERPA and DPDP privacy walls.",
    details: [
      "Zero stigmatizing public badges or automated student panics",
      "Finance and clinical counselling sealed from academic staff",
      "Fast 1-click triage: Snooze, Dismiss with reason, or Convert to Case",
    ],
    icon: UserCheck,
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    step: "04",
    title: "Policy-Governed Case Creation & 48h SLA",
    description:
      "Automatically matches the signal against approved institutional policies and establishes a named owner with a ticking SLA timer.",
    details: [
      "Explicit single point of accountability (Assigned Faculty Mentor)",
      "Automated escalation ladder (Mentor → HOD → Dean of Students)",
      "Prescribed intervention recommendations tailored to university bylaws",
    ],
    icon: Clock,
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    step: "05",
    title: "Closed-Loop Follow-up & Cohort Memory",
    description:
      "Tracks post-intervention recovery curves. Verifies whether attendance or performance rebounded, feeding cohort analytics without personal exposure.",
    details: [
      "Auditable record of remedial hours and advisor consultations",
      "Cohort-level retention metrics for Board of Regents & Provosts",
      "Continuous validation of which interventions actually work",
    ],
    icon: TrendingUp,
    color: "from-purple-500/20 to-indigo-500/10",
  },
];

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="engine" className="py-24 bg-[#070B14] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>The 5-Stage Orchestration Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            How SUTRA Closes The Loop
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            From the first dropped attendance signal to verified student recovery: an auditable, human-first chain of custody.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {workflowSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeStep === idx
                  ? "bg-emerald-500 text-slate-950 shadow-glow"
                  : "bg-slate-900/90 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span className="font-mono text-xs opacity-75">{step.step}</span>
              <span className="hidden md:inline">{step.title.split(" ")[0]}</span>
              <span className="md:hidden">Step {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Focused Step Display Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#0B1222] to-[#080E1A] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400 font-mono">
                  {workflowSteps[activeStep].step}
                </span>
                <span className="h-6 w-[1px] bg-slate-700" />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {workflowSteps[activeStep].title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {workflowSteps[activeStep].description}
              </p>

              {/* Bullet details */}
              <div className="space-y-2.5 pt-2">
                {workflowSteps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Previous Step
                </button>
                <button
                  disabled={activeStep === workflowSteps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(workflowSteps.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Icon Badge */}
            <div className="w-full md:w-56 shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              {React.createElement(workflowSteps[activeStep].icon, {
                className: "w-14 h-14 text-emerald-400 mb-4 stroke-[1.5]",
              })}
              <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
                Pipeline Verified
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero Data Leakage • Immutable Log
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
