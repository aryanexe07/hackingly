import React from "react";

export function SkillHubLogoIcon({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8 rounded radiating pill petals */}
      <rect x="14" y="2" width="4" height="10" rx="2" fill={color} />
      <rect x="14" y="20" width="4" height="10" rx="2" fill={color} />
      <rect x="2" y="14" width="10" height="4" rx="2" fill={color} />
      <rect x="20" y="14" width="10" height="4" rx="2" fill={color} />
      {/* 4 diagonals */}
      <rect
        x="6.5"
        y="4"
        width="4"
        height="10"
        rx="2"
        transform="rotate(45 8.5 9)"
        fill={color}
      />
      <rect
        x="19.5"
        y="17"
        width="4"
        height="10"
        rx="2"
        transform="rotate(45 21.5 22)"
        fill={color}
      />
      <rect
        x="17"
        y="6.5"
        width="4"
        height="10"
        rx="2"
        transform="rotate(-45 19 8.5)"
        fill={color}
      />
      <rect
        x="4"
        y="19.5"
        width="4"
        height="10"
        rx="2"
        transform="rotate(-45 6 21.5)"
        fill={color}
      />
    </svg>
  );
}

export function SkillHubLogo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={light ? "text-white" : "text-neutral-900"}>
        <SkillHubLogoIcon className="w-6 h-6" color="currentColor" />
      </div>
      <span
        className={`text-xl font-bold tracking-tight font-heading ${
          light ? "text-white" : "text-neutral-900"
        }`}
      >
        SkillHub
      </span>
    </div>
  );
}
