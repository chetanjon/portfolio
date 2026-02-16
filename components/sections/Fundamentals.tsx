'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { personalInfo } from '@/data/personal';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  { number: '01', title: 'Discover', description: 'User interviews before wireframes — always' },
  { number: '02', title: 'Prioritize', description: 'RICE over gut feeling, every sprint' },
  { number: '03', title: 'Ship', description: '70% solution shipped beats 100% stuck in review' },
  { number: '04', title: 'Iterate', description: 'Retention cohorts reveal what NPS scores hide' },
];

export function Fundamentals() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section ref={ref} className="relative min-h-screen py-24 overflow-hidden bg-bg-secondary">
      {/* Parallax background grid */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-10"
      >
        <div className="border-r border-text-primary h-full" />
        <div className="border-r border-text-primary h-full" />
        <div className="border-r border-text-primary h-full" />
        <div className="border-r border-text-primary h-full" />
      </motion.div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <SectionMarker number="02" label="Approach" className="mb-8" />
        </motion.div>

        {/* Large background text */}
        <motion.h2
          style={{ y: textY }}
          className="font-display font-bold text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter opacity-10 absolute top-20 left-0 w-full select-none pointer-events-none"
        >
          Fundam<br />entals
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20 md:pt-32">
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-4 lg:col-start-2 relative"
          >
            <div className="relative group">
              {/* Portrait image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/potrait.jpg"
                  alt="Chetan Jonnalagadda"
                  fill
                  className="object-cover object-top img-grayscale transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Overlay frame */}
                <div className="absolute inset-0 border border-border-default pointer-events-none" />
              </div>
              {/* Coordinates decoration */}
              <div className="absolute bottom-4 left-4 text-[8px] font-mono text-text-muted/50">
                X: 33.4255<br />Y: -111.9400
              </div>
              {/* Hover label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 bg-text-primary text-bg-primary text-[9px] uppercase tracking-widest px-3 py-2"
              >
                Tempe, AZ
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 className="font-display font-bold text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight mb-8">
                Building<br />
                With<br />Evidence
              </h3>

              <p className="text-text-secondary mb-8 max-w-md">
                {personalInfo.summary}
              </p>

              {/* Numbered steps */}
              <div className="flex flex-col md:flex-row gap-8 text-[10px] uppercase tracking-widest text-text-muted border-t border-border-default pt-6 mb-8">
                {steps.slice(0, 3).map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="block text-text-primary mb-1 font-display font-bold">{step.number}</span>
                    <span>{step.title}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  href="/about"
                  className="inline-block border border-border-default rounded-full px-8 py-3 text-xs uppercase tracking-widest hover:bg-text-primary hover:text-bg-primary transition-colors duration-300"
                >
                  About Me
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
