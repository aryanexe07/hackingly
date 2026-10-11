"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSutra } from "@/lib/store";
import { Signal, PERSONAS } from "@/lib/data";
import {
  X,
  ShieldAlert,
  ArrowRight,
  Clock,
  Database,
  CheckCircle2,
  AlertCircle,
  Calendar,
  UserCheck,
  Send,
  FileCheck2,
  TrendingDown,
  Info,
} from "lucide-react";

export function EvidenceDrawer({
  signal,
  onClose,
}: {
  signal: Signal | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const { currentPersona, convertSignalToCase } = useSutra();

  if (!signal) return null;

  const [selectedIntervention, setSelectedIntervention] = useState(
    signal.matchedInterventions[0]?.title || "Mentor Check-in & Course Review"
  );
  const [selectedOwner, setSelectedOwner] = useState(
    signal.matchedInterventions[0]?.role || "Prof. Ananya Sharma (Mentor)"
  );
  const [slaDays, setSlaDays] = useState(
    signal.matchedInterventions[0]?.slaDays || 3
  );
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [overrideReason, setOverrideReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseCreatedId, setCaseCreatedId] = useState<string | null>(null);

  const handleLaunchCase = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newCaseId = convertSignalToCase(
        signal.id,
        selectedIntervention,
        selectedOwner,
        "Faculty Mentor",
        slaDays
      );
      setIsSubmitting(false);
      setCaseCreatedId(newCaseId);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container (600px wide, high density, accessible, beautiful) */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 z-10 flex flex-col overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-20 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
              {signal.studentId}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Evidence-to-Action Triage
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    signal.priority === "PRIORITY_REVIEW"
                      ? "bg-rose-100 text-rose-700"
                      : signal.priority === "NEEDS_REVIEW"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {signal.priority.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Triggered by {signal.ruleId} • Window: 28 Days
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1">
          {caseCreatedId ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 my-8">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-950 font-heading">
                  Support Case Successfully Launched!
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Assigned Case ID: <strong className="font-mono font-bold text-emerald-900">{caseCreatedId}</strong> with an active {slaDays}-day SLA.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/cases/${caseCreatedId}`);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Open Case Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100/50 text-xs font-semibold rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* SECTION A: Visual Timeline / Evidence Sparkline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> Section A: Verified Metric Deviation
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Baseline Threshold: 75%
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-4">
                  {/* Attendance trajectory table & visual bars */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-700">
                        Attendance Moving Average (4 Weeks)
                      </span>
                      <span className="text-rose-600 font-bold font-mono text-xs">
                        -24% Divergence
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {signal.evidenceData.attendanceTrend.map((step) => {
                        const isUnderThreshold = step.value < step.threshold;
                        return (
                          <div
                            key={step.week}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              isUnderThreshold
                                ? "bg-rose-50/80 border-rose-200 text-rose-900"
                                : "bg-white border-slate-200 text-slate-800"
                            }`}
                          >
                            <span className="block text-[10px] font-mono font-medium text-slate-500 mb-1">
                              {step.week}
                            </span>
                            <span className="block text-base font-bold font-mono">
                              {step.value}%
                            </span>
                            <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isUnderThreshold ? "bg-rose-500" : "bg-emerald-500"
                                }`}
                                style={{ width: `${step.value}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Assessments list */}
                  {signal.evidenceData.assessments.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60">
                      <p className="text-xs font-semibold text-slate-700 mb-2">
                        Recent Assessment Scores
                      </p>
                      <div className="space-y-1.5">
                        {signal.evidenceData.assessments.map((a, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                          >
                            <span className="text-slate-700 font-medium">{a.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900">
                                {a.score}/{a.maxScore}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({a.date})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Provenance Box */}
                  <div className="bg-slate-100/70 p-2.5 rounded-xl flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-slate-500" />
                      Sources: ERP Attendance DB + Canvas LMS
                    </span>
                    <span className="font-mono text-slate-500">
                      Sync: {signal.evidenceData.lmsSync.lastSync}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION B: Plain-English Rationale & Ethical Disclaimer */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-500" /> Section B: Deterministic Plain-English Rationale
                </h4>

                <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {signal.explanation}
                  </p>
                  <div className="bg-white/80 border border-indigo-100/80 rounded-xl p-2.5 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-600 leading-normal">
                      <strong>Ethical Guardrail:</strong> This signal highlights a deviation in engagement. It does not infer motivation, personal circumstances, or psychological state.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION C: Policy-Driven Intervention Recommendations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Section C: Policy-Driven Interventions
                </h4>

                <div className="space-y-2">
                  {signal.matchedInterventions.map((intv) => {
                    const isSelected = selectedIntervention === intv.title;
                    return (
                      <div
                        key={intv.id}
                        onClick={() => {
                          setSelectedIntervention(intv.title);
                          setSelectedOwner(intv.role);
                          setSlaDays(intv.slaDays);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-indigo-50/80 border-indigo-400 ring-1 ring-indigo-400/40 shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {intv.title}
                            </span>
                            {intv.isRecommended && (
                              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> SLA: {intv.slaDays} Days
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mb-1">
                          {intv.rationale}
                        </p>
                        <p className="text-[10px] text-indigo-700 font-semibold font-mono">
                          Assigned Actor: {intv.role}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION D: Case Creation Form */}
              <div className="pt-2 border-t border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" /> Section D: Launch Accountable Case
                </h4>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Intervention Type
                    </label>
                    <input
                      type="text"
                      value={selectedIntervention}
                      onChange={(e) => setSelectedIntervention(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Assign Owner
                      </label>
                      <select
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 outline-none font-medium"
                      >
                        <option value="Prof. Ananya Sharma (Mentor)">Prof. Ananya Sharma (Mentor)</option>
                        <option value="Prof. Arvind Verma (Course Faculty)">Prof. Arvind Verma (Course Faculty)</option>
                        <option value="Dr. Rajeshwar Rao (HOD)">Dr. Rajeshwar Rao (HOD)</option>
                        <option value="Dr. Meera Nambiar (Counsellor)">Dr. Meera Nambiar (Counsellor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Resolution SLA (Days)
                      </label>
                      <select
                        value={slaDays}
                        onChange={(e) => setSlaDays(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:border-indigo-500 outline-none font-medium font-mono"
                      >
                        <option value={2}>2 Days (Urgent escalation)</option>
                        <option value={3}>3 Days (Standard mentor check-in)</option>
                        <option value={5}>5 Days (Multi-touchpoint review)</option>
                        <option value={7}>7 Days (Remedial tutoring track)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="notifyOwner"
                      checked={notifyInApp}
                      onChange={(e) => setNotifyInApp(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="notifyOwner" className="text-xs text-slate-700 font-medium cursor-pointer">
                      Notify assigned faculty owner via priority in-app notification
                    </label>
                  </div>

                  <button
                    onClick={handleLaunchCase}
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Launching Case in Registry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Accept Signal & Launch Case</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
