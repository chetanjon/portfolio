import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'notion-teardown',
    title: "Strategic Product Teardown: Notion's Activation Paradox",
    subtitle: 'Product Teardown · 2026',
    description:
      "Ran 10 qualitative interviews across 5 segments and triangulated with G2, Trustpilot, Reddit r/Notion, and Hacker News, surfacing an activation gap where 8 of 10 interviewees learned core product value from YouTube, not in-product onboarding.",
    longDescription:
      "Ran 10 qualitative interviews across 5 user segments (heavy users, team admins, students, creators, churned) and triangulated with G2, Trustpilot, Reddit r/Notion, and Hacker News review data. 8 of 10 interviewees learned Notion’s core value from YouTube, not from the product. Mapped the full AARRR funnel, proposed 5 RICE-scored fixes prioritizing top-of-funnel onboarding redesign for 90-day activation lift, and developed the “workspace decay” concept: productivity workspaces lose value when original creators leave organizations, framing AI agents as workspace stewards rather than setup accelerators.",
    highlights: [
      'Ran 10 qualitative interviews across 5 user segments and triangulated findings with G2, Trustpilot, Reddit r/Notion, and Hacker News review data',
      'Identified an activation gap where 8 of 10 interviewees learned core product value from YouTube rather than in-product onboarding',
      'Mapped the AARRR funnel and proposed 5 RICE-scored fixes prioritizing top-of-funnel onboarding redesign for 90-day activation lift',
      'Developed the “workspace decay” concept: productivity workspaces lose value when original creators leave organizations, framing AI agents as workspace stewards rather than setup accelerators',
    ],
    skills: ['AARRR Funnel', 'User Interviews', 'RICE Scoring', 'Product Teardown', 'Workspace Decay Framework'],
    type: 'personal',
    year: '2026',
    status: 'completed',
    link: '/notion-teardown',
    metrics: [
      { value: '10', label: 'Qualitative Interviews', context: 'across 5 user segments' },
      { value: '8 / 10', label: 'Learned Value From YouTube', context: 'not in-product onboarding' },
      { value: '5', label: 'RICE-Scored Fixes', context: 'prioritized for 90-day activation' },
      { value: '4', label: 'External Review Sources', context: 'G2, Trustpilot, Reddit, HN' },
    ],
    process: [
      { step: 'Qualitative Research', description: '10 interviews across 5 segments (heavy users, admins, students, creators, churned)', icon: 'users' },
      { step: 'Review Triangulation', description: 'Cross-checked against G2, Trustpilot, Reddit r/Notion, and Hacker News', icon: 'search' },
      { step: 'AARRR Mapping', description: 'Mapped full funnel and surfaced the YouTube-as-onboarding activation gap', icon: 'bar-chart-3' },
      { step: 'RICE Prioritization', description: '5 scored fixes with top-of-funnel onboarding redesign as the load-bearing bet', icon: 'check-circle' },
    ],
    color: 'from-blue-500/20 to-indigo-500/20',
    icon: 'search',
    thumbnail: '/projects/notion-teardown.svg',
  },
  {
    id: '2',
    slug: 'frictionlens',
    title: 'FrictionLens: AI Review Intelligence Tool',
    subtitle: 'Side Project · 2026',
    description:
      'Full-stack AI review analyzer (Next.js, TypeScript, Supabase, Gemini, Upstash Redis) that ingests App Store, Play Store, Reddit, and CSV into a single report, with BYOK AES-256-GCM key storage and public “Vibe Report” pages as a built-in distribution surface.',
    longDescription:
      'Shipped a full-stack AI review analyzer on Next.js, TypeScript, Supabase, Google Gemini, and Upstash Redis that ingests reviews from App Store, Play Store, Reddit, and CSV into a single report. Designed a tiered classifier that routes short reviews through rule-based scoring and batches longer ones into Gemini with Zod-validated structured outputs, staying within free-tier rate limits via inter-batch throttling. Built BYOK architecture with AES-256-GCM encrypted per-user key storage, SSE progress streaming with an Inngest background-job fallback, and shareable public “Vibe Report” pages with OG-image generation as a built-in distribution surface. Made cost-efficiency the primary design constraint, benchmarking classifier tiers against Gemini API cost curves to stay within free-tier volume across typical review workloads.',
    highlights: [
      'Shipped a full-stack AI review analyzer (Next.js, TypeScript, Supabase, Google Gemini, Upstash Redis) that ingests App Store, Play Store, Reddit, and CSV reviews into one report',
      'Designed a tiered classifier that routes short reviews through rule-based scoring and batches longer ones into Gemini with Zod-validated structured outputs, staying within free-tier rate limits via inter-batch throttling',
      'Built BYOK architecture with AES-256-GCM encrypted per-user key storage, SSE progress streaming with Inngest background-job fallback, and shareable public “Vibe Report” pages with OG-image generation as a built-in distribution surface',
      'Made cost-efficiency the primary design constraint, benchmarking classifier tiers against Gemini API cost curves to stay within free-tier volume across typical review workloads',
    ],
    skills: [
      'Product Strategy',
      'AI Cost Optimization',
      'Next.js',
      'TypeScript',
      'Supabase',
      'Structured Outputs (Zod)',
      'GTM',
    ],
    type: 'personal',
    year: '2026',
    status: 'completed',
    link: 'https://frictionlens.net',
    metrics: [
      { value: '4', label: 'Ingestion Channels', context: 'App Store, Play, Reddit, CSV' },
      { value: 'AES-256-GCM', label: 'BYOK Key Storage', context: 'per-user encrypted' },
      { value: 'SSE + Inngest', label: 'Progress Streaming', context: 'with background-job fallback' },
      { value: 'Free-Tier', label: 'Cost Envelope', context: 'tiered classifier stays inside Gemini limits' },
    ],
    process: [
      { step: 'Architecture', description: 'Tiered classifier: rules for short reviews, Gemini + Zod for longer ones', icon: 'layers' },
      { step: 'Security', description: 'BYOK with AES-256-GCM encrypted per-user key storage', icon: 'lock' },
      { step: 'Streaming', description: 'SSE progress + Inngest background-job fallback for long analyses', icon: 'activity' },
      { step: 'Distribution', description: 'Public “Vibe Report” pages with OG-image generation as a built-in growth surface', icon: 'share-2' },
    ],
    color: 'from-purple-500/20 to-violet-500/20',
    icon: 'bar-chart-3',
    thumbnail: '/projects/frictionlens.svg',
  },
  {
    id: '3',
    slug: 'innovation-index-analysis',
    title: 'Innovation Index Analysis: G20 vs Non-G20',
    subtitle: 'ASU MOT Coursework · Fall 2025',
    description:
      'Python analysis on a 1,862-record innovation dataset spanning 130 countries and 13 years. Surfaced 15 non-G20 countries scoring above the G20 average and found education explains only 7.3% of innovation variance, a counter-finding to the dominant policy narrative.',
    longDescription:
      'Built a Python analysis on a 1,862-record innovation dataset spanning 130 countries and 13 years, merged from WIPO, World Bank, and UNESCO sources. Ran t-tests and ANOVA comparing G20 vs non-G20 innovation scores (F=19.14, p<0.001) and surfaced 15 non-G20 countries scoring above the G20 average. Tested an education-spending-to-innovation hypothesis via linear regression and reported the counter-finding that education explains only 7.3% of innovation variance (R²=0.07). Wrote a 22-page analysis paper translating statistical findings into policy-relevant recommendations for a 2-person team.',
    highlights: [
      'Built a Python analysis on a 1,862-record innovation dataset spanning 130 countries and 13 years, merged from WIPO, World Bank, and UNESCO sources',
      'Ran t-tests and ANOVA comparing G20 vs non-G20 innovation scores and surfaced 15 non-G20 countries scoring above the G20 average (F=19.14, p<0.001)',
      'Tested an education-spending-to-innovation hypothesis via linear regression and reported the counter-finding that education explains only 7.3% of innovation variance (R²=0.07)',
      'Wrote a 22-page analysis paper translating statistical findings into policy-relevant recommendations for a 2-person team',
    ],
    skills: ['Python', 'Statistical Analysis', 'ANOVA', 'Linear Regression', 'Policy Analysis', 'Data Visualization'],
    type: 'academic',
    year: '2025',
    status: 'completed',
    metrics: [
      { value: '1,862', label: 'Dataset Records', context: '130 countries · 13 years' },
      { value: 'F=19.14', label: 'G20 vs Non-G20 ANOVA', context: 'p<0.001' },
      { value: '15', label: 'Non-G20 Overperformers', context: 'above the G20 average' },
      { value: 'R²=0.07', label: 'Education → Innovation', context: 'counter to dominant narrative' },
    ],
    process: [
      { step: 'Data Merge', description: 'Consolidated WIPO, World Bank, and UNESCO sources into a clean 1,862-record dataset', icon: 'layers' },
      { step: 'Hypothesis Testing', description: 't-tests and ANOVA across G20 vs non-G20 groupings', icon: 'bar-chart-3' },
      { step: 'Regression', description: 'Linear regression on education spending → innovation score', icon: 'trending-up' },
      { step: 'Policy Translation', description: '22-page paper translating statistical findings into policy recommendations', icon: 'file-text' },
    ],
    color: 'from-emerald-500/20 to-teal-500/20',
    icon: 'bar-chart-3',
    thumbnail: '/projects/global-innovation-analytics.svg',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
