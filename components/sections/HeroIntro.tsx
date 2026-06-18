'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CafeRacer } from '@/components/ui/CafeRacer';
import { RecordPlayer } from '@/components/ui/RecordPlayer';
import { createEngine, type Engine } from '@/lib/engineAudio';

const SESSION_KEY = 'hero-bike-shown';
const BIKE_W = 150;
const BIKE_H = (132 / 240) * BIKE_W; // ~82.5, preserves the SVG aspect

// The bike parks in the left band of the hero, clear of the top-right pill and
// the prism numeral. Horizontal position is section-relative.
const PARK_LEFT = 'clamp(20px, 20vw, 320px)';

export function HeroIntro({
  sectionRef,
  anchorRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const [roadY, setRoadY] = useState<number | null>(null);
  const [driving, setDriving] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const engineRef = useRef<Engine | null>(null);

  // Measure the divider line (the masthead's bottom border) so the bike's wheels
  // sit exactly on it.
  useEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const anc = anchorRef.current;
      if (!sec || !anc) return;
      setRoadY(anc.getBoundingClientRect().bottom - sec.getBoundingClientRect().top);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [sectionRef, anchorRef]);

  // Silent drive-in, once per session (skipped under reduced motion).
  useEffect(() => {
    if (reduceMotion) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* private mode — just play it */
    }
    if (shown) return;
    setDriving(true);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* noop */
    }
    const t = setTimeout(() => setDriving(false), 2600);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  // Tear down audio on unmount.
  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  // Cut the engine if the tab goes to the background.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && audioOn) {
        engineRef.current?.stop();
        setAudioOn(false);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [audioOn]);

  const toggleAudio = () => {
    if (audioOn) {
      engineRef.current?.stop();
      setAudioOn(false);
      return;
    }
    try {
      if (!engineRef.current) engineRef.current = createEngine();
      engineRef.current?.start();
      engineRef.current?.rev();
    } catch {
      /* visuals still work without audio */
    }
    setAudioOn(true);
    if (!reduceMotion) {
      // brief visual rev: spin the wheels + smoke for a beat
      setDriving(true);
      setTimeout(() => setDriving(false), 1100);
    }
  };

  const active = driving || audioOn;
  const spinning = active && !reduceMotion;
  const rpLeft = `calc(${PARK_LEFT} + ${BIKE_W + 18}px)`;

  if (roadY === null) {
    // Render nothing until measured; placement is otherwise a guess.
    return <div className="hidden" />;
  }

  return (
    <div className="hidden sm:block">
      {/* Bike layer — behind the headline text (z-5), clipped by the section */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute"
          style={{ top: roadY - BIKE_H * 0.92, left: PARK_LEFT, width: BIKE_W, height: BIKE_H }}
          initial={reduceMotion ? false : { x: -1400 }}
          animate={{ x: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-full w-full">
            <CafeRacer spinning={spinning} className="h-full w-full text-text-primary" />
            {active && !reduceMotion && (
              <div className="absolute" style={{ left: BIKE_W * 0.1, top: BIKE_H * 0.72 }}>
                {[14, 18, 15, 20, 16].map((size, i) => (
                  <span
                    key={i}
                    className="cr-smoke absolute block rounded-full"
                    style={{
                      width: size,
                      height: size,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                      background:
                        'radial-gradient(circle, rgba(120,120,132,0.7), rgba(120,120,132,0.18) 55%, rgba(120,120,132,0))',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Record-player control — above content (z-20) so it stays clickable */}
      <div className="pointer-events-auto absolute z-20" style={{ top: roadY - 26, left: rpLeft }}>
        <RecordPlayer on={audioOn} onToggle={toggleAudio} />
      </div>
    </div>
  );
}
