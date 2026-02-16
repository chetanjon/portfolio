import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'behavioral-compatibility',
    title: 'Behavioral Compatibility Dating Platform',
    subtitle: 'ASU — Spring 2025',
    description:
      'Identified swipe-fatigue as key drop-off driver in dating apps through competitive analysis. Designed a 15-screen Figma prototype with scenario-based compatibility matching.',
    longDescription:
      'Identified swipe-fatigue as key drop-off driver in dating apps through competitive analysis; validated with 20+ user interviews revealing 78% prioritize values over appearance. Designed 15-screen Figma prototype with scenario-based compatibility matching; achieved 85% usability task completion and reduced MVP scope by 40% through feature prioritization.',
    highlights: [
      'Validated with 20+ user interviews revealing 78% prioritize values over appearance',
      'Designed 15-screen Figma prototype with scenario-based compatibility matching',
      'Achieved 85% usability task completion rate',
      'Reduced MVP scope by 40% through feature prioritization',
    ],
    skills: ['User Research', 'Figma', 'Competitive Analysis', 'PRD Writing', 'Wireframing'],
    type: 'academic',
    year: '2025',
    status: 'completed',
    metrics: [
      { value: '20+', label: 'User Interviews' },
      { value: '78%', label: 'Values > Appearance' },
      { value: '15', label: 'Figma Screens' },
      { value: '85%', label: 'Usability Completion' },
    ],
    process: [
      { step: 'Competitive Analysis', description: 'Identified swipe-fatigue as key drop-off driver across dating apps', icon: 'search' },
      { step: 'User Research', description: 'Interviewed 20+ users; 78% prioritize values over appearance', icon: 'users' },
      { step: 'Prototype Design', description: 'Built 15-screen Figma prototype with scenario-based matching', icon: 'pen-tool' },
      { step: 'Usability Testing', description: 'Achieved 85% task completion; reduced MVP scope by 40%', icon: 'check-circle' },
    ],
    color: 'from-rose-500/20 to-pink-500/20',
    icon: 'heart',
  },
  {
    id: '2',
    slug: 'micromove',
    title: 'MicroMove',
    subtitle: 'ASU — Fall 2024',
    description:
      'Identified ride cancellations and surge pricing as core pain points. Sized addressable market at 145K car-free Phoenix commuters across 3 segments.',
    longDescription:
      'Identified ride cancellations and surge pricing as core pain points through 10 user interviews; sized addressable market at 145K car-free Phoenix commuters across 3 segments. Led 4-person team to develop GTM strategy, pricing model ($2 base + $0.50/mile), and 5-year financial projections with $20M NPV; pitched to faculty panel.',
    highlights: [
      'Conducted 10 user interviews identifying ride cancellations and surge pricing as core pain points',
      'Sized addressable market at 145K car-free Phoenix commuters across 3 segments',
      'Led 4-person team to develop GTM strategy and pricing model ($2 base + $0.50/mile)',
      'Built 5-year financial projections with $20M NPV',
    ],
    skills: ['Market Sizing', 'GTM Strategy', 'Financial Modeling', 'User Research', 'Team Leadership'],
    type: 'academic',
    year: '2024',
    status: 'completed',
    metrics: [
      { value: '145K', label: 'TAM (Commuters)' },
      { value: '$20M', label: 'Projected NPV' },
      { value: '10', label: 'User Interviews' },
      { value: '3', label: 'Market Segments' },
    ],
    process: [
      { step: 'User Research', description: 'Interviewed 10 users on ride-hailing pain points', icon: 'users' },
      { step: 'Market Sizing', description: 'Sized TAM at 145K car-free Phoenix commuters', icon: 'bar-chart-3' },
      { step: 'Strategy', description: 'Developed GTM strategy and $2 + $0.50/mile pricing model', icon: 'target' },
      { step: 'Financial Model', description: 'Built 5-year projections with $20M NPV', icon: 'layers' },
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
    icon: 'rocket',
  },
  {
    id: '3',
    slug: 'global-innovation-analytics',
    title: 'Global Innovation Analytics',
    subtitle: 'ASU — Fall 2025',
    description:
      'Analyzed 1,862 Global Innovation Index records across 130 countries using Python. Applied statistical tests to benchmark G20 vs emerging markets.',
    longDescription:
      'Analyzed 1,862 Global Innovation Index records across 130 countries using Python; applied statistical tests (t-tests, ANOVA) to benchmark G20 vs emerging markets. Identified 15 non-G20 markets outperforming major economies; found education spending showed no significant correlation with innovation output (p=0.33).',
    highlights: [
      'Analyzed 1,862 GII records across 130 countries using Python',
      'Applied t-tests and ANOVA to benchmark G20 vs emerging markets',
      'Identified 15 non-G20 markets outperforming major economies',
      'Found education spending showed no significant correlation with innovation output (p=0.33)',
    ],
    skills: ['Python', 'Data Analysis', 'Statistical Testing', 'Research', 'Data Visualization'],
    type: 'academic',
    year: '2025',
    status: 'completed',
    metrics: [
      { value: '1,862', label: 'Records Analyzed' },
      { value: '130', label: 'Countries' },
      { value: '15', label: 'Outperforming Markets' },
    ],
    process: [
      { step: 'Data Collection', description: 'Gathered 1,862 GII records across 130 countries', icon: 'database' },
      { step: 'Statistical Analysis', description: 'Applied t-tests and ANOVA for G20 vs emerging market benchmarks', icon: 'bar-chart-3' },
      { step: 'Insights', description: 'Identified 15 non-G20 outperformers; debunked education-spending correlation', icon: 'search' },
    ],
    color: 'from-emerald-500/20 to-teal-500/20',
    icon: 'bar-chart-3',
  },
  {
    id: '4',
    slug: 'vendor-onboarding-toolkit',
    title: 'Vendor Onboarding Optimization Toolkit',
    subtitle: 'Open Framework for Marketplace PMs',
    description:
      'A reusable framework and checklist for marketplace PMs to audit and optimize their vendor onboarding funnels, distilled from IKT INDIA learnings.',
    longDescription:
      'After improving activation by 30-35% at IKT INDIA, I distilled the learnings into a reusable toolkit for marketplace product managers. The framework includes a step-by-step onboarding audit template, common friction point patterns, an A/B testing playbook specific to onboarding flows, and benchmark data from marketplace case studies.',
    highlights: [
      'Created a 5-phase onboarding audit framework',
      'Documented 12 common marketplace friction patterns',
      'Built A/B testing playbook for onboarding experiments',
      'Compiled benchmark data from 8 marketplace case studies',
    ],
    skills: ['Frameworks', 'Marketplace Strategy', 'A/B Testing', 'Notion', 'Knowledge Management'],
    type: 'open-source',
    year: '2024',
    status: 'in-progress',
    metrics: [
      { value: '5', label: 'Audit Phases' },
      { value: '12', label: 'Friction Patterns' },
      { value: '8', label: 'Case Studies' },
    ],
    process: [
      { step: 'Experience Mining', description: 'Extracted learnings from IKT INDIA onboarding improvements', icon: 'database' },
      { step: 'Pattern Analysis', description: 'Researched 8 marketplace case studies for common patterns', icon: 'search' },
      { step: 'Framework Design', description: 'Created 5-phase audit methodology with decision trees', icon: 'git-branch' },
      { step: 'Template Build', description: 'Packaging into Notion template with embedded guides', icon: 'layout' },
    ],
    color: 'from-amber-500/20 to-orange-500/20',
    icon: 'rocket',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
