"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSkillHub } from "@/lib/store";
import { Search, X, BookOpen, Users, MessageSquare, ArrowRight } from "lucide-react";

export function GlobalSearchModal() {
  const router = useRouter();
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    courses,
    students,
    discussions,
    setSelectedStudent,
  } = useSkillHub();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query)
  );

  const filteredDiscussions = discussions.filter(
    (d) =>
      d.title.toLowerCase().includes(query) ||
      d.tags.some((t) => t.toLowerCase().includes(query))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/35 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 px-5 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search courses, students, community discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-neutral-100 rounded-full text-neutral-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-500">
            ESC
          </span>
        </div>

        {/* Results Stream */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-1">
                Courses
              </span>
              <div className="space-y-1">
                {filteredCourses.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push("/courses");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">{c.title}</p>
                        <p className="text-[10px] text-neutral-400">{c.category} • {c.studentsCount} students</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students */}
          {filteredStudents.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-1">
                Students
              </span>
              <div className="space-y-1">
                {filteredStudents.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSelectedStudent(s);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">{s.name}</p>
                        <p className="text-[10px] text-neutral-400">{s.course} • {s.progress}%</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      View Profile
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community */}
          {filteredDiscussions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 block mb-1">
                Community Discussions
              </span>
              <div className="space-y-1">
                {filteredDiscussions.slice(0, 3).map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push("/community");
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-900">{d.title}</p>
                        <p className="text-[10px] text-neutral-400">{d.repliesCount} replies • {d.timeAgo}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 &&
            filteredStudents.length === 0 &&
            filteredDiscussions.length === 0 && (
              <div className="text-center py-8 text-neutral-400 text-xs">
                No matching results found for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
