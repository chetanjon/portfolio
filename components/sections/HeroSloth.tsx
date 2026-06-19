'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const W = 76;
const H = (120 / 96) * W; // ~95, preserves the SVG aspect

// A hand-drawn three-toed sloth hanging by its claws (license-clean, themeable).
// Shaggy greyish-brown fur, the signature dark eye-mask, small dark eyes, flat
// nose, gentle smile, and long curved claws. This is the default; drop a premium
// LottieFiles sloth at /public/lottie/sloth.json and it takes over automatically.
function SlothSvg({ className }: { className?: string }) {
  const FUR = '#8a7c67';
  const FUR_DK = '#6f6353';
  const FACE = '#c8b99d';
  const MASK = '#564636';
  const EYE = '#241c14';
  const NOSE = '#2a2118';
  const CLAW = '#3a3025';
  return (
    <svg viewBox="0 0 96 120" width={W} height={H} className={className} role="img" aria-label="A three-toed sloth hanging from the line">
      <defs>
        <linearGradient id="sl-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a89a82" />
          <stop offset="0.55" stopColor="#8a7c67" />
          <stop offset="1" stopColor="#6c6051" />
        </linearGradient>
        <linearGradient id="sl-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdbea2" />
          <stop offset="1" stopColor="#b09f84" />
        </linearGradient>
      </defs>

      {/* long arms reaching up to the branch */}
      <path d="M37 60 C 29 44 33 24 46 15" fill="none" stroke={FUR} strokeWidth={9} strokeLinecap="round" />
      <path d="M59 60 C 67 44 63 24 50 15" fill="none" stroke={FUR} strokeWidth={9} strokeLinecap="round" />
      <path d="M37 60 C 30 45 33 27 45 18" fill="none" stroke={FUR_DK} strokeWidth={2} strokeLinecap="round" opacity={0.5} />

      {/* shaggy body */}
      <path
        d="M33 66 C 30 53 40 48 48 48 C 56 48 66 53 63 66 C 68 84 63 104 48 110 C 33 104 28 84 33 66 Z"
        fill="url(#sl-fur)"
      />
      {/* fur tufts along the edges */}
      <path d="M31 70 l -3 4 l 4 -1 M34 92 l -3 5 l 4 -1 M48 110 l -2 5 l 4 -1 l 0 4 l 3 -4 M63 70 l 3 4 l -4 -1 M62 92 l 3 5 l -4 -1"
        fill="url(#sl-fur)" />
      {/* algae tint on the back + belly + fur strokes */}
      <ellipse cx="40" cy="64" rx="11" ry="9" fill="#8a9a72" opacity={0.16} />
      <ellipse cx="48" cy="82" rx="12" ry="17" fill="url(#sl-face)" opacity={0.55} />
      <g stroke={FUR_DK} strokeWidth={1} strokeLinecap="round" opacity={0.4} fill="none">
        <path d="M40 60 C 38 72 39 88 43 100" />
        <path d="M48 58 C 47 74 47 90 48 104" />
        <path d="M56 60 C 58 72 57 88 53 100" />
      </g>

      {/* tucked hind legs with claws */}
      <path d="M36 96 C 30 94 27 90 28 86" fill="none" stroke={FUR} strokeWidth={7} strokeLinecap="round" />
      <path d="M60 96 C 66 94 69 90 68 86" fill="none" stroke={FUR} strokeWidth={7} strokeLinecap="round" />
      <path d="M27 88 c -2 -3 -1 -6 1 -6 M29 90 c -3 -2 -3 -5 -1 -6 M69 88 c 2 -3 1 -6 -1 -6 M67 90 c 3 -2 3 -5 1 -6"
        fill="none" stroke={CLAW} strokeWidth={1.6} strokeLinecap="round" />

      {/* head */}
      <ellipse cx="48" cy="46" rx="16" ry="14.5" fill="url(#sl-face)" />
      {/* dark eye-mask stripes */}
      <path d="M42 33 C 37 39 36 49 40 55 C 43 51 44 41 45 35 Z" fill={MASK} />
      <path d="M54 33 C 59 39 60 49 56 55 C 53 51 52 41 51 35 Z" fill={MASK} />
      {/* eyes */}
      <circle cx="41" cy="46" r="2.6" fill={EYE} />
      <circle cx="55" cy="46" r="2.6" fill={EYE} />
      <circle cx="42" cy="45.2" r="0.8" fill="#fff" opacity={0.8} />
      <circle cx="56" cy="45.2" r="0.8" fill="#fff" opacity={0.8} />
      {/* flat nose */}
      <path d="M44 51 Q48 49.5 52 51 Q50.5 55.5 48 55.5 Q45.5 55.5 44 51 Z" fill={NOSE} />
      {/* gentle smile */}
      <path d="M43 58 Q48 62.5 53 58" fill="none" stroke={NOSE} strokeWidth={1.5} strokeLinecap="round" />

      {/* long front claws hooking over the branch */}
      <g fill="none" stroke={CLAW} strokeWidth={2.4} strokeLinecap="round">
        <path d="M44 17 C 41 9 43 4 47 5" />
        <path d="M47 16 C 44 8 47 3 50 5" />
        <path d="M50 16 C 48 8 51 4 53 6" />
      </g>
    </svg>
  );
}

