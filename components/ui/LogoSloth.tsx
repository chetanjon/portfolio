// A small three-toed sloth hanging from the "C" of the CJ logo. One hand grips
// the letter (claws hooked over it so it reads as attached); the other arm
// hangs down holding a leafy twig. Shaggy grey-brown fur, the signature tan
// face with dark eye-patches and a permanent smile. Original geometry, no marks.
// Gently sways via the .sloth-sway class; static under reduced motion.
export function LogoSloth({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const FUR_DK = '#5f5444';
  const FACE = '#d6c8ae';
  const MASK = '#574733';
  const EYE = '#241c14';
  const NOSE = '#221a12';
  const CLAW = '#332a20';
  const STICK = '#6e5a3e';
  const LEAF = '#7e9d5c';
  const LEAF_DK = '#5f7d44';
  return (
    <svg
      viewBox="0 0 58 116"
      width={38}
      height={76}
      className={className}
      style={style}
      role="img"
      aria-label="A small sloth hanging from the C, holding a leafy twig"
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

      {/* gripping arm — reaches up and hooks onto the letter */}
      <path d="M34 56 C 40 40 37 22 31 13" fill="none" stroke="url(#ls-fur)" strokeWidth={7.5} strokeLinecap="round" />
      <ellipse cx="30" cy="13" rx="4.6" ry="4" fill="url(#ls-fur)" />
      {/* long claws hooked over the stroke so the hand looks attached */}
      <g fill="none" stroke={CLAW} strokeWidth={1.9} strokeLinecap="round">
        <path d="M26 13 C 24 5 26 1 29 2" />
        <path d="M29 12 C 27 4 30 0 32 2" />
        <path d="M32 13 C 31 5 34 3 36 5" />
      </g>

      {/* hind feet — short, tucked, with claws */}
      <path d="M19 84 C 15 88 15 93 18 94 M37 84 C 41 88 41 93 38 94" fill="none" stroke="url(#ls-fur)" strokeWidth={5.5} strokeLinecap="round" />
      <path d="M17 93 c -2 1 -2 3 0 4 M39 93 c 2 1 2 3 0 4" fill="none" stroke={CLAW} strokeWidth={1.2} strokeLinecap="round" />

      {/* shaggy body */}
      <path
        d="M28 46 C 17 46 13 56 14 66 C 15 81 21 90 28 90 C 35 90 41 81 42 66 C 43 56 39 46 28 46 Z"
        fill="url(#ls-fur)"
      />
      <path d="M14 62 l -3 4 l 4 -1 M16 78 l -3 4 l 4 -1 M42 62 l 3 4 l -4 -1 M40 78 l 3 4 l -4 -1"
        fill="url(#ls-fur)" />
      <ellipse cx="28" cy="68" rx="9" ry="13" fill="url(#ls-face)" opacity={0.42} />
      <g stroke={FUR_DK} strokeWidth={0.9} strokeLinecap="round" opacity={0.38} fill="none">
        <path d="M23 54 C 21 66 22 78 25 87" />
        <path d="M28 53 C 27 66 27 78 28 88" />
        <path d="M33 54 C 35 66 34 78 31 87" />
      </g>

      {/* free arm hanging down, holding the twig */}
      <path d="M21 54 C 16 66 15 80 18 91" fill="none" stroke="url(#ls-fur)" strokeWidth={6.5} strokeLinecap="round" />
      <ellipse cx="18" cy="91" rx="4" ry="3.6" fill="url(#ls-fur)" />
      {/* leafy twig */}
      <path d="M23 84 L 11 110" fill="none" stroke={STICK} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M17 96 L 23 100" fill="none" stroke={STICK} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M23 84 C 26 79 31 78 35 80 C 32 84 27 86 23 84 Z" fill={LEAF} />
      <path d="M23 100 C 26 99 30 101 31 105 C 27 106 24 104 23 100 Z" fill={LEAF} />
      <path d="M11 110 C 8 109 6 111 6 114 C 9 114 12 113 11 110 Z" fill={LEAF} />
      <g stroke={LEAF_DK} strokeWidth={0.6} strokeLinecap="round" fill="none">
        <path d="M24 83 L 32 80" />
        <path d="M24 101 L 29 104" />
      </g>

      {/* head */}
      <ellipse cx="28" cy="46" rx="12" ry="11" fill="url(#ls-face)" />
      {/* signature dark eye-patches */}
      <path d="M23 35 C 18 40 17 50 21 55 C 24 51 25 42 25 38 Z" fill={MASK} />
      <path d="M33 35 C 38 40 39 50 35 55 C 32 51 31 42 31 38 Z" fill={MASK} />
      {/* eyes */}
      <circle cx="22.6" cy="46" r="2.1" fill={EYE} />
      <circle cx="33.4" cy="46" r="2.1" fill={EYE} />
      <circle cx="23.3" cy="45.3" r="0.6" fill="#fff" opacity={0.85} />
      <circle cx="34.1" cy="45.3" r="0.6" fill="#fff" opacity={0.85} />
      {/* nose + permanent smile */}
      <path d="M25 50 Q28 48.3 31 50 Q29.5 54 28 54 Q26.5 54 25 50 Z" fill={NOSE} />
      <path d="M24.5 55.5 Q28 59.5 31.5 55.5" fill="none" stroke={NOSE} strokeWidth={1.3} strokeLinecap="round" />
    </svg>
  );
}
