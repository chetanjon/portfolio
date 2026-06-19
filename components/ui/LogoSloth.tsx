// A small three-toed sloth hanging from the "C" of the CJ logo, drawn from a
// real reference: BOTH long arms reach up and hook their claws over the letter,
// and — like a real sloth — the body hangs well below the branch, so the body
// and two dangling clawed legs sit under the logo while the C stays readable
// between the hands and the body. The face is the real sloth face: a tan mask
// with dark brown stripes sweeping up and back from the small eyes, a dark
// muzzle and the permanent smile, with a faint algae-green tint in the fur.
// Original geometry, no marks. Gently sways via .sloth-sway; static under reduced motion.
export function LogoSloth({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const FUR_DK = '#574c3c';
  const FACE = '#d8cdb2';
  const FACE_DK = '#bfae90';
  const MASK = '#574532';
  const MUZZLE = '#b6a583';
  const EYE = '#1f1810';
  const NOSE = '#241c14';
  const CLAW = '#332a20';
  const ALGAE = '#8a9a72';
  return (
    <svg
      viewBox="0 0 60 126"
      width={42}
      height={88}
      className={className}
      style={style}
      role="img"
      aria-label="A small three-toed sloth hanging from the C"
    >
      <defs>
        <linearGradient id="ls-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aaa488" />
          <stop offset="0.5" stopColor="#8d8568" />
          <stop offset="1" stopColor="#6c6552" />
        </linearGradient>
        <linearGradient id="ls-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={FACE} />
          <stop offset="1" stopColor={FACE_DK} />
        </linearGradient>
      </defs>

      {/* both long arms reach up and hook over the branch */}
      <path d="M23 64 C 16 46 18 26 26 13" fill="none" stroke="url(#ls-fur)" strokeWidth={7} strokeLinecap="round" />
      <path d="M37 64 C 44 46 42 26 34 13" fill="none" stroke="url(#ls-fur)" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx="26" cy="13" rx="4" ry="3.6" fill="url(#ls-fur)" />
      <ellipse cx="34" cy="13" rx="4" ry="3.6" fill="url(#ls-fur)" />
      {/* long claws of both hands hooked over the letter */}
      <g fill="none" stroke={CLAW} strokeWidth={1.7} strokeLinecap="round">
        <path d="M23 14 C 21 6 23 3 26 4" />
        <path d="M25.5 13 C 24 5 27 2 29 4" />
        <path d="M28 14 C 27 7 30 5 31 7" />
        <path d="M37 14 C 39 6 37 3 34 4" />
        <path d="M34.5 13 C 36 5 33 2 31 4" />
        <path d="M32 14 C 33 7 30 5 29 7" />
      </g>

      {/* hind legs dangling, with clawed feet */}
      <path d="M23 100 C 18 108 17 117 20 120 M37 100 C 42 108 43 117 40 120" fill="none" stroke="url(#ls-fur)" strokeWidth={6.5} strokeLinecap="round" />
      <g fill="none" stroke={CLAW} strokeWidth={1.3} strokeLinecap="round">
        <path d="M18 119 c -2 1 -2 4 0 5" />
        <path d="M20 120 c -2 1 -2 4 0 5" />
        <path d="M42 119 c 2 1 2 4 0 5" />
        <path d="M40 120 c 2 1 2 4 0 5" />
      </g>

      {/* shaggy body, hanging below the branch */}
      <path
        d="M30 62 C 18 62 14 74 15 86 C 16 100 22 108 30 108 C 38 108 44 100 45 86 C 46 74 42 62 30 62 Z"
        fill="url(#ls-fur)"
      />
      {/* fur tufts + faint algae tint + lighter belly */}
      <path d="M15 82 l -3 4 l 4 -1 M17 98 l -3 4 l 4 -1 M45 82 l 3 4 l -4 -1 M43 98 l 3 4 l -4 -1"
        fill="url(#ls-fur)" />
      <ellipse cx="24" cy="80" rx="7" ry="10" fill={ALGAE} opacity={0.12} />
      <ellipse cx="30" cy="88" rx="9" ry="13" fill="url(#ls-face)" opacity={0.4} />
      <g stroke={FUR_DK} strokeWidth={0.9} strokeLinecap="round" opacity={0.35} fill="none">
        <path d="M24 70 C 22 82 23 96 26 106" />
        <path d="M30 69 C 29 82 29 96 30 107" />
        <path d="M36 70 C 38 82 37 96 34 106" />
      </g>

      {/* head */}
      <ellipse cx="30" cy="62" rx="13.5" ry="12.5" fill="url(#ls-face)" />
      {/* big soft dark eye-patches, only slightly angled (rounded, not spiky) */}
      <ellipse cx="22.6" cy="58" rx="4.3" ry="3.5" fill={MASK} transform="rotate(-16 22.6 58)" />
      <ellipse cx="37.4" cy="58" rx="4.3" ry="3.5" fill={MASK} transform="rotate(16 37.4 58)" />
      {/* big sleepy eyes */}
      <circle cx="22.9" cy="58.7" r="2.2" fill={EYE} />
      <circle cx="37.1" cy="58.7" r="2.2" fill={EYE} />
      <circle cx="23.7" cy="57.8" r="0.75" fill="#fff" opacity={0.9} />
      <circle cx="37.9" cy="57.8" r="0.75" fill="#fff" opacity={0.9} />
      {/* small heart-shaped nose */}
      <path d="M27.6 63 Q30 61.9 32.4 63 Q31.5 65.6 30 66.6 Q28.5 65.6 27.6 63 Z" fill={NOSE} />
      {/* big gentle smile */}
      <path d="M24.3 67.5 Q30 73.2 35.7 67.5" fill="none" stroke={NOSE} strokeWidth={1.3} strokeLinecap="round" />
    </svg>
  );
}
