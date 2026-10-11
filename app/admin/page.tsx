"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSutra } from "@/lib/store";
import { RULES_REGISTRY } from "@/lib/data";
import {
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Database,
  Lock,
  Clock,
  Layers,
  FileCode,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { loadScenario, resetAllData, activeScenario, currentPersona } = useSutra();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [justReset, setJustReset] = useState(false);

  const handleReset = () => {
    resetAllData();
    setResetModalOpen(false);
    setJustReset(true);
    setTimeout(() => setJustReset(false), 3000);
  };

  const scenarios = [
    {
      id: 1,
      title: "Scenario 1: STU-1042 (The Happy Path)",
      subtitle: "Full End-to-End Orchestration Loop",
      desc: "Declining attendance (86% → 62%) + assessment drop (-13 pts) → fires Multi-Factor signal → Evidence drawer expansion → mentor check-in launch → follow-up logging → case resolved.",
      badge: "Judging Rehearsal Primary",
      badgeColor: "bg-emerald-100 text-emerald-800",
      cta: "Launch STU-1042 Journey",
      action: () => {
        loadScenario(1);
        router.push("/dashboard");
      },
    },
    {
      id: 2,
      title: "Scenario 2: STU-1088 (Data Quality / Insufficient Baseline)",
      subtitle: "System Refuses to Hallucinate Risk",
      desc: "LMS sync is interrupted for 14 days. The UI renders clean grey 'Insufficient baseline data' notice rather than synthesizing a false alert or hallucinating student failure.",
      badge: "Ethical AI Guardrail",
      badgeColor: "bg-slate-100 text-slate-800",
      cta: "Test Missing Data State",
      action: () => {
        loadScenario(2);
        router.push("/signals");
      },
    },
    {
      id: 3,
      title: "Scenario 3: STU-1095 (Privacy & Fee Gating)",
      subtitle: "Differential Role-Based Field Redaction",
      desc: "Tuition installment arrears are flagged. In Faculty / Mentor view, financial details are strictly sealed behind cryptographic purple lock card. Switching to Finance Officer reveals clean billing statement.",
      badge: "Privacy Architecture",
      badgeColor: "bg-purple-100 text-purple-800",
      cta: "Test Role-Gated Redaction",
      action: () => {
        loadScenario(3);
        router.push("/students/STU-1095");
      },
    },
    {
      id: 4,
      title: "Scenario 4: STU-1014 (Overdue & SLA Escalation)",
      subtitle: "Automated Governance & HOD Escalation",
      desc: "Student with consecutive lab absences has a case backdated 5 days. SLA of 72h breached; UI renders pulsating overdue badge and automated escalation banner to HOD Dr. Rao.",
      badge: "SLA Policy Enforcement",
      badgeColor: "bg-amber-100 text-amber-800",
      cta: "Test Escalation Flow",
      action: () => {
        loadScenario(4);
        router.push("/cases/CASE-2026-064");
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase font-mono tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Governance & Sandbox
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Admin, Rules Registry & Demo Sandbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            One-click evaluation fixtures for judging rehearsal and inspectable policy threshold rules.
          </p>
        </div>

        <button
          onClick={() => setResetModalOpen(true)}
          className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Database to Pristine Seed</span>
        </button>
      </div>

      {justReset && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Database reset to original seed state successfully! All synthetic fixtures restored.</span>
        </div>
      )}

      {/* 4 ONE-CLICK DEMO SCENARIOS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Canonical Evaluation Scenarios
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Active: <strong className="text-slate-800">{activeScenario}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono ${sc.badgeColor}`}
                  >
                    {sc.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    Fixture #{sc.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {sc.title}
                </h3>
                <p className="text-xs font-bold text-indigo-700 mt-0.5 mb-2">
                  {sc.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={sc.action}
                  className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{sc.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RULES & THRESHOLDS REGISTRY TABLE */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" /> Active Policy Rules & Thresholds Registry
            </h2>
            <p className="text-xs text-slate-500">
              Inspectable deterministic rules governing institutional signal generation.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            {RULES_REGISTRY.length} Active Rules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Rule ID</th>
                <th className="py-3 px-3">Rule Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Evaluation Parameters</th>
                <th className="py-3 px-3">Default SLA</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RULES_REGISTRY.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {r.id}{" "}
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({r.version})
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-800">
                    {r.name}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium font-mono text-[11px]">
                      {r.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 max-w-xs leading-relaxed">
                    {r.parameters}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {r.defaultSlaHours}h
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] font-mono">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Database Reset */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Reset Database to Pristine Seed?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This will re-initialize all 4 scenarios, clear newly added cases, and restore STU-1042, STU-1088, STU-1095, and STU-1014 to their default evaluation states.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
