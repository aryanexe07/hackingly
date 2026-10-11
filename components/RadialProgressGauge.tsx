"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CategoryRate {
  name: string;
  rate: number;
}

export function RadialProgressGauge({
  rate = 78,
  categories = [
    { name: "UI Design", rate: 82 },
    { name: "React Development", rate: 75 },
    { name: "JavaScript", rate: 82 },
    { name: "UX Research", rate: 63 },
  ],
  className = "",
}: {
  rate?: number;
  categories?: CategoryRate[];
  className?: string;
}) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");

  // SVG Gauge calculations
  // Semi-circle from -180 deg to 0 deg
  const radius = 64;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // length of half circle
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <div className={`skill-card p-6 bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Course Performance
        </h3>
        <button className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors">
          <span>{selectedTimeframe}</span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
        {/* Left: Semi-circular Gauge */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-44 h-28 flex items-end justify-center overflow-hidden">
            <svg
              viewBox="0 0 160 90"
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Vibrant lime-green gradient for the gauge */}
                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="60%" stopColor="#86EFAC" />
                  <stop offset="100%" stopColor="#BBF7D0" />
                </linearGradient>

                <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#22C55E" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* Background Arc */}
              <path
                d="M 16 80 A 64 64 0 0 1 144 80"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              {/* Progress Arc */}
              <path
                d="M 16 80 A 64 64 0 0 1 144 80"
                fill="none"
                stroke="url(#gaugeGrad)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                filter="url(#gaugeShadow)"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center Rate Text */}
            <div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-neutral-900 tracking-tight leading-none">
                {rate}%
              </span>
              <span className="text-[11px] font-medium text-neutral-400 mt-1 whitespace-nowrap">
                Avg. Completion Rate
              </span>
            </div>
          </div>
        </div>

        {/* Right: Breakdown List */}
        <div className="md:col-span-6 space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-xs font-medium py-0.5"
            >
              <span className="text-neutral-600">{cat.name}</span>
              <span className="font-semibold text-neutral-900">{cat.rate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
