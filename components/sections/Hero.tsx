'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { CountUp } from '@/components/ui/CountUp';
import { HeroGlow } from '@/components/sections/HeroGlow';
import { MomentumGauge } from '@/components/ui/MomentumGauge';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-20 overflow-hidden bg-bg-primary"
    >
      <HeroGlow />
      {/* Instrument motif — faint MomentumArc ticks behind the headline */}
      <motion.div
        style={{ opacity }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(900px,120vw)] -translate-x-1/2 -translate-y-[58%]"
      >
        <div className="opacity-[0.18] dark:opacity-25">
          <MomentumGauge ticksOnly sweepTick={27} className="w-full h-auto" />
        </div>
      </motion.div>
      <motion.div
        style={{ y, opacity }}
        className="max-w-2xl text-center z-10 flex flex-col items-center"
      >
        {/* Open to work pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-default bg-bg-secondary/40 text-[10px] uppercase tracking-widest text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to roles · May 2026 · Phoenix or remote
          </span>
        </motion.div>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <SectionMarker label="PM who designs" align="center" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.15] mt-10 mb-6 font-normal"
        >
          I find the problem worth solving.
          <br />
          Then <span className="font-display font-bold uppercase not-italic tracking-tight gradient-text-accent">ship the fix.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-text-secondary leading-relaxed max-w-md mb-10"
        >
          Co-Founder of a live iOS app shipped in 7 days. Owns product, design, and brand end-to-end:
          18-component design system, vector logo, brand voice, motion language. Former B2B
          marketplace PM who scaled vendors 3.75x and doubled GMV at seed stage.
        </motion.p>

        {/* Live badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <a
            href="https://apps.apple.com/us/app/aatram/id6760587556"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Aatram · Live on the App Store
          </a>
          <a
            href="https://www.frictionlens.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            FrictionLens · Live at frictionlens.net
          </a>
        </motion.div>

        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-10 md:gap-14"
        >
          {[
            { value: 2, suffix: '', label: 'Products live' },
            { value: 7, suffix: ' days', label: 'First commit to App Store' },
            { value: 2, suffix: 'x', label: 'GMV at seed stage' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl md:text-3xl tabular-nums">
                <CountUp to={item.value} suffix={item.suffix} />
              </span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase text-text-muted">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.p
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] uppercase tracking-widest text-text-muted"
        >
          Scroll
        </motion.p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="gradient-section-fade" aria-hidden="true" />
    </section>
  );
}
