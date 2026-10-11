"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const TIMEFRAME_MATRICES: Record<string, number[][]> = {
  "This Week": [
    [1, 2, 0, 0, 1, 0, 0],
    [0, 1, 2, 2, 0, 1, 1],
    [1, 0, 0, 1, 2, 0, 2],
  ],
  "This Month": [
    [2, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 2],
  ],
  "This Year": [
    [2, 1, 1, 2, 0, 1, 1],
    [1, 2, 2, 1, 1, 2, 1],
    [2, 1, 2, 2, 1, 1, 2],
  ],
};

export function ActivityHeatmap({ className = "" }: { className?: string }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const hours = ["12 PM", "6 PM", "3 PM"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeframes = ["This Week", "This Month", "This Year"];

  const matrix = TIMEFRAME_MATRICES[selectedTimeframe] || TIMEFRAME_MATRICES["This Month"];

  return (
    <div className={`skill-card p-5 sm:p-6 bg-white relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
          Activity by Day
        </h3>

        {/* Timeframe selector dropdown */}
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

      {/* Heatmap Matrix Grid with mobile overflow safeguard */}
      <div className="pt-2 overflow-x-auto no-scrollbar">
        <div className="min-w-[280px]">
          <div className="space-y-2.5">
            {hours.map((hour, rIdx) => (
              <div key={hour} className="flex items-center gap-3">
                {/* Row Label */}
                <span className="w-10 text-[11px] font-medium text-neutral-400 text-right flex-shrink-0">
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
                        onTouchStart={() => setHoveredCell({ row: rIdx, col: cIdx })}
                        onTouchEnd={() => setHoveredCell(null)}
                        className={`h-7 rounded-lg transition-all duration-200 cursor-pointer relative flex items-center justify-center ${cellBg} ${
                          isHovered ? "ring-2 ring-emerald-500 scale-105 shadow-sm" : ""
                        }`}
                        title={`${day} at ${hour}: ${
                          level === 2
                            ? "Peak activity (high engagement)"
                            : level === 1
                            ? "Moderate activity"
                            : "Low activity"
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
            <span className="w-10 flex-shrink-0" />
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
    </div>
  );
}
