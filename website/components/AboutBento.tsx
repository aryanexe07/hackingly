"use client";

import React from "react";
import { Globe, Lightbulb, Volume2, Sparkles } from "lucide-react";

export default function AboutBento() {
  const avatarStack = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span>ABOUT SUTRA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.18]">
            An institutional orchestration partner <br />
            dedicated to building{" "}
            <span className="inline-flex items-center align-middle mx-1 px-2.5 py-1 rounded-full bg-[#38bdf8] text-white shadow-sm">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>{" "}
            smarter <br />
            and{" "}
            <span className="inline-flex items-center align-middle mx-1 px-2.5 py-1 rounded-full bg-[#d2f831] text-slate-950 shadow-sm">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>{" "}
            <span className="text-slate-400 font-bold">more accountable</span>
          </h2>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Card 1: Left Tall Blue Card (Col span 4) */}
          <div className="lg:col-span-4 rounded-[28px] bg-[#1681eb] p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-lg">
            {/* Top Bar inside card */}
            <div className="flex items-center justify-between relative z-10">
              <span className="font-display font-black text-xl tracking-tighter text-white">
                SUTRA
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-white h-2 rounded-full" />
                  <span className="w-0.5 bg-white h-3 rounded-full" />
                  <span className="w-0.5 bg-white h-1.5 rounded-full" />
                </div>
              </div>
            </div>

            {/* Photo of student / mentor against blue sky */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pt-10">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80"
                alt="Student & Mentor Success"
                className="w-full h-full object-cover object-top opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1681eb]/90 via-transparent to-transparent" />
            </div>

            {/* Bottom floating white card */}
            <div className="relative z-10 bg-white rounded-2xl p-5 text-slate-950 shadow-xl mt-auto">
              <div className="font-display font-extrabold text-3xl tracking-tight text-slate-950">
                120+
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                Academic departments actively resolving support cases with strict SLAs.
              </p>
            </div>
          </div>

          {/* Card 2: Middle Slate-50 Card (Col span 4) */}
          <div className="lg:col-span-4 rounded-[28px] bg-[#f8fafc] border border-slate-100 p-7 flex flex-col justify-between min-h-[460px] shadow-sm">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Commitment to follow-through
              </p>
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-slate-950 tracking-tight mt-3">
                100%
              </div>
            </div>

            <div className="space-y-4 pt-8">
              {/* Avatar stack */}
              <div className="flex items-center -space-x-2">
                {avatarStack.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Dean of Students"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ))}
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                &ldquo;SUTRA replaced passive alert fatigue with owned, empathetic cases. Every student check-in is verified, dignified, and timely.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right 2 Cards Stacked (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
            {/* Card 3: Neon Lime Card */}
            <div className="rounded-[28px] bg-[#d2f831] p-7 text-slate-950 flex flex-col justify-between flex-1 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Data Points
              </div>
              <div className="my-4">
                <div className="font-display font-black text-5xl sm:text-6xl text-slate-950 tracking-tight">
                  520k+
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                Synthesized monthly to power proactive, policy-backed interventions.
              </p>
            </div>

            {/* Card 4: Dark Charcoal Card */}
            <div className="rounded-[28px] bg-[#111625] p-7 text-white flex items-center justify-between shadow-lg">
              <span className="text-sm font-semibold text-slate-300">
                Partner Campuses
              </span>
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
                20+
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
