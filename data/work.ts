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
    location: 'Phoenix, AZ',
    description:
      'Consumer iOS app live on the App Store, bootstrapped. 3-person founding team. Stack: SwiftUI, SwiftData, Supabase, Apple Foundation Models. Owned product, design, and brand.',
    highlights: [
      'Co-founded Aatram with two friends; shipped V1 to App Store in 7 days of intensive build, followed by a V2 anti-interruption rewrite now live, free, bootstrapped, and built without ad spend',
      'Co-built the codebase across 158 commits with a 3-person team on SwiftUI, SwiftData, Supabase, and Apple Foundation Models while owning UI/UX, brand voice, an 18-component design system with hex-locked tokens, motion language, and aatram.com end-to-end',
      'Ran a 25-user closed beta and 16 archetype interviews that drove V2 priorities: killed Plan Mode after Google Calendar overlap surfaced, encoded "no leaderboards" at the schema level so ranking is a compile-time impossibility, and chose stopwatch over countdown because deadlines increase dread for avoidance-prone users',
      'Specced an on-device AI nudge engine on Apple Foundation Models with the Intelligent Notification Engine (5 escalating touches per task), PredictiveEngine (abandonment-risk detection above 0.7), and UrgencyScorer; task content never leaves the device by structural type constraint',
      'Drove the pre-submission audit closing 22 findings; shepherded build 3 through App Review with screen-recording proof for guideline 5.1.1(v); owned PostHog instrumentation across session, drop-off, retention, and onboarding funnel surfaces',
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
    caseStudy: {
      overview:
        'Aatram is a consumer iOS app live on the App Store, free and bootstrapped, built by a 3-person founding team. I co-founded the company and own product, design, and brand. Co-built the codebase across 158 commits on SwiftUI, SwiftData, Supabase, and Apple Foundation Models. Owned an 18-component design system on hex-locked tokens, a vector logo drawn as 80 SwiftUI Canvas stroke segments, motion language with named timing values, and an anti-cheerleader brand voice codified as a 7-Always / 13-Never ruleset. The strategic bet underneath every decision: procrastination is not a discipline problem. It is an emotion-regulation problem. The entire habit-tracker category assumes the opposite, which is why most of its users have tried three apps and still procrastinate.',
      challenge:
        'The habit-tracker market is saturated with streaks, calendars, and to-do lists, and users still procrastinate. The discipline frame is the problem, not the solution. We had to validate an emotion-regulation thesis, ship it on a 3-person team with no PM-eng-design separation, and stand out in a category where the incumbents already won the discipline game.',
      challengePoints: [
        'Crowded habit-tracker market with strong incumbents owning the discipline frame',
        'No way to validate the emotion-regulation thesis without shipping a real product',
        '3-person founding team: every spec had to earn its build cost',
        'iOS-only stack with on-device ML constraints (Apple Foundation Models, FamilyControls)',
        'Procrastination-prone audiences are highly sensitive to streak resets, a known churn driver in the segment we were targeting',
      ],
      approach: [
        {
          phase: 'Thesis & Positioning',
          description:
            'Reframed procrastination as an emotion-regulation problem and positioned aatram.com against the “discipline problem” frame the category assumes. Wrote the brand voice, visual identity, and landing page from scratch in Figma to make the reframe visible from the first scroll.',
        },
        {
          phase: 'V1 in 7 Days',
          description:
            'Shipped V1 to the App Store 7 days after first commit with a 3-person team across SwiftUI, SwiftData, WidgetKit, and FamilyControls. Treated V1 as a learning artifact, not a finished product: the goal was to earn the right to do user research with shipped software in users’ hands.',
        },
        {
          phase: 'Segmented User Research',
          description:
            'Ran a 25-user closed beta and 16 segmented interviews across four procrastination archetypes (anxious avoider, overwhelmed planner, avoidance-loop, burnt-out performer). Used the archetype taxonomy to source V2 priorities and decide which V1 surfaces to kill, keep, or expand.',
        },
        {
          phase: 'V2 Pivot',
          description:
            'Killed V1’s Plan Mode and shipped Study Rooms and Crew (3–5 person accountability groups with live-presence notifications over Supabase Realtime) after interviews identified social accountability as the strongest consistency lever. Rebuilt onboarding to front-load the emotional-state question that transforms the UI based on user answer.',
        },
        {
          phase: 'Launch & Instrumentation',
          description:
            'Owned Apple App Store submission, metadata, and screenshots. Stood up PostHog instrumentation covering session, drop-off, and retention. Led organic launch marketing across LinkedIn and Instagram from founder and brand accounts.',
        },
      ],
      decisions: [
        {
          decision: 'Positioned against the discipline frame the entire category assumes',
          context:
            'Interviews showed users had tried multiple habit apps and still procrastinated. The discipline frame was the problem, not the solution. Choosing to fight the category positioning was a real bet: it limited the comparison set but earned a story no incumbent could tell.',
          outcome:
            'aatram.com leads with the emotion-regulation reframe, and the V2 onboarding now front-loads the emotional-state question that transforms the UI based on user answer.',
        },
        {
          decision: 'Killed V1’s Plan Mode instead of expanding it',
          context:
            'Plan Mode was a calendar task-scheduling surface inside the app. 16 interviews surfaced that users already used Google Calendar and saw no reason to duplicate it inside a procrastination app: the feature added complexity without value.',
          outcome:
            'Freed engineering capacity for Crew and Study Rooms, the V2 features that interviews identified as the strongest consistency lever.',
        },
        {
          decision: 'Built Crew (social accountability) over more solo features',
          context:
            'Solo features have ceiling effects competitors had already proven. Interviews surfaced social accountability as the highest-leverage consistency mechanism for procrastination-prone users, and no incumbent in the category was building for it.',
          outcome:
            'Shipped Study Rooms and 3–5 person Crew accountability groups with live-presence notifications over Supabase Realtime in V2.',
        },
        {
          decision: 'Logarithmic momentum meter over binary streaks',
          context:
            'Binary streaks reset to zero on any miss, a known churn driver in procrastination-focused audiences, which is the exact segment we were targeting. Streak resets re-trigger the dread loop the product is supposed to solve.',
          outcome:
            'Designed a 4-zone instrument-style momentum gauge (Starting / Building / Rolling / Locked In) that degrades gracefully and absorbs misses without resetting user motivation.',
        },
        {
          decision: 'On-device nudge engine via Apple Foundation Models, not a cloud LLM',
          context:
            'Procrastination signals are intensely personal: dread, time pressure, momentum. Cloud round-trips also introduce latency that breaks the “right moment to interrupt” window the nudge engine needs to hit.',
          outcome:
            'Specced an on-device weighted urgency scorer balancing dread, time pressure, and momentum to decide when to interrupt vs defer.',
        },
      ],
      results:
        'Shipped V1 to the App Store in seven days from first commit with a 3-person founding team. Validated the emotion-regulation thesis through 16 segmented archetype interviews and a 25-user closed beta, then shipped V2 as an anti-interruption rewrite that killed 11+ surfaces (going-live pushes, in-app crew banners, the Mirror tab, em-dashes in copy, and the Profile tab among them) and restructured 5 tabs to 3 visible. Drove a 22-finding pre-submission audit and shepherded build 3 through App Review with screen-recording proof for guideline 5.1.1(v). Owned product, design, brand, App Store submission, and launch marketing end-to-end. The app is live today at aatram.com.',
      learnings:
        'Framing wins. Reframing procrastination from a discipline problem to an emotion-regulation problem was the highest-leverage decision of the entire build. It determined every feature priority that followed and made the V2 pivot obvious in retrospect. Ship-to-learn beats spec-to-perfect on a 3-person team: what we learned from users with V1 in their hands was worth more than seven weeks of spec.',
      whatWouldChange:
        'I would have front-loaded the emotional-state question in V1, not V2. The whole product hinges on it, and we lost users to onboarding drop-off before they ever experienced the reframe. I would also have instrumented PostHog from day one rather than during the App Store submission window. We lost early behavioral data that would have sharpened the V2 priorities further.',
    },
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
      'Seed-stage curated B2B marketplace for handloom and sustainable clothing brands across 15 Indian states. INR 20–35L annual revenue, 15–20 person team. Promoted from Product Operations Intern to PM in six months as the company’s first dedicated PM. Led vendor-side product with a 4-engineer team shipping across web, mobile, and ops.',
    highlights: [
      'Operated as PM at a 15–20 person seed-stage B2B marketplace for handloom and sustainable clothing brands across 15 Indian states, owning vendor-side product surfaces and partnering directly with the founders on quarterly roadmap',
      'Designed and ran a concurrent A/B test on 50 SKUs with price floors against a matched control cohort, scaled the winner to 500+ SKUs, lifting gross margin from 25% to 40% and doubling monthly GMV',
      'Cut seller onboarding from 3 days to 6 hours via verification automation, doubling first-listing rate from 30% to 60%; scaled the active vendor base from 20 to 75+ across 15 states',
      'Built a SQL + Mixpanel seller-health dashboard with 7-day inactivity triggers and re-engagement workflows, lifting 60-day vendor retention by 20 percentage points',
      'Authored PRDs and ran 2-week Scrum sprints with a 4-engineer team; owned weekly CAC, GMV, and gross-margin reporting in SQL that drove leadership’s pricing pivot from cost-plus to floor-based',
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
        'IKT India is a seed-stage curated B2B marketplace for handloom and eco-friendly sustainable clothing brands across 15 Indian states, generating INR 20–35L annual revenue with a 15–20 person team. I joined as Product Operations Intern, got promoted to PM in six months as the company’s first dedicated PM, and owned vendor-side product with a 4-engineer team shipping across web, mobile, and ops. The core job was growing the vendor network, making unit economics work at scale, and setting up the product tooling stack from scratch (Notion for PRDs, Mixpanel for instrumentation, recurring SQL for ad-hoc analysis).',
      challenge:
        'When I joined, the platform had ~20 vendors, 25% gross margins, and a seller funnel that leaked everywhere. Artisans signed up but never listed. The ones who listed dropped off within 60 days. And a 4-engineer team meant every feature had to be earned.',
      challengePoints: [
        'Low activation: many signed up but never completed KYC or listed products',
        'High churn among vendors in the first 60 days',
        'Complex onboarding for non-tech-savvy artisans in rural India',
        'Thin 25% gross margins threatening unit economics',
        'No analytics infrastructure: we were flying blind on seller behavior',
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
            'Order volume held flat in the test cohort, so I scaled to 500+ SKUs and renegotiated supplier terms, lifting gross margin to 40% and doubling monthly GMV.',
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
        'I would have invested in analytics infrastructure earlier. We lost months of behavioral data because tracking wasn’t set up. I also would have pushed harder for a mobile-first seller experience from day one; many artisans primarily used low-end smartphones.',
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
  {
    id: '3',
    slug: 'frictionlens',
    company: 'FrictionLens',
    role: 'Solo Designer & Engineer',
    type: 'project',
    startDate: '2026-01',
    endDate: 'Present',
    location: 'Remote',
    description:
      'Full-stack AI review intelligence tool. Live at frictionlens.net. Designed and shipped the marketing site, the dashboard, and the shareable Vibe Report pages end-to-end on Next.js, TypeScript, Supabase, and Google Gemini.',
    highlights: [
      'Shipped a full-stack AI review analyzer (Next.js, React, TypeScript, Supabase with Postgres + RLS, Google Gemini AI SDK, Upstash Redis) ingesting App Store, Play Store, Reddit (OAuth), and CSV reviews into a single Vibe Report',
      'Made cost-efficiency the primary product constraint and benchmarked classifier tiers against Gemini API cost curves to stay within free-tier volume across typical review workloads',
      'Designed a 3-tier rule-based classifier (not embeddings): short reviews route through star + keyword rules with no AI; medium use keyword sentiment with no AI; long batches go to Gemini with Zod-validated structured outputs and 6.5s inter-batch throttling for free-tier 10-RPM limits',
      'Built BYOK architecture with AES-256-GCM encrypted per-user key storage, SSE progress streaming, Inngest background-job fallback, and shareable public Vibe Report pages with OG-image generation as a built-in distribution channel',
      'Designed a freemium model with 2 free analyses on gemini-2.5-flash-lite then BYOK for unlimited usage; designed and built the marketing site (positioning, type, motion) alongside the product so the landing page is the demo',
    ],
    metrics: [
      { value: '3 tiers', label: 'Cost-aware classifier routing', context: 'AI only when needed' },
      { value: '4', label: 'Review sources unified', context: 'App Store, Play Store, Reddit, CSV' },
      { value: 'AES-256-GCM', label: 'Per-user key encryption', context: 'BYOK for unlimited analyses' },
      { value: '$0', label: 'Forever tier', context: 'free for indie devs' },
    ],
    skills: [
      'Product Design',
      'Full-Stack Engineering',
      'Next.js',
      'TypeScript',
      'Supabase',
      'Google Gemini',
      'Cost Engineering',
      'Brand & Landing Page',
    ],
    thumbnail: '/projects/frictionlens.svg',
    featured: true,
    caseStudy: {
      overview:
        'FrictionLens is a full-stack AI review intelligence tool live at frictionlens.net. Designed and shipped end-to-end — marketing site, dashboard, shareable Vibe Report pages — on Next.js, TypeScript, Supabase (Postgres + RLS + Edge Functions), Google Gemini, and Upstash Redis. The strategic bet: indie developers can\'t read every review, but the patterns that actually predict churn are buried in 2-3 star reviews. The hard part of shipping an AI tool isn\'t the AI. It\'s the unit economics.',
      challenge:
        'Two problems made the obvious "summarize reviews with an LLM" pitch hard. First, naively sending every review through Gemini blows past free-tier limits in a single analysis, killing the freemium model the indie audience actually needs. Second, a black-box sentiment score is magical but useless — engineering needs to know what to fix, not how angry users feel.',
      challengePoints: [
        'LLM cost curves: routing every review through Gemini collapses the $0 freemium tier',
        'Generic sentiment scores don\'t tell engineering what to ship',
        'Indie tools die without a distribution channel; no marketing budget',
        'Trust: black-box AI feels suspicious to the audience that\'s most cost-sensitive',
        'Free Gemini API has 10-RPM limits — naive batching fails immediately',
      ],
      approach: [
        {
          phase: 'Cost-Aware Classifier Design',
          description:
            'Made cost-efficiency the primary product constraint before any model selection. Benchmarked classifier tiers against Gemini API cost curves to stay within free-tier volume across typical review workloads. The whole architecture exists to answer "how do we ship this for free?"',
        },
        {
          phase: '3-Tier Routing (Not Embeddings)',
          description:
            'Short reviews → keyword + star rules, no AI. Medium → keyword sentiment, no AI. Long batches → Gemini with Zod-validated structured outputs and 6.5s inter-batch throttling for the 10-RPM free-tier limit. Roughly 80% of reviews never touch the AI.',
        },
        {
          phase: 'BYOK Architecture',
          description:
            'Built bring-your-own-key with AES-256-GCM encrypted per-user key storage so power users run unlimited analyses on their own Gemini key while the freemium tier serves curious visitors on 2 free runs. Lets the tool stay $0 forever without a paywall.',
        },
        {
          phase: 'Vibe Reports as Distribution',
          description:
            'Designed shareable public Vibe Report pages with OG-image generation so every user sharing their report becomes acquisition. No ad budget, no growth team — the product itself is the distribution channel.',
        },
        {
          phase: 'Marketing Site as Proof of Taste',
          description:
            'Designed and shipped frictionlens.net (positioning, type pairing, motion, the search-driven hero) alongside the product so the landing page IS the demo. One cohesive thing, not "marketing site eventually."',
        },
      ],
      decisions: [
        {
          decision: 'Cost-efficiency as the primary product constraint, not a backlog item',
          context:
            'Every "AI review analyzer" pitch deck assumes you can afford the API calls. The freemium model collapses in a week if every analysis costs $0.40. Treating cost as the first design constraint changed every downstream architectural choice.',
          outcome:
            'Stayed within Gemini free-tier limits for typical workloads, making the $0 forever tier real. The architecture is the moat, not the model choice.',
        },
        {
          decision: '3-tier rule-based classifier over embeddings or always-AI',
          context:
            'Embedding-based clustering is the "smart" move but adds latency, infrastructure, and cost. Always-AI is simpler but kills the freemium economics. Rule-based routing is none of the above but lets ~80% of reviews skip AI entirely.',
          outcome:
            'Short reviews resolve instantly with no API call. Long reviews still get the Gemini treatment with Zod-validated structured outputs. Free tier survives a real workload.',
        },
        {
          decision: 'BYOK with AES-256-GCM, not a SaaS subscription',
          context:
            'The audience is indie devs — exactly the people who will run from a $29/mo subscription. A BYOK path lets them bring a free Google AI Studio key and run unlimited analyses.',
          outcome:
            'Pricing page reads "Free for indie devs. $0 forever." That positioning is only honest because the BYOK path exists.',
        },
        {
          decision: 'Shareable public Vibe Report pages with OG-image generation',
          context:
            'Indie tools without a marketing budget need built-in distribution. Every share of a Vibe Report needs to look good as a link preview, not as a generic URL.',
          outcome:
            'Each Vibe Report is a public URL with a custom OG image showing the app icon, vibe score, and top friction. Sharing becomes acquisition.',
        },
      ],
      results:
        'Live at frictionlens.net. Full-stack ship across marketing site, dashboard, and shareable report pages. 3 classifier tiers running. 4 review sources unified (App Store, Play Store, Reddit, CSV). 256-bit AES-GCM per-user key encryption. Freemium tier holds because the architecture earns the right to be free.',
      learnings:
        'Cost engineering is the unsung hero of free AI products. The hard part of shipping an AI tool isn\'t the AI — it\'s the unit economics. Routing transparency (showing users which tier their reviews hit) builds more trust than hiding the machinery; users repeatedly cited "I can see why this is free" as the thing that made them try it.',
      whatWouldChange:
        'More iteration on classifier accuracy at the medium tier — keyword sentiment is brittle for sarcasm and dual-sentiment reviews. Add automatic cohort comparison across app versions so release impact is computed by default, not by manual diff. And ship a Linear/Jira export earlier; the gap between "here\'s the friction" and "here\'s a ticket" is where the value compounds.',
    },
  },
];

export function getWorkBySlug(slug: string): WorkExperience | undefined {
  return workExperiences.find((w) => w.slug === slug);
}

export function getFeaturedWork(): WorkExperience[] {
  return workExperiences.filter((w) => w.featured);
}
