import type { WorkExperience } from '@/types';

export const workExperiences: WorkExperience[] = [
  {
    id: '0',
    slug: 'aatram',
    company: 'Aatram',
    role: 'Co-Founder & Product Manager',
    type: 'full-time',
    startDate: '2026-02',
    endDate: 'Present',
    location: 'Tempe, AZ',
    description:
      'Built a 0-to-1 iOS app (SwiftUI, CoreML, Supabase) with a 2-engineer team — live on the App Store.',
    highlights: [
      'Ran 10+ user interviews, defined 3 procrastination personas, and iterated onboarding and scoring to hit 35–40% D7 retention (2x category average) on $0 ad spend',
      'Benchmarked 12+ competitors and found every top-10 productivity app treats procrastination as a time problem. Used that gap to lead a full product pivot: killed 7 features and rebuilt the app around emotion-rated tasks and a predictive engine',
      'Users were creating tasks but never starting them, so built and tested a re-engagement notification system across 15+ rounds, lifting first-notification tap rate from ~30% to ~50%',
      'After interviews showed accountability was the top retention driver, shipped friend circles (up to 5 per group) with real-time presence and weekly leaderboards; majority of active users joined at least one',
    ],
    metrics: [
      { value: '35–40%', label: 'D7 Retention', context: '2x category average' },
      { value: '~30→50%', label: 'Notification Tap Rate', context: '15+ test rounds' },
      { value: '7', label: 'Features Killed', context: 'in the pivot to emotion-rated tasks' },
      { value: '12+', label: 'Competitors Benchmarked', context: 'found the time-vs-emotion gap' },
    ],
    skills: ['Product Strategy', '0-to-1', 'User Research', 'iOS', 'SwiftUI', 'CoreML', 'Supabase', 'GTM'],
    thumbnail: '/work/aatram.svg',
    featured: true,
  },
  {
    id: '1',
    slug: 'ikt-india',
    company: 'IKT INDIA',
    role: 'Product Manager',
    type: 'full-time',
    startDate: '2023-11',
    endDate: '2024-08',
    location: 'Hyderabad, India',
    description:
      'Seed-stage B2B handloom marketplace. Led seller-side product with a 3-engineer team.',
    highlights: [
      'Ran a 2-week price floor test on ~50 SKUs. Order volume held, so rolled it out across 500+ SKUs and renegotiated supplier terms, moving gross margin from 25% to 40%',
      'Grew vendor base from 20 to 45+ (2.3x) and doubled monthly GMV through localized outreach, expanding the marketplace into 2 new cities',
      'Cut seller onboarding from 3 days to 6 hours with verification automation and bulk catalog upload; defined 48-hour first-listing rate as the activation metric, improving it from 30% to 60%',
      'Pulled seller activity data into a health dashboard (SQL + Mixpanel) and set up 7-day inactivity triggers (email + SMS) with follow-up outreach, improving 60-day active-seller retention by 20%',
    ],
    metrics: [
      { value: '2.3x', label: 'Vendor Growth', context: '20 → 45+ in 9 months' },
      { value: '30→60%', label: '48-hr First-Listing Rate', context: 'activation metric' },
      { value: '20%', label: 'Retention Uplift', context: '60-day active-seller retention' },
      { value: '25→40%', label: 'Gross Margin', context: 'price floor test across 500+ SKUs' },
    ],
    skills: ['Product Strategy', 'User Research', 'SQL', 'Mixpanel', 'Agile/Scrum', 'B2B Marketplaces', 'Roadmap Planning'],
    thumbnail: '/work/ikt-india.svg',
    featured: true,
    caseStudy: {
      overview:
        'IKT INDIA is a B2B handloom marketplace connecting traditional Indian artisans with retailers. As Product Manager, I owned the end-to-end product lifecycle — from discovery and user research through delivery and iteration. My primary focus was scaling the vendor network and improving key activation and retention metrics.',
      challenge:
        'When I joined, the platform had ~20 vendors and was struggling with low activation rates and poor retention. Artisans found the onboarding process confusing, and the KYC-to-first-listing funnel had major drop-offs. The engineering team was small (3 people), so every feature had to be ruthlessly prioritized.',
      challengePoints: [
        'Low vendor activation — many signed up but never completed KYC or listed products',
        'High churn among vendors in the first 60 days',
        'Complex onboarding for non-tech-savvy artisans in rural India',
        'Limited engineering bandwidth requiring impact/effort prioritization',
        'No existing analytics infrastructure for tracking user behavior',
      ],
      approach: [
        {
          phase: 'Discovery & Research',
          description:
            'Conducted seller interviews and mapped the end-to-end journey. Identified critical drop-off points in the onboarding funnel that informed the PRD for a redesigned flow.',
        },
        {
          phase: 'Verification & Catalog',
          description:
            'Shipped seller verification flow and bulk catalog upload with the 3-engineer team. Streamlined KYC-to-first-listing path, reducing seller setup time dramatically.',
        },
        {
          phase: 'Growth & Expansion',
          description:
            'Built seller acquisition playbook and prioritized backlog using impact/effort scoring. Launched in 2 new markets that contributed 20% of new vendor signups.',
        },
        {
          phase: 'Analytics & Retention',
          description:
            'Defined KPIs and built seller analytics dashboard using SQL and Mixpanel. Identified at-risk sellers early and implemented retention interventions.',
        },
      ],
      decisions: [
        {
          decision: 'Shipped seller verification flow with bulk catalog upload',
          context:
            'Data showed most vendors dropped off between KYC and first listing. Bulk upload removed the friction of adding products one by one.',
          outcome:
            '48-hour first-listing rate went from 30% to 60%. Seller setup time reduced from 3 days to 6 hours.',
        },
        {
          decision: 'Built seller analytics dashboard before adding new features',
          context:
            'Without visibility into seller health metrics, we were flying blind on retention. Needed data to identify at-risk sellers.',
          outcome:
            '60-day retention improved by 20% (relative lift in repeat orders). Could proactively intervene with disengaged sellers.',
        },
        {
          decision: 'Led pricing strategy across 500+ SKUs',
          context:
            'Gross margins were thin at 25%, threatening unit economics. Needed a systematic pricing approach across the catalog.',
          outcome:
            'Improved gross margin from 25% to 40% via price floors, category mix optimization, and supplier renegotiation.',
        },
      ],
      results:
        'Over 9 months, scaled the marketplace from 20 to 45+ vendors (2.3x growth), doubling monthly GMV. 48-hour first-listing rate doubled (30% → 60%), 60-day retention improved 20%, and gross margin grew from 25% to 40% through pricing strategy.',
      learnings:
        'The biggest lesson was the power of talking to sellers directly. Field context changed my understanding of what "simple" means for different user segments. Data-informed decisions beat gut feelings, but you need qualitative context to interpret the numbers correctly.',
      whatWouldChange:
        'I would have invested in analytics infrastructure earlier. We lost valuable data in the first months because tracking wasn\'t set up properly. I also would have pushed harder for a mobile-first approach from day one — many artisans primarily used low-end smartphones.',
    },
  },
  {
    id: '2',
    slug: 'ikt-india-intern',
    company: 'IKT INDIA',
    role: 'Product Management Intern',
    type: 'internship',
    startDate: '2023-05',
    endDate: '2023-10',
    location: 'Hyderabad, India',
    description:
      'Conducted 15+ seller interviews, mapped end-to-end journey, and identified 3 drop-off points; authored PRDs and user stories for seller verification; promoted to Product Manager.',
    highlights: [
      'Conducted 15+ seller interviews, mapped end-to-end journey, and identified 3 drop-off points; authored PRDs and user stories for seller verification; promoted to Product Manager',
    ],
    metrics: [
      { value: '15+', label: 'Seller Interviews', context: 'end-to-end journey mapping' },
      { value: '3', label: 'Drop-off Points Found', context: 'informed PRD redesign' },
    ],
    skills: ['User Research', 'PRD Writing', 'Journey Mapping', 'Stakeholder Management'],
    thumbnail: '/work/ikt-india-intern.svg',
    featured: false,
  },
  {
    id: '3',
    slug: 'gangothri-nutrients',
    company: 'Gangothri Nutrients',
    role: 'Product Operations Intern',
    type: 'internship',
    startDate: '2023-01',
    endDate: '2023-04',
    location: 'Hyderabad, India',
    description:
      'Planned GTM rollout across a 3,700+ dealer network and built demand forecasting models to reduce regional overstocking during off-peak seasons.',
    highlights: [
      'Planned go-to-market rollout across a 3,700+ dealer network spanning multiple regions',
      'Built demand forecasting models to reduce regional overstocking during off-peak seasons',
    ],
    metrics: [
      { value: '3,700+', label: 'Dealer Network', context: 'GTM rollout scope' },
    ],
    skills: ['Go-to-Market', 'Demand Forecasting', 'Supply Chain', 'Data Analysis'],
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
