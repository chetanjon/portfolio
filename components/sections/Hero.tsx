'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, CornerDownRight } from 'lucide-react';
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
        className="relative z-10 flex-1 flex flex-col max-w-[1500px] w-full mx-auto px-6 md:px-10 pt-32 pb-12"
      >
        {/* Meta row — Issue / Open to roles */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between text-[11px] md:text-xs uppercase tracking-[0.28em] text-text-muted"
        >
          <p>Issue 01 — May 2026</p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to roles
          </p>
        </motion.div>

        {/* Editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 md:mt-24"
        >
          {/* Italic lead-in */}
          <p className="font-serif italic font-normal text-text-primary text-3xl sm:text-4xl md:text-5xl leading-tight">
            Hi, I&apos;m CJ.
          </p>
          <p className="font-serif italic font-normal text-text-primary text-3xl sm:text-4xl md:text-5xl leading-tight mt-1">
            Most PMs ship{' '}
            <span className="relative inline-block">
              decks
              <span
                aria-hidden
                className="absolute left-[-6%] right-[-6%] top-[58%] h-[4px] md:h-[6px] rounded-sm pointer-events-none"
                style={{
                  backgroundColor: '#C9929B',
                  transform: 'rotate(-2deg) translateY(-50%)',
                  transformOrigin: 'center',
                }}
              />
            </span>
            .
          </p>

          {/* Huge punch line — I SHIP / APPS. */}
          <div className="mt-10 md:mt-14 font-display font-black uppercase tracking-tight leading-[0.88]">
            <p className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] text-text-primary">
              I Ship
            </p>
            <p
              className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] gradient-text-glossy mt-1 md:mt-3 md:pl-12 lg:pl-24"
            >
              Apps.
            </p>
          </div>
        </motion.div>

        {/* The receipts — right-offset block with highlighted callouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 md:mt-20 md:ml-auto md:max-w-xl"
        >
          <div className="flex items-center gap-2 mb-4 text-[11px] md:text-xs uppercase tracking-[0.28em] text-text-muted">
            <CornerDownRight className="w-3.5 h-3.5" />
            The receipts
          </div>
          <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed">
            Co-founded{' '}
            <strong className="font-display font-semibold not-italic text-text-primary">
              Aatram
            </strong>
            , live on the App Store. Solo-built{' '}
            <strong className="font-display font-semibold not-italic text-text-primary">
              FrictionLens
            </strong>
            , an AI review analyzer live at frictionlens.net. Grew an Indian B2B marketplace{' '}
            <span
              className="font-display font-bold not-italic"
              style={{ color: 'var(--color-accent-soft)' }}
            >
              3.75× vendors, 2× GMV
            </span>{' '}
            at seed stage.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom row — View work · Scroll · Page number */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ opacity }}
        className="relative z-10 max-w-[1500px] w-full mx-auto px-6 md:px-10 pb-10 md:pb-12"
      >
        <div className="border-t border-border-default pt-6 grid grid-cols-3 items-center gap-4">
          <Link
            href="/work"
            className="group flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.25em] font-medium text-text-primary justify-self-start"
          >
            <span className="relative">
              View work
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-text-primary transition-transform duration-300 group-hover:scale-x-110 origin-left" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center text-text-muted justify-self-center"
            aria-label="Scroll"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>

          <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-text-muted justify-self-end text-right">
            P. 01 —{' '}
            <span className="text-text-primary normal-case tracking-normal">
              chetanjonnalagadda.com
            </span>
          </p>
        </div>
      </motion.div>

      <div className="gradient-section-fade" aria-hidden="true" />
    </section>
  );
}
