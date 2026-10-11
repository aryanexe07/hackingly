"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How is SUTRA fundamentally different from existing LMS early-warning alerts?",
    answer:
      "LMS alerts are unowned notifications sent to crowded email inboxes without structure, follow-up, or escalation. SUTRA converts verified signals into auditable Support Cases with single-person ownership, a ticking 48-hour SLA, policy-governed intervention paths, and verified outcome tracking.",
  },
  {
    question: "Does SUTRA calculate automated 'dropout risk percentages'?",
    answer:
      "No. SUTRA explicitly rejects stigmatizing black-box risk labels. Instead, SUTRA practices 'Evidence Before Label': surfacing exact verifiable facts (e.g., 'Attendance dropped from 86% to 62% over 4 weeks; 2 consecutive lab assessments missing') and pairing them with institutional intervention policies.",
  },
  {
    question: "How does SUTRA safeguard FERPA and sensitive student records?",
    answer:
      "SUTRA implements cryptographic role-based access control. Faculty members only view academic and classroom attendance metrics. Student counselling notes and emergency financial hardship records are segregated behind independent security perimeters and never visible to instructors.",
  },
  {
    question: "Can our university customize intervention rules and SLA thresholds?",
    answer:
      "Yes. SUTRA's Policy Engine is fully configurable. Deans and department chairs can establish custom trigger thresholds (e.g. 75% attendance rule, consecutive exam dips), define SLA windows (24h, 48h, 72h), and specify multi-stage escalation hierarchies.",
  },
  {
    question: "How long does institutional deployment and SIS integration take?",
    answer:
      "Because SUTRA utilizes standard 1EdTech LTI 1.3 Advantage protocols and pre-built connectors for Canvas, Blackboard, Moodle, and Banner/Workday, institutional IT departments typically complete sandbox deployment in under 5 business days with zero custom coding.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#070B14] relative border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Institutional Clarity &amp; FAQs
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Everything your Provost, IT Security Team, and Faculty Senate need to know.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/40 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-850 transition-colors"
                >
                  <span className="font-display font-bold text-white text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 bg-slate-950/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
