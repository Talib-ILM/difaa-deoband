"use client";

import React from "react";

export default function IslamicPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <polygon
            points="40,8 46,22 60,16 50,28 64,32 50,36 60,50 46,44 40,58 34,44 20,50 30,36 16,32 30,28 20,16 34,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          {/* Inner diamond */}
          <polygon
            points="40,20 48,32 40,44 32,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          {/* Corner accents */}
          <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="80" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="0" cy="80" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="80" cy="80" r="4" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {/* Connecting lines */}
          <line x1="0" y1="0" x2="20" y2="16" stroke="currentColor" strokeWidth="0.3" />
          <line x1="80" y1="0" x2="60" y2="16" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="80" x2="20" y2="50" stroke="currentColor" strokeWidth="0.3" />
          <line x1="80" y1="80" x2="60" y2="50" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}
