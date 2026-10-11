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
  const {
    selectedStudent,
    setSelectedStudent,
    studentMessages,
    sendMessageToStudent,
    updateStudentStatus,
  } = useSkillHub();
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!selectedStudent) return null;

  const messages = studentMessages[selectedStudent.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessageToStudent(selectedStudent.id, message);
    setSentSuccess(true);
    setMessage("");
    setTimeout(() => {
      setSentSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-b border-neutral-100 flex items-start justify-between flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-2">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-white shadow-md"
              />
              {selectedStudent.isOnline && (
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/50" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold text-neutral-900 font-heading truncate">
                  {selectedStudent.name}
                </h3>
                {/* Dynamic Status Dropdown Selector */}
                <select
                  value={selectedStudent.status}
                  onChange={(e) =>
                    updateStudentStatus(
                      selectedStudent.id,
                      e.target.value as "Active" | "At Risk" | "Completed" | "Inactive"
                    )
                  }
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border focus:outline-none cursor-pointer transition-colors ${
                    selectedStudent.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : selectedStudent.status === "Completed"
                      ? "bg-blue-50 text-blue-700 border-blue-200/60"
                      : selectedStudent.status === "At Risk"
                      ? "bg-rose-50 text-rose-700 border-rose-200/60"
                      : "bg-neutral-100 text-neutral-600 border-neutral-200"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5 truncate">
                <Mail className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span className="truncate">{selectedStudent.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedStudent(null)}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
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
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div className="bg-white border border-neutral-100 rounded-2xl p-2.5 sm:p-3 text-center shadow-xs">
              <span className="block text-[11px] font-medium text-neutral-400">
                Grade
              </span>
              <span className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5 block">
                {selectedStudent.grade}
              </span>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-2.5 sm:p-3 text-center shadow-xs">
              <span className="block text-[11px] font-medium text-neutral-400">
                Attendance
              </span>
              <span className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5 block">
                {selectedStudent.attendance}
              </span>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-2.5 sm:p-3 text-center shadow-xs">
              <span className="block text-[11px] font-medium text-neutral-400">
                Lessons
              </span>
              <span className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5 block">
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

          {/* Dynamic Messages Thread */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-800 block">
                Direct Feedback &amp; Chat
              </label>
              <span className="text-[10px] text-neutral-400">
                {messages.length} messages
              </span>
            </div>

            {/* Chat conversation history */}
            <div className="bg-neutral-50/70 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2 border border-neutral-100/80">
              {messages.length === 0 ? (
                <p className="text-xs text-neutral-400 text-center py-4">
                  No messages exchanged yet. Send notes or resources below.
                </p>
              ) : (
                messages.map((m) => {
                  const isUser = m.sender === "user";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? "bg-neutral-900 text-white rounded-br-xs"
                            : "bg-white text-neutral-800 border border-neutral-200/70 rounded-bl-xs shadow-2xs"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-neutral-400 mt-0.5 px-1 font-mono">
                        {m.time}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick message compose form */}
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder={`Send feedback or resource to ${selectedStudent.name.split(" ")[0]}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-2xs transition-all min-h-[44px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm min-h-[44px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
              {sentSuccess && (
                <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Message sent to {selectedStudent.name}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
