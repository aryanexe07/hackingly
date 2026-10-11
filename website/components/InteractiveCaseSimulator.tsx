"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Calendar,
  DollarSign,
  HeartHandshake,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  RefreshCw,
  Sliders
} from "lucide-react";

interface Scenario {
  id: string;
  category: string;
  icon: any;
  title: string;
  student: string;
  program: string;
  evidence: {
    title: string;
    metrics: string;
    source: string;
    badge: string;
  };
  policy: {
    code: string;
    rule: string;
  };
  assignedOwner: string;
  ownerRole: string;
  slaHours: number;
  privacyTag: string;
  interventionOptions: string[];
  resolvedOutcome: string;
}

const scenarios: Scenario[] = [
  {
    id: "academic",
    category: "Academic Friction",
    icon: GraduationCap,
    title: "Coursework Bottleneck in Core STEM",
    student: "Meera Subramanian",
    program: "B.Tech Electrical Engg • Sem 3",
    evidence: {
      title: "Signals Synthesized",
      metrics: "Mid-sem score down 18pts vs baseline; 2 lab submissions overdue",
      source: "Canvas LMS Webhook + Roster Sync",
      badge: "High Signal Confidence",
    },
    policy: {
      code: "POL-ACA-302",
      rule: "Mandatory peer-tutoring match within 48h for STEM core subjects with consecutive drops",
    },
    assignedOwner: "Prof. Rajesh K.",
    ownerRole: "Course Lead & Faculty Mentor",
    slaHours: 48,
    privacyTag: "Redacted from Non-Instructors",
    interventionOptions: [
      "Schedule 1-on-1 Concept Review Session",
      "Pair with Peer Tutor (Senior Honor Student)",
      "Provide Extended Lab Access Pass",
    ],
    resolvedOutcome:
      "Intervention Executed: Peer tutoring session completed on Oct 11. Assignment #3 submitted with 88% score. Status: Resolved.",
  },
  {
    id: "attendance",
    category: "Attendance Drift",
    icon: Calendar,
    title: "Biometric Attendance Threshold Breach",
    student: "Devansh Mehta",
    program: "B.Sc Data Science • Sem 5",
    evidence: {
      title: "Consecutive Absence Pattern",
      metrics: "Attendance slid from 88% to 62% over 3 weeks; absent in 4 Friday morning lectures",
      source: "Campus Smart Card & Turnstile Telemetry",
      badge: "Cross-Validated Signal",
    },
    policy: {
      code: "POL-ATT-108",
      rule: "Early mentor check-in required prior to reaching the 75% examination debarment threshold",
    },
    assignedOwner: "Dr. Sunita Rao",
    ownerRole: "Designated Faculty Mentor",
    slaHours: 36,
    privacyTag: "Visible to Student Mentor & HOD",
    interventionOptions: [
      "Conduct Empathetic Well-being Check-In",
      "Investigate Commute or Schedule Conflict",
      "Provide Hybrid Lecture Recordings",
    ],
    resolvedOutcome:
      "Intervention Executed: Mentor identified daily 2-hour bus transit disruption. Temporary remote lab access granted. Attendance recovered to 79%.",
  },
  {
    id: "finance",
    category: "Financial Welfare",
    icon: DollarSign,
    title: "Tuition Installment Grace Period Support",
    student: "Kavya Nair",
    program: "B.A. Economics • Sem 4",
    evidence: {
      title: "Fee Clearance Window Exceeded",
      metrics: "Semester installment 14 days overdue; zero prior payment defaults in Year 1",
      source: "Institutional ERP / Bursar Ledger",
      badge: "Confidential Welfare Track",
    },
    policy: {
      code: "POL-FIN-410",
      rule: "Strictly non-punitive outreach. Automatic evaluation for emergency endowment aid.",
    },
    assignedOwner: "Mr. Arthur Pendelton",
    ownerRole: "Student Financial Aid Officer",
    slaHours: 72,
    privacyTag: "100% Sealed from Academic Faculty",
    interventionOptions: [
      "Authorize Flexible 3-Part Installment Plan",
      "Match with Alumni Emergency Hardship Fund",
      "Issue 30-Day Temporary Examination Clearance",
    ],
    resolvedOutcome:
      "Intervention Executed: Zero academic disruption. Alumni micro-grant applied ($450). Student exam hall ticket preserved automatically.",
  },
  {
    id: "wellbeing",
    category: "Support & Mentorship",
    icon: HeartHandshake,
    title: "Holistic Mentorship Check-In Request",
    student: "Rohan Varma",
    program: "B.Des Product Design • Sem 2",
    evidence: {
      title: "Engagement Shift Indicator",
      metrics: "Sudden drop in studio participation, self-reported burnout on peer review rubric",
      source: "Studio Assessment Feed & Mentor Note",
      badge: "Human-First Signal",
    },
    policy: {
      code: "POL-WEL-205",
      rule: "Gentle, non-intrusive mentor invitation. Zero diagnostic labels permitted.",
    },
    assignedOwner: "Prof. Maya Lin",
    ownerRole: "Design Studio Director",
    slaHours: 24,
    privacyTag: "Confidential Mentorship Vault",
    interventionOptions: [
      "Informal Coffee Conversation Check-in",
      "Optional Confidential Referral to Student Wellness",
      "Adjust Project Milestone Pacing",
    ],
    resolvedOutcome:
      "Intervention Executed: Project deadline adjusted by 5 days. Student connected with campus wellness counselor with sealed records. Engagement restored.",
  },
];

