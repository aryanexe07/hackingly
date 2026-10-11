"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "@/components/SkillHubProgressBar";
import {
  Plus,
  MoreVertical,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function CoursesPage() {
  const {
    courses,
    activeCourseFilter,
    setActiveCourseFilter,
    setIsNewCourseModalOpen,
  } = useSkillHub();

  const tabs = ["All Courses", "Published", "Drafts", "Archived"];

  const filteredCourses = courses.filter((c) => {
    if (activeCourseFilter === "All Courses") return true;
    return c.status === activeCourseFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Title and New Course Button */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Courses
        </h1>

        <button
          onClick={() => setIsNewCourseModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {/* 2. FILTER TABS: All Courses, Published, Drafts, Archived */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCourseFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCourseFilter === tab
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70 border border-neutral-200/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. MAIN SPLIT: Course Grid (left) & Right Panel (Upcoming Classes + Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: 2x2 Course Cards (approx 8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="skill-card bg-white p-5 flex flex-col justify-between group hover:shadow-skill-hover transition-all duration-200"
            >
              <div>
                {/* 3D Image Artwork + Menu */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-neutral-400 hover:text-neutral-800 shadow-sm transition-colors"
                    title="Course Options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-base font-bold text-neutral-900 tracking-tight leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-1 font-medium">
                  {course.subtitle}
                </p>
              </div>

              {/* Bottom: Avatars + Percentage + Progress Bar */}
              <div className="pt-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  {/* Avatars */}
                  <div className="flex items-center -space-x-2">
                    <img
                      src="/assets/avatar-marvin.jpg"
                      alt="Student"
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                    />
                    <img
                      src="/assets/avatar-albert.jpg"
                      alt="Student"
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                    />
                    <img
                      src="/assets/avatar-bessie.jpg"
                      alt="Student"
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                    />
                    <span className="text-[10px] font-bold text-neutral-600 pl-3">
                      {course.studentsCount}
                    </span>
                  </div>

                  {/* Progress percentage */}
                  <span className="font-bold text-neutral-900">
                    {course.progress}%
                  </span>
                </div>

                {/* Signature Dual Progress Bar */}
                <SkillHubProgressBar
                  progress={course.progress}
                  heightClass="h-3"
                />
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-neutral-100 text-neutral-400 text-xs">
              No courses found in &ldquo;{activeCourseFilter}&rdquo;
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Upcoming Classes + Recent Activity (approx 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Upcoming Classes */}
          <div className="skill-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Upcoming Classes
              </h3>
              <button
                className="w-7 h-7 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                title="Expand Class"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Avatars stack + 8+ */}
            <div className="flex items-center -space-x-2 pt-1">
              <img
                src="/assets/avatar-marvin.jpg"
                alt="Student"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <img
                src="/assets/avatar-albert.jpg"
                alt="Student"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <img
                src="/assets/avatar-bessie.jpg"
                alt="Student"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
              />
              <div className="w-7 h-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-neutral-600 pl-0.5">
                8+
              </div>
            </div>

            {/* Class Title, Time & Live Badge */}
            <div className="pt-2">
              <h4 className="text-sm font-bold text-neutral-900">
                Advanced UI/UX Design
              </h4>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Today, 10:00 AM</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 border border-rose-100 rounded-full text-[11px] font-semibold text-rose-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-live-pulse" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="skill-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Recent Activity
              </h3>
              <button className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 transition-colors">
                View all
              </button>
            </div>

            {/* Activity List matching screenshot 1:1 */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                    Advanced UI/UX Design
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    12 new enrollments
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>1h ago</span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                    React.js Masterclass
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Lesson updated
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>3h ago</span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                    React.js Masterclass
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    12 new enrollments
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>5h ago</span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                    Design System Essentials
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    12 new enrollments
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" />
                  <span>2h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
