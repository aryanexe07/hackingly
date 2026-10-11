"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import {
  X,
  MessageSquare,
  Heart,
  Send,
  Eye,
  Users,
  Share2,
  Check,
} from "lucide-react";

interface DiscussionDetailModalProps {
  discussionId: string | null;
  onClose: () => void;
}

export function DiscussionDetailModal({
  discussionId,
  onClose,
}: DiscussionDetailModalProps) {
  const {
    discussions,
    discussionComments,
    addDiscussionComment,
    likeDiscussion,
    user,
  } = useSkillHub();

  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);

  if (!discussionId) return null;

  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return null;

  const comments = discussionComments[discussionId] || [];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDiscussionComment(discussionId, commentText.trim());
    setCommentText("");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/35 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-neutral-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={discussion.authorAvatar || "/assets/avatar-sarah.jpg"}
              alt={discussion.author}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  {discussion.author}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {discussion.authorRole || "Instructor"}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Posted {discussion.timeAgo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              title="Share Discussion"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Tags */}
          {discussion.tags && discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-neutral-100/80 text-neutral-700 text-[10px] font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title & Summary */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              {discussion.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {discussion.summary ||
                "Join our community of designers and educators to exchange ideas, share real-world portfolio feedback, and explore modern design systems."}
            </p>
          </div>

          {/* Stats Bar & Upvote */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-4 h-4" />
                <span>{discussion.repliesCount} replies</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="w-4 h-4" />
                <span>{discussion.viewsCount} views</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4" />
                <span>{discussion.participantsCount} participants</span>
              </span>
            </div>

            <button
              onClick={() => likeDiscussion(discussion.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100/80 text-rose-600 text-xs font-semibold active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Upvote</span>
            </button>
          </div>

          {/* Comments List */}
          <div className="pt-4 space-y-4">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider text-neutral-400">
              Replies ({comments.length})
            </h4>

            {comments.length === 0 ? (
              <div className="text-center py-8 rounded-2xl bg-neutral-50/70 border border-dashed border-neutral-200">
                <MessageSquare className="w-6 h-6 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs font-medium text-neutral-500">
                  No replies yet. Be the first to share your perspective!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-2xl bg-neutral-50/70 border border-neutral-100/80 space-y-1.5 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.author}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-neutral-800">
                          {comment.author}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400">
                        {comment.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 pl-7 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reply Input Bar */}
        <form
          onSubmit={handleSendComment}
          className="p-3.5 sm:p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center gap-2.5 flex-shrink-0"
        >
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-200 flex-shrink-0"
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts or answer questions..."
            className="flex-1 bg-white border border-neutral-200/80 rounded-full px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 min-h-[40px]"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            aria-label="Send reply"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