export default function InteractiveCaseSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("academic");
  const [selectedIntervention, setSelectedIntervention] = useState<number>(0);
  const [isResolved, setIsResolved] = useState<boolean>(false);

  const current = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    setSelectedIntervention(0);
    setIsResolved(false);
  };

  return (
    <section id="simulator" className="py-24 bg-[#09101F] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Orchestration Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Experience the Closed Loop in Action
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Select a scenario below to explore how SUTRA ingests raw telemetry, validates evidence, enforces policy, and assigns accountability.
          </p>
        </div>

        {/* Scenario Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-glow"
                    : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-emerald-400"}`} />
                <span>{sc.category}</span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Simulator Console Card */}
        <div className="rounded-2xl bg-[#0B1324] border border-white/10 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Top banner of the sandbox */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-display font-bold text-white text-sm">
                  {current.title}
                </span>
                <span className="text-slate-400 text-xs ml-2 font-mono">
                  [{current.policy.code}]
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Lock className="w-3.5 h-3.5" />
                <span>{current.privacyTag}</span>
              </span>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Student & Evidence Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Overview */}
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold uppercase font-mono tracking-wider">Student Profile</span>
                  <span className="text-emerald-400">Enrolled &amp; Active</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {current.student}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">{current.program}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Assigned Support Lead:</span>
                  <span className="font-semibold text-slate-200">{current.assignedOwner}</span>
                </div>
              </div>

              {/* Verified Evidence (Not a Score) */}
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold uppercase font-mono tracking-wider">
                    {current.evidence.title}
                  </span>
                  <span className="text-[11px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                    {current.evidence.badge}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  {current.evidence.metrics}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Provenance Origin:</span>
                  <span className="font-mono text-emerald-400">{current.evidence.source}</span>
                </div>
              </div>
            </div>

            {/* Policy Matching & SLA Section */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 font-mono">
                    Institutional Governance Rule Match: {current.policy.code}
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl">
                  {current.policy.rule}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Strict {current.slaHours}h SLA</span>
              </div>
            </div>

            {/* Step 3: Interactive Intervention Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider font-mono">
                  Select Actionable Intervention Protocol:
                </span>
                <span className="text-slate-400">Click to choose solution path</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {current.interventionOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIntervention(idx);
                      setIsResolved(false);
                    }}
                    className={`p-3.5 rounded-xl text-left text-xs transition-all border ${
                      selectedIntervention === idx
                        ? "bg-emerald-500/10 border-emerald-500 text-white shadow-glow"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-emerald-400">Option 0{idx + 1}</span>
                      {selectedIntervention === idx && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="font-medium text-slate-200">{opt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Execution CTA & Simulated Outcome */}
            <div className="pt-2">
              {!isResolved ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">
                    Ready to dispatch intervention to <strong className="text-white">{current.assignedOwner}</strong> with automatic audit log creation.
                  </div>
                  <button
                    onClick={() => setIsResolved(true)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-tight transition-all shadow-glow flex items-center justify-center gap-2"
                  >
                    <span>Execute &amp; Log Case Intervention</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>Case Closed &amp; Verified in Cohort Ledger</span>
                    </div>
                    <button
                      onClick={() => setIsResolved(false)}
                      className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset Sandbox</span>
                    </button>
                  </div>
                  <p className="text-slate-200 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-emerald-500/20 font-mono text-xs">
                    {current.resolvedOutcome}
                  </p>
                  <p className="text-[11px] text-emerald-400/80">
                    ✓ Provenance recorded • Zero stigma label generated • Retained in institutional impact metrics
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
