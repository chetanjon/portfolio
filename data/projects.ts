import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'notion-teardown',
    title: "Strategic Product Teardown: Notion's $600M Activation Paradox",
    subtitle: 'Product Teardown — 2026',
    description:
      "Analyzed 10,000+ reviews and interviewed 10 users across 5 segments to uncover a critical onboarding gap in Notion's ~$600M ARR platform.",
    longDescription:
      "Analyzed 10,000+ reviews and interviewed 10 users across 5 segments; found 8 of 10 learned Notion's value from YouTube, not the product — revealing a critical onboarding gap. Mapped full AARRR funnel for a ~$600M ARR platform; proposed 5 RICE-scored fixes estimating 15–25% lift in 90-day activation and $40–60M incremental ARR.",
    highlights: [
      "Analyzed 10,000+ reviews and interviewed 10 users across 5 segments; found 8 of 10 learned Notion's value from YouTube, not the product — revealing a critical onboarding gap",
      'Mapped full AARRR funnel for a ~$600M ARR platform; proposed 5 RICE-scored fixes estimating 15–25% lift in 90-day activation and $40–60M incremental ARR',
    ],
    skills: ['AARRR Funnel', 'User Interviews', 'RICE Scoring', 'Product Teardown', 'ARR Modeling'],
    type: 'personal',
    year: '2026',
    status: 'completed',
    link: '/notion-teardown',
    metrics: [
      { value: '10,000+', label: 'Reviews Analyzed' },
      { value: '10', label: 'Users Interviewed' },
      { value: '5', label: 'RICE-Scored Fixes' },
      { value: '$40–60M', label: 'Est. Incremental ARR' },
    ],
    process: [
      { step: 'Review Analysis', description: 'Analyzed 10,000+ reviews across segments to identify patterns', icon: 'search' },
      { step: 'User Interviews', description: 'Interviewed 10 users across 5 segments; found YouTube-dependent onboarding', icon: 'users' },
      { step: 'AARRR Mapping', description: 'Mapped full funnel for ~$600M ARR platform', icon: 'bar-chart-3' },
      { step: 'RICE Prioritization', description: 'Proposed 5 fixes estimating 15–25% lift in 90-day activation', icon: 'check-circle' },
    ],
    color: 'from-blue-500/20 to-indigo-500/20',
    icon: 'search',
    thumbnail: '/projects/notion-teardown.svg',
  },
  {
    id: '2',
    slug: 'frictionlens',
    title: 'FrictionLens: AI App Review Intelligence Tool',
    subtitle: 'Side Project — 2026',
    description:
      'Built an AI review analyzer for indie devs and small PM teams, filling the pricing gap between $5/mo basic monitors and $179+/mo enterprise tools.',
    longDescription:
      'Found a pricing gap between $5/mo basic monitors and $179+/mo enterprise tools; built an AI review analyzer for indie devs and small PM teams. Designed "Vibe Reports" — a 5-dimension sentiment framework turning thousands of raw reviews into shareable, action-ready summaries. Built freemium GTM with SEO-optimized public reports as organic distribution; shipped full-stack on $0/mo infrastructure.',
    highlights: [
      'Found a pricing gap between $5/mo basic monitors and $179+/mo enterprise tools; built an AI review analyzer for indie devs and small PM teams',
      'Designed "Vibe Reports" — a 5-dimension sentiment framework turning thousands of raw reviews into shareable, action-ready summaries',
      'Built freemium GTM with SEO-optimized public reports as organic distribution; shipped full-stack on $0/mo infrastructure',
    ],
    skills: ['Product Strategy', 'GTM', 'Sentiment Analysis', 'Full-Stack Development', 'SEO'],
    type: 'personal',
    year: '2026',
    status: 'completed',
    link: 'https://frictionlens.net',
    metrics: [
      { value: '$0/mo', label: 'Infrastructure Cost' },
      { value: '5', label: 'Sentiment Dimensions' },
      { value: '$5–$179+', label: 'Market Gap Found' },
    ],
    process: [
      { step: 'Market Research', description: 'Identified pricing gap between basic and enterprise review tools', icon: 'search' },
      { step: 'Framework Design', description: 'Created 5-dimension "Vibe Reports" sentiment framework', icon: 'layers' },
      { step: 'GTM Strategy', description: 'Built freemium model with SEO-optimized public reports', icon: 'target' },
      { step: 'Full-Stack Build', description: 'Shipped complete product on $0/mo infrastructure', icon: 'rocket' },
    ],
    color: 'from-purple-500/20 to-violet-500/20',
    icon: 'bar-chart-3',
    thumbnail: '/projects/frictionlens.svg',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
