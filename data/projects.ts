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
    title: 'FrictionLens: AI Review Intelligence Tool',
    subtitle: 'Side Project — 2026',
    description:
      'Found a gap between $5/mo basic review monitors and $179+/mo enterprise tools; shipped a full-stack AI review analyzer 0→1 and acquired 22 users organically with $0 ad spend.',
    longDescription:
      'Found a pricing gap between $5/mo basic review monitors and $179+/mo enterprise tools; designed and shipped a full-stack AI review analyzer 0→1. ~70% of reviews get classified without any LLM call through a tiered system, keeping per-analysis cost to <$0.01 on $0/mo infrastructure. Set up a freemium funnel (2 free analyses → bring-your-own API key) with 4 ingestion channels (App Store, Play Store, Reddit, CSV) and public SEO reports for organic acquisition.',
    highlights: [
      'Found a gap between $5/mo basic review monitors and $179+/mo enterprise tools; designed and shipped a full-stack AI review analyzer 0→1, acquiring 22 users organically with $0 ad spend',
      '~70% of reviews get classified without any LLM call through a tiered system, keeping per-analysis cost to <$0.01 on $0/mo infrastructure',
      'Set up a freemium funnel (2 free analyses → bring-your-own API key) with 4 ingestion channels (App Store, Play Store, Reddit, CSV) and public SEO reports for organic acquisition',
    ],
    skills: ['Product Strategy', 'GTM', 'AI Cost Optimization', 'Full-Stack Development', 'SEO'],
    type: 'personal',
    year: '2026',
    status: 'completed',
    link: 'https://frictionlens.net',
    metrics: [
      { value: '22', label: 'Organic Users', context: '$0 ad spend' },
      { value: '<$0.01', label: 'Cost per Analysis', context: 'tiered classification' },
      { value: '~70%', label: 'Zero-LLM Classification', context: 'rules before models' },
      { value: '4', label: 'Ingestion Channels', context: 'App Store, Play, Reddit, CSV' },
    ],
    process: [
      { step: 'Market Research', description: 'Found the $5/mo vs $179+/mo pricing gap for indie PM tools', icon: 'search' },
      { step: 'Cost Architecture', description: 'Tiered classification routes ~70% of reviews without any LLM call', icon: 'layers' },
      { step: 'Freemium GTM', description: '2 free analyses → bring-your-own API key; public SEO reports for organic reach', icon: 'target' },
      { step: 'Full-Stack Ship', description: 'App Store, Play, Reddit, CSV ingestion on $0/mo infra', icon: 'rocket' },
    ],
    color: 'from-purple-500/20 to-violet-500/20',
    icon: 'bar-chart-3',
    thumbnail: '/projects/frictionlens.svg',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
