"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSutra } from "@/lib/store";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  Clock,
  Calendar,
  BookOpen,
  Award,
  Layers,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  FileText,
  DollarSign,
  Briefcase,
  Activity,
  Shield,
} from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params?.id as string;
  const { students, currentPersona, setRole } = useSutra();

  const student = students[studentId] || students["STU-1042"];
  const [activeTab, setActiveTab] = useState<
    "ATTENDANCE" | "ACADEMICS" | "LMS" | "FEES" | "SKILLS" | "FACULTY_NOTES"
  >("ATTENDANCE");

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/students"
          className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Students Directory</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">
          Last record refresh: Today, 08:30 AM
        </span>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                  {student.name}
                </h1>
                <span className="font-mono text-sm font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                  {student.id}
                </span>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Consent Verified • Academic & Support Scope</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {student.program} • {student.department}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Batch: {student.batch} • Assigned Mentor:{" "}
                <strong className="text-slate-800">{student.mentor}</strong>
              </p>
            </div>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60">
            <div className="px-3 py-1 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Attendance
              </span>
              <span
                className={`block text-base font-bold font-mono ${
                  student.attendance.overallRate < 75 ? "text-rose-600" : "text-slate-900"
                }`}
              >
                {student.attendance.overallRate}%
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="px-3 py-1 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                CGPA
              </span>
              <span className="block text-base font-bold font-mono text-slate-900">
                {student.academics.cgpa}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="px-3 py-1 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Readiness
              </span>
              <span className="block text-base font-bold font-mono text-indigo-600">
                {student.skills.placementReadinessScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Six Data Stream Tabs Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pt-6 mt-6 border-t border-slate-100 text-xs font-semibold">
          {[
            { id: "ATTENDANCE", label: "1. Attendance Matrix", icon: Clock },
            { id: "ACADEMICS", label: "2. Academic Progression", icon: GraduationCap },
            { id: "LMS", label: "3. LMS & Participation", icon: BookOpen },
            { id: "FEES", label: "4. Fee Status (Role-Gated)", icon: DollarSign, isGated: true },
            { id: "SKILLS", label: "5. Skills & Placement", icon: Award },
            { id: "FACULTY_NOTES", label: "6. Faculty Observations", icon: FileText },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                } ${tab.isGated && !currentPersona.canViewFee ? "text-purple-700 bg-purple-50/50" : ""}`}
              >
                <tab.icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.isGated && (
                  <Lock className="w-3 h-3 text-purple-600 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm min-h-[380px]">
        {/* TAB 1: Attendance Matrix */}
        {activeTab === "ATTENDANCE" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Attendance Matrix & Deviation Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated from biometric entry logs across Lectures and Practical Labs.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                Target Threshold: 75%
              </span>
            </div>

            {/* Attendance breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Overall Aggregate</span>
                <span className="text-2xl font-extrabold font-mono text-slate-900">
                  {student.attendance.overallRate}%
                </span>
                <span className="text-[11px] text-rose-600 block font-semibold mt-1">
                  -24% below 4-week moving baseline
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Theory Lecture Sessions</span>
                <span className="text-2xl font-extrabold font-mono text-slate-900">
                  {student.attendance.lecturesRate}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Acceptable threshold compliance
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                <span className="text-xs text-rose-800 block mb-1">Practical Laboratory Sessions</span>
                <span className="text-2xl font-extrabold font-mono text-rose-900">
                  {student.attendance.labsRate}%
                </span>
                <span className="text-[11px] text-rose-700 block font-semibold mt-1">
                  Critical drop due to 8:30 AM transit delays
                </span>
              </div>
            </div>

            {/* Sparkline Weeks */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Weekly Moving Trajectory
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {student.attendance.fourWeekTrend.map((step) => (
                  <div
                    key={step.week}
                    className="p-3 rounded-xl border border-slate-200 bg-white text-center"
                  >
                    <span className="text-xs font-mono text-slate-500 block mb-1">
                      {step.week}
                    </span>
                    <span className="text-lg font-bold font-mono text-slate-900">
                      {step.rate}%
                    </span>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          step.rate < 75 ? "bg-rose-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${step.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Absence Log */}
            {student.attendance.recentAbsences.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Recent Logged Session Absences
                </h4>
                <div className="space-y-2">
                  {student.attendance.recentAbsences.map((ab, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="font-mono text-slate-500">{ab.date}</span>
                      <span className="font-semibold text-slate-800">{ab.session}</span>
                      <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ab.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Academic Progression */}
        {activeTab === "ACADEMICS" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Academic Assessment Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous evaluation scores benchmarked against course cohort averages.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                Term Average: {student.academics.currentSemesterAvg}%
              </span>
            </div>

            <div className="space-y-3">
              {student.academics.assessments.map((ass, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-indigo-600 font-bold block mb-0.5">
                      {ass.course}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {ass.test}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase block">Score</span>
                      <span className="text-lg font-bold font-mono text-slate-900">
                        {ass.score}/100
                      </span>
                    </div>
                    <div className="text-right border-l border-slate-200 pl-6">
                      <span className="text-[10px] text-slate-400 uppercase block">Cohort Avg</span>
                      <span className="text-sm font-bold font-mono text-slate-500">
                        {ass.classAvg}/100
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LMS & Participation */}
        {activeTab === "LMS" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Learning Management System (LMS) Telemetry
                </h3>
                <p className="text-xs text-slate-500">
                  Online platform submissions, discussion forums, and quiz completions.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                Status: {student.lms.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Quiz Completion Rate</span>
                <span className="text-2xl font-bold font-mono text-slate-900">
                  {student.lms.quizCompletionRate}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Forum Contributions</span>
                <span className="text-2xl font-bold font-mono text-slate-900">
                  {student.lms.discussionPostsCount} Posts
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Turn-in Punctuality</span>
                <span className="text-2xl font-bold font-mono text-slate-900">
                  {student.lms.turnInPunctuality}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Fee Status (ROLE-GATED) */}
        {activeTab === "FEES" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  Financial Welfare & Tuition Status (Privacy-Gated)
                </h3>
                <p className="text-xs text-slate-500">
                  Governed under institutional privacy charter. Invisible to classroom instructors.
                </p>
              </div>

              {/* Demo Role Switch Shortcut */}
              <button
                onClick={() => setRole(currentPersona.canViewFee ? "FACULTY" : "FINANCE")}
                className="text-xs px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl font-bold transition-colors font-mono flex items-center gap-1.5"
              >
                <span>Switch to {currentPersona.canViewFee ? "Faculty (Lock)" : "Finance Officer (Unlock)"}</span>
              </button>
            </div>

            {/* Role-Gated Render */}
            {!currentPersona.canViewFee ? (
              <div className="p-8 rounded-3xl bg-purple-50/70 border border-purple-200 text-center space-y-3 max-w-lg mx-auto my-6">
                <div className="w-12 h-12 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-purple-950 font-heading">
                  Financial Records Redacted for {currentPersona.name}
                </h4>
                <p className="text-xs text-purple-900/80 leading-relaxed">
                  To prevent unconscious pedagogical bias and protect student dignity, financial assistance and fee balance records are strictly restricted to <strong>Finance & Student Welfare Officers</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setRole("FINANCE")}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    Switch to Mr. Malhotra (Finance Officer View)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-5 bg-white border border-purple-200 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-bold block">
                        Outstanding Tuition Balance
                      </span>
                      <span className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5 block">
                        ₹{student.feeStatus.balanceDue.toLocaleString()}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full font-mono ${
                        student.feeStatus.hasArrears
                          ? "bg-rose-100 text-rose-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {student.feeStatus.hasArrears ? "Installment Overdue" : "Account Cleared"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block">Due Date Status</span>
                      <span className="font-semibold text-slate-800">{student.feeStatus.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Scholarship & Welfare Aid</span>
                      <span className="font-semibold text-indigo-700">
                        {student.feeStatus.scholarshipName || "Standard Tuition Schedule"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Skills & Placement Readiness */}
        {activeTab === "SKILLS" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Skills & Career Placement Readiness
                </h3>
                <p className="text-xs text-slate-500">
                  Verified coding competencies and mock recruitment assessments.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                Readiness Index: {student.skills.placementReadinessScore}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Verified Technical Skill Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  {student.skills.verifiedBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <span>Algorithmic Problems Solved on Platform:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {student.skills.codingProfileSolved} Problems
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Faculty Feedback Notes */}
        {activeTab === "FACULTY_NOTES" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Categorical Faculty Observations
                </h3>
                <p className="text-xs text-slate-500">
                  Structured formative notes submitted by course instructors.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {student.facultyNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{note.faculty}</span>
                    <span className="font-mono text-slate-400 text-[11px]">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {note.observation}
                  </p>
                  <span className="text-[10px] text-indigo-700 font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-md inline-block">
                    {note.course} • {note.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Audit Trail Footer */}
      <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          Audit Trail: Profile accessed by {currentPersona.name} ({currentPersona.title})
        </span>
        <span className="font-mono text-slate-400">
          Access Log ID: AUD-2026-9481 • Scope: Authorized Mentor
        </span>
      </div>
    </div>
  );
}
