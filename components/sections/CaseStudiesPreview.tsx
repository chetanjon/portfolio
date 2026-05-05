'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { CountUp } from '@/components/ui/CountUp';

interface PreviewStudy {
  slug: string;
  company: string;
  headline: string;
  problem: string;
  metric: { value: number; prefix?: string; suffix?: string; decimals?: number };
  metricLabel: string;
  accent: string;
  tag: string;
}

const previewStudies: PreviewStudy[] = [
  {
    slug: 'aatram',
    company: 'Aatram · Live on App Store',
    headline: 'Shipped V1 in 7 days and launched at a 5.0 rating',
    problem: 'A 3-person founding team, a SwiftUI / SwiftData / WidgetKit / FamilyControls stack, and a procrastination app positioned against the "discipline" frame every competitor assumes.',
    metric: { value: 7, suffix: ' days' },
    metricLabel: 'First commit → App Store · 5.0 launch',
    accent: '#5B4EB8',
    tag: 'Shipped',
  },
  {
    slug: 'notion',
    company: 'Notion',
    headline: 'Found the $600M activation paradox',
    problem: '8 of 10 users learned Notion\'s value from YouTube, not the product. The flexibility that makes it powerful makes it overwhelming.',
    metric: { value: 50, prefix: '$40–', suffix: 'M' },
    metricLabel: 'Est. incremental ARR',
    accent: '#2383E2',
    tag: 'Teardown',
  },
  {
    slug: 'cursor',
    company: 'Cursor (Anysphere)',
    headline: 'Reverse-engineered the $2B/yr SaaS play',
    problem: 'Four MIT students forked VS Code and grew with almost no traditional marketing, while every model provider funds them and competes with them.',
    metric: { value: 2, suffix: 'B' },
    metricLabel: 'Annualized revenue',
    accent: '#0E7C6B',
    tag: 'Teardown',
  },
];

export function CaseStudiesPreview() {
  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary">
      <div className="container-wide">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <SectionMarker number="05" label="Research" />
            <h2 className="font-serif text-2xl md:text-3xl mt-4">Case studies</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/casestudies"
              className="text-[10px] tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors"
            >
              View all &rarr;
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previewStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/casestudies/${study.slug}`} className="block group h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ y: -2 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-card-hover bg-bg-primary border border-border-default rounded-lg p-6 md:p-7 group-hover:border-border-hover transition-[border-color,box-shadow] duration-500 group-hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.6)] h-full flex flex-col"
                >
                  {/* Top: company + tag */}
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <span className="text-[10px] tracking-widest uppercase text-text-muted truncate">
                      {study.company}
                    </span>
                    {study.tag === 'Shipped' ? (
                      <span
                        className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 flex-shrink-0"
                        style={{ background: study.accent, color: '#fff' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
                        Shipped
                      </span>
                    ) : study.tag === 'Case Study' ? (
                      <span
                        className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                        style={{ background: `${study.accent}1A`, color: study.accent }}
                      >
                        Case Study
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-border-default text-text-muted font-medium flex-shrink-0">
                        Teardown
                      </span>
                    )}
                  </div>

                  {/* Big metric */}
                  <div className="mb-4">
                    <span
                      className="font-display font-bold text-4xl md:text-5xl leading-none tabular-nums"
                      style={{ color: study.accent }}
                    >
                      <CountUp
                        to={study.metric.value}
                        decimals={study.metric.decimals ?? 0}
                        prefix={study.metric.prefix ?? ''}
                        suffix={study.metric.suffix ?? ''}
                      />
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mt-2">
                      {study.metricLabel}
                    </p>
                  </div>

                  {/* Headline */}
                  <h3 className="font-serif text-lg md:text-xl mb-3 group-hover:text-text-secondary transition-colors">
                    {study.headline}
                  </h3>

                  {/* Problem line */}
                  <p className="text-sm text-text-tertiary leading-relaxed mb-5 flex-1">
                    {study.problem}
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase"
                    style={{ color: study.accent }}
                  >
                    Read
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
