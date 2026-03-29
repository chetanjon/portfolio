'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

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
      <motion.div
        style={{ y, opacity }}
        className="max-w-2xl text-center z-10 flex flex-col items-center"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionMarker label="Product Manager" align="center" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.15] mt-10 mb-6 font-normal"
        >
          I build products
          <br />
          from <span className="font-display font-bold uppercase not-italic tracking-tight">zero to live.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-text-secondary leading-relaxed max-w-md mb-10"
        >
          Co-Founder of a live iOS app. Former B2B marketplace PM who doubled GMV at seed stage.
          I find the real problem, scope ruthlessly, and ship.
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
            Aatram — Live on the App Store
          </a>
          <a
            href="https://www.frictionlens.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            FrictionLens — Live at frictionlens.net
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
            { num: '2', label: 'Products shipped' },
            { num: '2.3x', label: 'Vendor growth' },
            { num: '2x', label: 'GMV doubled' },
            { num: '35–40%', label: 'Retention, $0 spend' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl md:text-3xl">{item.num}</span>
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
    </section>
  );
}
