'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { awards } from '@/data/awards';

export function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgNumY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Large parallax background number */}
      <motion.div
        style={{ y: bgNumY }}
        className="absolute top-0 right-0 text-[20rem] md:text-[30rem] font-display font-bold text-bg-secondary opacity-50 pointer-events-none leading-none -mt-24 -mr-12 select-none"
      >
        {awards.length}
      </motion.div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Header */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <SectionMarker number="03" label="Recognition" className="mb-8" />

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8">
                Shipped &amp; <br />
                <span className="font-serif italic font-normal lowercase">measured</span>
              </h2>
            </motion.div>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-widest text-right max-w-xs ml-auto mb-12 text-text-muted"
            >
              Each number has a user story behind it — a funnel rebuilt, a seller unblocked, a decision backed by data instead of instinct.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="origin-left h-px bg-border-default mb-0"
            />

            <div className="space-y-0">
              {awards.map((award, i) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group flex justify-between items-center py-4 border-b border-border-default text-[10px] md:text-xs uppercase tracking-wide hover:pl-4 transition-all duration-300 cursor-default"
                >
                  <div className="w-16 opacity-50 font-display font-bold text-lg">
                    {award.count || '—'}
                  </div>
                  <div className="w-40 font-bold">{award.platform}</div>
                  <div className="flex-1 text-right text-text-muted group-hover:text-text-primary transition-colors">
                    {award.recognition}
                  </div>
                  {award.year && (
                    <div className="w-16 text-right text-text-muted ml-4">
                      {award.year}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 h-40 w-full bg-bg-secondary rounded-lg origin-left"
        />
      </div>
    </section>
  );
}
