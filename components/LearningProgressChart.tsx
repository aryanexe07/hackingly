"use client";

import React, { useState } from "react";
import { Copy, ArrowUpRight, Check, ChevronDown } from "lucide-react";

interface BarItem {
  month: string;
  value: number; // 0 to 4500
  isHighlight?: boolean;
}

const TIMEFRAME_BARS: Record<string, BarItem[]> = {
  "This Week": [
    { month: "Mon", value: 2800 },
    { month: "Tue", value: 3100 },
    { month: "Wed", value: 3600 },
    { month: "Thu", value: 3950, isHighlight: true },
    { month: "Fri", value: 3400 },
    { month: "Sat", value: 2900 },
    { month: "Sun", value: 2500 },
  ],
  "This Month": [
    { month: "Jan", value: 3200 },
    { month: "Feb", value: 2400 },
    { month: "Mar", value: 3000 },
    { month: "Apr", value: 3800, isHighlight: true },
    { month: "May", value: 2700 },
    { month: "Jun", value: 3500 },
    { month: "Jul", value: 4100 },
  ],
  "This Year": [
    { month: "Q1", value: 3100 },
    { month: "Q2", value: 3750, isHighlight: true },
    { month: "Q3", value: 3400 },
    { month: "Q4", value: 4200 },
  ],
};

export function LearningProgressChart({
  className = "",
}: {
  data?: BarItem[];
  className?: string;
}) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const timeframes = ["This Week", "This Month", "This Year"];
  const currentBars = TIMEFRAME_BARS[selectedTimeframe] || TIMEFRAME_BARS["This Month"];

  const width = 500;
  const height = 220;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const maxVal = 4000;
  const barWidth = 26;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Learning Progress (${selectedTimeframe}): Peak ${
          Math.max(...currentBars.map((b) => b.value))
        } hrs logged.`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`skill-card p-5 sm:p-6 bg-white relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Learning Progress Overview
        </h3>
        <div className="flex items-center gap-2">
          {/* Timeframe pill */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors"
            >
              <span>{selectedTimeframe}</span>
              <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setSelectedTimeframe(tf);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center justify-between transition-colors"
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

          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Copy Report"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="relative w-full aspect-[2.1/1] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Gradient for highlighted bar */}
            <linearGradient id="highlightBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#86EFAC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.2" />
            </linearGradient>

            {/* Gradient for standard neutral bars */}
            <linearGradient id="neutralBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[4000, 3000, 2000, 1000, 0].map((val) => {
            const y = padTop + chartH - (val / maxVal) * chartH;
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 12}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] font-medium fill-neutral-400"
                >
                  {val === 0 ? "0" : `${val / 1000}K`}
                </text>
              </g>
            );
          })}

          {/* Render Vertical Bars */}
          {currentBars.map((item, idx) => {
            const x =
              padLeft +
              (idx / (currentBars.length - 1)) * chartW -
              barWidth / 2;
            const barH = (Math.min(item.value, maxVal) / maxVal) * chartH;
            const y = padTop + chartH - barH;
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={item.month}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onTouchStart={() => setHoveredIdx(idx)}
              >
                {/* Bar Body */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="6"
                  fill={
                    item.isHighlight
                      ? "url(#highlightBarGrad)"
                      : isHovered
                      ? "#CBD5E1"
                      : "url(#neutralBarGrad)"
                  }
                  className="transition-all duration-300"
                />

                {/* Highlight top green accent cap if isHighlight */}
                {item.isHighlight && (
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={4}
                    rx="2"
                    fill="#22C55E"
                  />
                )}

                {/* Hover value indicator */}
                {isHovered && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-neutral-800"
                  >
                    {(item.value / 1000).toFixed(1)}K
                  </text>
                )}

                {/* X Axis Month Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 8}
                  textAnchor="middle"
                  className={`text-[11px] font-medium ${
                    item.isHighlight
                      ? "fill-neutral-900 font-semibold"
                      : "fill-neutral-400"
                  }`}
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
