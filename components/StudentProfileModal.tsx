"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "./SkillHubProgressBar";
import {
  X,
  Mail,
  Calendar,
  GraduationCap,
  Clock,
  Send,
  CheckCircle2,
  Award,
  BookOpen,
} from "lucide-react";

export function StudentProfileModal() {
  const { selectedStudent, setSelectedStudent } = useSkillHub();
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!selectedStudent) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setMessage("");
      setSentSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-b border-neutral-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
              />
              {selectedStudent.isOnline && (
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/50" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-neutral-900 font-heading">
                  {selectedStudent.name}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                    selectedStudent.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      : selectedStudent.status === "Completed"
                      ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                      : selectedStudent.status === "At Risk"
                      ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                {selectedStudent.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedStudent(null)}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Enrolled Course & Progress */}
          <div className="bg-neutral-50/80 rounded-2xl p-4 border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-neutral-400" /> Current Course
              </span>
              <span className="text-xs font-bold text-neutral-900">
                {selectedStudent.progress}% Complete
              </span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 mb-3">
              {selectedStudent.course}
            </h4>
            <SkillHubProgressBar progress={selectedStudent.progress} heightClass="h-3" />
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-neutral-100 rounded-2xl p-3 text-center shadow-sm">
              <span className="block text-[11px] font-medium text-neutral-400">
                Grade
              </span>
              <span className="text-lg font-bold text-neutral-900 mt-0.5 block">
                {selectedStudent.grade}
              </span>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-3 text-center shadow-sm">
              <span className="block text-[11px] font-medium text-neutral-400">
                Attendance
              </span>
              <span className="text-lg font-bold text-neutral-900 mt-0.5 block">
                {selectedStudent.attendance}
              </span>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-3 text-center shadow-sm">
              <span className="block text-[11px] font-medium text-neutral-400">
                Lessons
              </span>
              <span className="text-lg font-bold text-neutral-900 mt-0.5 block">
                {selectedStudent.completedLessons}/{selectedStudent.totalLessons}
              </span>
            </div>
          </div>

          {/* Bio / Mentor Notes */}
          {selectedStudent.bio && (
            <div className="text-xs text-neutral-600 leading-relaxed bg-white border border-neutral-100 rounded-2xl p-3.5">
              <span className="font-semibold text-neutral-800 block mb-1">
                Student Objective
              </span>
              {selectedStudent.bio}
            </div>
          )}

          {/* Quick Direct Message Box */}
          <form onSubmit={handleSendMessage} className="space-y-3 pt-2 border-t border-neutral-100">
            <label className="text-xs font-semibold text-neutral-800 block">
              Send Student Feedback or Resource
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a message to student..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
            {sentSuccess && (
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Message dispatched to student inbox
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
