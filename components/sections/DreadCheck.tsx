'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';

type Dread = { n: number; name: string; line: string; color: string };

// The DreadDots ladder, lifted straight from Aatram: five taps from Light to
// Massive, a rose-coded escalation that deliberately breaks to gold at the top.
// The copy is in Aatram's witness voice: it names the obstacle, never inspects
// the person. "Brain says no. Hands can still move." is a canonical app line.
const DREAD: Dread[] = [
  { n: 1, name: 'Light', line: 'Barely there. Name it out loud and it usually folds.', color: '#D9B8BE' },
  { n: 2, name: 'Steady', line: 'Steady weight. Small enough to move before it grows.', color: '#CE9AA4' },
  { n: 3, name: 'Heavy', line: 'Heavy. This is the one you keep quietly rescheduling.', color: '#C57E8C' },
  { n: 4, name: 'Crushing', line: 'Crushing. Not laziness. The task just got loud.', color: '#B85F71' },
  { n: 5, name: 'Massive', line: 'Massive. Brain says no. Hands can still move.', color: '#D8A82E' },
];

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function DreadCheck() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected ? DREAD[selected - 1] : null;

  // Aatram's real motion signature: the higher the dread, the more anxious the
  // card breathes — a faster cycle and a larger swell as the tier climbs.
  const amp = active ? 0.012 + active.n * 0.006 : 0;
  const dur = active ? 3.0 - active.n * 0.34 : 0;

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="max-w-2xl mx-auto">
        <SectionMarker label="The bet, felt" align="center" />

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE }}
          className="mt-6 text-center font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[0.98]"
        >
          Pick the one
          <span className="font-serif italic font-normal lowercase"> you&apos;re avoiding.</span>
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.08, ease: REVEAL_EASE }}
          className="mt-5 text-center text-sm md:text-base text-text-secondary max-w-md mx-auto"
        >
          Procrastination isn&apos;t a discipline problem. It&apos;s a feeling. Tap how heavy yours is
          right now.
        </motion.p>

        {/* DreadDots — the 5-tap emotional ladder, transplanted live from the app. */}
        <div
          role="radiogroup"
          aria-label="How heavy is the thing you are avoiding?"
          className="mt-12 flex items-end justify-center gap-4 sm:gap-7"
        >
          {DREAD.map((d) => {
            const isSel = selected === d.n;
            return (
              <button
                key={d.n}
                role="radio"
                aria-checked={isSel}
                aria-label={`${d.name}, level ${d.n} of 5`}
                onClick={() => setSelected(d.n)}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                <span
                  className="rounded-full transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  style={{
                    width: isSel ? 34 : 20,
                    height: isSel ? 34 : 20,
                    background: d.color,
                    opacity: selected && !isSel ? 0.32 : 1,
                    boxShadow: isSel ? `0 0 0 6px ${d.color}22, 0 8px 24px ${d.color}55` : 'none',
                  }}
                />
                <span
                  className="small-caps transition-colors"
                  style={{ color: isSel ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}
                >
                  {d.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Response card — breathes harder as the dread climbs. */}
        <div className="mt-12 min-h-[7rem] flex items-start justify-center">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.n}
                initial={{ opacity: 0, y: 14 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0, scale: [1, 1 + amp, 1] }
                }
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: { duration: 0.4 },
                  scale: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="w-full max-w-md rounded-2xl border bg-bg-card/60 px-7 py-6 text-center"
                style={{ borderColor: `${active.color}66` }}
              >
                <p
                  className="font-serif italic text-xl md:text-2xl leading-snug"
                  style={{ color: active.n === 5 ? active.color : 'var(--color-text-primary)' }}
                >
                  {active.line}
                </p>
                <p className="small-caps text-text-muted mt-3">
                  {active.name} · level {active.n} of 5
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif italic text-text-muted text-lg pt-4 text-center"
              >
                No score. No streak. Just the feeling, named.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Tie back to the product and the thesis. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE }}
          className="mt-14 border-t border-border-default pt-8 text-center"
        >
          <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto">
            That ladder is a real input from{' '}
            <span className="font-serif italic text-text-primary">Aatram</span>, the iOS app I
            co-founded. The whole product is built to make the next move smaller than the dread, never
            to rank you for feeling it.
          </p>
          <Link
            href="/casestudies/aatram"
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-accent-primary hover:opacity-80 transition-opacity"
          >
            See how it&apos;s built
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
