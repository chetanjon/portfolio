'use client';

import { motion } from 'framer-motion';

const ROW_A = [
  'SwiftUI',
  'Apple Foundation Models',
  'SwiftData',
  'Supabase',
  'Next.js',
  'TypeScript',
  'Google Gemini',
  'Tailwind v4',
  'Framer Motion',
  'PostHog',
  'Inngest',
  'Upstash Redis',
];

const ROW_B = [
  'Product Strategy',
  '0-to-1',
  'A/B Testing',
  'SQL · Mixpanel',
  'Cohort Analysis',
  'Jobs-to-be-Done',
  'CSPO',
  '18-Component Design System',
  'Brand Voice',
  'Motion Language',
  'App Store Submission',
  'PRDs',
];

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: 'left' | 'right';
  speed: number;
}) {
  // Duplicate the array so the loop reads as seamless: the animation
  // travels exactly one set-width before snapping back to start.
  const doubled = [...items, ...items];
  const distance = direction === 'left' ? '-50%' : '50%';

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex items-center gap-10 md:gap-14 will-change-transform"
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        animate={{ x: distance }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-10 md:gap-14 shrink-0 text-[11px] md:text-xs uppercase tracking-[0.28em] text-text-muted"
          >
            {item}
            <span aria-hidden className="text-text-muted/40">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function StackMarquee() {
  return (
    <section
      aria-label="Stack and competencies"
      className="relative py-6 md:py-8 border-y border-border-default bg-bg-secondary/30 overflow-hidden"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <MarqueeRow items={ROW_A} direction="left" speed={48} />
        <MarqueeRow items={ROW_B} direction="right" speed={56} />
      </div>

      {/* Edge mask — fades the marquee out at the left + right edges so
          items don't pop in/out abruptly. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-16 md:w-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--color-bg-primary), transparent)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-16 md:w-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, var(--color-bg-primary), transparent)',
        }}
      />
    </section>
  );
}
