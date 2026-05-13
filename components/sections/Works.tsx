'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionMarker } from '@/components/ui/SectionMarker';
import { workExperiences } from '@/data/work';

type ChapterTint = {
  accent: string;
  wash: string;
  name: string;
};

const CHAPTER_TINTS: Record<string, ChapterTint> = {
  aatram: {
    accent: '#B8A9D4',
    wash: 'rgba(184, 169, 212, 0.09)',
    name: 'lavender',
  },
  frictionlens: {
    accent: '#7DBFAB',
    wash: 'rgba(125, 191, 171, 0.09)',
    name: 'mint',
  },
  'ikt-india': {
    accent: '#C9B97A',
    wash: 'rgba(201, 185, 122, 0.09)',
    name: 'sand',
  },
};

type Row = {
  slug: string;
  company: string;
  role: string;
  year: string;
  yearShort: string;
  blurb: string;
  metric: { value: string; label: string };
  tags: string[];
  tint: ChapterTint;
};

const order = ['aatram', 'frictionlens', 'ikt-india'];

function shortBlurb(slug: string, description: string): string {
  if (slug === 'aatram') {
    return 'Consumer iOS app live on the App Store. 3-person founding team. V1 to App Store in 7 days, V2 anti-interruption rewrite, on-device AI nudge engine on Apple Foundation Models.';
  }
  if (slug === 'frictionlens') {
    return 'Full-stack AI review analyzer. Designed and shipped the marketing site, dashboard, and shareable Vibe Reports end-to-end. 3-tier rule-based classifier routes only the hard cases to Gemini.';
  }
  if (slug === 'ikt-india') {
    return 'Seed-stage B2B handloom marketplace. Promoted intern → PM in six months. Owned vendor-side product with a 4-engineer team; SQL + Mixpanel seller-health dashboard lifted 60-day retention 20%.';
  }
  return description;
}

function tagsFor(slug: string): string[] {
  if (slug === 'aatram') return ['SwiftUI', 'Apple Foundation Models', 'Brand', 'Design System'];
  if (slug === 'frictionlens') return ['Next.js', 'Gemini', 'Supabase', 'Solo Build'];
  if (slug === 'ikt-india') return ['A/B Testing', 'SQL', 'Mixpanel', 'B2B Marketplace'];
  return [];
}

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

