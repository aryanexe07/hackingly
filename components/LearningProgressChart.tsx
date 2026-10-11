"use client";

import React, { useState } from "react";
import { Copy, ArrowUpRight } from "lucide-react";

interface BarItem {
  month: string;
  value: number; // 0 to 4500
  isHighlight?: boolean;
}

const DEFAULT_BARS: BarItem[] = [
  { month: "Jan", value: 3200 },
  { month: "Feb", value: 2400 },
  { month: "Mar", value: 3000 },
  { month: "Apr", value: 3800, isHighlight: true },
  { month: "May", value: 2700 },
  { month: "Jun", value: 3500 },
  { month: "Jul", value: 4100 },
];

export function LearningProgressChart({
  data = DEFAULT_BARS,
  className = "",
}: {
  data?: BarItem[];
  className?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  return (
    <div className={`skill-card p-6 bg-white relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Learning Progress Overview
        </h3>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <button
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Duplicate / View"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Expand View"
          >
            <ArrowUpRight className="w-4 h-4" />
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
            {/* Gradient for highlighted bar (April) */}
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
          {data.map((item, idx) => {
            const x =
              padLeft +
              (idx / (data.length - 1)) * chartW -
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
                  className="transition-all duration-200"
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
