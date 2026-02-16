'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { workExperiences } from '@/data/work';
import { cn } from '@/lib/utils';

export function WorkContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-bg-secondary pointer-events-none"
        />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionMarker label="Experience" className="mb-8" />

            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6">
              Work
              <span className="font-serif italic font-normal normal-case text-4xl md:text-6xl"> experience</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl">
              I joined IKT India as a PM intern and earned a full-time offer in 6 months by
              doing the one thing that matters: talking to users and shipping what they actually need.
              From 20 vendors to 45+, from 3-day onboarding to 6 hours — here&apos;s how.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            {workExperiences.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn('group', i % 2 === 1 && 'md:mt-16')}
              >
                <Link href={`/work/${work.slug}`} className="block">
                  {/* Header row */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
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
                    {work.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-text-primary text-bg-primary text-[9px] uppercase tracking-wider">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mb-4">
                    <p className="text-lg font-display font-semibold mb-1">{work.role}</p>
                    <p className="small-caps text-text-muted">{work.type} / {work.location}</p>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4">
                    {work.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <span className="text-2xl font-display font-bold">{metric.value}</span>
                        <p className="small-caps text-text-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {work.caseStudy && (
                    <p className="mt-4 text-sm text-text-muted group-hover:text-text-primary transition-colors">
                      View Case Study &rarr;
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-24 bg-bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker label="Skills" className="mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] uppercase tracking-widest font-medium mb-12"
          >
            <span>/ Seller Onboarding</span>
            <span>/ Funnel Optimization</span>
            <span>/ Retention Analytics</span>
            <span>/ B2B Marketplace Growth</span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {['Roadmapping', 'PRDs', 'Sprint Planning', 'A/B Testing', 'SQL', 'Python', 'Mixpanel', 'Figma', 'Jira'].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border border-border-default rounded-full px-4 py-1 text-[9px] uppercase tracking-widest hover:bg-text-primary hover:text-bg-primary transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
