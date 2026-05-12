'use client';

interface MomentumGaugeProps {
  value?: number; // 0-100
  label?: string;
  className?: string;
  ticksOnly?: boolean; // decorative variant: no fill arc, no center digit
  sweepTick?: number; // index 0-40 of a tick to highlight + animate
}

// Aatram MomentumArc DNA: a 240° instrument gauge (150° → 390°) with 41 tick marks.
export function MomentumGauge({
  value = 68,
  label = 'MOMENTUM',
  className,
  ticksOnly = false,
  sweepTick,
}: MomentumGaugeProps) {
  const cx = 120;
  const cy = 130;
  const r = 85;
  const startA = 150;
  const endA = 390;

  const ticks = [];
  for (let i = 0; i <= 40; i++) {
    const a = startA + ((endA - startA) * i) / 40;
    const major = i % 10 === 0;
    const mid = i % 5 === 0;
    const len = major ? 12 : mid ? 8 : 5;
    const x1 = cx + (r - len) * Math.cos((a * Math.PI) / 180);
    const y1 = cy + (r - len) * Math.sin((a * Math.PI) / 180);
    const x2 = cx + r * Math.cos((a * Math.PI) / 180);
    const y2 = cy + r * Math.sin((a * Math.PI) / 180);
    const isSweep = sweepTick === i;
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isSweep ? '#7DBFAB' : '#8BA4B8'}
        strokeWidth={isSweep ? 2 : major ? 1.5 : 1}
        strokeOpacity={isSweep ? 1 : major ? 0.7 : mid ? 0.5 : 0.3}
        strokeLinecap="round"
        className={isSweep ? 'tick-sweep' : undefined}
      />
    );
  }

  const fillEnd = startA + (endA - startA) * (Math.max(0, Math.min(100, value)) / 100);
  const x1 = cx + r * Math.cos((startA * Math.PI) / 180);
  const y1 = cy + r * Math.sin((startA * Math.PI) / 180);
  const x2 = cx + r * Math.cos((fillEnd * Math.PI) / 180);
  const y2 = cy + r * Math.sin((fillEnd * Math.PI) / 180);
  const largeArc = fillEnd - startA > 180 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;

  return (
    <svg viewBox="0 0 240 200" className={className}>
      {ticks}
      {!ticksOnly && (
        <>
          <path d={arcPath} fill="none" stroke="#7DBFAB" strokeWidth="5" strokeLinecap="round" />
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            fill="currentColor"
            style={{ fontSize: 48, letterSpacing: '-0.02em', fontFamily: 'var(--font-instrument-serif), serif' }}
          >
            {Math.round(value)}
          </text>
          <text
            x={cx}
            y={cy + 30}
            textAnchor="middle"
            fill="currentColor"
            opacity="0.5"
            style={{ fontSize: 9, letterSpacing: '0.2em' }}
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
}
