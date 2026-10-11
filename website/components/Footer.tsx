"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Pre-Footer CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-slate-800">
          <div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Ready to eliminate alert fatigue on your campus?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
              Deploy SUTRA alongside Canvas, Moodle, or Blackboard in under 5 days with full FERPA &amp; DPDP compliance.
            </p>
          </div>
          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#d2f831] hover:bg-[#c4ec26] text-slate-950 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-md flex items-center gap-2"
          >
            <span>REQUEST PILOT ACCESS</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Directory Columns */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-slate-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <svg
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
              >
                <path
                  d="M14 3L3 21H9.5L14 13.5L18.5 21H25L14 3Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-display font-bold text-lg text-white">SUTRA</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              The Student Support Orchestration Platform. Turning passive institutional alerts into owned, ethical, and SLA-governed intervention cases.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#orchestration" className="hover:text-white transition-colors">Orchestration Engine</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About SUTRA</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Case Workflows</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Integrations
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">Canvas LTI 1.3</span></li>
              <li><span className="hover:text-white cursor-pointer">Blackboard Learn</span></li>
              <li><span className="hover:text-white cursor-pointer">Moodle Connector</span></li>
              <li><span className="hover:text-white cursor-pointer">Ellucian Banner</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Governance
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">FERPA Safeguards</span></li>
              <li><span className="hover:text-white cursor-pointer">DPDP Compliance</span></li>
              <li><span className="hover:text-white cursor-pointer">Zero Stigma Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Audit Trail Ledger</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
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
