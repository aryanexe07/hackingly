"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Users,
  Building2,
  HeartHandshake,
  DollarSign,
  LineChart,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock
} from "lucide-react";

interface Persona {
  id: string;
  title: string;
  badge: string;
  icon: any;
  quote: string;
  coreViews: string[];
  guardrails: string[];
  mockupHeader: string;
  mockupMetric: string;
  mockupSub: string;
  sampleAction: string;
}

const personas: Persona[] = [
  {
    id: "instructor",
    title: "Course Instructor",
    badge: "Academic Roster Mode",
    icon: GraduationCap,
    quote: "I need to quickly see which students are struggling with lab milestones without wading through irrelevant personal records.",
    coreViews: ["Course Roster Signals", "Assessment Lag Heatmap", "1-Click Remedial Referral"],
    guardrails: [
      "Strictly blind to fee arrears or tuition billing",
      "No access to confidential medical or counselling notes",
      "Only sees students enrolled in their active courses",
    ],
    mockupHeader: "CS204: Algorithms (Sec B)",
    mockupMetric: "3 Overdue Labs Flagged",
    mockupSub: "2 Students Referred for TA Peer-Tutoring Session",
    sampleAction: "Dispatch TA Peer-Tutoring Match",
  },
  {
    id: "mentor",
    title: "Faculty Mentor",
    badge: "Mentee 360° Mode",
    icon: Users,
    quote: "I hold holistic responsibility for 25 mentees. I need to know when quiet shifts happen before they turn into exam failures.",
    coreViews: ["Mentee 360° Trend Graph", "Check-In Log Schedule", "Active Support Cases"],
    guardrails: [
      "Sees multi-subject trends across courses",
      "Zero access to clinical mental health session transcripts",
      "Direct communication channel to department HOD",
    ],
    mockupHeader: "Mentorship Cohort Alpha (24 Students)",
    mockupMetric: "94% Check-In Rate",
    mockupSub: "1 Active 48h Support Case (Meera S. • Academic Advising)",
    sampleAction: "Log Mentorship Conversation Notes",
  },
  {
    id: "hod",
    title: "HOD / Department Chair",
    badge: "Triage & Escalation Mode",
    icon: Building2,
    quote: "I need to ensure no alert sits idle in a professor's queue for more than 48 hours. Bottlenecks become dropouts.",
    coreViews: ["Department Triage Board", "Escalation Inbox", "Faculty SLA Compliance Tracker"],
    guardrails: [
      "Aggregated department health metrics",
      "Can reassign stalled cases across department faculty",
      "Receives automated escalation if 48h SLA breached",
    ],
    mockupHeader: "Computer Science Dept Overview",
    mockupMetric: "98.2% SLA Adherence",
    mockupSub: "Zero Unassigned Alerts in Queue • Avg Resolution: 34h",
    sampleAction: "Rebalance Case Load Across Mentors",
  },
  {
    id: "counsellor",
    title: "Student Counsellor",
    badge: "Confidential Vault Mode",
    icon: HeartHandshake,
    quote: "Students must trust that our conversations are private. SUTRA gives us a secure referral doorway without exposing clinical details.",
    coreViews: ["Confidential Referrals Queue", "Private Session Scheduler", "Sealed Outcome Tracker"],
    guardrails: [
      "Zero visibility to faculty, instructors, or leadership",
      "Encrypted medical & emotional wellness notes",
      "Faculty only receives a binary 'Support in Progress' status",
    ],
    mockupHeader: "Wellness Support Sanctuary",
    mockupMetric: "12 Confidential Referrals",
    mockupSub: "All notes sealed behind AES-256 Counselor Encryption Key",
    sampleAction: "Confirm Anonymous Session Attendance",
  },
  {
    id: "finance",
    title: "Student Welfare & Bursar",
    badge: "Financial Aid Mode",
    icon: DollarSign,
    quote: "Financial distress should never lead to academic humiliation. We coordinate micro-grants and installment relief discreetly.",
    coreViews: ["Hardship Assistance Queue", "Endowment Aid Matcher", "Clearance Authorization"],
    guardrails: [
      "Operates in complete isolation from classroom professors",
      "Non-punitive framework: prevents auto-debarment during aid review",
      "Transparent audit trail for university auditors",
    ],
    mockupHeader: "Campus Aid & Hardship Desk",
    mockupMetric: "$42,000 Micro-Grants Allocated",
    mockupSub: "38 Students Protected from Exam Hall Debarment",
    sampleAction: "Authorize 30-Day Installment Extension",
  },
  {
    id: "leadership",
    title: "Provost & Institutional Leadership",
    badge: "Cohort Governance Mode",
    icon: LineChart,
    quote: "The Board needs to see cohort persistence and SLA throughput, not individual student surveillance.",
    coreViews: ["Institutional Retention Health", "SLA Bottleneck Heatmap", "Program Outcomes"],
    guardrails: [
      "High-level aggregated cohort insights only",
      "Individual student profiles suppressed by default",
      "Accreditation & compliance export readiness (NAAC, ABET, HLC)",
    ],
    mockupHeader: "University Cohort Health Telemetry",
    mockupMetric: "+6.8% First-Year Persistence",
    mockupSub: "SLA Resolution Speed Improved by 4.2x Across 8 Schools",
    sampleAction: "Generate Accreditation Board Report",
  },
];

export default function PersonaShowcase() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("mentor");
  const activePersona = personas.find((p) => p.id === selectedPersonaId) || personas[1];

  return (
    <section id="personas" className="py-24 bg-[#09101F] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Purpose-Aware Role Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Tailored Modes for Every Campus Stakeholder
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            SUTRA adapts navigation, visible telemetry, and action capabilities based on who is logged in—with strict privacy ring-fencing built in.
          </p>
        </div>

        {/* Persona selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`p-4 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-2.5 border ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-glow border-emerald-400"
                    : "bg-slate-900/80 hover:bg-slate-850 text-slate-300 border-slate-800"
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-slate-950" : "text-emerald-400"}`} />
                <span className="text-xs font-semibold leading-tight">{persona.title}</span>
              </button>
            );
          })}
        </div>

        {/* Focused Persona Detail Card */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0B1324] to-[#070D18] border border-white/10 p-6 sm:p-10 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Persona Description & Guardrails */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {activePersona.badge}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-medium">Role-Gated Surface</span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-200 font-medium italic border-l-2 border-emerald-400 pl-4">
                &ldquo;{activePersona.quote}&rdquo;
              </blockquote>

              {/* Core Views */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Core UI Views &amp; Controls:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activePersona.coreViews.map((view, vIdx) => (
                    <span
                      key={vIdx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-medium"
                    >
                      {view}
                    </span>
                  ))}
                </div>
              </div>

              {/* Privacy Guardrails */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2.5 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strict Sensitive Data Guardrails:</span>
                </h4>
                <div className="space-y-2">
                  {activePersona.guardrails.map((guard, gIdx) => (
                    <div key={gIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{guard}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Role Screen Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-slate-200 font-bold">
                      {activePersona.mockupHeader}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Live Role Session
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400">Primary Objective Key Metric</p>
                  <p className="text-xl font-display font-extrabold text-white mt-1">
                    {activePersona.mockupMetric}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{activePersona.mockupSub}</p>
                </div>

                <div className="pt-2">
                  <button className="w-full py-2.5 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs hover:bg-emerald-500/25 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activePersona.sampleAction}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span>Role Authorized</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <EyeOff className="w-3 h-3 text-rose-400" />
                    <span>Unauthorized Surfaces Blanked</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
