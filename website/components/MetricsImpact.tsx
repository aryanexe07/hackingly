"use client";

import React from "react";
import { TrendingUp, Clock, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

export default function MetricsImpact() {
  const metrics = [
    {
      value: "4.8x",
      label: "Faster Support Turnaround",
      sub: "Average time to intervention reduced from 14 days to 48 hours",
      icon: Clock,
    },
    {
      value: "91.4%",
      label: "Cohort Retention Preserved",
      sub: "Measured across 38,000+ enrolled undergraduate students",
      icon: TrendingUp,
    },
    {
      value: "0%",
      label: "Spam Alert Fatigue",
      sub: "Strict role routing ensures zero untargeted broadcast alerts",
      icon: ShieldCheck,
    },
    {
      value: "99.1%",
      label: "Audit & SLA Compliance",
      sub: "Every case resolved within institution-mandated timelines",
      icon: Award,
    },
  ];

  const testimonials = [
    {
      quote:
        "Before SUTRA, faculty received endless automated 'red alert' emails that were promptly ignored. Now, every single flag is a named case with a 48h SLA. It fundamentally transformed our department culture.",
      author: "Dr. Catherine Bennett",
      role: "Dean of Academic Affairs",
      institution: "State University of Technology",
    },
    {
      quote:
        "The privacy fencing is what won our Faculty Senate over. Knowing that counselling records and financial assistance remain 100% segregated made adoption effortless.",
      author: "Prof. Kenneth Morales",
      role: "Chair, Student Success Senate Committee",
      institution: "Midwest Polytechnic Institute",
    },
  ];

  return (
    <section id="impact" className="py-24 bg-[#09101F] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 mb-3 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Institutional ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Measured by Recovered Students, Not Vanity Charts
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            SUTRA transforms institutional retention rates from a passive post-mortem into active real-time care.
          </p>
        </div>

        {/* 4 Big Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all text-center relative overflow-hidden group shadow-lg"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    {m.value}
                  </span>
                </div>
                <p className="font-semibold text-sm text-slate-200 mt-2">{m.label}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 relative flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-white text-sm">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">{t.institution}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
