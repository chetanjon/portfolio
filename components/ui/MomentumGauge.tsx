'use client';

interface MomentumGaugeProps {
  value?: number; // 0-100
  label?: string;
  className?: string;
  ticksOnly?: boolean; // decorative variant: no fill, no center digit, no labels
  sweepTick?: number;
  showZoneLabels?: boolean;
}

// Ported from Aatram's MomentumArc: a 240° instrument gauge sweeping 150° → 390°,
// even-length tick marks radiating outward from the arc, smooth filled + unfilled
// arcs, white tip dot at the head of the fill, and the four zone labels positioned
// around the gauge ("Starting" / "Building" / "Rolling" / "Locked In").
export function MomentumGauge({
  value = 48,
  label = 'MOMENTUM',
  className,
  ticksOnly = false,
  sweepTick,
  showZoneLabels = true,
}: MomentumGaugeProps) {
  const cx = 120;
  const cy = 132;
  const r = 78;
  const startA = 150;
  const endA = 390;
  const sweep = endA - startA;
  const tickCount = 28;
  const tickLen = 7;
  const tickGap = 4; // gap between arc and ticks (ticks sit outside the arc)

  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const a = startA + (sweep * i) / tickCount;
    const x1 = cx + (r + tickGap) * Math.cos((a * Math.PI) / 180);
    const y1 = cy + (r + tickGap) * Math.sin((a * Math.PI) / 180);
    const x2 = cx + (r + tickGap + tickLen) * Math.cos((a * Math.PI) / 180);
    const y2 = cy + (r + tickGap + tickLen) * Math.sin((a * Math.PI) / 180);
    const isSweep = sweepTick === i;
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isSweep ? '#7DBFAB' : '#8BA4B8'}
        strokeWidth={isSweep ? 1.5 : 1}
        strokeOpacity={isSweep ? 1 : 0.55}
        strokeLinecap="round"
        className={isSweep ? 'tick-sweep' : undefined}
      />
    );
  }

  // Background (unfilled) arc — full sweep
  const bgX1 = cx + r * Math.cos((startA * Math.PI) / 180);
  const bgY1 = cy + r * Math.sin((startA * Math.PI) / 180);
  const bgX2 = cx + r * Math.cos((endA * Math.PI) / 180);
  const bgY2 = cy + r * Math.sin((endA * Math.PI) / 180);
  const bgArc = `M ${bgX1} ${bgY1} A ${r} ${r} 0 1 1 ${bgX2} ${bgY2}`;

  // Filled arc up to current value
  const clamped = Math.max(0, Math.min(100, value));
  const fillEnd = startA + sweep * (clamped / 100);
  const fillX2 = cx + r * Math.cos((fillEnd * Math.PI) / 180);
  const fillY2 = cy + r * Math.sin((fillEnd * Math.PI) / 180);
  const fillLargeArc = fillEnd - startA > 180 ? 1 : 0;
  const fillArc = `M ${bgX1} ${bgY1} A ${r} ${r} 0 ${fillLargeArc} 1 ${fillX2} ${fillY2}`;

  return (
    <svg viewBox="-12 0 264 220" className={className}>
      {!ticksOnly && (
        <path
          d={bgArc}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.18}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {ticks}
      {!ticksOnly && (
        <>
          <path d={fillArc} fill="none" stroke="#B8A9D4" strokeWidth="4" strokeLinecap="round" />
          {/* white tip dot at the head of the fill */}
          <circle cx={fillX2} cy={fillY2} r={4} fill="#F4F1EA" />
          <text
            x={cx}
            y={cy + 6}
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
            style={{ fontSize: 9, letterSpacing: '0.25em' }}
          >
            {label}
          </text>
          {showZoneLabels && (
            <g
              fill="currentColor"
              opacity={0.45}
              style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              <text x={23} y={76} textAnchor="middle">Building</text>
              <text x={217} y={76} textAnchor="middle">Rolling</text>
              <text x={23} y={188} textAnchor="middle">Starting</text>
              <text x={217} y={188} textAnchor="middle">Locked In</text>
            </g>
          )}
        </>
      )}
    </svg>
  );
}
