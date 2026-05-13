'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CornerDownRight } from 'lucide-react';

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
      className="relative w-full min-h-screen overflow-hidden bg-bg-primary flex flex-col"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-[1500px] w-full mx-auto px-6 md:px-10 pt-32 pb-32"
      >
        {/* Open-to-work pill — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-default bg-bg-secondary/40 text-[10px] uppercase tracking-widest text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to product roles · Available now
          </span>
        </motion.div>

        {/* Editorial headline — italic serif, three short lines stacked */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display-serif italic font-normal leading-[0.95] tracking-tight"
          style={{ fontVariationSettings: "'opsz' 72" }}
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] gloss-serif">
            I find the
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] gloss-serif">
            problem worth
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] gloss-serif">
            solving.
          </span>
        </motion.h1>

        {/* Punch line — italic "Then" + bold uppercase prism gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 md:mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2"
        >
          <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text-secondary">
            Then
          </span>
          <span className="font-display font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] gradient-text-prism leading-[0.9]">
            ship it end to end.
          </span>
        </motion.div>

        {/* The receipts — short proof callout + italic blurb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 md:mt-16 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.28em] text-text-muted">
            <CornerDownRight className="w-3.5 h-3.5" />
            The receipts
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-tight text-text-primary mb-4">
            Two products live.{' '}
            <span style={{ color: 'var(--color-accent-soft)' }}>Three</span>{' '}
            more in flight.{' '}
            <span style={{ color: 'var(--color-accent-secondary)' }}>One</span>{' '}
            PM.
          </p>
          <p className="font-serif italic text-text-secondary text-base md:text-lg leading-relaxed">
            Co-founded Aatram (live on the App Store). Doubled GMV at a seed-stage B2B
            marketplace. 3.75× vendor growth in 18 months.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-accent-on text-xs uppercase tracking-widest font-medium hover:opacity-85 transition-opacity"
          >
            View work
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/craft"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-default text-text-primary text-xs uppercase tracking-widest font-medium hover:border-text-primary transition-colors"
          >
            See the craft
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom rail: live products + a single proof chip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        style={{ opacity }}
        className="relative z-10 max-w-[1500px] w-full mx-auto px-6 md:px-10 pb-16 md:pb-20"
      >
        <div className="pt-6 border-t border-border-default flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
          </div>
          <span className="text-[10px] md:text-xs tracking-widest uppercase text-text-muted">
            <span className="font-serif italic text-text-secondary normal-case text-sm md:text-base mr-2">3.75x</span>
            vendors · 2x GMV at seed stage
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <motion.p
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[9px] uppercase tracking-widest text-text-muted"
        >
          Scroll
        </motion.p>
      </motion.div>

      <div className="gradient-section-fade" aria-hidden="true" />
    </section>
  );
}
