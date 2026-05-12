'use client';

interface AatramLogoSVGProps {
  className?: string;
  color?: string;
}

// Approximation of the Aatram logo: 80 overlapping stroke segments faking a
// continuous opacity gradient from 0.85 → 0.08 over a 25°→145° arc, with four
// dissolving particles on golden-ratio-decay radii (3.00 / 2.16 / 1.56 / 1.12).
// Production uses a SwiftUI Canvas; this is the SVG cousin.
export function AatramLogoSVG({ className, color = '#B8A9D4' }: AatramLogoSVGProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <radialGradient id="aatramLogoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${color}2E`} />
          <stop offset="100%" stopColor={`${color}00`} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#aatramLogoGlow)" />
      {Array.from({ length: 80 }).map((_, i) => {
        const startAngle = 25 + (i * 120) / 80;
        const opacity = 0.85 - (i / 80) * (0.85 - 0.08);
        const x1 = 100 + 65 * Math.cos((startAngle * Math.PI) / 180);
        const y1 = 100 + 65 * Math.sin((startAngle * Math.PI) / 180);
        const x2 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
        const y2 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            strokeOpacity={opacity}
            strokeLinecap="round"
          />
        );
      })}
      {[3.0, 2.16, 1.56, 1.12].map((mult, i) => {
        const rad = 30 * mult;
        return (
          <circle
            key={i}
            cx={100 + rad * Math.cos(((85 - i * 10) * Math.PI) / 180)}
            cy={100 + rad * Math.sin(((85 - i * 10) * Math.PI) / 180)}
            r={2.5 - i * 0.4}
            fill={color}
            opacity={0.7 - i * 0.12}
          />
        );
      })}
    </svg>
  );
}
