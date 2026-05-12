'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { CountUp } from '@/components/ui/CountUp';

interface ThinkingPiece {
  slug: string;
  company: string;
  headline: string;
  problem: string;
  metric: { value: number; prefix?: string; suffix?: string; decimals?: number };
  metricLabel: string;
}

const pieces: ThinkingPiece[] = [
  {
    slug: 'notion',
    company: 'Notion',
    headline: 'Found the $600M activation paradox',
    problem:
      "8 of 10 interviewees learned Notion's value from YouTube, not the product. The flexibility that makes it powerful makes it overwhelming. Mapped the AARRR funnel, proposed 5 RICE-scored fixes.",
    metric: { value: 50, prefix: '$40–', suffix: 'M' },
    metricLabel: 'Est. incremental ARR',
  },
  {
    slug: 'cursor',
    company: 'Cursor (Anysphere)',
    headline: 'Reverse-engineered the $2B/yr SaaS play',
    problem:
      'Four students forked VS Code and grew with almost no traditional marketing, while every model provider funds them and competes with them. Mapped the moat and the crisis pivot.',
    metric: { value: 2, suffix: 'B' },
    metricLabel: 'Annualized revenue',
  },
  {
    slug: 'spotify',
    company: 'Spotify',
    headline: 'Why Wrapped beats every retention playbook',
    problem:
      'Discover Weekly (pull) and Wrapped (push) run on different reward functions. Wrapped works because it treats listening data as identity, not a stats page. Broke down all three ML systems underneath.',
    metric: { value: 751, suffix: 'M' },
    metricLabel: 'Monthly active users analyzed',
  },
];

export function Thinking() {
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
            <SectionMarker number="04" label="Thinking" />
            <h2 className="font-serif text-2xl md:text-3xl mt-4">Product thinking</h2>
            <p className="text-sm text-text-tertiary mt-2 max-w-md">
              Exercises in how I&apos;d approach products I don&apos;t own.
            </p>
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
          {pieces.map((piece, i) => (
            <motion.div
              key={piece.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/casestudies/${piece.slug}`} className="block group h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ y: -2 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-card-hover bg-bg-primary border border-border-default rounded-lg p-6 md:p-7 group-hover:border-border-hover transition-[border-color,box-shadow] duration-500 group-hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.6)] h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <span className="text-[10px] tracking-widest uppercase text-text-muted truncate">{piece.company}</span>
                    <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-border-default text-text-muted font-medium flex-shrink-0">
                      Thinking exercise
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="font-display font-bold text-4xl md:text-5xl leading-none tabular-nums text-accent-primary">
                      <CountUp
                        to={piece.metric.value}
                        decimals={piece.metric.decimals ?? 0}
                        prefix={piece.metric.prefix ?? ''}
                        suffix={piece.metric.suffix ?? ''}
                      />
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mt-2">{piece.metricLabel}</p>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl mb-3 group-hover:text-text-secondary transition-colors">
                    {piece.headline}
                  </h3>
                  <p className="text-sm text-text-tertiary leading-relaxed mb-5 flex-1">{piece.problem}</p>

                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-accent-mint">
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
