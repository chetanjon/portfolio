// An original blacked-out café-racer silhouette with a hunched, helmeted rider.
// No logos or marks — just the cafe-racer profile (the vibe, none of the IP).
// Body uses currentColor so it themes (dark on paper, light on near-black);
// thin accent lines use the brand lavender. Wheels are <g class="cr-wheel">
// so the orchestrator can spin them via CSS.

const ACCENT = { stroke: 'var(--color-accent-primary)' } as const;

function Wheel({ cx, cy, spinning }: { cx: number; cy: number; spinning: boolean }) {
  const spokes = [0, 45, 90, 135].map((deg) => {
    const r = (deg * Math.PI) / 180;
    return (
      <line
        key={deg}
        x1={cx - Math.cos(r) * 17}
        y1={cy - Math.sin(r) * 17}
        x2={cx + Math.cos(r) * 17}
        y2={cy + Math.sin(r) * 17}
        stroke="currentColor"
        strokeOpacity={0.55}
        strokeWidth={1.6}
      />
    );
  });
  return (
    <g className={`cr-wheel${spinning ? ' spin' : ''}`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <circle cx={cx} cy={cy} r={26} fill="none" stroke="currentColor" strokeWidth={7} />
      <circle cx={cx} cy={cy} r={18} fill="none" strokeWidth={1.5} style={ACCENT} strokeOpacity={0.7} />
      {spokes}
      <circle cx={cx} cy={cy} r={3.4} fill="currentColor" />
    </g>
  );
}

export function CafeRacer({ spinning = false, className }: { spinning?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 240 132" className={className} role="img" aria-label="A café-racer motorcycle">
      {/* Exhaust pipe sweeping back-low to the outlet (rear = left) */}
      <path
        d="M118 96 C 92 104, 64 104, 30 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeOpacity={0.9}
      />

      {/* Engine block */}
      <path d="M104 86 h44 a5 5 0 0 1 5 5 v8 a5 5 0 0 1 -5 5 h-44 a5 5 0 0 1 -5 -5 v-8 a5 5 0 0 1 5 -5 z" fill="currentColor" />

      {/* Frame line: rear hub -> seat -> tank -> front forks */}
      <path d="M52 96 L86 74 L150 74 L190 96" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

      {/* Café-racer seat cowl + tank as one sculpted body */}
      <path
        d="M70 78
           C 70 66, 92 64, 104 66
           L 120 66
           C 140 64, 156 66, 158 74
           C 150 80, 96 80, 70 78 Z"
        fill="currentColor"
      />
      {/* tank highlight */}
      <path d="M112 68 C 128 66, 142 68, 150 73" fill="none" strokeWidth={1.4} style={ACCENT} strokeOpacity={0.6} />

      {/* Front fork + clip-on bar + small cowl */}
      <line x1="190" y1="96" x2="174" y2="60" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
      <path d="M168 58 q 12 0 16 8" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" />
      <path d="M170 56 l 12 2 l -2 10 z" fill="currentColor" />

      {/* Rider — hunched over the tank */}
      {/* torso */}
      <path d="M150 56 C 132 54, 110 60, 96 72" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
      {/* arm to bars */}
      <line x1="150" y1="58" x2="176" y2="62" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
      {/* upper + lower leg to peg */}
      <path d="M112 72 L 122 92 L 134 98" fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      {/* helmet */}
      <circle cx="152" cy="46" r="11" fill="currentColor" />
      {/* visor */}
      <path d="M150 43 q 7 1 8 6" fill="none" strokeWidth={2} style={ACCENT} strokeOpacity={0.85} strokeLinecap="round" />

      <Wheel cx={52} cy={96} spinning={spinning} />
      <Wheel cx={190} cy={96} spinning={spinning} />
    </svg>
  );
}
