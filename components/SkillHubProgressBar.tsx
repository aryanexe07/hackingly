import React from "react";

interface SkillHubProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  heightClass?: string;
}

export function SkillHubProgressBar({
  progress,
  className = "",
  heightClass = "h-4",
}: SkillHubProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={`w-full ${heightClass} relative flex items-center overflow-hidden rounded-full bg-neutral-100/70 border border-neutral-200/50 ${className}`}
    >
      {/* 1. Filled Gradient Portion */}
      <div
        className="h-full relative flex items-center justify-end transition-all duration-700 ease-out"
        style={{
          width: `${clampedProgress}%`,
          background:
            "linear-gradient(90deg, #FED7AA 0%, #FBCFE8 50%, #BBF7D0 100%)",
        }}
      >
        {/* Subtle dark indicator mark at edge of progress */}
        {clampedProgress > 0 && clampedProgress < 100 && (
          <div className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-neutral-700/80 z-10" />
        )}
      </div>

      {/* 2. Unfilled Portion with Vertical Tick Marks */}
      <div
        className="h-full skill-ticks-bg transition-all duration-700 ease-out"
        style={{
          width: `${100 - clampedProgress}%`,
        }}
      />
    </div>
  );
}
