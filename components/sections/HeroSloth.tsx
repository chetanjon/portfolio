'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const W = 72;
const H = (104 / 88) * W; // ~85, preserves the SVG aspect

// A cute, hand-drawn hanging sloth (license-clean, themeable). This is the
// default; drop a premium LottieFiles sloth at /public/lottie/sloth.json and it
// takes over automatically.
function SlothSvg({ className }: { className?: string }) {
  const BODY = '#9a8c79';
  const CREAM = '#dad0be';
  const DARK = '#463c32';
  return (
    <svg viewBox="0 0 88 104" width={W} height={H} className={className} role="img" aria-label="A sloth hanging from the line">
      {/* arms reaching up to grip the branch */}
      <path d="M34 50 C 26 36 30 18 41 10" fill="none" stroke={BODY} strokeWidth={8} strokeLinecap="round" />
      <path d="M54 50 C 62 36 58 18 47 10" fill="none" stroke={BODY} strokeWidth={8} strokeLinecap="round" />
      {/* little claws hooking over */}
      <path d="M38 11 q 3 -4 6 -1 M44 11 q 3 -4 6 -1" fill="none" stroke={DARK} strokeWidth={2} strokeLinecap="round" />

      {/* body + belly */}
      <ellipse cx="44" cy="70" rx="18" ry="22" fill={BODY} />
      <ellipse cx="44" cy="72" rx="12" ry="16" fill={CREAM} />
      {/* feet */}
      <ellipse cx="37" cy="90" rx="5" ry="4" fill={BODY} />
      <ellipse cx="51" cy="90" rx="5" ry="4" fill={BODY} />
      <path d="M34 92 q 2 3 5 2 M48 92 q 2 3 5 2" fill="none" stroke={DARK} strokeWidth={1.6} strokeLinecap="round" />

      {/* head */}
      <circle cx="44" cy="46" r="17" fill={CREAM} />
      {/* signature dark eye-stripes */}
      <ellipse cx="38" cy="48" rx="4.6" ry="9" fill={DARK} transform="rotate(-18 38 48)" />
      <ellipse cx="50" cy="48" rx="4.6" ry="9" fill={DARK} transform="rotate(18 50 48)" />
      {/* sleepy eyes */}
      <path d="M35 49 q 3 2.2 6 0 M47 49 q 3 2.2 6 0" fill="none" stroke={CREAM} strokeWidth={1.6} strokeLinecap="round" />
      {/* nose + smile */}
      <ellipse cx="44" cy="54.5" rx="2.6" ry="2" fill={DARK} />
      <path d="M40 58 q 4 4 8 0" fill="none" stroke={DARK} strokeWidth={1.6} strokeLinecap="round" />
      {/* cheek blush — a tiny brand-lavender touch */}
      <circle cx="33" cy="55" r="2.2" fill="#B8A9D4" opacity={0.5} />
      <circle cx="55" cy="55" r="2.2" fill="#B8A9D4" opacity={0.5} />
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
