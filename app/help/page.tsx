"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import {
  HelpCircle,
  Book,
  MessageCircle,
  FileText,
  ArrowUpRight,
  Search,
  ChevronDown,
  X,
  Send,
  Check,
} from "lucide-react";

export default function HelpPage() {
  const { user } = useSkillHub();

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = ["All", "Live Sessions", "Analytics", "Integrations", "Account"];

  const allFaqs = [
    {
      category: "Live Sessions",
      q: "How do I start a live interactive classroom session?",
      a: "Navigate to your Course dashboard or Courses page and click the 3-dot menu -> 'Go Live', or use the Live Card 'Go Live' button to instantly activate streaming and invite learners.",
    },
    {
      category: "Analytics",
      q: "How are student engagement trends calculated?",
      a: "Engagement metrics calculate weighted attendance, assignment completion timestamps, and active discussion replies across rolling 7-day intervals.",
    },
    {
      category: "Analytics",
      q: "Can I export course performance analytics?",
      a: "Yes, click the export icon in the top right of any analytics card to copy summaries or download reports.",
    },
    {
      category: "Integrations",
      q: "Can I sync Sutra with Canvas or Blackboard LMS?",
      a: "Yes! Use our API & LMS integration endpoints to sync roster webhooks, attendance logs, and gradebooks in real time.",
    },
    {
      category: "Account",
      q: "How do I update my educator profile and avatar?",
      a: "Head to Settings from the sidebar navigation. You can update your full name, email, biography, and notification preferences.",
    },
  ];

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setIsTicketModalOpen(false);
      setTicketSubject("");
      setTicketMessage("");
    }, 1800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
            Help &amp; Support
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Explore documentation, tutorials, and 24/7 educator support guides
          </p>
        </div>

        <button
          onClick={() => setIsTicketModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-all min-h-[44px] self-start sm:self-auto active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Open Ticket</span>
        </button>
      </div>

      {/* 2. THREE RESOURCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="skill-card bg-white p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Book className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">Educator Handbook</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curriculum authoring best practices, video guidelines, and grading rubrics.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("classroom");
            }}
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline self-start"
          >
            <span>Read Handbook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="skill-card bg-white p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">24/7 Community Support</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Connect directly with Sutra developer specialists and peer educators.
            </p>
          </div>
          <button
            onClick={() => setIsTicketModalOpen(true)}
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline self-start"
          >
            <span>Open Ticket</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="skill-card bg-white p-5 sm:p-6 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">API &amp; LMS Integration</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sync grades, attendance, and roster webhooks seamlessly with Canvas &amp; Blackboard.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("Integrations");
            }}
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline self-start"
          >
            <span>View Docs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <div className="skill-card bg-white p-5 sm:p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Instant answers to common curriculum and workflow questions
            </p>
          </div>

          {/* FAQ Search */}
          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-neutral-100">
          {filteredFaqs.map((faq, i) => {
            const isExpanded = expandedFaqIndex === i;
            return (
              <div key={i} className="py-3.5">
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between gap-3 text-left py-1 group"
                >
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-8 text-center text-xs text-neutral-400">
              No answers found for &ldquo;{searchQuery}&rdquo;.
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="block mx-auto mt-2 text-neutral-900 font-semibold underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Support Ticket Modal */}
      {isTicketModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/35 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsTicketModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Open Support Ticket
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Direct channel to Sutra platform engineering
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTicketModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="p-8 text-center space-y-2 animate-in fade-in duration-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-bold text-neutral-900">
                  Ticket Submitted Successfully!
                </h4>
                <p className="text-xs text-neutral-500">
                  Ticket #SUT-{Math.floor(1000 + Math.random() * 9000)} has been logged. An engineering lead will reach out to {user.email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Topic / Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Issue connecting whiteboard in live class"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the question, error code, or feature request..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsTicketModalOpen(false)}
                    className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-full text-xs font-medium hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Ticket</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
