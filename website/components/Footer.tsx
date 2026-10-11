"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer id="pilot" className="bg-[#050810] text-slate-400 relative border-t border-white/[0.08] overflow-hidden">
      {/* Pilot CTA Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-[#0B1222] border border-emerald-500/30 p-8 sm:p-14 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Institutional Pilot Program 2026</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Transform Fragmented Alerts into Accountable Student Success.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Deploy SUTRA in sandbox alongside your current LMS in under 5 days. Experience 100% case follow-through and zero alert fatigue.
            </p>

            {/* Pilot Signup Form */}
            <div className="max-w-md mx-auto pt-2">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="deansoffice@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Request Pilot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Pilot request received! Our higher-ed architect will contact your office within 1 business day.</span>
                </div>
              )}
              <p className="text-[11px] text-slate-400 mt-3">
                No credit card required • FERPA data-processing agreement included • Dedicated sandbox
              </p>
            </div>
          </div>
        </div>

        {/* Directory & Copyright footer */}
        <div className="mt-20 pt-10 border-t border-slate-900 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 font-display">
                S
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                SUTRA
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              The Student Support Orchestration Platform. Turning passive institutional alerts into owned, ethical, and SLA-governed intervention cases.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>FERPA &amp; DPDP Certified Architecture</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Architecture
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#engine" className="hover:text-emerald-400 transition-colors">5-Stage Pipeline</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400 transition-colors">Case Simulator</a></li>
              <li><a href="#philosophy" className="hover:text-emerald-400 transition-colors">Evidence vs Label</a></li>
              <li><a href="#personas" className="hover:text-emerald-400 transition-colors">Role Gating</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-slate-400">Canvas LTI 1.3</span></li>
              <li><span className="text-slate-400">Moodle Connector</span></li>
              <li><span className="text-slate-400">Blackboard Learn</span></li>
              <li><span className="text-slate-400">Ellucian Banner</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Governance
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-slate-400">FERPA Safeguards</span></li>
              <li><span className="text-slate-400">DPDP Compliance</span></li>
              <li><span className="text-slate-400">Zero Stigma Policy</span></li>
              <li><span className="text-slate-400">Audit Trail Ledger</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 SUTRA Higher Education Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
