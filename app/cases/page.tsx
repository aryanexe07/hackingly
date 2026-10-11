"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSutra } from "@/lib/store";
import {
  FolderGit2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Filter,
  User,
  Calendar,
  Layers,
} from "lucide-react";

export default function CasesListPage() {
  const { cases, currentPersona } = useSutra();
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredCases = cases.filter((c) => {
    if (statusFilter === "ALL") return true;
    return c.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase font-mono tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Accountability Registry
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Active Support Cases
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every intervention is owned with strict SLAs, chronological follow-up logs, and auditable outcomes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm text-xs">
          {(["ALL", "IN_PROGRESS", "ASSIGNED", "ESCALATED", "RESOLVED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                statusFilter === st
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => {
          const isOverdue = c.isOverdue || c.status === "ESCALATED";
          const isResolved = c.status === "RESOLVED";

          return (
            <div
              key={c.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                isOverdue
                  ? "border-amber-200/90 shadow-sm hover:shadow-md hover:border-amber-300"
                  : isResolved
                  ? "border-emerald-100/90 shadow-sm hover:shadow-md"
                  : "border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {c.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                      isResolved
                        ? "bg-emerald-100 text-emerald-800"
                        : isOverdue
                        ? "bg-amber-100 text-amber-800 animate-pulse"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {c.status.replace("_", " ")}
                  </span>
                </div>

                {/* Student Info */}
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {c.studentName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mb-3">
                  {c.studentId} • {c.program}
                </p>

                {/* Intervention pill */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Policy Intervention
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">
                    {c.interventionType}
                  </p>
                </div>

                {/* Overdue Alert banner if escalated */}
                {c.escalationNote && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5 text-[11px] font-medium mb-3 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{c.escalationNote}</span>
                  </div>
                )}
              </div>

              {/* Footer metadata */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.ownerAvatar}
                      alt={c.assignedOwner}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="truncate max-w-[130px] font-medium text-slate-700">
                      {c.assignedOwner}
                    </span>
                  </div>
                  <span className="font-mono flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" /> Due: {c.dueDate}
                  </span>
                </div>

                <Link
                  href={`/cases/${c.id}`}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open Case Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
