"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "@/components/SkillHubProgressBar";
import {
  MoreVertical,
  MessageSquare,
  Search,
  Plus,
  UserPlus,
  X,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";

export default function StudentsPage() {
  const {
    students,
    activeStudentFilter,
    setActiveStudentFilter,
    setSelectedStudent,
    updateStudentStatus,
    addStudent,
    deleteStudent,
    courses,
  } = useSkillHub();

  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuStudentId, setOpenMenuStudentId] = useState<string | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // New Student Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCourse, setNewCourse] = useState(courses[0]?.title || "Figma UI/UX Design Essentials");
  const [newStatus, setNewStatus] = useState<"Active" | "At Risk" | "Completed" | "Inactive">("Active");

  const tabs = ["All Students", "Active", "At Risk", "Completed", "Inactive"];

  const filteredStudents = students.filter((s) => {
    const matchesFilter =
      activeStudentFilter === "All Students" ? true : s.status === activeStudentFilter;
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addStudent({
      name: newName.trim(),
      email: newEmail.trim(),
      avatar: "/assets/avatar-sarah.jpg",
      course: newCourse,
      progress: 10,
      status: newStatus,
      isOnline: true,
      lastActive: "Just now",
      enrolledDate: "October 2026",
      grade: "A",
      attendance: "100%",
      completedLessons: 1,
      totalLessons: 12,
    });

    setNewName("");
    setNewEmail("");
    setIsAddStudentOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
            Students
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {students.length} enrolled students across your active cohorts
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200/80 rounded-full text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 min-h-[40px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                ×
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-all min-h-[40px] whitespace-nowrap active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER TABS with Counts */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const count =
            tab === "All Students"
              ? students.length
              : students.filter((s) => s.status === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveStudentFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeStudentFilter === tab
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 border border-neutral-200/50"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeStudentFilter === tab
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. STUDENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="skill-card bg-white p-6 flex flex-col justify-between hover:shadow-skill-hover transition-all duration-200 relative"
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight leading-snug">
                        {student.name}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          student.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : student.status === "At Risk"
                            ? "bg-amber-50 text-amber-700"
                            : student.status === "Completed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {student.email}
                    </p>
                  </div>
                </div>

                {/* 3-Dot Options Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuStudentId(
                        openMenuStudentId === student.id ? null : student.id
                      )
                    }
                    className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                    title="Student Options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {openMenuStudentId === student.id && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setOpenMenuStudentId(null)}
                      />
                      <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                        <span className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                          Change Status
                        </span>
                        {(["Active", "At Risk", "Completed", "Inactive"] as const).map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => {
                                updateStudentStatus(student.id, status);
                                setOpenMenuStudentId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-xs text-neutral-700 hover:bg-neutral-50 flex items-center justify-between transition-colors"
                            >
                              <span>{status}</span>
                              {student.status === status && (
                                <Check className="w-3.5 h-3.5 text-neutral-900" />
                              )}
                            </button>
                          )
                        )}
                        <div className="border-t border-neutral-100 my-1" />
                        <button
                          onClick={() => {
                            deleteStudent(student.id);
                            setOpenMenuStudentId(null);
                          }}
                          className="w-full px-3 py-1.5 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove Student</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
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

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-6">
              <button
                onClick={() => setSelectedStudent(student)}
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
            {searchQuery
              ? `No students found matching "${searchQuery}"`
              : `No students found in "${activeStudentFilter}"`}
          </div>
        )}
      </div>

      {/* Enroll Student Modal */}
      {isAddStudentOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/35 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsAddStudentOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Enroll Student
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Add a new learner to your cohort roster
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Foster"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. liam.f@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Assigned Course
                </label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Initial Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(
                      e.target.value as "Active" | "At Risk" | "Completed" | "Inactive"
                    )
                  }
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                >
                  <option value="Active">Active</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-full text-xs font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-colors"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
