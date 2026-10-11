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
  const { user, setIsNewCourseModalOpen } = useSkillHub();
  const [growthTimeframe, setGrowthTimeframe] = useState("This Month");
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("This Month");

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER: "Welcome back, Sarah!" and "+ New Course" */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Welcome back, {user.name}!
        </h1>

        <button
          onClick={() => setIsNewCourseModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {/* 2. MAIN TWO-COLUMN DASHBOARD GRID (matching Image 1 1:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (approx 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Growth Overview */}
          <div className="skill-card p-6 bg-white space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Growth Overview
              </h3>
              <button className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors">
                <span>{growthTimeframe}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            {/* Big 25k Number & Subtitle */}
            <div>
              <span className="text-4xl font-extrabold text-neutral-900 tracking-tight block">
                25k
              </span>
              <span className="text-xs text-neutral-400 font-medium block mt-0.5">
                Active Learners
              </span>
            </div>

            {/* 12K New Enrollments vs 15K Total Enrollments */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-base font-bold text-neutral-900 block">
                  12K
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  New Enrollments
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-neutral-900 block">
                  15K
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Total Enrollments
                </span>
              </div>
            </div>

            {/* Signature Dual-Layer Gradient Tick Bar */}
            <div className="pt-2">
              <SkillHubProgressBar progress={38} heightClass="h-5" />
            </div>
          </div>

          {/* Card 2: Advanced UI/UX Design Live Card */}
          <div className="skill-card p-6 bg-white flex flex-col justify-between min-h-[190px]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Advanced UI/UX Design
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Today, 10:00 AM</span>
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

            {/* Bottom avatars & Live badge */}
            <div className="flex items-center justify-between pt-6">
              {/* 3 Avatars Stack + "8+" */}
              <div className="flex items-center -space-x-2">
                <img
                  src="/assets/avatar-marvin.jpg"
                  alt="Student"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <img
                  src="/assets/avatar-albert.jpg"
                  alt="Student"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <img
                  src="/assets/avatar-bessie.jpg"
                  alt="Student"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-600 pl-0.5">
                  8+
                </div>
              </div>

              {/* Live Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-xs font-semibold text-rose-600">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-live-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (approx 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Learning Analytics */}
          <div className="skill-card p-6 bg-white space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                Learning Analytics
              </h3>
              <button className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors">
                <span>{analyticsTimeframe}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            {/* 3 Sub-Cards side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Sub-card 1: Total Students */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Total Students
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  28K
                </span>
                <span className="text-[11px] font-medium text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  <span>+15% vs last week</span>
                </span>
              </div>

              {/* Sub-card 2: Avg. Learning Time */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Avg. Learning Time
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  4h32m
                </span>
                <span className="text-[11px] font-medium text-rose-500 mt-2 flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                  <span>-15% vs last week</span>
                </span>
              </div>

              {/* Sub-card 3: Completion Rate */}
              <div className="skill-card-subtle p-4 bg-neutral-50/80 border border-neutral-100">
                <span className="text-[11px] font-medium text-neutral-400 block">
                  Completion Rate
                </span>
                <span className="text-xl font-extrabold text-neutral-900 mt-2 block">
                  68.4%
                </span>
                <span className="text-[11px] font-medium text-emerald-600 mt-2 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                  <span>+12% vs last week</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Student Engagement Trend */}
          <EngagementChart />
        </div>
      </div>
    </div>
  );
}
