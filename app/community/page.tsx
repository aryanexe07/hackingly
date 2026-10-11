"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { DiscussionDetailModal } from "@/components/DiscussionDetailModal";
import {
  Plus,
  MessageSquare,
  Eye,
  Users,
  MoreVertical,
  ArrowUpRight,
  Heart,
  Check,
} from "lucide-react";

export default function CommunityPage() {
  const {
    discussions,
    setIsCreatePostModalOpen,
    likeDiscussion,
  } = useSkillHub();

  const [activeDiscussion, setActiveDiscussion] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [eventJoined, setEventJoined] = useState(false);

  const featured = discussions.find((d) => d.isFeatured) || discussions[0];
  
  const filteredDiscussions = selectedTag
    ? discussions.filter(
        (d) =>
          d.tags?.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
          d.title.toLowerCase().includes(selectedTag.toLowerCase())
      )
    : discussions;

  const recentList = filteredDiscussions.filter((d) => d.id !== featured.id);

  const handleJoinEvent = () => {
    setEventJoined((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER: Title & Create Post button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
            Learning Community
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Exchange insights, ask design questions, and collaborate with peer educators
          </p>
        </div>

        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full text-xs font-semibold shadow-sm transition-all min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Tag Filter Pills */}
      {selectedTag && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-medium">Filtered by:</span>
          <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium flex items-center gap-1.5">
            #{selectedTag}
            <button
              onClick={() => setSelectedTag(null)}
              className="hover:text-neutral-300 ml-1 font-bold"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {/* 2. MAIN SPLIT: Featured Discussion (left) & Recent Discussions (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* LEFT: Featured Discussion Card (~7 cols) */}
        <div className="lg:col-span-7 skill-card bg-white p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Featured Discussion
              </span>
              <button
                onClick={() => likeDiscussion(featured.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors"
                title="Upvote discussion"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Upvote</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Text side */}
              <div className="md:col-span-7 space-y-3">
                <h2
                  onClick={() => setActiveDiscussion(featured.id)}
                  className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight cursor-pointer hover:text-neutral-700 transition-colors"
                >
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
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setActiveDiscussion(featured.id)}
                />
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="pt-6 space-y-4">
            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-400">
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
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setActiveDiscussion(featured.id)}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-colors min-h-[40px]"
              >
                Join Discussion
              </button>

              <button
                onClick={() => setActiveDiscussion(featured.id)}
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-neutral-200/80 text-neutral-800 rounded-full text-xs font-semibold transition-colors min-h-[40px]"
              >
                Read More
              </button>

              <button
                onClick={() => setActiveDiscussion(featured.id)}
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Recent Discussions Panel (~5 cols) */}
        <div className="lg:col-span-5 skill-card bg-white p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
              Recent Discussions
            </h3>
            {selectedTag ? (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs font-semibold text-neutral-900 hover:underline"
              >
                Clear filter
              </button>
            ) : (
              <span className="text-xs font-medium text-neutral-400">
                {recentList.length} topics
              </span>
            )}
          </div>

          <div className="space-y-4 pt-1">
            {recentList.map((disc) => (
              <div
                key={disc.id}
                onClick={() => setActiveDiscussion(disc.id)}
                className="flex items-start justify-between group cursor-pointer p-2.5 -mx-2.5 rounded-2xl hover:bg-neutral-50 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {disc.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {disc.author} • {disc.repliesCount} replies • {disc.timeAgo}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-neutral-50 group-hover:bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}

            {recentList.length === 0 && (
              <div className="py-8 text-center text-xs text-neutral-400">
                No recent discussions matching this filter
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: Trending Topics, Top Contributors, Upcoming Event */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <div className="skill-card bg-white p-5 space-y-3">
          <h4 className="text-xs font-bold tracking-tight uppercase text-neutral-400">
            Trending Topics
          </h4>
          <div
            onClick={() => setSelectedTag("UI Design")}
            className="flex items-center justify-between text-xs py-1.5 px-2 -mx-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
          >
            <span className="font-semibold text-neutral-800"># UI Design</span>
            <span className="text-[11px] text-neutral-400 font-mono">124 Posts</span>
          </div>
          <div
            onClick={() => setSelectedTag("Prototyping")}
            className="flex items-center justify-between text-xs py-1.5 px-2 -mx-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
          >
            <span className="font-semibold text-neutral-800"># Prototyping</span>
            <span className="text-[11px] text-neutral-400 font-mono">88 Posts</span>
          </div>
          <div
            onClick={() => setSelectedTag("Career Tips")}
            className="flex items-center justify-between text-xs py-1.5 px-2 -mx-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
          >
            <span className="font-semibold text-neutral-800"># Career Tips</span>
            <span className="text-[11px] text-neutral-400 font-mono">65 Posts</span>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="skill-card bg-white p-5 space-y-3">
          <h4 className="text-xs font-bold tracking-tight uppercase text-neutral-400">
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
            <h4 className="text-xs font-bold tracking-tight uppercase text-neutral-400 mb-2">
              Upcoming Event
            </h4>
            <h5 className="text-sm font-bold text-neutral-900">
              Community Q&amp;A
            </h5>
            <p className="text-xs text-neutral-400 mt-1">
              Today, 10:00 AM • Live Audio Room
            </p>
          </div>
          <div className="flex items-center justify-between pt-3">
            <button
              onClick={handleJoinEvent}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                eventJoined
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              {eventJoined ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> RSVP Confirmed
                </span>
              ) : (
                "RSVP Now"
              )}
            </button>
            <div
              onClick={() => setActiveDiscussion(featured.id)}
              className="w-8 h-8 rounded-full bg-neutral-50 border border-neutral-200/60 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Detail & Comments Modal */}
      <DiscussionDetailModal
        discussionId={activeDiscussion}
        onClose={() => setActiveDiscussion(null)}
      />
    </div>
  );
}
