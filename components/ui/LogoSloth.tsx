// A small three-toed sloth hanging from the "C" of the CJ logo, drawn to read
// as a real sloth even at ~36px: shaggy grey-brown fur, the signature tan face
// with dark eye-patches and a permanent smile, and BOTH long-clawed hands
// reaching up to grip, plus dangling clawed feet. Original geometry, no marks.
// Gently sways via the .sloth-sway class; static under reduced motion.
export function LogoSloth({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const FUR_DK = '#5f5444';
  const FACE = '#d6c8ae';
  const MASK = '#574733';
  const EYE = '#241c14';
  const NOSE = '#221a12';
  const CLAW = '#332a20';
  return (
    <svg
      viewBox="0 0 56 90"
      width={36}
      height={58}
      className={className}
      style={style}
      role="img"
      aria-label="A small sloth hanging from the C"
    >
      <defs>
        <linearGradient id="ls-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3a489" />
          <stop offset="0.55" stopColor="#8f8068" />
          <stop offset="1" stopColor="#6c6051" />
        </linearGradient>
        <linearGradient id="ls-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0d3ba" />
          <stop offset="1" stopColor="#bfae90" />
        </linearGradient>
      </defs>

      {/* both long arms reaching up to grip the branch */}
      <path d="M20 52 C 15 38 17 20 23 11" fill="none" stroke="url(#ls-fur)" strokeWidth={7} strokeLinecap="round" />
      <path d="M36 52 C 41 38 39 18 33 9" fill="none" stroke="url(#ls-fur)" strokeWidth={7.5} strokeLinecap="round" />

      {/* long curved claws hooking over the branch — left hand + right (grip) hand */}
      <g fill="none" stroke={CLAW} strokeWidth={1.7} strokeLinecap="round">
        <path d="M21 12 C 19 5 21 2 24 3" />
        <path d="M23.5 11 C 22 4 25 1 27 3" />
        <path d="M26 12 C 25 6 28 3 30 5" />
        <path d="M31 10 C 29 3 31 0 34 1" />
        <path d="M33.5 9 C 32 2 35 0 37 2" />
        <path d="M36 11 C 35 4 38 2 40 4" />
      </g>

      {/* shaggy body */}
      <path
        d="M28 42 C 17 42 13 52 14 62 C 15 77 21 86 28 86 C 35 86 41 77 42 62 C 43 52 39 42 28 42 Z"
        fill="url(#ls-fur)"
      />
      {/* fur tufts along the silhouette */}
      <path d="M14 58 l -3 4 l 4 -1 M16 74 l -3 4 l 4 -1 M28 86 l -2 4 l 3 -1 l 1 4 l 2 -4 M42 58 l 3 4 l -4 -1 M40 74 l 3 4 l -4 -1"
        fill="url(#ls-fur)" />
      {/* lighter belly + shaggy fur strokes */}
      <ellipse cx="28" cy="64" rx="9" ry="13" fill="url(#ls-face)" opacity={0.45} />
      <g stroke={FUR_DK} strokeWidth={0.9} strokeLinecap="round" opacity={0.4} fill="none">
        <path d="M22 50 C 20 62 21 74 24 82" />
        <path d="M28 49 C 27 62 27 74 28 84" />
        <path d="M34 50 C 36 62 35 74 32 82" />
      </g>

      {/* dangling hind legs with claws */}
      <path d="M20 76 C 16 80 15 84 17 87 M36 76 C 40 80 41 84 39 87" fill="none" stroke="url(#ls-fur)" strokeWidth={6} strokeLinecap="round" />
      <path d="M16 86 c -2 1 -2 3 0 4 M18 87 c -2 1 -3 2 -1 4 M40 86 c 2 1 2 3 0 4 M38 87 c 2 1 3 2 1 4"
        fill="none" stroke={CLAW} strokeWidth={1.2} strokeLinecap="round" />

      {/* head */}
      <ellipse cx="28" cy="42" rx="12" ry="11" fill="url(#ls-face)" />
      {/* signature dark eye-patches running out from the eyes */}
      <path d="M23 31 C 18 36 17 46 21 51 C 24 47 25 38 25 34 Z" fill={MASK} />
      <path d="M33 31 C 38 36 39 46 35 51 C 32 47 31 38 31 34 Z" fill={MASK} />
      {/* eyes */}
      <circle cx="22.6" cy="42" r="2.1" fill={EYE} />
      <circle cx="33.4" cy="42" r="2.1" fill={EYE} />
      <circle cx="23.3" cy="41.3" r="0.6" fill="#fff" opacity={0.85} />
      <circle cx="34.1" cy="41.3" r="0.6" fill="#fff" opacity={0.85} />
      {/* nose + permanent smile */}
      <path d="M25 46 Q28 44.3 31 46 Q29.5 50 28 50 Q26.5 50 25 46 Z" fill={NOSE} />
      <path d="M24.5 51.5 Q28 55.5 31.5 51.5" fill="none" stroke={NOSE} strokeWidth={1.3} strokeLinecap="round" />
    </svg>
  );
}
