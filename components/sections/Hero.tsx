'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type LiveRow = {
  count: string;
  platform: string;
  recognition: string;
  year: string;
  href: string;
  external: boolean;
};

const liveRows: LiveRow[] = [
  {
    count: '7 days',
    platform: 'Aatram',
    recognition: 'Consumer iOS app · Live on the App Store',
    year: '2026',
    href: 'https://apps.apple.com/us/app/aatram/id6760587556',
    external: true,
  },
  {
    count: '1 wknd',
    platform: 'FrictionLens',
    recognition: 'AI review intelligence · Live at frictionlens.net',
    year: '2026',
    href: 'https://www.frictionlens.net/',
    external: true,
  },
  {
    count: '2× GMV',
    platform: 'IKT India',
    recognition: 'B2B handloom marketplace · 20 → 75 vendors',
    year: '2024',
    href: '/work/ikt-india',
    external: false,
  },
];

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgNumY = useTransform(scrollYProgress, [0, 1], ['-6%', '14%']);
  const safeBgNumY: MotionValue<string> | string = reduceMotion ? '0%' : bgNumY;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bg-primary"
    >
      {/* Giant parallax background numeral — anchors the "three live builds" claim. */}
      <motion.div
        aria-hidden
        style={{ y: safeBgNumY }}
        className="pointer-events-none select-none absolute top-0 right-0 font-display font-bold leading-none text-[18rem] sm:text-[24rem] md:text-[32rem] lg:text-[40rem] text-bg-secondary opacity-60 -mt-12 -mr-12 md:-mr-20"
      >
        3
      </motion.div>

      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-6 md:px-10 pt-32 md:pt-36 pb-24 md:pb-28">
        {/* Masthead band — datestamp · open-to-work pill.
            The global header already carries the wordmark, so a second
            "Chetan Jonnalagadda" here was redundant. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 pb-8 md:pb-10 border-b border-border-default"
        >
          <span className="small-caps text-text-muted">
            Issue 03 · 2026
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/40 bg-accent-primary/10 text-[11px] md:text-xs uppercase tracking-[0.22em] font-medium text-accent-primary max-w-full whitespace-normal">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              <span className="sr-only">Status: available</span>
            </span>
            Open to product + design roles · Anywhere
          </span>
        </motion.div>

        {/* Awards-style two-column: header left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-16 md:mt-20">
          {/* Left: title block */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: REVEAL_EASE }}
            className="lg:col-span-5"
          >
            <h1 className="font-display font-bold tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem]">
              Shipped &amp;
              <br />
              <span className="font-serif italic font-normal lowercase">available.</span>
            </h1>

            <p className="small-caps text-text-muted leading-relaxed mt-8 md:mt-10 max-w-md">
              Product manager. Engineering training, designer&rsquo;s eye.
            </p>
          </motion.div>

          {/* Right: compact horizontal list — Awards grammar */}
          <div className="lg:col-span-7 flex flex-col justify-end min-w-0">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-widest text-right max-w-xs ml-auto mb-10 text-text-muted"
            >
              Three live builds. Two B2B marketplaces. One hire-me window.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: REVEAL_EASE }}
              className="origin-left h-px bg-border-default"
            />

            <ul className="space-y-0">
              {liveRows.map((row, i) => {
                const linkProps = row.external
                  ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                  : {};
                const Wrapper = row.external ? 'a' : Link;
                return (
                  <motion.li
                    key={row.platform}
                    initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: REVEAL_EASE }}
                    className="border-b border-border-default"
                  >
                    <Wrapper
                      href={row.href}
                      {...linkProps}
                      aria-label={`${row.platform}: ${row.recognition} (${row.year})${row.external ? '. Opens in a new tab.' : ''}`}
                      className="group block py-5 md:py-6 hover:pl-3 transition-all duration-300"
                    >
                      {/* Mobile: two-line stack — count + platform + arrow on top,
                          description below. Desktop (sm+): everything single-line. */}
                      <div className="flex items-center gap-3 sm:gap-5 text-[11px] md:text-xs uppercase tracking-wide">
                        <span className="w-20 sm:w-24 flex-shrink-0 font-display font-bold text-base md:text-lg text-accent-primary tabular-nums">
                          {row.count}
                        </span>
                        <span className="flex-1 sm:flex-initial sm:w-36 min-w-0 font-display font-bold text-text-primary truncate">
                          {row.platform}
                        </span>
                        <span className="hidden sm:block flex-1 min-w-0 text-text-muted group-hover:text-text-primary transition-colors normal-case tracking-normal text-xs md:text-sm font-serif italic truncate">
                          {row.recognition}
                        </span>
                        <span className="hidden sm:inline-block w-12 text-right text-text-muted tabular-nums">
                          {row.year}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                      </div>
                      <p className="sm:hidden mt-2 ml-[5.75rem] text-xs text-text-muted group-hover:text-text-primary transition-colors normal-case tracking-normal font-serif italic">
                        {row.recognition} <span className="text-text-muted/70">· {row.year}</span>
                      </p>
                    </Wrapper>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7 }}
              className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-4"
            >
              <p className="small-caps text-text-muted">
                Each number is one user story, one decision, one shipped build.
              </p>
              <a
                href="mailto:jonnalagadda8800@gmail.com?subject=Product%20role%20%E2%80%94%20intro"
                aria-label="Email Chetan about a product or design role"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-accent-on text-xs uppercase tracking-widest font-medium hover:opacity-85 transition-opacity"
              >
                Email me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
