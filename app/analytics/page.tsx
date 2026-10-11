"use client";

import React from "react";
import { useSkillHub } from "@/lib/store";
import { LearningProgressChart } from "@/components/LearningProgressChart";
import { EngagementChart } from "@/components/EngagementChart";
import { RadialProgressGauge } from "@/components/RadialProgressGauge";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { Plus, Users, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const {
    setIsCreatePostModalOpen,
    analyticsTimeframe,
    setAnalyticsTimeframe,
    students,
  } = useSkillHub();

  const timeframes = ["This Week", "This Month", "This Year"] as const;

  const metricsByTimeframe = {
    "This Week": {
      studentsActive: "1,240",
      studyHours: "318 hrs",
      completionRate: "84%",
      growth: "+14.2%",
    },
    "This Month": {
      studentsActive: `${(students.length * 480).toLocaleString()}`,
      studyHours: "1,420 hrs",
      completionRate: "78%",
      growth: "+8.6%",
    },
    "This Year": {
      studentsActive: "18,920",
      studyHours: "14,850 hrs",
      completionRate: "91%",
      growth: "+28.4%",
    },
  };

  const metrics = metricsByTimeframe[analyticsTimeframe] || metricsByTimeframe["This Month"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
            Learning Analytics
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time cohort engagement, course completion metrics, and activity rhythms
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Timeframe Pill Switcher */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200/50">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setAnalyticsTimeframe(tf)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  analyticsTimeframe === tf
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCreatePostModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all min-h-[40px]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Post</span>
          </button>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="skill-card bg-white p-4 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Active Learners
            </span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            {metrics.studentsActive}
          </div>
          <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>{metrics.growth} vs prior period</span>
          </p>
        </div>

        <div className="skill-card bg-white p-4 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Total Study Time
            </span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            {metrics.studyHours}
          </div>
          <p className="text-[10px] text-neutral-400">
            Across interactive lectures
          </p>
        </div>

        <div className="skill-card bg-white p-4 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Avg. Completion
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            {metrics.completionRate}
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">
            Top 5% percentile
          </p>
        </div>

        <div className="skill-card bg-white p-4 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Cohort Retention
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            96.8%
          </div>
          <p className="text-[10px] text-neutral-400">
            High streak consistency
          </p>
        </div>
      </div>

      {/* 2x2 Grid matching Image 5 1:1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Top Left: Learning Progress Overview */}
        <LearningProgressChart />

        {/* Top Right: Student Engagement Trend */}
        <EngagementChart timeframe={analyticsTimeframe} />

        {/* Bottom Left: Course Performance */}
        <RadialProgressGauge />

        {/* Bottom Right: Activity by Day */}
        <ActivityHeatmap />
      </div>
    </div>
  );
}
