"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import {
  Plus,
  MessageSquare,
  Eye,
  Users,
  MoreVertical,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";

export default function CommunityPage() {
  const {
    discussions,
    setIsCreatePostModalOpen,
  } = useSkillHub();

  const featured = discussions.find((d) => d.isFeatured) || discussions[0];
  const recentList = discussions.filter((d) => !d.isFeatured);

  const [activeDiscussion, setActiveDiscussion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Title & Create Post button */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Learning Community
        </h1>

        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* 2. MAIN SPLIT: Featured Discussion (left) & Recent Discussions (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Featured Discussion Card (~7 cols) */}
        <div className="lg:col-span-7 skill-card bg-white p-7 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
          <div>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-3">
              Featured Discussion
            </span>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Text side */}
              <div className="md:col-span-7 space-y-3">
                <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  {featured.title}
                </h2>
                {featured.summary && (
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {featured.summary}
                  </p>
                )}
              </div>

              {/* 3D Bubble Illustration side */}
              <div className="md:col-span-5 flex items-center justify-center">
                <img
                  src="/assets/community-bubbles.jpg"
                  alt="3D Speech Bubbles"
                  className="w-36 h-36 object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="pt-6 space-y-4">
            {/* Stats row */}
            <div className="flex items-center gap-5 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
                <span>{featured.repliesCount} replies</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4 text-neutral-400" />
                <span>{featured.viewsCount} views</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-neutral-400" />
                <span>{featured.participantsCount} participants</span>
              </span>
            </div>

            {/* Buttons row */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveDiscussion(featured.id)}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-colors"
              >
                Join Discussion
              </button>

              <button
                onClick={() => setActiveDiscussion(featured.id)}
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-neutral-200/80 text-neutral-800 rounded-full text-xs font-semibold transition-colors"
              >
                Read More
              </button>

              <button className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Recent Discussions Panel (~5 cols) */}
        <div className="lg:col-span-5 skill-card bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
              Recent Discussions
            </h3>
            <button className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 transition-colors">
              View all
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {recentList.map((disc) => (
              <div
                key={disc.id}
                onClick={() => setActiveDiscussion(disc.id)}
                className="flex items-start justify-between group cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {disc.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {disc.author} • {disc.repliesCount} replies • {disc.timeAgo}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-neutral-50 group-hover:bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: Trending Topics, Top Contributors, Upcoming Event */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <div className="skill-card bg-white p-5 space-y-3">
          <h4 className="text-xs font-bold text-neutral-900 tracking-tight uppercase text-neutral-400">
            Trending Topics
          </h4>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-semibold text-neutral-800"># UI Design</span>
            <span className="text-[11px] text-neutral-400 font-mono">124 Posts</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-semibold text-neutral-800"># Prototyping</span>
            <span className="text-[11px] text-neutral-400 font-mono">88 Posts</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-semibold text-neutral-800"># Career Tips</span>
            <span className="text-[11px] text-neutral-400 font-mono">65 Posts</span>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="skill-card bg-white p-5 space-y-3">
          <h4 className="text-xs font-bold text-neutral-900 tracking-tight uppercase text-neutral-400">
            Top Contributors
          </h4>
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/avatar-sarah.jpg"
                alt="Sarah"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-neutral-800">Sarah Wilson</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold font-mono">248 pts</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/avatar-marvin.jpg"
                alt="Mike"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-neutral-800">Mike Chen</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold font-mono">215 pts</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/avatar-jane.jpg"
                alt="Emma"
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-neutral-800">Emma Davis</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold font-mono">198 pts</span>
          </div>
        </div>

        {/* Upcoming Event */}
        <div className="skill-card bg-white p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight uppercase text-neutral-400 mb-2">
              Upcoming Event
            </h4>
            <h5 className="text-sm font-bold text-neutral-900">
              Community Q&amp;A
            </h5>
            <p className="text-xs text-neutral-400 mt-1">
              Today, 10:00 AM • Live Audio Room
            </p>
          </div>
          <div className="flex justify-end pt-3">
            <div className="w-8 h-8 rounded-full bg-neutral-50 border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
