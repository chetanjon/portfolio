'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { getFeaturedWork, workExperiences } from '@/data/work';

export function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const allWork = workExperiences;

  return (
    <section ref={ref} className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-accent-primary" />
            <span className="text-sm font-medium tracking-widest text-accent-primary uppercase">Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Where I&apos;ve Built
          </h2>
          <p className="text-text-secondary max-w-lg">
            From intern to PM — scaling marketplaces and shipping features with lean teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allWork.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/work/${work.slug}`} className="block h-full">
                <SpotlightCard className="p-6 h-full group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary">
                      {work.type}
                    </span>
                    <span className="text-xs text-text-muted">
                      {work.startDate.split('-')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                    {work.company}
                  </h3>
                  <p className="text-sm text-text-tertiary mb-4">{work.role}</p>

                  {/* Key metrics */}
                  <div className="space-y-2 mb-4">
                    {work.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-accent-primary">{m.value}</span>
                        <span className="text-xs text-text-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium text-text-muted group-hover:text-accent-primary group-hover:gap-2 transition-all mt-auto">
                    {work.caseStudy ? 'Read Case Study' : 'View Details'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors"
          >
            View all work experience <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