function ChapterRow({ row, index }: { row: Row; index: number }) {
  const rowRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-linked parallax: ghost year drifts down as row scrolls past, metric drifts up
  // (counter-direction), and the bottom progress fill walks left → right.
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const metricY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const progressScaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const safeGhostY: MotionValue<number> | number = reduceMotion ? 0 : ghostY;
  const safeMetricY: MotionValue<number> | number = reduceMotion ? 0 : metricY;
  const safeProgress: MotionValue<number> | number = reduceMotion ? 1 : progressScaleX;

  return (
    <motion.li
      ref={rowRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: index * 0.05 },
        },
      }}
      className="border-b border-border-default group/row relative"
      style={
        {
          '--row-accent': row.tint.accent,
          '--row-wash': row.tint.wash,
        } as React.CSSProperties
      }
    >
      {/* Hover wash */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: 'var(--row-wash)' }}
      />

      {/* Vertical accent bar — short by default, grows on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-12 group-hover/row:h-full transition-[height] duration-500 ease-out"
        style={{ backgroundColor: 'var(--row-accent)' }}
      />

      {/* Bottom-edge progress fill driven by scroll */}
      <motion.span
        aria-hidden
        className="absolute left-0 bottom-0 h-px w-full origin-left"
        style={{ backgroundColor: 'var(--row-accent)', scaleX: safeProgress, willChange: 'transform' }}
      />

      <Link
        href={`/work/${row.slug}`}
        className="relative block py-12 md:py-16 pl-6 md:pl-10 overflow-hidden"
      >
        {/* Ghost outlined year numeral — drifts with scroll. Lives at z=0
            so the content (z=10) stacks cleanly above it; opacity dialed
            back so it reads as ambient atmosphere, not competing text. */}
        <motion.span
          aria-hidden
          className="pointer-events-none select-none absolute right-[6%] top-1/2 -translate-y-1/2 font-display font-black leading-none tracking-tight text-[6rem] md:text-[9rem] lg:text-[12rem] opacity-[0.08] group-hover/row:opacity-[0.16] transition-opacity duration-500 hidden md:block z-0"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px var(--row-accent)',
            y: safeGhostY,
            willChange: 'transform',
          }}
        >
          {row.yearShort}
        </motion.span>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 items-start">
          {/* Index + year */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: REVEAL_EASE } },
            }}
            className="md:col-span-2"
          >
            <p className="small-caps text-text-muted">0{index + 1}</p>
            <p className="small-caps text-text-muted mt-1">{row.year}</p>
            <span
              className="inline-flex items-center gap-1.5 mt-3 small-caps"
              style={{ color: 'var(--row-accent)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--row-accent)' }}
              />
              {row.tint.name}
            </span>
          </motion.div>

          {/* Company + role + blurb + tags */}
          <div className="md:col-span-7">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } },
              }}
              className="flex items-start gap-4 flex-wrap"
            >
              <h3 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] transition-transform duration-500 group-hover/row:-translate-x-1">
                {row.company}
              </h3>
              <ArrowUpRight
                className="hidden md:block w-7 h-7 mt-3 opacity-0 -translate-x-2 transition-all duration-500 group-hover/row:opacity-100 group-hover/row:translate-x-0"
                style={{ color: 'var(--row-accent)' }}
              />
            </motion.div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: REVEAL_EASE } },
              }}
              className="font-serif italic text-text-secondary mt-3 text-lg md:text-xl"
            >
              {row.role}
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: REVEAL_EASE } },
              }}
              className="text-text-secondary leading-relaxed mt-4 max-w-2xl"
            >
              {row.blurb}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: REVEAL_EASE } },
              }}
              className="flex flex-wrap gap-2 mt-5"
            >
              {row.tags.map((tag) => (
                <span
                  key={tag}
                  className="border rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-text-muted transition-colors duration-300"
                  style={{ borderColor: 'var(--color-border-default)' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Big metric — accent-colored, counter-parallax drift */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: REVEAL_EASE } },
            }}
            className="md:col-span-3 md:text-right relative"
          >
            {/* Hover halo behind the metric */}
            <span
              aria-hidden
              className="absolute inset-0 -inset-x-6 pointer-events-none opacity-0 group-hover/row:opacity-40 transition-opacity duration-500 blur-2xl"
              style={{
                background: 'radial-gradient(closest-side, var(--row-accent) 0%, transparent 70%)',
              }}
            />
            <motion.p
              className="relative font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95] transition-transform duration-500 group-hover/row:scale-[1.02]"
              style={{ color: 'var(--row-accent)', y: safeMetricY, willChange: 'transform' }}
            >
              {row.metric.value}
            </motion.p>
            <p className="relative small-caps text-text-muted mt-2">{row.metric.label}</p>
          </motion.div>
        </div>
      </Link>
    </motion.li>
  );
}

export function Works() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const rows: Row[] = order
    .map((slug) => workExperiences.find((w) => w.slug === slug))
    .filter((w): w is NonNullable<typeof w> => Boolean(w))
    .map((w) => ({
      slug: w.slug,
      company: w.company,
      role: w.role,
      year:
        w.endDate === 'Present'
          ? `${w.startDate.split('-')[0]} → Now`
          : `${w.startDate.split('-')[0]}–${w.endDate.split('-')[0]}`,
      yearShort: w.startDate.split('-')[0],
      blurb: shortBlurb(w.slug, w.description),
      metric: { value: w.metrics[0].value, label: w.metrics[0].label },
      tags: tagsFor(w.slug),
      tint: CHAPTER_TINTS[w.slug] ?? CHAPTER_TINTS.aatram,
    }));

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 bg-bg-secondary overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-transparent via-bg-tertiary/20 to-transparent"
      />

      <div className="container-wide relative z-10">
        <div className="flex justify-between items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <SectionMarker number="03" label="Experience" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-right"
          >
            <p className="small-caps text-text-muted">{rows.length} chapters</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: REVEAL_EASE }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-serif italic text-2xl md:text-3xl text-text-secondary">Where I&apos;ve</span>
              <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95]">
                Worked
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-text-muted">Each chapter has its own color.</p>
              <div className="flex items-center gap-1.5">
                {rows.map((row) => (
                  <span
                    key={row.slug}
                    aria-label={`${row.company} ${row.tint.name}`}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: row.tint.accent }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <ul className="border-t border-border-default">
          {rows.map((row, i) => (
            <ChapterRow key={row.slug} row={row} index={i} />
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-widest font-medium text-text-muted">
            <span>/ 0-to-1 Product</span>
            <span>/ AI / On-Device ML</span>
            <span>/ B2B Marketplace Growth</span>
            <span>/ Retention Analytics</span>
          </div>
          <Link
            href="/work"
            className="text-sm uppercase tracking-widest border border-text-primary px-5 py-2.5 rounded-full hover:bg-text-primary hover:text-bg-primary transition-colors"
          >
            See full work →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
