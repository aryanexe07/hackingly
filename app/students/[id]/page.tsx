"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "@/components/SkillHubProgressBar";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Send,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = params?.id as string;
  const { students } = useSkillHub();

  const student =
    students.find((s) => s.id === studentId) ||
    students[0];

  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setMessage("");
      setSentSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/students"
          className="text-xs text-neutral-400 hover:text-neutral-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Students</span>
        </Link>
      </div>

      {/* Main Student Profile Card */}
      <div className="skill-card bg-white p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-neutral-100"
              />
              {student.isOnline && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/50" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-neutral-900 font-heading">
                  {student.name}
                </h1>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                    student.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                      : student.status === "Completed"
                      ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                {student.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">
              Enrolled: {student.enrolledDate}
            </span>
          </div>
        </div>

        {/* Current Enrolled Course Card */}
        <div className="skill-card-subtle p-5 bg-neutral-50/70 border border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Enrolled Course
            </span>
            <span className="text-xs font-bold text-neutral-900">
              {student.progress}%
            </span>
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-3">
            {student.course}
          </h3>
          <SkillHubProgressBar progress={student.progress} heightClass="h-3" />
        </div>

        {/* Key Student Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm">
            <span className="text-[11px] font-medium text-neutral-400 block">Grade</span>
            <span className="text-xl font-extrabold text-neutral-900 mt-1 block">
              {student.grade}
            </span>
          </div>
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm">
            <span className="text-[11px] font-medium text-neutral-400 block">Attendance</span>
            <span className="text-xl font-extrabold text-neutral-900 mt-1 block">
              {student.attendance}
            </span>
          </div>
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm">
            <span className="text-[11px] font-medium text-neutral-400 block">Completed</span>
            <span className="text-xl font-extrabold text-neutral-900 mt-1 block">
              {student.completedLessons} / {student.totalLessons}
            </span>
          </div>
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-center shadow-sm">
            <span className="text-[11px] font-medium text-neutral-400 block">Activity</span>
            <span className="text-xs font-bold text-neutral-900 mt-2 block">
              {student.lastActive}
            </span>
          </div>
        </div>

        {/* Send Direct Message */}
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-neutral-100 space-y-3">
          <label className="text-xs font-semibold text-neutral-700 block">
            Direct Student Communication
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Send guidance or resource link..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </div>
          {sentSuccess && (
            <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Message delivered to student portal
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
