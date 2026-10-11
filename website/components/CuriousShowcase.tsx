"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CuriousShowcase() {
  const showcaseProjects = [
    {
      id: 1,
      title: "Academic Peer Tutoring Match",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(24deg) scale(0.92)",
    },
    {
      id: 2,
      title: "Attendance Drift Early Outreach",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(16deg) scale(0.96)",
    },
    {
      id: 3,
      title: "Confidential Wellness Referral",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(8deg) scale(0.99)",
    },
    {
      id: 4,
      title: "Emergency Hardship Aid Desk",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(0deg) scale(1.02)",
    },
    {
      id: 5,
      title: "Mentorship 1-on-1 Consultation",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(-8deg) scale(0.99)",
    },
    {
      id: 6,
      title: "Remedial Coursework Pacing",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(-16deg) scale(0.96)",
    },
    {
      id: 7,
      title: "Cohort Persistence Ledger",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      transform: "perspective(1100px) rotateY(-24deg) scale(0.92)",
    },
  ];

  const pillars = [
    { num: "01", name: "Signal Provenance" },
    { num: "02", name: "Mentor Triage" },
    { num: "03", name: "48h SLA Action" },
    { num: "04", name: "Verified Outcome" },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest text-[#ea580c] uppercase mb-3">
            Behind the Interventions
          </p>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            Curious How SUTRA Protects <br />
            Every Student?
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
            Explore role-governed support cases, ethical signal provenance, and holistic student care workflows across our platform.
          </p>

          {/* Pill Button */}
          <div className="mt-6 flex justify-center">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-sm flex items-center gap-2.5 group"
            >
              <span>Explore Workflows</span>
              <span className="w-3 h-3 rounded-full bg-[#f97316] group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* 3D Arc Cylindrical Gallery of 7 Cards */}
        <div className="relative w-full py-8 overflow-hidden">
          <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-6 px-4 perspective-container">
            {showcaseProjects.map((item) => (
              <div
                key={item.id}
                className="arc-card w-40 sm:w-48 md:w-52 h-72 sm:h-80 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 relative group cursor-pointer bg-slate-100"
                style={{
                  transform: item.transform,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold leading-snug drop-shadow-sm">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Process Pillars below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-100 max-w-4xl mx-auto text-center sm:text-left">
          {pillars.map((p, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-400">
                /{p.num}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
