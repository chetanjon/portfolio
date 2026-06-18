// An original glossy café racer (side view, facing right). Entirely custom
// geometry — no logos, no Batman/DC marks. Clean riderless profile to match the
// user's reference (a glossy custom café racer in smoke). Glossy paint via SVG
// gradients with cool, slightly-lavender specular highlights to match the site's
// glossy style, plus a thin accent rim-light so it reads on paper and near-black.
// Wheels are <g class="cr-wheel"> so the orchestrator spins them via CSS.

const ACCENT = '#B8A9D4';

function Wheel({ cx, cy, spinning }: { cx: number; cy: number; spinning: boolean }) {
  const spokes = [0, 60, 120, 180, 240, 300].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return (
      <line
        key={deg}
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(a) * 25}
        y2={cy + Math.sin(a) * 25}
        stroke="url(#cr-metal)"
        strokeWidth={4}
        strokeLinecap="round"
      />
    );
  });
  const holes = [30, 90, 150, 210, 270, 330].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return <circle key={deg} cx={cx + Math.cos(a) * 14} cy={cy + Math.sin(a) * 14} r={1.5} fill="#0c0c10" />;
  });
  return (
    <g className={`cr-wheel${spinning ? ' spin' : ''}`} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <circle cx={cx} cy={cy} r={40} fill="none" stroke="url(#cr-tire)" strokeWidth={11} />
      <circle cx={cx} cy={cy} r={45} fill="none" stroke="#000" strokeOpacity={0.22} strokeWidth={1} />
      {/* glossy top sheen on the tire */}
      <path
        d={`M ${cx - 28} ${cy - 28} A 40 40 0 0 1 ${cx + 28} ${cy - 28}`}
        fill="none"
        stroke="#9a9aaa"
        strokeOpacity={0.5}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={27} fill="none" stroke="url(#cr-rim)" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={27} fill="none" stroke={ACCENT} strokeOpacity={0.32} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={18} fill="none" stroke="#3a3a44" strokeWidth={3} />
      {holes}
      {spokes}
      <circle cx={cx} cy={cy} r={6} fill="url(#cr-metal)" />
      <circle cx={cx} cy={cy} r={2.3} fill="#0c0c10" />
    </g>
  );
}

export function CafeRacer({ spinning = false, className }: { spinning?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 340 160" className={className} role="img" aria-label="A café-racer motorcycle">
      <defs>
        <linearGradient id="cr-tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26262f" />
          <stop offset="0.32" stopColor="#3c3c4a" />
          <stop offset="0.44" stopColor="#82828f" />
          <stop offset="0.54" stopColor="#34343f" />
          <stop offset="1" stopColor="#0f0f14" />
        </linearGradient>
        <linearGradient id="cr-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2c35" />
          <stop offset="0.5" stopColor="#1a1a20" />
          <stop offset="1" stopColor="#0c0c10" />
        </linearGradient>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aeaeba" />
          <stop offset="0.5" stopColor="#56565f" />
          <stop offset="1" stopColor="#24242c" />
        </linearGradient>
        <linearGradient id="cr-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6e6ee" />
          <stop offset="0.45" stopColor="#7a7a86" />
          <stop offset="0.55" stopColor="#4a4a54" />
          <stop offset="1" stopColor="#26262e" />
        </linearGradient>
        <linearGradient id="cr-tire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2b34" />
          <stop offset="1" stopColor="#0a0a0d" />
        </linearGradient>
        <radialGradient id="cr-rim" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#80808c" />
          <stop offset="1" stopColor="#2a2a32" />
        </radialGradient>
        <radialGradient id="cr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c6f4e2" stopOpacity="0.95" />
          <stop offset="1" stopColor="#c6f4e2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dual upswept exhaust -> silencers at the rear-left (smoke origin) */}
      <path d="M176 108 C 142 122, 96 124, 60 122 C 46 121, 38 118, 32 114" fill="none" stroke="url(#cr-chrome)" strokeWidth={6.5} strokeLinecap="round" />
      <path d="M180 113 C 150 127, 104 130, 70 128 C 52 127, 42 124, 36 120" fill="none" stroke="url(#cr-chrome)" strokeWidth={6.5} strokeLinecap="round" />
      <ellipse cx="31" cy="114" rx="3" ry="4.5" fill="#1a1a20" />
      <ellipse cx="35" cy="120" rx="3" ry="4.5" fill="#1a1a20" />

      {/* Wheels */}
      <Wheel cx={66} cy={110} spinning={spinning} />
      <Wheel cx={274} cy={110} spinning={spinning} />

      {/* Engine block with fins */}
      <path d="M170 96 h60 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-60 a6 6 0 0 1 -6 -6 v-16 a6 6 0 0 1 6 -6 z" fill="url(#cr-metal)" />
      {[103, 109, 115, 121].map((y) => (
        <line key={y} x1="168" y1={y} x2="234" y2={y} stroke="#16161c" strokeOpacity={0.6} strokeWidth={1.3} />
      ))}

      {/* Frame: subframe + backbone + down tube */}
      <path d="M66 110 L112 88 M236 100 L252 80" fill="none" stroke="#16161c" strokeWidth={5} strokeLinecap="round" />
      <path d="M112 90 L232 98" fill="none" stroke="url(#cr-metal)" strokeWidth={4} strokeLinecap="round" />

      {/* Café seat bench + upswept tail cowl */}
      <path d="M108 88 L168 90 C 172 90 172 94 168 95 L 112 94 C 104 94 96 92 96 86 C 96 81 104 80 110 83 Z" fill="url(#cr-seat)" />
      <path d="M90 86 C 90 78 104 77 114 81 L 116 89 C 106 90 94 90 90 86 Z" fill="url(#cr-seat)" />
      <circle cx="95" cy="83" r="1.8" style={{ fill: ACCENT }} opacity={0.8} />

      {/* Glossy fuel tank */}
      <path d="M166 96 C 166 78 196 74 224 78 C 240 81 244 90 234 96 C 212 102 184 102 166 96 Z" fill="url(#cr-tank)" />
      <ellipse cx="196" cy="83" rx="20" ry="3.6" fill="#d2d2e0" opacity={0.6} />
      <path d="M174 94 C 192 91 214 91 230 95" fill="none" stroke={ACCENT} strokeOpacity={0.42} strokeWidth={1} />

      {/* Front: forks, clip-on, headlight cowl + glow */}
      <line x1="274" y1="110" x2="252" y2="78" stroke="url(#cr-metal)" strokeWidth={5} strokeLinecap="round" />
      <line x1="268" y1="110" x2="248" y2="80" stroke="#26262e" strokeWidth={3} strokeLinecap="round" />
      <path d="M242 74 q 12 -1 16 8" fill="none" stroke="#16161c" strokeWidth={3.5} strokeLinecap="round" />
      <path d="M246 78 h16 a6 6 0 0 1 6 6 v10 a6 6 0 0 1 -6 6 h-14 z" fill="url(#cr-seat)" />
      <circle cx="262" cy="90" r="11" fill="url(#cr-glow)" />
      <circle cx="262" cy="90" r="6.5" fill="#eafff7" opacity={0.95} />
      <circle cx="262" cy="90" r="6.5" fill="none" stroke="url(#cr-chrome)" strokeWidth={2} />
    </svg>
  );
}
