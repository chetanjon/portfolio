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
    description: 'Shipped 0-to-1 with 2 engineers; hit 35–40% D7 retention (2x category avg) on $0 ad spend. Led the pivot that killed 7 features and rebuilt around emotion-rated tasks.',
    type: 'work',
  },
  {
    year: '2026',
    title: 'FrictionLens (Live Side Project)',
    subtitle: 'frictionlens.net',
    description: 'AI review analyzer 0→1. 22 organic users, <$0.01 per analysis via tiered classification, $0/mo infrastructure.',
    type: 'work',
  },
  {
    year: '2024',
    title: 'M.S. in Management of Technology',
    subtitle: 'Arizona State University, Tempe, AZ',
    description: 'Pursuing graduate studies in technology management.',
    type: 'education',
  },
  {
    year: '2025',
    title: 'CSPO Certification',
    subtitle: 'Scrum Alliance',
    description: 'Certified Scrum Product Owner — deepened Agile product management expertise.',
    type: 'certification',
  },
  {
    year: '2023',
    title: 'Product Manager',
    subtitle: 'IKT INDIA',
    description: 'Scaled B2B handloom marketplace from 20 → 45+ vendors. Doubled GMV, 48-hr first-listing rate 30% → 60%, gross margin 25% → 40%.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Product Management Intern',
    subtitle: 'IKT INDIA',
    description: 'Conducted 15+ seller interviews, identified 3 drop-off points. Authored PRDs; promoted to Product Manager.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Product Operations Intern',
    subtitle: 'Gangothri Nutrients',
    description: 'Planned GTM rollout across a 3,700+ dealer network; built demand forecasting models to reduce off-peak overstocking.',
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
