'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { workExperiences } from '@/data/work';
import { cn } from '@/lib/utils';

export function Works() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 bg-bg-secondary overflow-hidden">
      {/* Parallax background texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-transparent via-bg-tertiary/20 to-transparent"
      />

      <div className="container-wide relative z-10">
        <div className="flex justify-between items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker number="04" label="Works" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionMarker label="Filter" />
          </motion.div>
        </div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
        >
          <div className="flex items-baseline gap-4">
            <span className="font-serif italic text-2xl md:text-3xl text-text-secondary">Products I&apos;ve</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight">Shipped</h2>
          </div>
        </motion.div>

        {/* Projects grid - staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {workExperiences.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                'group',
                i % 2 === 1 && 'md:mt-16'
              )}
            >
              <Link href={`/work/${work.slug}`} className="block">
                {/* Header line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                  className="origin-left h-px bg-border-default mb-2"
                />
                <div className="flex justify-between items-end pb-2 mb-4">
                  <h3 className="text-xs uppercase tracking-widest group-hover:text-text-secondary transition-colors">
                    {work.company}
                  </h3>
                  <span className="text-[10px] text-text-muted">
                    {work.startDate.split('-')[0]}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video mb-4">
                  {work.thumbnail ? (
                    <Image
                      src={work.thumbnail}
                      alt={work.company}
                      fill
                      className="object-cover img-grayscale group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <ImagePlaceholder
                      initials={work.company.split(' ').map(w => w[0]).join('')}
                      aspectRatio="video"
                      className="w-full group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium mb-1">{work.role}</p>
                    <p className="small-caps text-text-muted">{work.type}</p>
                  </div>

                  {/* Key metric */}
                  {work.metrics[0] && (
                    <div className="text-right">
                      <span className="text-lg font-display font-bold">{work.metrics[0].value}</span>
                      <p className="small-caps text-text-muted">{work.metrics[0].label}</p>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Skills tags */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-border-default pt-12"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-widest font-medium">
            <span className="hover:text-text-secondary cursor-default">/ Seller Onboarding</span>
            <span className="hover:text-text-secondary cursor-default">/ Funnel Optimization</span>
            <span className="hover:text-text-secondary cursor-default">/ Retention Analytics</span>
            <span className="hover:text-text-secondary cursor-default">/ B2B Marketplace Growth</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {['Roadmapping', 'PRDs', 'Impact/Effort Scoring', 'Cohort Analysis', 'SQL + Mixpanel'].map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="border border-border-default rounded-full px-4 py-1 text-[9px] uppercase tracking-widest hover:bg-text-primary hover:text-bg-primary transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
