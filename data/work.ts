import type { WorkExperience } from '@/types';

export const workExperiences: WorkExperience[] = [
  {
    id: '0',
    slug: 'aatram',
    company: 'Aatram',
    role: 'Co-Founder & Product Manager',
    type: 'full-time',
    startDate: '2026-03',
    endDate: 'Present',
    location: 'Tempe, AZ',
    description:
      'Consumer iOS app live on the App Store. 3-person founding team. Stack: SwiftUI, SwiftData, WidgetKit, FamilyControls, Apple Foundation Models, Supabase Realtime. Owned product, design, and brand.',
    highlights: [
      'Shipped V1 to the App Store in 7 days from first commit, leading product and design across a SwiftUI, SwiftData, WidgetKit, and FamilyControls stack',
      'Ran a 25-user closed beta and 16 segmented interviews across procrastination archetypes (anxious avoider, overwhelmed planner, avoidance-loop, burnt-out performer) to validate V1 and source V2 priorities',
      'Killed V1’s Plan Mode (calendar task-scheduling) after interviews surfaced that users already used Google Calendar and saw no reason to duplicate it inside a procrastination app',
      'Shipped V2 Study Rooms and Crew — 3–5 person accountability groups with live-presence notifications over Supabase Realtime — after interviews identified social accountability as the strongest consistency lever',
      'Specced an on-device nudge engine on Apple Foundation Models with a weighted urgency scorer balancing dread, time pressure, and momentum signals to decide when to interrupt vs defer',
      'Chose a logarithmic momentum meter over binary streaks to avoid reset anxiety — a known churn driver in procrastination-focused audiences — and designed a 4-zone instrument-style gauge (Starting / Building / Rolling / Locked In)',
      'Rebuilt V1 onboarding for V2 to strip friction and front-load the “how are you feeling?” emotional-state question that transforms the UI based on user answer; added Sign in with Apple and Google after V1 drop-off showed users churning before setup completion',
      'Owned end-to-end UI/UX, logo, and visual identity for the iOS app and aatram.com — building the product’s design system and brand language from scratch in Figma; positioned the app against the “discipline problem” frame competitors assume, reframing procrastination as an emotion-regulation problem',
      'Led launch marketing across LinkedIn and Instagram (organic content from founder and brand accounts) and owned Apple App Store submission, metadata, screenshots, and PostHog instrumentation for session, drop-off, and retention analytics',
    ],
    metrics: [
      { value: '7 days', label: 'From First Commit to App Store', context: '3-person founding team' },
      { value: '5.0', label: 'App Store Rating at Launch' },
      { value: '25', label: 'Closed-Beta Users', context: 'V1 validation cohort' },
      { value: '16', label: 'Archetype Interviews', context: 'sourced V2 feature priorities' },
    ],
    skills: [
      'Product Strategy',
      '0-to-1',
      'User Research',
      'UI/UX Design',
      'Brand & Visual Identity',
      'iOS / SwiftUI',
      'Apple Foundation Models',
      'Supabase Realtime',
      'PostHog',
      'GTM',
    ],
    thumbnail: '/work/aatram.svg',
    featured: true,
  },
  {
    id: '1',
    slug: 'ikt-india',
    company: 'IKT India',
    role: 'Product Manager',
    type: 'full-time',
    startDate: '2023-05',
    endDate: '2024-08',
    location: 'Hyderabad, India',
    description:
      'Seed-stage B2B handloom marketplace. Promoted from intern after 6 months. Led seller-side product with a 4-engineer team shipping across web, mobile, and ops integrations.',
    highlights: [
      'Ran a concurrent A/B test on 50 SKUs with price floors against a matched control group, held order volume flat in the test cohort, and scaled the winning variant to 500+ SKUs — lifting gross margin from 25% to 40% and doubling monthly GMV',
      'Scaled the vendor base from 20 to 75+ across multiple states by owning the seller-acquisition playbook and prioritizing regions by weaver-cluster density',
      'Cut seller onboarding from 3 days to 6 hours via verification automation, doubling first-listing rate from 30% to 60%',
      'Built a SQL + Mixpanel seller-health dashboard whose 7-day inactivity triggers lifted 60-day active-seller retention by 20%',
      'Owned weekly CAC, GMV, and gross-margin reporting that drove leadership’s acquisition and pricing decisions',
      'Ran weekly standups and sprint planning with a 4-engineer team; authored PRDs and user stories for seller verification as an intern before being promoted to PM',
    ],
    metrics: [
      { value: '20 → 75+', label: 'Vendor Growth', context: 'across multiple states' },
      { value: '2x', label: 'Monthly GMV', context: 'price-floor A/B scaled to 500+ SKUs' },
      { value: '25 → 40%', label: 'Gross Margin', context: 'held order volume flat in test cohort' },
      { value: '30 → 60%', label: '48-hr First-Listing Rate', context: 'seller activation metric' },
    ],
    skills: [
      'Product Strategy',
      'A/B Testing',
      'SQL',
      'Mixpanel',
      'Cohort Analysis',
      'Funnel Instrumentation',
      'Agile/Scrum',
      'B2B Marketplaces',
    ],
    thumbnail: '/work/ikt-india.svg',
    featured: true,
    caseStudy: {
      overview:
        'IKT India is a seed-stage B2B handloom marketplace connecting traditional Indian artisans with retailers. I joined as a PM intern, got promoted after 6 months, and owned the seller-side product with a 4-engineer team shipping across web, mobile, and ops integrations. The core job was growing the vendor network and making the unit economics work at scale.',
      challenge:
        'When I joined, the platform had ~20 vendors, 25% gross margins, and a seller funnel that leaked everywhere. Artisans signed up but never listed. The ones who listed dropped off within 60 days. And a 4-engineer team meant every feature had to be earned.',
      challengePoints: [
        'Low activation — many signed up but never completed KYC or listed products',
        'High churn among vendors in the first 60 days',
        'Complex onboarding for non-tech-savvy artisans in rural India',
        'Thin 25% gross margins threatening unit economics',
        'No analytics infrastructure — we were flying blind on seller behavior',
      ],
      approach: [
        {
          phase: 'Discovery & Research',
          description:
            'Conducted 15+ seller interviews as an intern and mapped the end-to-end journey. Identified 3 critical drop-off points that informed the PRD for a redesigned verification flow.',
        },
        {
          phase: 'Verification & Catalog',
          description:
            'Shipped seller verification automation and bulk catalog upload with the 4-engineer team. Streamlined the KYC-to-first-listing path, cutting seller setup time from 3 days to 6 hours.',
        },
        {
          phase: 'Pricing Experimentation',
          description:
            'Ran a concurrent A/B test on 50 SKUs with price floors against a matched control group. Order volume held flat in the test cohort, so I scaled the winning variant to 500+ SKUs and renegotiated supplier terms.',
        },
        {
          phase: 'Seller Acquisition Playbook',
          description:
            'Owned weekly CAC, GMV, and gross-margin reporting. Prioritized expansion regions by weaver-cluster density and grew the vendor base from 20 to 75+ across multiple states.',
        },
        {
          phase: 'Analytics & Retention',
          description:
            'Built a seller-health dashboard in SQL + Mixpanel with 7-day inactivity triggers (email + SMS) and follow-up outreach, lifting 60-day active-seller retention by 20%.',
        },
      ],
      decisions: [
        {
          decision: 'Shipped seller verification automation with bulk catalog upload',
          context:
            'Interview data showed most vendors dropped off between KYC and first listing. Bulk upload removed the friction of adding products one by one.',
          outcome:
            '48-hour first-listing rate went from 30% to 60%. Seller setup time dropped from 3 days to 6 hours.',
        },
        {
          decision: 'Tested price floors on a 50-SKU A/B cohort before scaling',
          context:
            'Gross margin was 25% and threatening unit economics, but leadership was worried raising floors would kill volume. A concurrent test with a matched control was the only way to prove the trade-off.',
          outcome:
            'Order volume held flat in the test cohort, so I scaled to 500+ SKUs and renegotiated supplier terms — lifting gross margin to 40% and doubling monthly GMV.',
        },
        {
          decision: 'Built the seller analytics dashboard before adding new features',
          context:
            'Without visibility into seller health, we couldn’t act on retention. I pushed to pause net-new features for a sprint and invest in instrumentation.',
          outcome:
            '60-day active-seller retention improved 20%. 7-day inactivity triggers let us intervene with at-risk sellers before they churned.',
        },
      ],
      results:
        'Over 15 months (intern → PM), scaled the marketplace from 20 to 75+ vendors, doubled monthly GMV, lifted gross margin from 25% to 40%, cut seller onboarding from 3 days to 6 hours, and improved 60-day retention by 20%.',
      learnings:
        'The biggest lesson was the power of talking to sellers directly. Field context changed what “simple” meant for different user segments. Data-informed decisions beat gut feelings, but you need qualitative context to interpret the numbers correctly.',
      whatWouldChange:
        'I would have invested in analytics infrastructure earlier — we lost months of behavioral data because tracking wasn’t set up. I also would have pushed harder for a mobile-first seller experience from day one; many artisans primarily used low-end smartphones.',
    },
  },
  {
    id: '2',
    slug: 'gangothri-nutrients',
    company: 'Gangothri Nutrients',
    role: 'Product Operations Intern',
    type: 'internship',
    startDate: '2023-01',
    endDate: '2023-04',
    location: 'Hyderabad, India',
    description:
      'Organic fertilizer and agri-inputs manufacturer. Built the monthly sales reporting model regional leadership uses for reviews, and co-authored an internal FAQ from clustered farmer queries.',
    highlights: [
      'Built an Excel monthly sales reporting model across 30+ SKUs and 3–5 districts, consolidating 12–18 months of ERP and distributor data and resolving 50+ duplicate SKU codes',
      'Cut regional leadership’s monthly review prep from 2–3 hours to under 45 minutes via reusable pivots and a data-refresh SOP covering SKU, territory, and channel slicing',
      'Logged 30–40 farmer and dealer queries over 6 weeks on tank-mixing and dosage for flagship products, clustered patterns with the agronomy lead, and co-authored an internal FAQ adopted by sales reps',
    ],
    metrics: [
      { value: '30+', label: 'SKUs Modeled', context: '3–5 districts, 12–18 months of data' },
      { value: '50+', label: 'Duplicate SKUs Resolved', context: 'ERP + distributor reconciliation' },
      { value: '2–3h → 45m', label: 'Monthly Review Prep', context: 'via reusable pivots + SOP' },
      { value: '30–40', label: 'Farmer Queries Clustered', context: 'internal FAQ adopted by sales' },
    ],
    skills: ['Data Analysis', 'Excel Modeling', 'Operations', 'User Research', 'Documentation'],
    thumbnail: '/work/ikt-india-intern.svg',
    featured: false,
  },
];

export function getWorkBySlug(slug: string): WorkExperience | undefined {
  return workExperiences.find((w) => w.slug === slug);
}

export function getFeaturedWork(): WorkExperience[] {
  return workExperiences.filter((w) => w.featured);
}
