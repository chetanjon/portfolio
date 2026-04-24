'use client';

import { motion } from 'framer-motion';
import type { TimelineItem } from '@/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';

const timelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'Co-Founder & Product Manager',
    subtitle: 'Aatram (iOS App — Live on App Store)',
    description: 'Shipped V1 in 7 days from first commit with a 3-person founding team on SwiftUI, SwiftData, WidgetKit, and FamilyControls. 5.0 launch rating, 25-user closed beta, 16 archetype interviews. Owned UI/UX, brand, and aatram.com end-to-end.',
    type: 'work',
  },
  {
    year: '2026',
    title: 'FrictionLens (Live Side Project)',
    subtitle: 'frictionlens.net',
    description: 'Full-stack AI review analyzer on Next.js, TypeScript, Supabase, Gemini, Upstash Redis. Tiered classifier with Zod-validated structured outputs, BYOK AES-256-GCM key storage, SSE + Inngest streaming, and public "Vibe Report" pages.',
    type: 'work',
  },
  {
    year: '2025',
    title: 'Innovation Index Analysis (G20 vs Non-G20)',
    subtitle: 'ASU MOT Coursework — 2-person team',
    description: 'Python analysis on a 1,862-record dataset (130 countries, 13 years) merged from WIPO, World Bank, UNESCO. Surfaced 15 non-G20 overperformers (F=19.14, p<0.001) and a counter-finding: education explains only 7.3% of innovation variance.',
    type: 'education',
  },
  {
    year: '2024',
    title: 'M.S. in Management of Technology',
    subtitle: 'Arizona State University, Tempe, AZ — 3.7 GPA',
    description: 'Graduate studies in technology management; expected graduation May 2026.',
    type: 'education',
  },
  {
    year: '2025',
    title: 'CSPO + Digital Product Management',
    subtitle: 'Scrum Alliance · University of Virginia (Coursera)',
    description: 'Certified Scrum Product Owner and Digital Product Management certification (UVA). Deepened Agile and digital-product discipline.',
    type: 'certification',
  },
  {
    year: '2023',
    title: 'Product Manager (Promoted from Intern)',
    subtitle: 'IKT India',
    description: 'Scaled the B2B handloom marketplace from 20 to 75+ vendors across multiple states. Ran a 50-SKU price-floor A/B that scaled to 500+ SKUs — lifting gross margin 25% → 40% and doubling monthly GMV. 4-engineer team.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Product Operations Intern',
    subtitle: 'Gangothri Nutrients',
    description: 'Built an Excel monthly sales model across 30+ SKUs and 3–5 districts from 12–18 months of ERP/distributor data. Resolved 50+ duplicate SKU codes, cut review prep 2–3h → 45m, co-authored an internal FAQ from 30–40 clustered farmer queries.',
    type: 'work',
  },
  {
    year: '2019',
    title: 'B.Tech in Electrical & Electronics Engineering',
    subtitle: 'JNTU Hyderabad, India',
    description: 'Completed undergraduate studies in electrical and electronics engineering.',
    type: 'education',
  },
];

const typeDotColor = {
  education: 'bg-accent-secondary',
  work: 'bg-accent-primary',
  certification: 'bg-accent-tertiary',
};

export function Timeline() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="relative"
    >
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-default md:-translate-x-px" />

      {timelineData.map((item, i) => (
        <motion.div
          key={`${item.year}-${item.title}`}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className={cn(
            'relative pl-12 md:pl-0 mb-10 last:mb-0',
            i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
          )}
        >
          <div
            className={cn(
              'absolute left-2.5 md:left-1/2 w-3 h-3 rounded-full border-2 border-bg-primary md:-translate-x-1.5 top-1.5',
              typeDotColor[item.type]
            )}
          />

          <div className={cn('p-4 rounded-xl bg-bg-secondary border border-border-default', i % 2 === 0 ? 'md:mr-8' : 'md:ml-8')}>
            <span className="text-xs font-medium text-accent-primary">{item.year}</span>
            <h4 className="text-base font-semibold text-text-primary mt-1">{item.title}</h4>
            <p className="text-sm text-text-tertiary">{item.subtitle}</p>
            <p className="text-sm text-text-secondary mt-2">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
