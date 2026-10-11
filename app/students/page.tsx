"use client";

import React from "react";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "@/components/SkillHubProgressBar";
import { MoreVertical, MessageSquare } from "lucide-react";

export default function StudentsPage() {
  const {
    students,
    activeStudentFilter,
    setActiveStudentFilter,
    setSelectedStudent,
    setIsMessagesOpen,
  } = useSkillHub();

  const tabs = ["All Students", "Active", "At Risk", "Completed", "Inactive"];

  const filteredStudents = students.filter((s) => {
    if (activeStudentFilter === "All Students") return true;
    return s.status === activeStudentFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Students
        </h1>
      </div>

      {/* 2. FILTER TABS: All Students, Active, At Risk, Completed, Inactive */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveStudentFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeStudentFilter === tab
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 border border-neutral-200/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. STUDENT CARDS GRID matching Image 4 1:1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="skill-card bg-white p-6 flex flex-col justify-between hover:shadow-skill-hover transition-all duration-200"
          >
            {/* Top row: Avatar + Name + Email + Menu */}
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-100"
                    />
                    {student.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/50" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 tracking-tight leading-snug">
                      {student.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {student.email}
                    </p>
                  </div>
                </div>

                <button
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                  title="Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Course Title + Progress Number */}
              <div className="flex items-center justify-between mt-6 mb-2">
                <span className="text-xs font-semibold text-neutral-800">
                  {student.course}
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  {student.progress}%
                </span>
              </div>

              {/* Signature Gradient Tick Progress Bar */}
              <SkillHubProgressBar
                progress={student.progress}
                heightClass="h-3"
              />
            </div>

            {/* Bottom Actions: Message icon + "View Profile" pill button */}
            <div className="flex items-center gap-2 pt-6">
              <button
                onClick={() => setIsMessagesOpen(true)}
                className="w-9 h-9 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                title="Message Student"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedStudent(student)}
                className="flex-1 py-2 bg-white hover:bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-800 transition-colors text-center shadow-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-neutral-100 text-neutral-400 text-xs">
            No students found in &ldquo;{activeStudentFilter}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
