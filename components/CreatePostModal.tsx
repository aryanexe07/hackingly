"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { X, MessageSquare, Send } from "lucide-react";

export function CreatePostModal() {
  const { isCreatePostModalOpen, setIsCreatePostModalOpen, addDiscussion, user } = useSkillHub();

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("UX Research");
  const [content, setContent] = useState("");

  if (!isCreatePostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDiscussion({
      title,
      author: user.fullName,
      authorRole: "Author & Instructor",
      authorAvatar: user.avatar,
      repliesCount: 0,
      viewsCount: "1",
      participantsCount: 1,
      timeAgo: "Just now",
      tags: [tag, "Discussion"],
      summary: content,
    });

    setIsCreatePostModalOpen(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-neutral-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-heading">
                Create Community Post
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500">
                Start a new discussion with learners and educators
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreatePostModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Discussion Title / Question
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How do you structure design tokens across light and dark modes?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Topic Tag
            </label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all"
            >
              <option value="UI Design">UI Design</option>
              <option value="UX Research">UX Research</option>
              <option value="Design Systems">Design Systems</option>
              <option value="Career & Portfolio">Career & Portfolio</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Discussion Details / Context
            </label>
            <textarea
              rows={4}
              placeholder="Provide background, questions, or resources for the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 border-t border-neutral-100 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsCreatePostModalOpen(false)}
              className="px-4 py-2.5 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-semibold rounded-xl transition-colors min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
