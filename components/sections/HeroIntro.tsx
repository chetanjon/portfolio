'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { CafeRacer } from '@/components/ui/CafeRacer';
import { RecordPlayer } from '@/components/ui/RecordPlayer';
import { createEngine, type Engine } from '@/lib/engineAudio';

const BIKE_W = 215;
const BIKE_H = (160 / 340) * BIKE_W; // ~101, preserves the SVG aspect
const WHEEL_BOTTOM = 155.5 / 160; // where the tires sit within the SVG box

// Parks in the left band of the hero, clear of the top-right pill + prism numeral.
const PARK_LEFT = 'clamp(28px, 26vw, 420px)';

export function HeroIntro({
  sectionRef,
  anchorRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const [roadY, setRoadY] = useState<number | null>(null);
  const [driving, setDriving] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const engineRef = useRef<Engine | null>(null);

  // Measure the divider line (the masthead's bottom border) so the tires sit on it.
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

  // Drive in from off-screen left and decelerate to a stop on the line.
  const driveIn = useCallback(async () => {
    if (reduceMotion) {
      controls.set({ x: 0 });
      return;
    }
    setDriving(true);
    controls.set({ x: -1400 });
    try {
      await controls.start({ x: 0, transition: { duration: 2.0, ease: [0.33, 1, 0.68, 1] } });
    } catch {
      /* interrupted */
    }
    setDriving(false);
  }, [controls, reduceMotion]);

  // Run the drive-in on every load, once the line is measured. A short delay
  // lets the page settle first so the entrance is actually seen (not finished
  // during hydration).
  const drivenRef = useRef(false);
  useEffect(() => {
    if (roadY === null || drivenRef.current) return;
    drivenRef.current = true;
    const t = setTimeout(() => void driveIn(), 550);
    return () => clearTimeout(t);
  }, [roadY, driveIn]);

  // Tear down audio on unmount.
  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  // Cut the engine when the tab goes to the background.
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
    setAudioOn(true); // engine running -> wheels keep spinning + smoke (idle)
  };

  // Wheels spin + smoke whenever the bike is "running": during the drive-in,
  // or while the engine SFX is on.
  const active = driving || audioOn;
  const spinning = active && !reduceMotion;
  const rpLeft = `calc(${PARK_LEFT} + ${BIKE_W + 18}px)`;

  if (roadY === null) return <div className="hidden" />;

  return (
    <div className="hidden sm:block">
      {/* Bike layer — behind the headline text (z-5), clipped by the section */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute"
          style={{ top: roadY - BIKE_H * WHEEL_BOTTOM, left: PARK_LEFT, width: BIKE_W, height: BIKE_H }}
          initial={reduceMotion ? { x: 0 } : { x: -1400 }}
          animate={controls}
        >
          <div className="relative h-full w-full">
            <CafeRacer spinning={spinning} className="h-full w-full text-text-primary" />
            {active && !reduceMotion && (
              <div className="absolute" style={{ left: BIKE_W * 0.09, top: BIKE_H * 0.72 }}>
                {[16, 20, 17, 22, 18].map((size, i) => (
                  <span
                    key={i}
                    className="cr-smoke absolute block rounded-full"
                    style={{
                      width: size,
                      height: size,
                      marginLeft: -size / 2,
                      marginTop: -size / 2,
                      background:
                        'radial-gradient(circle, rgba(120,120,132,0.72), rgba(120,120,132,0.18) 55%, rgba(120,120,132,0))',
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
