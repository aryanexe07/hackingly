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
              Ready to build the future with us?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
              Unlock intelligent automation and data-driven consulting tailored for your organization.
            </p>
          </div>
          <a
            href="#"
            className="px-6 py-3 rounded-full bg-[#d2f831] hover:bg-[#c4ec26] text-slate-950 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-md flex items-center gap-2"
          >
            <span>GET STARTED TODAY</span>
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
              <span className="font-display font-bold text-lg text-white">Aeline</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-xs">
              Next-generation consulting framework designed for high-growth tech organizations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Services
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">AI Strategy &amp; Advisory</span></li>
              <li><span className="hover:text-white cursor-pointer">Intelligent Automation</span></li>
              <li><span className="hover:text-white cursor-pointer">Cloud Data Training</span></li>
              <li><span className="hover:text-white cursor-pointer">Continuous Intelligence</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono text-[11px]">
              Template
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer">Buy License</span></li>
              <li><span className="hover:text-white cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-white cursor-pointer">Style Guide</span></li>
              <li><span className="hover:text-white cursor-pointer">Changelog</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Aeline Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
