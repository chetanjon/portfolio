import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Product',
    skills: [
      { name: 'Product Strategy', proficiency: 'advanced' },
      { name: 'Roadmapping', proficiency: 'advanced' },
      { name: 'PRDs & User Stories', proficiency: 'expert' },
      { name: 'MVP Scoping', proficiency: 'advanced' },
      { name: 'RICE Prioritization', proficiency: 'advanced' },
      { name: 'Go-to-Market', proficiency: 'advanced' },
      { name: 'User Research', proficiency: 'advanced' },
      { name: 'Competitive Analysis', proficiency: 'advanced' },
      { name: 'Funnel Optimization', proficiency: 'advanced' },
      { name: 'A/B Testing', proficiency: 'intermediate' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Figma', proficiency: 'intermediate' },
      { name: 'Jira', proficiency: 'expert' },
      { name: 'Confluence', proficiency: 'advanced' },
      { name: 'Mixpanel', proficiency: 'intermediate' },
      { name: 'Amplitude', proficiency: 'intermediate' },
      { name: 'Google Analytics', proficiency: 'advanced' },
      { name: 'Notion', proficiency: 'expert' },
      { name: 'SQL', proficiency: 'intermediate' },
      { name: 'Python', proficiency: 'intermediate' },
      { name: 'PostHog', proficiency: 'intermediate' },
      { name: 'Supabase', proficiency: 'intermediate' },
    ],
  },
  {
    name: 'Methods',
    skills: [
      { name: 'Agile/Scrum', proficiency: 'expert' },
      { name: 'Sprint Planning', proficiency: 'expert' },
      { name: 'OKRs', proficiency: 'advanced' },
      { name: 'Experimentation Design', proficiency: 'advanced' },
      { name: 'Retention Analysis', proficiency: 'advanced' },
      { name: 'Cohort Segmentation', proficiency: 'advanced' },
    ],
  },
];
