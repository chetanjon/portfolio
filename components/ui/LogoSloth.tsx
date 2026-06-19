// A small three-toed sloth hanging by ONE hand. Sized to hang off the "C" of
// the CJ logo. Original geometry, no marks. Gently sways via the .sloth-sway
// class (pivoting from the grip hand); static under reduced motion.
export function LogoSloth({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const FUR = '#8a7c67';
  const MASK = '#564636';
  const EYE = '#241c14';
  const NOSE = '#2a2118';
  const CLAW = '#3a3025';
  return (
    <svg
      viewBox="0 0 44 78"
      width={30}
      height={53}
      className={className}
      style={style}
      role="img"
      aria-label="A small sloth hanging from the C"
    >
      <defs>
        <linearGradient id="ls-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a89a82" />
          <stop offset="0.55" stopColor="#8a7c67" />
          <stop offset="1" stopColor="#6c6051" />
        </linearGradient>
        <linearGradient id="ls-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdbea2" />
          <stop offset="1" stopColor="#b09f84" />
        </linearGradient>
      </defs>

      {/* the one gripping arm, up to the branch */}
      <path d="M24 9 C 26 22 24 30 21 33" fill="none" stroke={FUR} strokeWidth={6} strokeLinecap="round" />
      {/* grip claws hooking over */}
      <g fill="none" stroke={CLAW} strokeWidth={1.8} strokeLinecap="round">
        <path d="M22 10 C 20 4 22 1 25 2" />
        <path d="M25 9 C 23 3 26 1 28 3" />
      </g>

      {/* free arm dangling */}
      <path d="M15 40 C 11 48 11 56 13 60" fill="none" stroke={FUR} strokeWidth={5} strokeLinecap="round" />

      {/* body */}
      <ellipse cx="21" cy="50" rx="11" ry="14" fill="url(#ls-fur)" />
      <ellipse cx="21" cy="52" rx="6.5" ry="9" fill="url(#ls-face)" opacity={0.5} />

      {/* hind legs + claws */}
      <path d="M15 62 C 13 68 13 70 15 72 M29 62 C 31 68 31 70 29 72" fill="none" stroke={FUR} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M14 71 c -1 2 0 3 1 3 M30 71 c 1 2 0 3 -1 3" fill="none" stroke={CLAW} strokeWidth={1.3} strokeLinecap="round" />

      {/* head */}
      <ellipse cx="21" cy="34" rx="10" ry="9" fill="url(#ls-face)" />
      {/* dark eye-mask stripes */}
      <path d="M17 25 C 14 29 13.5 36 16 40 C 18 37 18.5 30 19 27 Z" fill={MASK} />
      <path d="M25 25 C 28 29 28.5 36 26 40 C 24 37 23.5 30 23 27 Z" fill={MASK} />
      {/* eyes */}
      <circle cx="16.5" cy="34" r="1.7" fill={EYE} />
      <circle cx="25.5" cy="34" r="1.7" fill={EYE} />
      <circle cx="17" cy="33.4" r="0.5" fill="#fff" opacity={0.8} />
      <circle cx="26" cy="33.4" r="0.5" fill="#fff" opacity={0.8} />
      {/* nose + smile */}
      <path d="M19 38 Q21 37 23 38 Q22 41 21 41 Q20 41 19 38 Z" fill={NOSE} />
      <path d="M18.5 43 Q21 46 23.5 43" fill="none" stroke={NOSE} strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}
