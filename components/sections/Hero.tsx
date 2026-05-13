'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';

type StatusChip = {
  name: string;
  label: string;
  href: string;
  external: boolean;
  thumb?: string;
  initials?: string;
};

const chips: StatusChip[] = [
  {
    name: 'Aatram',
    label: 'LIVE · App Store',
    href: 'https://apps.apple.com/us/app/aatram/id6760587556',
    external: true,
    thumb: '/products/aatram-home.jpg',
  },
  {
    name: 'FrictionLens',
    label: 'LIVE · frictionlens.net',
    href: 'https://www.frictionlens.net/',
    external: true,
    thumb: '/products/frictionlens-landing.png',
  },
  {
    name: 'IKT India',
    label: 'CASE STUDY · 2× GMV',
    href: '/work/ikt-india',
    external: false,
    initials: 'IKT',
  },
];

type Coverline = { tag: string; body: string };
const coverlines: Coverline[] = [
  { tag: 'LIVE', body: 'Aatram on the App Store. Shipped in 7 days.' },
  { tag: 'FEATURE', body: 'How we hit 2× GMV with 20 vendors.' },
  { tag: 'BUILD', body: 'FrictionLens, full-stack solo in a weekend.' },
];

const REVEAL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-bg-primary">
      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-10 pt-32 md:pt-36 pb-24 md:pb-28">
        {/* Masthead band — three-column grid so the "Issue 03 · 2026"
            datestamp stays geometrically centered between the wordmark
            and the open-to-work pill. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 gap-x-6 pb-8 md:pb-10 border-b border-border-default"
        >
          <span className="font-display font-bold text-[15px] md:text-base tracking-[0.22em] uppercase text-text-primary md:justify-self-start">
            Chetan Jonnalagadda
          </span>
          <span className="small-caps text-text-muted md:justify-self-center order-3 md:order-none">
            Issue 03 · 2026
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/40 bg-accent-primary/10 text-[11px] md:text-xs uppercase tracking-[0.22em] font-medium text-accent-primary md:justify-self-end max-w-full whitespace-normal">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              <span className="sr-only">Status: available</span>
            </span>
            Open to PM roles · Bay Area + Remote
          </span>
        </motion.div>

        {/* Two-column magazine spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-10 md:mt-14 items-start">
          {/* Left column — portrait + coverlines. Portrait is top-bleed
              (flush with the masthead band's lower border, no chrome
              around the image) per the locked direction. */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: REVEAL_EASE }}
            className="lg:col-span-5 min-w-0"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-bg-secondary">
              <Image
                src="/potrait.jpg"
                alt="Portrait of Chetan Jonnalagadda"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover hero-portrait-tone"
              />
            </div>

            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              {coverlines.map((line, i) => (
                <motion.li
                  key={line.tag}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: REVEAL_EASE }}
                  className="font-display-serif italic text-lg md:text-xl lg:text-2xl leading-snug text-text-secondary"
                >
                  <span className="small-caps not-italic text-accent-primary mr-2 align-middle">
                    {line.tag}
                  </span>
                  {line.body}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right column — role claim + giant number + status chips + single CTA */}
          <div className="lg:col-span-7 min-w-0">
            {/* Role claim — promoted from the deleted Quote section.
                Page's only H1 — sits in the visual hierarchy where the
                old hero headline used to live. */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: REVEAL_EASE }}
              className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-text-primary"
            >
              Engineering taught me to debug systems.
              <br />
              <span className="text-text-secondary">
                Product management taught me to debug businesses.
              </span>
            </motion.h1>

            {/* Giant number + caption. Both caption and sub-line use the
                sans display face — Cormorant is reserved for coverlines
                and the bottom signature line only. */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: REVEAL_EASE }}
              className="mt-10 md:mt-14 flex flex-wrap items-end gap-x-6 gap-y-3"
            >
              <span className="font-display font-black tracking-tight leading-[0.85] tabular-nums text-accent-primary text-[clamp(5.5rem,18vw,13rem)] min-w-0">
                <CountUp to={2} suffix="×" />
              </span>
              <div className="pb-3 md:pb-5 min-w-0">
                <p className="font-display text-sm md:text-base uppercase tracking-[0.22em] font-medium text-text-primary">
                  GMV at seed stage
                </p>
                <p className="font-display text-sm md:text-base text-text-tertiary mt-1">
                  20 → 75 vendors. Solo PM after intern → PM in 6 months.
                </p>
              </div>
            </motion.div>

            {/* Status chips */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: REVEAL_EASE }}
              className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {chips.map((chip) => {
                const ariaLabel = chip.external
                  ? `${chip.name}: ${chip.label}. Opens in a new tab.`
                  : `${chip.name}: ${chip.label}. View case study.`;
                const visualBody = (
                  <>
                    <span className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-bg-tertiary border border-border-default">
                      {chip.thumb ? (
                        <Image
                          src={chip.thumb}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-display font-bold text-[10px] tracking-widest text-text-secondary">
                          {chip.initials}
                        </span>
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display font-semibold text-sm text-text-primary truncate">
                        {chip.name}
                      </span>
                      <span className="block small-caps text-text-muted truncate">
                        {chip.label}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </>
                );

                const cardClass =
                  'group flex items-center gap-3 p-2.5 rounded-lg border border-border-default bg-bg-secondary/40 hover:border-border-hover hover:bg-bg-secondary/70 transition-colors';

                return chip.external ? (
                  <a
                    key={chip.name}
                    href={chip.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    className={cardClass}
                  >
                    {visualBody}
                  </a>
                ) : (
                  <Link
                    key={chip.name}
                    href={chip.href}
                    aria-label={ariaLabel}
                    className={cardClass}
                  >
                    {visualBody}
                  </Link>
                );
              })}
            </motion.div>

            {/* Single primary CTA */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 md:mt-12"
            >
              <a
                href="mailto:jonnalagadda8800@gmail.com?subject=PM%20phone%20screen"
                aria-label="Email Chetan to start a PM phone screen"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-primary text-accent-on text-xs md:text-sm uppercase tracking-widest font-medium hover:opacity-85 transition-opacity"
              >
                Phone screen me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
