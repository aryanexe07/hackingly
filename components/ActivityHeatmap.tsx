"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ActivityHeatmap({ className = "" }: { className?: string }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const hours = ["12 PM", "6 PM", "3 PM"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Activity levels: 0 (subtle gray), 1 (light mint), 2 (vibrant mint)
  // Matching Image 5 layout exactly:
  // Row 0 (12 PM): Mon is active (2)
  // Row 1 (6 PM): Tue (1), Wed (1), Sat (1) active
  // Row 2 (3 PM): Thu (1), Sun (1) active
  const matrix = [
    [2, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 2],
  ];

  return (
    <div className={`skill-card p-6 bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Activity by Day
        </h3>
        <button className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/60 text-xs font-medium text-neutral-600 transition-colors">
          <span>{selectedTimeframe}</span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>

      {/* Heatmap Matrix Grid */}
      <div className="pt-2">
        <div className="space-y-2.5">
          {hours.map((hour, rIdx) => (
            <div key={hour} className="flex items-center gap-3">
              {/* Row Label */}
              <span className="w-10 text-[11px] font-medium text-neutral-400 text-right">
                {hour}
              </span>

              {/* Day cells */}
              <div className="flex-1 grid grid-cols-7 gap-2">
                {days.map((day, cIdx) => {
                  const level = matrix[rIdx][cIdx];
                  const isHovered =
                    hoveredCell?.row === rIdx && hoveredCell?.col === cIdx;

                  let cellBg = "bg-neutral-100/70";
                  if (level === 1) cellBg = "bg-emerald-100/80";
                  if (level === 2) cellBg = "bg-emerald-300";

                  return (
                    <div
                      key={day}
                      onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-7 rounded-lg transition-all duration-150 cursor-pointer relative flex items-center justify-center ${cellBg} ${
                        isHovered ? "ring-2 ring-emerald-500 scale-105" : ""
                      }`}
                      title={`${day} at ${hour}: ${
                        level === 2
                          ? "Peak activity"
                          : level === 1
                          ? "Moderate activity"
                          : "Standard activity"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* X Axis Day Labels */}
        <div className="flex items-center gap-3 mt-3 pt-1">
          <span className="w-10" />
          <div className="flex-1 grid grid-cols-7 gap-2 text-center">
            {days.map((day) => (
              <span key={day} className="text-[11px] font-medium text-neutral-400">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
