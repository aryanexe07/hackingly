"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Server,
  Key,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  Scale
} from "lucide-react";

export default function GovernanceTrust() {
  const principles = [
    {
      icon: Scale,
      title: "Zero Stigmatizing Labels",
      description:
        "We reject toxic 'dropout likelihood percentages' or diagnostic tags. SUTRA designates cases exclusively as Support Indicators or Check-In Triggers.",
    },
    {
      icon: AlertCircle,
      title: "Data Honesty & 'Insufficient Data'",
      description:
        "When LMS or attendance baseline data is out-of-window or sparse, SUTRA displays neutral grey 'Insufficient Baseline Data' banners rather than guessing.",
    },
    {
      icon: Lock,
      title: "Cryptographic Role-Fencing",
      description:
        "Financial hardship records and clinical mental health session notes are locked under independent encryption keys, totally sealed from classroom faculty.",
    },
    {
      icon: FileCheck,
      title: "Full FERPA & DPDP Compliance",
      description:
        "Every data access and case triage event is recorded to an immutable institutional audit ledger ready for accreditation and legal compliance reviews.",
    },
    {
      icon: Server,
      title: "LTI 1.3 & SIS Integration",
      description:
        "Plug-and-play LTI 1.3 Advantage integration with Canvas, Moodle, Blackboard, and SIS systems including Banner, Workday Student, and PeopleSoft.",
    },
    {
      icon: ShieldCheck,
      title: "Human In The Loop Always",
      description:
        "No automated disciplinary emails or punitive actions are ever triggered by algorithms. Human educators always evaluate, triage, and decide.",
    },
  ];

  return (
    <section className="py-24 bg-[#070B14] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ethical AI &amp; Institutional Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Built on Rigorous Institutional Ethics
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Higher education technology requires absolute trust, privacy safeguards, and pedagogical dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-900/30 border border-slate-800/80 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Integration Bar */}
        <div className="mt-16 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-bold text-white text-sm">
              Seamless Interoperability Across Campus Systems
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Syncs natively in minutes via 1EdTech LTI 1.3 Advantage &amp; REST APIs
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-mono text-xs font-bold">
            <span className="hover:text-white transition-colors">CANVAS LMS</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">BLACKBOARD LEARN</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">MOODLE</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">ELLUCIAN BANNER</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white transition-colors">WORKDAY STUDENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
