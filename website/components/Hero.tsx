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
            Building the future with <br className="hidden sm:inline" />
            AI and strategy
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#demo"
              className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/25 transition-all shadow-sm"
            >
              VIEW DEMO
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
        <div className="relative z-10 w-full overflow-hidden pt-6 pb-12">
          {/* Scrollable / Perspective Arc Wrapper */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 overflow-x-auto no-scrollbar py-6 perspective-container">
              
              {/* Card 1: Far Left - Bar Chart */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(18deg) scale(0.92)",
                }}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-3">
                  <span>Intelligence in Every Decision</span>
                </div>
                <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-1">
                  <div className="w-3 bg-slate-100 rounded-t h-[40%]" />
                  <div className="w-3 bg-sky-200 rounded-t h-[65%]" />
                  <div className="w-3 bg-sky-400 rounded-t h-[50%]" />
                  <div className="w-3 bg-sky-500 rounded-t h-[85%]" />
                  <div className="w-3 bg-sky-600 rounded-t h-[100%]" />
                </div>
              </div>

              {/* Card 2: Financial List */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(12deg) scale(0.95)",
                }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-slate-900">$4,900</span>
                  <span className="text-[10px] text-slate-400">$3,600</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Operations</span>
                    <span className="text-emerald-600 font-bold">+$920</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">Analytics</span>
                    <span className="text-emerald-600 font-bold">+$1,450</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Photo Portrait with Floating Pills */}
              <div 
                className="arc-card w-48 sm:w-52 shrink-0 rounded-2xl overflow-hidden shadow-2xl relative h-64 border border-white/80 group"
                style={{
                  transform: "perspective(1000px) rotateY(6deg) scale(0.98)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="AI Strategist Consultant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    $2,670
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 font-bold text-[11px] shadow">
                    $1,200
                  </span>
                </div>
              </div>

              {/* Card 4: Center-Left - Area Wave Chart */}
              <div 
                className="arc-card w-52 sm:w-56 shrink-0 rounded-2xl bg-white p-4 shadow-2xl border border-white/90 z-20"
                style={{
                  transform: "perspective(1000px) rotateY(0deg) scale(1)",
                }}
              >
                <div className="text-[11px] font-semibold text-slate-700 mb-2">
                  Intelligence in <br /> Every Decision
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
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Expertise</span>
                  </div>
                  <h4 className="font-display font-bold text-sm leading-snug text-white">
                    that Combines Strategy, Data, and Artificial Intelligence
                  </h4>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Smarter Growth</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d2f831]" />
                </div>
              </div>

              {/* Card 6: Frosted Cyan Glass Card - Data Training */}
              <div 
                className="arc-card w-48 sm:w-52 shrink-0 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 p-5 text-white shadow-2xl flex flex-col items-center justify-center text-center h-56"
                style={{
                  transform: "perspective(1000px) rotateY(-6deg) scale(0.98)",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="font-bold text-sm text-white">Data training</span>
                <span className="text-[11px] text-white/80 mt-1">Upload your dataset</span>
              </div>

              {/* Card 7: 520k+ Metric Card */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-white p-4 shadow-xl border border-white/80"
                style={{
                  transform: "perspective(1000px) rotateY(-12deg) scale(0.95)",
                }}
              >
                <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-2">
                  <span>Data Points</span>
                </div>
                <div className="font-display font-extrabold text-2xl text-slate-950">
                  520k+
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-tight">
                  Analyzed monthly to power intelligent strategies.
                </p>
              </div>

              {/* Card 8: Far Right - Dark Mobile Mockup */}
              <div 
                className="arc-card w-44 sm:w-48 shrink-0 rounded-2xl bg-[#0d131f] p-4 text-white shadow-xl border border-slate-800"
                style={{
                  transform: "perspective(1000px) rotateY(-18deg) scale(0.92)",
                }}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                  <span>KPI Track</span>
                  <span className="text-emerald-400 font-bold">+49%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-400 rounded-full w-[72%]" />
                </div>
                <div className="space-y-1.5 text-[10px] text-slate-300">
                  <div className="flex justify-between">
                    <span>Automation</span>
                    <span className="text-white font-bold">99.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adoption</span>
                    <span className="text-white font-bold">94.1%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Social Proof Rating under the clouds */}
          <div className="mt-6 text-center">
            <p className="text-xs font-semibold text-white/90 tracking-wide">
              Rated 4.9/5 by 4,900+ clients
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
