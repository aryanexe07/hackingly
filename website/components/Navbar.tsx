"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B14]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-[1px] shadow-glow transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0B1120] rounded-[11px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-emerald-400 tracking-tighter">
                  S
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  SUTRA
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Orchestrator
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                No Alert Without Action
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#philosophy"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              The Paradigm Shift
            </a>
            <a
              href="#simulator"
              className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Case Simulator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>
            <a
              href="#engine"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Intervention Engine
            </a>
            <a
              href="#personas"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Role Guardrails
            </a>
            <a
              href="#impact"
              className="hover:text-emerald-400 transition-colors py-1"
            >
              Institutional Impact
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all flex items-center gap-1.5"
            >
              <span>App Portal</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="#pilot"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 shadow-glow hover:shadow-glow-lg transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#09101d] rounded-[7px] text-emerald-300 group-hover:bg-opacity-0 group-hover:text-white flex items-center gap-2">
                <span>Request Campus Pilot</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070B14]/95 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <nav className="flex flex-col space-y-3 text-sm">
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-emerald-400 py-1"
            >
              The Paradigm Shift
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-emerald-400 py-1"
            >
              Live Case Simulator
            </a>
            <a
              href="#engine"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-emerald-400 py-1"
            >
              Intervention Engine
            </a>
            <a
              href="#personas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-emerald-400 py-1"
            >
              Role Guardrails
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-emerald-400 py-1"
            >
              Institutional Impact
            </a>
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            >
              Open App Console
            </a>
            <a
              href="#pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Request Institutional Pilot
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
