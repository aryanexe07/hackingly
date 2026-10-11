"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSutra } from "@/lib/store";
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  ShieldAlert,
  User,
  Calendar,
  Layers,
  FileCheck2,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function CaseWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params?.id as string;
  const { cases, logCaseFollowUp, resolveCase, currentPersona } = useSutra();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];

  // Follow-up form states
  const [actionType, setActionType] = useState("Check-in Completed");
  const [followUpNote, setFollowUpNote] = useState("");
  const [isLoggingAction, setIsLoggingAction] = useState(false);

  // Outcome form states
  const [outcomeStatus, setOutcomeStatus] = useState("Positive Improvement Observed");
  const [outcomeNote, setOutcomeNote] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [showResolvedToast, setShowResolvedToast] = useState(false);

  const handleSaveFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpNote.trim()) return;

    setIsLoggingAction(true);
    setTimeout(() => {
      logCaseFollowUp(currentCase.id, followUpNote, actionType, currentPersona.name);
      setFollowUpNote("");
      setIsLoggingAction(false);
    }, 400);
  };

  const handleResolveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeNote.trim()) return;

    setIsResolving(true);
    setTimeout(() => {
      resolveCase(currentCase.id, outcomeStatus, outcomeNote);
      setOutcomeNote("");
      setIsResolving(false);
      setShowResolvedToast(true);
    }, 500);
  };

  const isResolved = currentCase.status === "RESOLVED";
  const isOverdue = currentCase.isOverdue || currentCase.status === "ESCALATED";

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/cases"
          className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cases Registry</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          Last auditable sync: Today, 11:20 AM
        </span>
      </div>

      {/* Case Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-bold bg-slate-900 text-white px-3 py-1.5 rounded-xl">
              {currentCase.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 font-heading">
                  {currentCase.studentName}
                </h1>
                <Link
                  href={`/students/${currentCase.studentId}`}
                  className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md hover:underline"
                >
                  {currentCase.studentId}
                </Link>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentCase.program} • Intervention: <strong>{currentCase.interventionType}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono ${
                isResolved
                  ? "bg-emerald-100 text-emerald-800"
                  : isOverdue
                  ? "bg-amber-100 text-amber-800 animate-pulse"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {currentCase.status.replace("_", " ")}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Due: {currentCase.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Escalation Warning Banner (Overdue trigger) */}
        {currentCase.escalationNote && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Automated SLA Breach Escalation
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 font-medium leading-relaxed">
                {currentCase.escalationNote}
              </p>
            </div>
          </div>
        )}

        {/* Resolved Banner */}
        {isResolved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-emerald-950">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Case Successfully Resolved & Closed
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5 font-medium leading-relaxed">
                Outcome: <strong>{currentCase.outcomeStatus}</strong> — {currentCase.outcomeNote}
              </p>
            </div>
          </div>
        )}

        {/* Accountability Metadata Strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-4">
          <div className="flex items-center gap-2">
            <img
              src={currentCase.ownerAvatar}
              alt={currentCase.assignedOwner}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <span>
              Assigned Owner: <strong>{currentCase.assignedOwner}</strong> ({currentCase.ownerRole})
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>Created: {new Date(currentCase.createdAt).toLocaleDateString()}</span>
            <span>Signal Ref: {currentCase.signalId}</span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Left (65%) Timeline, Right (35%) Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (65% ~ 8 cols): Append-Only Event Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Append-Only Chronological Event Timeline
                </h3>
                <p className="text-xs text-slate-500">
                  Every interaction is permanently recorded for institutional auditability.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {currentCase.timeline.length} Touchpoints
              </span>
            </div>

            {/* Timeline Events List */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {currentCase.timeline.map((evt, idx) => (
                <div key={evt.id || idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[27px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {evt.author}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                          {evt.authorRole}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {evt.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {evt.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (35% ~ 5 cols): Actions & Outcome Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Action Form 1: Log Follow-up Action */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" /> Log Follow-up Touchpoint
            </h3>

            <form onSubmit={handleSaveFollowUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Touchpoint Category
                </label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-indigo-500"
                >
                  <option value="Check-in Completed">Mentor Check-in Completed</option>
                  <option value="Remedial Session Scheduled">Remedial Session Scheduled</option>
                  <option value="Lab Review Conducted">Lab Session Technical Review</option>
                  <option value="Parent Meeting Held">Parent Discussion Held (Approved)</option>
                  <option value="Internal Referral">Internal Academic Referral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Follow-up Notes & Pedagogical Plan
                </label>
                <textarea
                  rows={3}
                  value={followUpNote}
                  onChange={(e) => setFollowUpNote(e.target.value)}
                  placeholder="Record factual observations, discussion points, and agreed next steps..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 placeholder:text-slate-400"
                />
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  * Note: Do not record confidential clinical notes or sensitive medical data here.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoggingAction || !followUpNote.trim()}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isLoggingAction ? "Recording..." : "Save Follow-up Touchpoint"}</span>
              </button>
            </form>
          </div>

          {/* Action Form 2: Close Loop & Resolve Case */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Close Loop & Record Outcome
            </h3>
            <p className="text-xs text-slate-500">
              When support objectives have been met or formalized, record the final auditable outcome.
            </p>

            <form onSubmit={handleResolveCase} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Observed Outcome Status
                </label>
                <select
                  value={outcomeStatus}
                  onChange={(e) => setOutcomeStatus(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-emerald-50/50 border border-emerald-200 rounded-xl font-medium focus:outline-none focus:border-emerald-500"
                >
                  <option value="Positive Improvement Observed">Positive Improvement Observed (Attendance/Marks Recovered)</option>
                  <option value="Support Ongoing via Cohort">Support Ongoing via Cohort Peer Group</option>
                  <option value="External Factors Addressed">External Factors Addressed (Commute / Scheduling Adjusted)</option>
                  <option value="Unresponsive (Escalated)">Unresponsive (Formal Escalation to Academic Board)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Outcome Evidence Summary
                </label>
                <textarea
                  rows={2}
                  value={outcomeNote}
                  onChange={(e) => setOutcomeNote(e.target.value)}
                  placeholder="e.g. Student attendance recovered to 88% over past 3 weeks; lab submissions up to date."
                  className="w-full text-xs p-3 bg-emerald-50/30 border border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isResolving || !outcomeNote.trim()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isResolving ? "Completing..." : "Complete & Resolve Case"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
