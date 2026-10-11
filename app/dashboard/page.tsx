"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSkillHub } from "@/lib/store";
import { SkillHubProgressBar } from "@/components/SkillHubProgressBar";
import { EngagementChart } from "@/components/EngagementChart";
import {
  Plus,
  ChevronDown,
  Clock,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
  const {
    user,
    setIsNewCourseModalOpen,
    courses,
    students,
    growthTimeframe,
    setGrowthTimeframe,
    analyticsTimeframe,
    setAnalyticsTimeframe,
    toggleCourseLive,
  } = useSkillHub();

  const [growthOpen, setGrowthOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const timeframes: ("This Week" | "This Month" | "This Year")[] = [
    "This Week",
    "This Month",
    "This Year",
  ];

  // Dynamic growth metrics based on timeframe
  const growthMetrics = {
    "This Week": {
      activeLearners: "6.8k",
      newEnrollments: "2.8K",
      totalEnrollments: "3.5K",
      progress: 62,
    },
    "This Month": {
      activeLearners: "25k",
      newEnrollments: "12K",
      totalEnrollments: "15K",
      progress: 38,
    },
    "This Year": {
      activeLearners: "142k",
      newEnrollments: "64K",
      totalEnrollments: "88K",
      progress: 84,
    },
  }[growthTimeframe];

  // Dynamic analytics metrics based on timeframe
  const analyticsMetrics = {
    "This Week": {
      totalStudents: "28.4K",
      studentsChange: "+15% vs last week",
      avgTime: "4h32m",
      timeChange: "-15% vs last week",
      completion: "68.4%",
      completionChange: "+12% vs last week",
    },
    "This Month": {
      totalStudents: "124K",
      studentsChange: "+28% vs last month",
      avgTime: "18h40m",
      timeChange: "+22% vs last month",
      completion: "76.2%",
      completionChange: "+18% vs last month",
    },
    "This Year": {
      totalStudents: "460K",
      studentsChange: "+65% vs last year",
      avgTime: "74h10m",
      timeChange: "+45% vs last year",
      completion: "84.5%",
      completionChange: "+24% vs last year",
    },
  }[analyticsTimeframe];

  // Derive dynamic live course
  const liveCourse = courses.find((c) => c.isUpcomingLive) || courses[0] || {
    id: "course-live",
    title: "Advanced UI/UX Design",
    liveTime: "Today, 10:00 AM",
    studentsCount: "2k+",
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER: "Welcome back, Sarah!" and "+ New Course" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Welcome back, {user.name}!
        </h1>

        <button
          onClick={() => setIsNewCourseModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {/* 2. MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* Card 1: Growth Overview */}
          <div className="skill-card p-5 sm:p-6 bg-white space-y-5 relative">
            {/* Header with interactive dropdown */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Growth Overview
              </h3>
              <div className="relative">
                <button
                  onClick={() => setGrowthOpen(!growthOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors"
                >
                  <span>{growthTimeframe}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
                {growthOpen && (
                  <div className="absolute right-0 top-8 z-30 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 w-32 animate-in fade-in zoom-in-95 duration-100">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setGrowthTimeframe(tf);
                          setGrowthOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                          growthTimeframe === tf
                            ? "bg-neutral-900 text-white font-semibold"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Learners Number & Subtitle */}
            <div>
              <span className="text-4xl font-extrabold text-neutral-900 tracking-tight block">
                {growthMetrics.activeLearners}
              </span>
              <span className="text-xs text-neutral-400 font-medium block mt-0.5">
                Active Learners ({growthTimeframe})
              </span>
            </div>

            {/* Dynamic Enrollments Comparison */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-base font-bold text-neutral-900 block">
                  {growthMetrics.newEnrollments}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  New Enrollments
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-neutral-900 block">
                  {growthMetrics.totalEnrollments}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Total Enrollments
                </span>
              </div>
            </div>

            {/* Signature Dual-Layer Gradient Tick Bar */}
            <div className="pt-2">
              <SkillHubProgressBar progress={growthMetrics.progress} heightClass="h-5" />
            </div>
          </div>

          {/* Card 2: Dynamic Live Class Card */}
          <div className="skill-card p-5 sm:p-6 bg-white flex flex-col justify-between min-h-[190px]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  {liveCourse.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{liveCourse.liveTime || "Today, 10:00 AM"}</span>
                </div>
              </div>

              <Link
                href="/courses"
                className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                title="View Course"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Bottom avatars & Interactive Live badge */}
            <div className="flex items-center justify-between pt-6">
              {/* Dynamic Avatars Stack */}
              <div className="flex items-center -space-x-2">
                {students.slice(0, 3).map((s) => (
                  <img
                    key={s.id}
                    src={s.avatar}
                    alt={s.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-600 pl-0.5">
                  {liveCourse.studentsCount || "8+"}
                </div>
              </div>

              {/* Interactive Live Session Toggle Button */}
              <button
                onClick={() => toggleCourseLive(liveCourse.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  liveCourse.isUpcomingLive
                    ? "bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100/70"
                    : "bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-neutral-200"
                }`}
                title="Toggle Live Session Status"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    liveCourse.isUpcomingLive
                      ? "bg-rose-500 animate-live-pulse"
                      : "bg-neutral-400"
                  }`}
                />
                <span>{liveCourse.isUpcomingLive ? "Live" : "Scheduled"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Card 1: Learning Analytics */}
          <div className="skill-card p-5 sm:p-6 bg-white space-y-5 relative">
            {/* Header with interactive timeframe dropdown */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Learning Analytics
              </h3>
              <div className="relative">
                <button
                  onClick={() => setAnalyticsOpen(!analyticsOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors"
                >
                  <span>{analyticsTimeframe}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
                {analyticsOpen && (
                  <div className="absolute right-0 top-8 z-30 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 w-32 animate-in fade-in zoom-in-95 duration-100">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setAnalyticsTimeframe(tf);
                          setAnalyticsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                          analyticsTimeframe === tf
                            ? "bg-neutral-900 text-white font-semibold"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3 Sub-Cards dynamically updating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Sub-card 1: Total Students */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Total Students
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  {analyticsMetrics.totalStudents}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  <span>{analyticsMetrics.studentsChange}</span>
                </span>
              </div>

              {/* Sub-card 2: Avg. Learning Time */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Avg. Learning Time
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  {analyticsMetrics.avgTime}
                </span>
                <span className="text-[11px] font-medium text-rose-500 mt-2 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                  <span>{analyticsMetrics.timeChange}</span>
                </span>
              </div>

              {/* Sub-card 3: Completion Rate */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Completion Rate
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  {analyticsMetrics.completion}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  <span>{analyticsMetrics.completionChange}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Student Engagement Trend linked to active timeframe */}
          <EngagementChart timeframe={analyticsTimeframe} />
        </div>
      </div>
    </div>
  );
}
