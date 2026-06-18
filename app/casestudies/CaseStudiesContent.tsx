'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { SectionMarker } from '@/components/ui/SectionMarker';

type Category = 'Shipped' | 'Teardown' | 'Thinking';

type Study = {
  slug: string;
  href?: string;
  company: string;
  title: string;
  description: string;
  tags: string[];
  metric: { value: string; label: string };
  accentColor: string;
  bgColor: string;
  category: Category;
  readMin: number;
  startup?: boolean;
};

const caseStudies: Study[] = [
  {
    slug: 'wispr-flow',
    href: '/wispr-flow-teardown',
    company: 'Wispr Flow',
    title: 'Never Rewrite a Single Word',
    description:
      'An outside-in teardown of Wispr Flow, the voice dictation tool whose whole brand is one promise: you never rewrite a word. The transcription is best-in-class, but the promise breaks three ways after it. Words vanish in the last six inches to the cursor, the AI cleanup quietly rewrites your meaning, and accuracy decays right after you pay. Traces the 4.8-versus-2.7 ratings split to trust draining out once the trial ends, then stages a positioning fix from parts Wispr already shipped but buried in troubleshooting.',
    tags: ['Product Teardown', 'Voice / AI Dictation', 'Trust', 'Retention', 'Positioning'],
    metric: { value: '4.8 → 2.7', label: 'App Store vs Trustpilot · the trust gap' },
    accentColor: '#2A37E0',
    bgColor: '#E9EBFB',
    category: 'Teardown',
    readMin: 7,
    startup: true,
  },
  {
    slug: 'ditto',
    href: '/ditto-teardown',
    company: 'Ditto',
    title: 'Signed Up, Never Matched',
    description:
      'An outside-in teardown of Ditto, the campus app that texts you one ready-to-go date a week. Ditto flaunts 143,670 signups while its own users across r/UCSD and r/SJSU keep saying the same thing: they signed up and never got matched. Traces the real leak to match liquidity (not the match-to-date gap everyone watches), shows how a flyer-driven growth engine makes it worse, and stages a referral-gated fix that builds the campus pool instead of inflating the counter.',
    tags: ['Product Teardown', 'Consumer / Dating', 'Marketplace Liquidity', 'Growth Loops', 'Trust'],
    metric: { value: '143,670', label: 'Signed up · how many matched?' },
    accentColor: '#0B93F6',
    bgColor: '#E8F2FE',
    category: 'Teardown',
    readMin: 7,
    startup: true,
  },
  {
    slug: 'waymo',
    href: '/waymo-teardown',
    company: 'Waymo',
    title: 'Stranded by Design',
    description:
      'A rider-experience teardown built from one real Waymo ride across Phoenix on a 106° day, one twelve-minute support call, and everything the public record revealed after. Two of Waymo\'s most common complaints (long routes and long re-pickup waits) trace to a single choice: optimize for fleet utilization over rider time. Three buildable concepts (Hold My Ride, Heat-Aware Pickups, Route Honesty) with the dispatch, pricing, and business case behind each.',
    tags: ['Product Teardown', 'Rider Experience', 'Robotaxis', 'Dispatch & Pricing', 'Competitive Analysis'],
    metric: { value: '20 min', label: 'Wait, on a 106° Phoenix curb' },
    accentColor: '#1A73E8',
    bgColor: '#E8F0FE',
    category: 'Teardown',
    readMin: 12,
  },
  {
    slug: 'waymo-pickup',
    href: '/waymo-pickup',
    company: 'Waymo',
    title: 'Pickup Unreachable',
    description:
      'A field study of a single Waymo error screen. Booking from inside a gated Tempe complex returns a Pickup Unreachable error and a blank search box, even though dragging the pin 373 ft to the gate books instantly. Traces the failure to three handling gaps (it dead-ends, never explains, never learns), then scopes an app-layer fix Waymo already holds the patents for, plus the wait-versus-walk math and a case for route honesty.',
    tags: ['Product Teardown', 'Rider Experience', 'Robotaxis', 'Error States', 'App Design'],
    metric: { value: '373 ft', label: 'From my pin to a spot the app accepts' },
    accentColor: '#1A73E8',
    bgColor: '#E8F0FE',
    category: 'Teardown',
    readMin: 9,
  },
  {
    slug: 'aatram',
    company: 'Aatram',
    title: 'Start Starting',
    description:
      'Co-led product on a 3-person team. Led the V2 anti-interruption rewrite after 16 archetype interviews showed our own notifications were pulling avoidance-prone users out of focus. Owned UI, brand voice, an 18-component design system, the logo drawn as 80 SwiftUI Canvas stroke segments, and aatram.com end-to-end. Drove a 22-finding pre-submission audit through App Review.',
    tags: ['0-to-1', 'iOS', 'Apple Foundation Models', 'Brand & Design', 'Anti-Interruption'],
    metric: { value: '5.0★', label: 'App Store launch rating · 158 commits' },
    accentColor: '#6B5DAD',
    bgColor: '#EEEBF8',
    category: 'Shipped',
    readMin: 6,
    startup: true,
  },
  {
    slug: 'frictionlens',
    href: '/work/frictionlens',
    company: 'FrictionLens',
    title: 'The Free AI Tool That Earns It',
    description:
      'A full-stack AI review intelligence tool live at frictionlens.net. Owned product and design across the marketing site, dashboard, and shareable Vibe Report pages on Next.js, TypeScript, Supabase, Google Gemini, and Upstash Redis. Cost-aware 3-tier classifier routes ~80% of reviews through keyword rules so the freemium tier stays free. BYOK with AES-256-GCM lets power users run unlimited analyses on their own key.',
    tags: ['Full-Stack', 'AI', 'Next.js', 'Cost Engineering', 'Brand & Landing Page'],
    metric: { value: '$0', label: 'Forever tier · 3 classifier tiers · 4 review sources' },
    accentColor: '#3F8C73',
    bgColor: '#E6F2EC',
    category: 'Shipped',
    readMin: 6,
  },
  {
    slug: 'ikt-india',
    href: '/work/ikt-india',
    company: 'IKT India',
    title: "Margins, Vendors, and a Marketplace That Worked",
    description:
      "Seed-stage curated B2B marketplace for handloom and sustainable clothing brands across 15 Indian states. Owned vendor-side product with a four-engineer team as the company's first dedicated PM. Designed and ran a concurrent A/B test on 50 SKUs with price floors against a matched control, scaled the winner to 500+ SKUs, lifted gross margin from 25% to 40%, and doubled monthly GMV. Cut seller onboarding from 3 days to 6 hours and grew the vendor base 20 → 75+.",
    tags: ['B2B Marketplace', 'A/B Testing', 'SQL', 'Pricing Strategy', 'Vendor Growth'],
    metric: { value: '3.75x', label: 'Vendor growth · 2x GMV · 25→40% margin' },
    accentColor: '#3F8C73',
    bgColor: '#E6F2EC',
    category: 'Shipped',
    readMin: 7,
    startup: true,
  },
  {
    slug: 'cursor',
    company: 'Cursor (Anysphere)',
    title: 'The $29B Fork',
    description:
      'How four MIT students forked VS Code, grew with almost no traditional marketing, and built what may be the fastest-growing SaaS product ever, while every model provider simultaneously funds them and competes with them.',
    tags: ['Product Teardown', 'SaaS', 'AI Coding', 'Competitive Analysis', 'Unit Economics'],
    metric: { value: '$2B', label: 'Annualized Revenue' },
    accentColor: '#0E7C6B',
    bgColor: '#E6F5F1',
    category: 'Teardown',
    readMin: 9,
    startup: true,
  },
  {
    slug: 'duolingo',
    company: 'Duolingo',
    title: 'Breaking the B1 Wall',
    description:
      '52 million daily users. $1 billion in revenue. A learning ceiling nobody\'s fixing. A product strategy using the CIRCLES framework and PRD to address Duolingo\'s intermediate plateau.',
    tags: ['CIRCLES', 'PRD', 'UX Research', 'RICE Scoring', 'Wireframes'],
    metric: { value: '52.7M', label: 'Daily Active Users' },
    accentColor: '#D4790E',
    bgColor: '#FFF8ED',
    category: 'Thinking',
    readMin: 10,
  },
  {
    slug: 'figma',
    company: 'Figma',
    title: 'Rebuilding Trust After UI3',
    description:
      'How a major redesign and AI data-sharing controversy tested trust with Figma\'s power users, and a PM framework for earning it back through progressive migration and transparent AI.',
    tags: ['Trust Recovery', 'CIRCLES', 'PRD', 'RICE Scoring', 'Wireframes'],
    metric: { value: '$1.06B', label: 'FY2025 Revenue' },
    accentColor: '#5B3DC8',
    bgColor: '#EEEBF8',
    category: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'liquid-glass',
    company: 'Apple',
    title: 'When Glass Cracked',
    description:
      'How Apple\'s most ambitious redesign since iOS 7 broke accessibility for millions, and what a better path forward looks like. A UX case study analyzing WCAG failures, heuristic violations, and solution design.',
    tags: ['UX Research', 'Accessibility', 'WCAG 2.2', 'Heuristic Evaluation', 'RICE'],
    metric: { value: '1.5:1', label: 'Contrast Measured' },
    accentColor: '#0071e3',
    bgColor: '#f5f5f7',
    category: 'Thinking',
    readMin: 10,
  },
  {
    slug: 'notion',
    company: 'Notion',
    title: 'Notion\'s $600M Paradox',
    description:
      'How AI Agents Could Solve the Onboarding Problem That Templates Never Fixed. After interviewing 10 Notion users and analyzing 10,000+ reviews, one pattern dominated: the flexibility that makes Notion powerful makes it overwhelming.',
    tags: ['AARRR Funnel', 'User Interviews', 'RICE Scoring', 'Wireframes', 'ARR Modeling'],
    metric: { value: '~$600M', label: 'Est. ARR' },
    accentColor: '#2383E2',
    bgColor: '#EBF4FD',
    category: 'Thinking',
    readMin: 12,
  },
  {
    slug: 'rivian',
    company: 'Rivian',
    title: 'Rivian\'s Broken Handshake',
    description:
      'How phone key failure rates as high as 70% threaten a $5.8B joint venture, and a PM framework for rebuilding trust through feedback, state communication, and failure recovery improvements.',
    tags: ['CIRCLES', 'PRD', 'RICE Scoring', 'UX Wireframes', 'BLE/UWB'],
    metric: { value: 'Up to 70%', label: 'Failure Rate' },
    accentColor: '#2D5A3D',
    bgColor: '#E8F0EA',
    category: 'Thinking',
    readMin: 7,
  },
  {
    slug: 'sonos',
    company: 'Sonos',
    title: 'When the Music Stopped',
    description:
      'How Sonos shipped a major app rewrite that removed core features, broke accessibility, and cost the CEO his job. A PM framework for how the migration should have been managed.',
    tags: ['CIRCLES', 'PRD', 'Safe Migration', 'Accessibility', 'RICE Scoring'],
    metric: { value: '~$500M', label: 'Market Cap Lost' },
    accentColor: '#E8590C',
    bgColor: '#FFF3ED',
    category: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'tiktok-shop',
    company: 'TikTok Shop',
    title: 'Redesigning Trust in Social Commerce',
    description:
      'Redesigning trust, discovery & purchase confidence in the world\'s fastest-growing social commerce platform. CIRCLES framework, wireframes, and a full PRD for a Trust Layer.',
    tags: ['CIRCLES', 'Social Commerce', 'PRD', 'Wireframes', 'Trust Design'],
    metric: { value: '~$64B', label: 'GMV 2025 Est.' },
    accentColor: '#8B4513',
    bgColor: '#FAF3ED',
    category: 'Thinking',
    readMin: 8,
  },
  {
    slug: 'spotify',
    company: 'Spotify',
    title: 'Listening Into Loyalty',
    description:
      'How Spotify turned a music player into a growth machine. A teardown of Discover Weekly and Wrapped: the two features that drive retention and acquisition through algorithmic personalization and viral data storytelling.',
    tags: ['Product Teardown', 'Growth Loops', 'Recommendation Systems', 'Viral Mechanics', 'Retention'],
    metric: { value: '751M', label: 'Monthly Active Users' },
    accentColor: '#1DB954',
    bgColor: '#E8F8EE',
    category: 'Teardown',
    readMin: 7,
  },
  {
    slug: 'innovation-index',
    href: '/casestudies/innovation-index',
    company: 'ASU · Research',
    title: 'Innovation Index Analysis',
    description:
      'A Python analysis on a 1,862-record innovation dataset (130 countries, 13 years, merged from WIPO, World Bank, and UNESCO). t-tests and ANOVA surfaced 15 non-G20 countries scoring above the G20 average, and a regression found education explains only 7.3% of innovation variance, a counter-finding to the dominant policy narrative.',
    tags: ['Python', 'Statistical Analysis', 'ANOVA', 'Regression', 'Policy'],
    metric: { value: '1,862', label: 'Records · 130 countries · 13 years' },
    accentColor: '#0E7C6B',
    bgColor: '#E6F5F1',
    category: 'Thinking',
    readMin: 6,
  },
];

