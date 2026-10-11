"use client";

import React from "react";
import { HelpCircle, Book, MessageCircle, FileText, ArrowUpRight } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      q: "How do I start a live interactive classroom session?",
      a: "Navigate to your Course dashboard and click 'Live Session' or use the quick 'Live' badge toggle to launch video streaming and whiteboard collaboration.",
    },
    {
      q: "How are student engagement trends calculated?",
      a: "Engagement metrics calculate weighted attendance, assignment completion timestamps, and active discussion replies across rolling 7-day intervals.",
    },
    {
      q: "Can I export course performance analytics?",
      a: "Yes, click the export icon in the top right of any analytics card to download CSV or PDF summaries.",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Help &amp; Support
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Explore documentation, tutorials, and academy support guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="skill-card bg-white p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
            <Book className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">Educator Handbook</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Curriculum authoring best practices, video guidelines, and grading rubrics.
          </p>
          <a
            href="#"
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline"
          >
            <span>Read Handbook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="skill-card bg-white p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">24/7 Community Support</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Connect directly with SkillHub developer specialists and peer educators.
          </p>
          <a
            href="#"
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline"
          >
            <span>Open Ticket</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="skill-card bg-white p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900">API &amp; LMS Integration</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Sync grades, attendance, and roster webhooks seamlessly with Canvas &amp; Blackboard.
          </p>
          <a
            href="#"
            className="text-xs font-semibold text-neutral-900 flex items-center gap-1 pt-2 hover:underline"
          >
            <span>View Docs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="skill-card bg-white p-6 md:p-8 space-y-4">
        <h3 className="text-base font-bold text-neutral-900 tracking-tight">
          Frequently Asked Questions
        </h3>
        <div className="divide-y divide-neutral-100 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={i > 0 ? "pt-4" : ""}>
              <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                {faq.q}
              </h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