type LottieMod = { default: ComponentType<{ animationData: unknown; loop?: boolean; autoplay?: boolean; style?: React.CSSProperties }> };

export function HeroSloth({
  sectionRef,
  branchRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  branchRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [branch, setBranch] = useState<{ y: number; grips: number[] } | null>(null);
  const [lottie, setLottie] = useState<{ Comp: LottieMod['default']; data: unknown } | null>(null);
  const curX = useRef(0);

  // Measure the divider line + two hand-grip positions along it (left band,
  // clear of the top-right status pill).
  useEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const br = branchRef.current;
      if (!sec || !br) return;
      const s = sec.getBoundingClientRect();
      const b = br.getBoundingClientRect();
      const left = b.left - s.left;
      setBranch({
        y: b.bottom - s.top,
        grips: [left + b.width * 0.07, left + b.width * 0.22, left + b.width * 0.38],
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [sectionRef, branchRef]);

  // Upgrade to a premium Lottie if one is present (lazy — lottie-web only loads
  // when /lottie/sloth.json exists, so the default path stays light).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/lottie/sloth.json');
        if (!res.ok) return;
        const data = (await res.json()) as { layers?: unknown[] };
        // The shipped placeholder is `{}` (no layers) -> keep the SVG sloth.
        // A real LottieFiles export has a `layers` array and takes over.
        if (!data || !Array.isArray(data.layers) || data.layers.length === 0) return;
        const mod = (await import('lottie-react')) as unknown as LottieMod;
        if (alive) setLottie({ Comp: mod.default, data });
      } catch {
        /* keep the SVG sloth */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const containerXForGrip = useCallback((gripX: number) => gripX - W / 2, []);

  // A proper brachiation swing: release, the body swoops DOWN and across in a
  // pendulum arc (pivoting from the hands at the top), reaches the next grip,
  // and settles with a small wobble. The deep dip + lean is what reads as a
  // swing instead of a slide.
  const swingTo = useCallback(
    (gripX: number) => {
      const toX = containerXForGrip(gripX);
      if (reduceMotion) {
        controls.set({ x: toX, y: 0, rotate: 0 });
        curX.current = toX;
        return;
      }
      const fromX = curX.current;
      const midX = (fromX + toX) / 2;
      const dir = toX >= fromX ? 1 : -1;
      const reach = Math.max(38, Math.min(64, Math.abs(toX - fromX) * 0.42)); // arc depth scales with hop
      void controls.start({
        x: [fromX, fromX, midX, toX, toX],
        y: [0, 6, reach, 6, 0],
        rotate: [0, -13 * dir, 9 * dir, -5 * dir, 0],
        transition: { duration: 1.0, ease: 'easeInOut', times: [0, 0.12, 0.5, 0.84, 1] },
      });
      curX.current = toX;
    },
    [controls, reduceMotion, containerXForGrip]
  );

  // Place at the first grip, then swing hand-over-hand back and forth.
  useEffect(() => {
    if (!branch) return;
    curX.current = containerXForGrip(branch.grips[0]);
    controls.set({ x: curX.current, y: 0, rotate: 0 });
    if (reduceMotion) return;
    let idx = 0;
    let dir = 1;
    const id = setInterval(() => {
      idx += dir;
      if (idx >= branch.grips.length) {
        idx = branch.grips.length - 2;
        dir = -1;
      } else if (idx < 0) {
        idx = 1;
        dir = 1;
      }
      swingTo(branch.grips[idx]);
    }, 3600);
    return () => clearInterval(id);
  }, [branch, reduceMotion, controls, swingTo, containerXForGrip]);

  if (!branch) return <div className="hidden" />;

  const inner = lottie ? (
    <lottie.Comp animationData={lottie.data} loop autoplay style={{ width: W, height: H }} />
  ) : (
    <SlothSvg className={reduceMotion ? undefined : 'sloth-sway'} />
  );

  return (
    <div className="hidden sm:block">
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute"
          style={{ top: branch.y - 6, left: 0, width: W, height: H, transformOrigin: 'top center' }}
          initial={false}
          animate={controls}
        >
          {inner}
        </motion.div>
      </div>
    </div>
  );
}
