'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroGlow } from '@/components/sections/HeroGlow';

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
      <HeroGlow />

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

        {/* Editorial headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif italic font-normal leading-[0.95] tracking-tight text-text-primary"
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem]">
            I find the
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem]">
            problem worth
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem]">
            solving.
          </span>
        </motion.h1>

        {/* Punch line — bold uppercase, animated gradient sweep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 md:mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2"
        >
          <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text-secondary">
            Then
          </span>
          <span className="font-display font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] gradient-text-accent-animated leading-[0.9]">
            ship the fix.
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 md:mt-14 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed"
        >
          Co-Founder of a live iOS app. Owns product, design, and brand end-to-end:
          18-component design system, vector logo, brand voice, motion language. Former
          B2B marketplace PM who scaled vendors 3.75x and doubled GMV at seed stage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
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
