import type { WorkExperience } from '@/types';

export const workExperiences: WorkExperience[] = [
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
      'Scaled B2B handloom marketplace from 20 to 45+ vendors (2.3x in 9 months), reaching INR 15L+ monthly GMV. Owned product roadmap across seller onboarding, catalog management, and order fulfillment.',
    highlights: [
      'Scaled B2B handloom marketplace from 20 → 45+ vendors (2.3x in 9 months), reaching INR 15L+ monthly GMV',
      'Shipped seller verification flow and bulk catalog upload with 3-engineer team; improved activation (KYC → first listing) by 30-35%',
      'Built seller acquisition playbook and prioritized backlog using impact/effort scoring; launched in 2 new markets contributing 20% of new vendor signups',
      'Defined KPIs and built seller analytics dashboard (SQL/Mixpanel); identified at-risk sellers and improved 60-day retention by 20%',
    ],
    metrics: [
      { value: '2.3x', label: 'Vendor Growth', context: '20 → 45+ in 9 months' },
      { value: '30-35%', label: 'Activation Improvement', context: 'KYC to first listing' },
      { value: '20%', label: 'Retention Uplift', context: '60-day repeat orders' },
      { value: '15L+', label: 'Monthly GMV (INR)', context: 'revenue milestone' },
    ],
    skills: ['Product Strategy', 'User Research', 'SQL', 'Mixpanel', 'Agile/Scrum', 'B2B Marketplaces', 'Roadmap Planning'],
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
            'Activation improved by 30-35%. Seller setup time reduced from 3 days to 6 hours.',
        },
        {
          decision: 'Built seller analytics dashboard before adding new features',
          context:
            'Without visibility into seller health metrics, we were flying blind on retention. Needed data to identify at-risk sellers.',
          outcome:
            '60-day retention improved by 20% (relative lift in repeat orders). Could proactively intervene with disengaged sellers.',
        },
        {
          decision: 'Launched in 2 new markets using acquisition playbook',
          context:
            'Needed to prove the marketplace model could scale beyond initial geography. Used impact/effort scoring to pick markets.',
          outcome:
            'New markets contributed 20% of vendor signups. Validated the playbook for future expansion.',
        },
      ],
      results:
        'Over 9 months, scaled the marketplace from 20 to 45+ vendors (2.3x growth), reaching INR 15L+ monthly GMV. Activation improved 30-35%, 60-day retention improved 20%, and successfully launched in 2 new markets.',
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
      'Conducted 15+ seller interviews and mapped end-to-end journey; identified 3 critical drop-off points that informed PRD for redesigned onboarding flow. Converted to full-time PM after 6 months.',
    highlights: [
      'Conducted 15+ seller interviews and mapped end-to-end journey',
      'Identified 3 critical drop-off points that informed PRD for redesigned onboarding flow',
      'Reduced seller setup time from 3 days to 6 hours with engineering',
      'Converted to full-time PM after 6 months',
    ],
    metrics: [
      { value: '15+', label: 'Seller Interviews', context: 'end-to-end journey mapping' },
      { value: '3→6hrs', label: 'Setup Time Reduction', context: 'from 3 days' },
      { value: '3', label: 'Drop-off Points Found', context: 'informed PRD redesign' },
    ],
    skills: ['User Research', 'PRD Writing', 'Journey Mapping', 'Stakeholder Management'],
    featured: false,
  },
  {
    id: '3',
    slug: 'gangothri-nutrients',
    company: 'Gangothri Nutrients & Fertilizers',
    role: 'Product Operations Intern',
    type: 'internship',
    startDate: '2023-01',
    endDate: '2023-04',
    location: 'Hyderabad, India',
    description:
      'Analyzed regional sales data across 3,700+ dealers to forecast demand. Supported go-to-market launch for 2 new fertilizer SKUs.',
    highlights: [
      'Analyzed regional sales data across 3,700+ dealers to forecast demand; reduced peak-season stockouts by 25%',
      'Supported go-to-market launch for 2 new fertilizer SKUs; contributed to 85% dealer adoption within first 90 days',
    ],
    metrics: [
      { value: '25%', label: 'Stockout Reduction', context: 'peak-season demand' },
      { value: '3,700+', label: 'Dealers Analyzed', context: 'regional sales data' },
      { value: '85%', label: 'Dealer Adoption', context: 'new SKUs in 90 days' },
    ],
    skills: ['Data Analysis', 'Go-to-Market', 'Demand Forecasting', 'Operations'],
    featured: false,
  },
];

export function getWorkBySlug(slug: string): WorkExperience | undefined {
  return workExperiences.find((w) => w.slug === slug);
}

export function getFeaturedWork(): WorkExperience[] {
  return workExperiences.filter((w) => w.featured);
}
