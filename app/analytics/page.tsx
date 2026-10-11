"use client";

import React from "react";
import { useSkillHub } from "@/lib/store";
import { LearningProgressChart } from "@/components/LearningProgressChart";
import { EngagementChart } from "@/components/EngagementChart";
import { RadialProgressGauge } from "@/components/RadialProgressGauge";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { Plus } from "lucide-react";

export default function AnalyticsPage() {
  const { setIsCreatePostModalOpen } = useSkillHub();

  return (
    <div className="space-y-6">
      {/* Header matching Image 5 */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Learning Analytics
        </h1>

        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* 2x2 Grid matching Image 5 1:1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Top Left: Learning Progress Overview */}
        <LearningProgressChart />

        {/* Top Right: Student Engagement Trend */}
        <EngagementChart />

        {/* Bottom Left: Course Performance */}
        <RadialProgressGauge />

        {/* Bottom Right: Activity by Day */}
        <ActivityHeatmap />
      </div>
    </div>
  );
}
