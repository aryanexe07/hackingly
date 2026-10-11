"use client";

import React, { useState } from "react";
import { Settings, Copy, ArrowUpRight, ArrowUp } from "lucide-react";

interface Point {
  month: string;
  value: number; // 0 to 4000
}

const DEFAULT_POINTS: Point[] = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 240 },
  { month: "Mar", value: 310 },
  { month: "Apr", value: 650 },
  { month: "May", value: 1350 },
  { month: "Jun", value: 2500 },
  { month: "Jul", value: 3950 },
];

export function EngagementChart({
  points = DEFAULT_POINTS,
  title = "Student Engagement Trend",
  className = "",
}: {
  points?: Point[];
  title?: string;
  className?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const width = 500;
  const height = 220;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const maxVal = 4000;

  // Convert points to SVG coordinates
  const coords = points.map((p, i) => {
    const x = padLeft + (i / (points.length - 1)) * chartW;
    const y = padTop + chartH - (p.value / maxVal) * chartH;
    return { x, y, ...p };
  });

  // Generate cubic bezier curve path
  const createSmoothPath = (pts: typeof coords) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 5;
      const cp1y = p1.y + (p2.y - p0.y) / 5;
      const cp2x = p2.x - (p3.x - p1.x) / 5;
      const cp2y = p2.y - (p3.y - p1.y) / 5;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(coords);
  const lastPt = coords[coords.length - 1];
  const firstPt = coords[0];
  const areaPath = `${linePath} L ${lastPt.x} ${padTop + chartH} L ${firstPt.x} ${padTop + chartH} Z`;

  const activeIdx = hoveredIdx !== null ? hoveredIdx : coords.length - 1;
  const activePt = coords[activeIdx];

  return (
    <div className={`skill-card p-6 bg-white relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <button
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Chart Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Export / Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
            title="Maximize View"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="relative w-full aspect-[2.1/1] select-none">
        {/* Floating Tooltip Pill matching screenshots */}
        {activePt && (
          <div
            className="absolute z-20 pointer-events-none transition-all duration-200 ease-out flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-100 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-[11px] font-semibold text-neutral-800 whitespace-nowrap"
            style={{
              left: `${(activePt.x / width) * 100}%`,
              top: `${(activePt.y / height) * 100}%`,
              transform: "translate(-80%, -140%)",
            }}
          >
            <ArrowUp className="w-3 h-3 text-emerald-600 stroke-[3]" />
            <span>6.91% Consistent Engagement</span>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Soft luminous gradient area fill */}
            <linearGradient id="engagementFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#BBF7D0" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing filter for active point */}
            <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="#22C55E"
                floodOpacity="0.6"
              />
            </filter>
          </defs>

          {/* Horizontal Grid lines and Y Labels */}
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

          {/* Area gradient under curve */}
          <path d={areaPath} fill="url(#engagementFillGrad)" />

          {/* Smooth bezier line */}
          <path
            d={linePath}
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interactive touch/hover invisible bands */}
          {coords.map((pt, idx) => (
            <g
              key={pt.month}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <rect
                x={pt.x - chartW / (points.length * 2)}
                y={padTop}
                width={chartW / points.length}
                height={chartH}
                fill="transparent"
              />
            </g>
          ))}

          {/* Render Active Point Indicator */}
          {activePt && (
            <g>
              <circle
                cx={activePt.x}
                cy={activePt.y}
                r="6"
                fill="#22C55E"
                filter="url(#greenGlow)"
              />
              <circle cx={activePt.x} cy={activePt.y} r="3" fill="#FFFFFF" />
            </g>
          )}

          {/* X Axis Month Labels */}
          {coords.map((pt) => (
            <text
              key={pt.month}
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className="text-[11px] font-medium fill-neutral-400"
            >
              {pt.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