// 'Startup' is a cross-cutting lens, not a category: it re-slices the same
// grouped view to the early-stage pieces, which still live in their type bucket.
type Filter = 'All' | Category | 'Startup';

const FILTERS: Filter[] = ['All', 'Shipped', 'Teardown', 'Thinking', 'Startup'];

const CATEGORY_ORDER: Category[] = ['Shipped', 'Teardown', 'Thinking'];

const CATEGORY_META: Record<
  Category,
  { chip: string; plural: string; intro: string; cta: string }
> = {
  Shipped: {
    chip: 'Shipped',
    plural: 'Shipped',
    intro: 'Products I designed, built, and launched.',
    cta: 'Read the story',
  },
  Teardown: {
    chip: 'Teardown',
    plural: 'Teardowns',
    intro: 'Deep dives into a live product, taken apart to find the one decision behind the friction.',
    cta: 'Read the teardown',
  },
  Thinking: {
    chip: 'Thinking',
    plural: 'Thinking exercises',
    intro: 'Full PM process — research, framework, PRD — applied to a company I don’t work for.',
    cta: 'Read the breakdown',
  },
};

// Single source of truth for chronological order + the date shown on each card.
// Dates are when each piece was first published to the repo (from git history).
// ikt-india is the one exception: it reflects the real-world work (2024), not
// the later portfolio writeup.
const DATES: Record<string, string> = {
  'wispr-flow': '2026-06-15',
  ditto: '2026-06-14',
  'waymo-pickup': '2026-06-13',
  waymo: '2026-06-04',
  frictionlens: '2026-03-29',
  aatram: '2026-03-20',
  cursor: '2026-03-20',
  spotify: '2026-03-20',
  figma: '2026-03-17',
  notion: '2026-03-17',
  sonos: '2026-03-17',
  'tiktok-shop': '2026-03-17',
  duolingo: '2026-03-14',
  'liquid-glass': '2026-03-14',
  rivian: '2026-03-14',
  'innovation-index': '2025-11-15',
  'ikt-india': '2024-08-01',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(slug: string) {
  const iso = DATES[slug];
  if (!iso) return '';
  const [y, m] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

const byDateDesc = (a: Study, b: Study) => (DATES[b.slug] ?? '').localeCompare(DATES[a.slug] ?? '');

function CategoryBadge({ study }: { study: Study }) {
  if (study.category === 'Shipped') {
    return (
      <span
        className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5"
        style={{ background: study.accentColor, color: '#fff' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
        Shipped
      </span>
    );
  }
  if (study.category === 'Teardown') {
    return (
      <span
        className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 border"
        style={{ background: study.bgColor, color: study.accentColor, borderColor: study.accentColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: study.accentColor }} aria-hidden />
        Teardown
      </span>
    );
  }
  return (
    <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-border-default text-text-muted font-medium">
      Thinking exercise
    </span>
  );
}

// Cross-cutting lens marker — appears on early-stage pieces in any category.
function StartupChip() {
  return (
    <span className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-bg-secondary text-text-secondary font-medium inline-flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34C759' }} aria-hidden />
      Startup
    </span>
  );
}

function StudyCard({ study, index }: { study: Study; index: number }) {
  const meta = CATEGORY_META[study.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={study.href ?? `/casestudies/${study.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -6 }}
          whileTap={{ y: -3 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-border-default rounded-sm overflow-hidden transition-[box-shadow,border-color] duration-500 group-hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)] dark:group-hover:shadow-[0_18px_50px_-15px_rgba(0,0,0,0.6)] group-hover:border-border-hover"
        >
          {/* Accent bar — scales vertically on hover for a subtle "lift" cue */}
          <div
            className="w-full origin-top transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-[1.75]"
            style={{ height: 4, background: study.accentColor }}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
            {/* Left: content */}
            <div className="p-8 md:p-10">
              <div className="flex items-center flex-wrap gap-3 mb-5">
                <CategoryBadge study={study} />
                {study.startup && <StartupChip />}
                <span className="text-[10px] uppercase tracking-widest text-text-muted">
                  {study.company}
                </span>
                <span className="text-[10px] text-text-muted opacity-40">/</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted">
                  {formatDate(study.slug)}
                </span>
                <span className="text-[10px] text-text-muted opacity-40">/</span>
                <span className="text-[10px] uppercase tracking-widest text-text-muted">
                  {study.readMin} min read
                </span>
              </div>

              <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight leading-[0.95] mb-4 group-hover:text-text-secondary transition-colors">
                {study.title}
              </h3>

              <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-6">
                {study.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border-default rounded-full px-3 py-1 text-[9px] uppercase tracking-widest text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors"
                style={{ color: study.accentColor }}
              >
                {meta.cta}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </div>

            {/* Right: metric */}
            <div
              className="hidden md:flex flex-col items-center justify-center px-12 py-10 min-w-[200px]"
              style={{ background: study.bgColor }}
            >
              <span
                className="font-display font-bold text-4xl leading-none mb-2"
                style={{ color: study.accentColor }}
              >
                {study.metric.value}
              </span>
              <span
                className="text-[10px] uppercase tracking-widest text-center"
                style={{ color: study.accentColor, opacity: 0.7 }}
              >
                {study.metric.label}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function CaseStudiesContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const [filter, setFilter] = useState<Filter>('All');

  const counts = useMemo(
    () => ({
      All: caseStudies.length,
      Shipped: caseStudies.filter((s) => s.category === 'Shipped').length,
      Teardown: caseStudies.filter((s) => s.category === 'Teardown').length,
      Thinking: caseStudies.filter((s) => s.category === 'Thinking').length,
      Startup: caseStudies.filter((s) => s.startup).length,
    }),
    []
  );

  // "All" shows every category as its own labeled group, in order.
  // A category filter shows just that group.
  // "Startup" is a lens: it keeps the same groups but slices each to the
  // early-stage pieces, dropping any group that ends up empty.
  const visibleGroups = useMemo(() => {
    const startupLens = filter === 'Startup';
    const cats = filter === 'All' || startupLens ? CATEGORY_ORDER : [filter];
    return cats
      .map((cat) => ({
        cat,
        meta: CATEGORY_META[cat],
        items: caseStudies
          .filter((s) => s.category === cat && (!startupLens || s.startup))
          .sort(byDateDesc),
      }))
      .filter((g) => g.items.length > 0)
      // Lead with the group that holds the most recently published piece, so
      // the newest work is always at the top of the page (items are already
      // sorted newest-first, so items[0] is each group's freshest date).
      .sort((a, b) => (DATES[b.items[0].slug] ?? '').localeCompare(DATES[a.items[0].slug] ?? ''));
  }, [filter]);

  return (
    <>
      {/* Hero */}
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
            <SectionMarker label="Work · Teardowns · Thinking" className="mb-8" />

            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6">
              Selected
              <span className="font-serif italic font-normal normal-case text-4xl md:text-6xl"> work</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl">
              Three kinds of work, in one place: products I <strong className="text-text-primary font-semibold">shipped</strong>,
              {' '}<strong className="text-text-primary font-semibold">teardowns</strong> of products I actually use, and
              {' '}<strong className="text-text-primary font-semibold">thinking exercises</strong> on companies I don&apos;t work for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter chips — sticky so they stay reachable while scrolling */}
      <section className="sticky top-28 md:top-32 z-30 bg-bg-primary/85 backdrop-blur-md border-y border-border-default/60 py-3">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {FILTERS.map((f) => {
              const active = filter === f;
              const label = f === 'All' || f === 'Startup' ? f : CATEGORY_META[f].chip;
              return (
                <Fragment key={f}>
                  {/* divider: Startup is a cross-cutting lens, not a category */}
                  {f === 'Startup' && (
                    <span className="hidden sm:block w-px h-5 bg-border-default self-center mx-1" aria-hidden />
                  )}
                  <button
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest border transition-colors cursor-pointer ${
                      active
                        ? 'bg-text-primary text-bg-primary border-text-primary'
                        : 'border-border-default text-text-muted hover:text-text-primary hover:border-border-hover'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`text-[10px] ${active ? 'opacity-70' : 'opacity-60'}`}>
                      {counts[f]}
                    </span>
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grouped, labeled sections */}
      <section className="py-12">
        <div className="container-wide flex flex-col gap-16">
          {visibleGroups.map((group) => (
            <div key={group.cat} id={group.cat.toLowerCase()} className="scroll-mt-32">
              {/* Section header */}
              <div className="mb-7 pb-4 border-b border-border-default/70">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight leading-none">
                    {group.meta.plural}
                  </h2>
                  <span className="text-xs text-text-muted tracking-widest">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm text-text-muted mt-2 max-w-xl">{group.meta.intro}</p>
              </div>

              {/* Cards */}
              <motion.div layout className="flex flex-col gap-8">
                <AnimatePresence mode="popLayout">
                  {group.items.map((study, i) => (
                    <StudyCard key={study.slug} study={study} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-bg-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight leading-[0.95] mb-4">
              That&apos;s the work.
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Products I shipped, teardowns of things I use, and thinking on companies I don&apos;t
              work for. If a problem like these is on your desk, I&apos;d like to hear about it.
            </p>
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-2 text-sm font-medium tracking-wide text-text-primary"
            >
              Start a conversation
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover/cta:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
