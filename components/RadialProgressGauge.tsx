"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface CategoryRate {
  name: string;
  rate: number;
}

const TIMEFRAME_PERFORMANCE: Record<string, { rate: number; categories: CategoryRate[] }> = {
  "This Week": {
    rate: 84,
    categories: [
      { name: "UI Design", rate: 89 },
      { name: "React Development", rate: 81 },
      { name: "JavaScript", rate: 85 },
      { name: "UX Research", rate: 72 },
    ],
  },
  "This Month": {
    rate: 78,
    categories: [
      { name: "UI Design", rate: 82 },
      { name: "React Development", rate: 75 },
      { name: "JavaScript", rate: 82 },
      { name: "UX Research", rate: 63 },
    ],
  },
  "This Year": {
    rate: 91,
    categories: [
      { name: "UI Design", rate: 94 },
      { name: "React Development", rate: 88 },
      { name: "JavaScript", rate: 93 },
      { name: "UX Research", rate: 86 },
    ],
  },
};

export function RadialProgressGauge({
  className = "",
}: {
  rate?: number;
  categories?: CategoryRate[];
  className?: string;
}) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData = TIMEFRAME_PERFORMANCE[selectedTimeframe] || TIMEFRAME_PERFORMANCE["This Month"];
  const displayRate = currentData.rate;
  const displayCategories = currentData.categories;

  // SVG Gauge calculations
  // Semi-circle from -180 deg to 0 deg
  const radius = 64;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // length of half circle
  const strokeDashoffset = circumference - (displayRate / 100) * circumference;

  const timeframes = ["This Week", "This Month", "This Year"];

  return (
    <div className={`skill-card p-5 sm:p-6 bg-white relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Course Performance
        </h3>
        
        {/* Interactive Timeframe Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors"
          >
            <span>{selectedTimeframe}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      setSelectedTimeframe(tf);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center justify-between transition-colors"
                  >
                    <span>{tf}</span>
                    {selectedTimeframe === tf && (
                      <Check className="w-3.5 h-3.5 text-neutral-900" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
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
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Rate Text */}
            <div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-neutral-900 tracking-tight leading-none">
                {displayRate}%
              </span>
              <span className="text-[11px] font-medium text-neutral-400 mt-1 whitespace-nowrap">
                Avg. Completion Rate
              </span>
            </div>
          </div>
        </div>

        {/* Right: Breakdown List */}
        <div className="md:col-span-6 space-y-3">
          {displayCategories.map((cat) => (
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
