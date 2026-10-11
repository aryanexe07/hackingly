"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full pt-6 px-6 sm:px-10 lg:px-14 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo: Sutra */}
        <a href="#" className="flex items-center gap-2.5 text-white group">
          {/* Logo icon: Folded ribbon mark from design */}
          <div className="w-7 h-7 flex items-center justify-center">
            <svg
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
            >
              <path
                d="M14 3L3 21H9.5L14 13.5L18.5 21H25L14 3Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
            Sutra
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-white/90 uppercase">
          <a
            href="#"
            className="hover:text-white transition-colors"
          >
            OVERVIEW
          </a>
          <a
            href="#orchestration"
            className="hover:text-white transition-colors text-white/80"
          >
            ORCHESTRATION
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors text-white/80"
          >
            ABOUT SUTRA
          </a>
          <div className="relative group cursor-pointer flex items-center gap-1 text-white/80 hover:text-white">
            <span>GOVERNANCE</span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#d2f831] hover:bg-[#c4ec26] text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02]"
          >
            LAUNCH CONSOLE
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-white/80"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white space-y-4">
          <div className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-wider">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="py-1">
              OVERVIEW
            </a>
            <a href="#orchestration" onClick={() => setMobileMenuOpen(false)} className="py-1 text-white/70">
              ORCHESTRATION
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1 text-white/70">
              ABOUT SUTRA
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-1 text-white/70">
              CASE WORKFLOWS
            </a>
          </div>
          <div className="pt-3 border-t border-white/10">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 rounded-full bg-[#d2f831] text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              LAUNCH CONSOLE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
