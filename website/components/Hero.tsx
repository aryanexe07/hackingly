"use client";

import React from "react";
import Navbar from "./Navbar";
import { ArrowUpRight, Plus, Star, BarChart3, TrendingUp, Sparkles, Check, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="p-2.5 sm:p-4 lg:p-6 bg-white">
      {/* Outer Rounded Hero Container matching Reference Image */}
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#137ee8] via-[#1c8af2] to-[#3ca3fa] min-h-[860px] lg:min-h-[920px] flex flex-col justify-between shadow-xl">
        
        {/* Pixel/Photorealistic Cloud Background at bottom */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90"
          style={{
            backgroundImage: "url('/clouds-bg.jpe')",
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Top Navbar */}
        <Navbar />

        {/* Main Hero Header Content */}
        <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-8 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
            Building the future of <br className="hidden sm:inline" />
            student support
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            We help universities unlock student persistence through evidence-driven triage and policy-governed intervention orchestration.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/25 transition-all shadow-sm"
            >
              VIEW PLATFORM
            </a>

            <a
              href="#about"
              className="pl-6 pr-2 py-2 rounded-full bg-[#d2f831] hover:bg-[#c4ec26] text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] flex items-center gap-3"
            >
              <span>GET STARTED</span>
              <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>
          </div>
        </div>

        {/* 3D Arc Curved Mockup Ribbon */}
        <div id="orchestration" className="relative z-10 w-full overflow-hidden pt-6 pb-12">
          {/* Scrollable / Perspective Arc Wrapper */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 overflow-x-auto no-scrollbar py-6 perspective-container">
              
              {/* Card 1: Far Left - Attendance & Biometric Trends */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(18deg) scale(0.92)",
                }}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-3">
                  <span>Attendance &amp; LMS Roster</span>
                </div>
                <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-1">
                  <div className="w-3 bg-slate-100 rounded-t h-[40%]" />
                  <div className="w-3 bg-sky-200 rounded-t h-[65%]" />
                  <div className="w-3 bg-sky-400 rounded-t h-[50%]" />
                  <div className="w-3 bg-sky-500 rounded-t h-[85%]" />
                  <div className="w-3 bg-sky-600 rounded-t h-[100%]" />
                </div>
              </div>

              {/* Card 2: Support Case #8941 & SLA */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(12deg) scale(0.95)",
                }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-slate-900">48h SLA</span>
                  <span className="text-[10px] text-emerald-600 font-bold">18h Left</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Faculty Mentor</span>
                    <span className="text-emerald-600 font-bold">Assigned</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Lab Check-In</span>
                    <span className="text-sky-600 font-bold">Active</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Photo Portrait with Floating Intervention Pills */}
              <div 
                className="arc-card w-48 sm:w-52 shrink-0 rounded-2xl overflow-hidden shadow-2xl relative h-64 border border-white/80 group"
                style={{
                  transform: "perspective(1000px) rotateY(6deg) scale(0.98)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Faculty Mentor & Student Advisor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    Case #8941
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    Lab Matched
                  </span>
                </div>
              </div>

              {/* Card 4: Center-Left - Cohort Retention Trajectory */}
              <div 
                className="arc-card w-52 sm:w-56 shrink-0 rounded-2xl bg-white p-4 shadow-2xl border border-white/90 z-20"
                style={{
                  transform: "perspective(1000px) rotateY(0deg) scale(1)",
                }}
              >
                <div className="text-[11px] font-semibold text-slate-700 mb-2">
                  Cohort Retention <br /> Recovery Curve
                </div>
                <div className="h-28 flex items-center justify-center">
                  <svg viewBox="0 0 160 70" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 Q30,50 60,35 T120,20 T160,5 L160,70 L0,70 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,55 Q30,50 60,35 T120,20 T160,5"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Card 5: Center-Right - Dark Charcoal Card */}
              <div 
                className="arc-card w-52 sm:w-56 shrink-0 rounded-2xl bg-[#111625] p-5 text-white shadow-2xl border border-slate-800 z-20 flex flex-col justify-between h-56"
                style={{
                  transform: "perspective(1000px) rotateY(0deg) scale(1)",
                }}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#d2f831] text-xs font-mono mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#d2f831]" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Orchestration</span>
                  </div>
                  <h4 className="font-display font-bold text-sm leading-snug text-white">
                    that Combines Provenance, Faculty Mentors, and Ethical Care
                  </h4>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>No Alert Without Action</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d2f831]" />
                </div>
              </div>

              {/* Card 6: Frosted Cyan Glass Card - Signal Ingestion */}
              <div 
                className="arc-card w-48 sm:w-52 shrink-0 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 p-5 text-white shadow-2xl flex flex-col items-center justify-center text-center h-56"
                style={{
                  transform: "perspective(1000px) rotateY(-6deg) scale(0.98)",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="font-bold text-sm text-white">Signal Intake</span>
                <span className="text-[11px] text-white/80 mt-1">Sync Canvas LMS &amp; SIS</span>
              </div>

              {/* Card 7: 520k+ Support Data Points */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(-12deg) scale(0.95)",
                }}
              >
                <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2">
                  <span>Support Signals</span>
                </div>
                <div className="font-display font-extrabold text-2xl text-slate-950">
                  520k+
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-tight">
                  Analyzed monthly to power proactive, non-stigmatizing care.
                </p>
              </div>

              {/* Card 8: Far Right - Dark Mobile Mockup SLA Track */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-[#0d131f] p-4 text-white shadow-xl border border-slate-800"
                style={{
                  transform: "perspective(1000px) rotateY(-18deg) scale(0.92)",
                }}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                  <span>SLA Adherence</span>
                  <span className="text-emerald-400 font-bold">98.2%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-400 rounded-full w-[98%]" />
                </div>
                <div className="space-y-1.5 text-[10px] text-slate-300">
                  <div className="flex justify-between">
                    <span>Avg Turnaround</span>
                    <span className="text-white font-bold">36h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Case Follow-Up</span>
                    <span className="text-white font-bold">100%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Social Proof Rating under the clouds */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold text-white/90 tracking-wide">
              Rated 4.9/5 across 4,900+ institutional cases
            </p>
            <div className="flex items-center justify-center gap-1 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#facc15] text-[#facc15]"
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
