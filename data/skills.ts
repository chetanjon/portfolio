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
      { name: 'Jobs-to-be-Done', proficiency: 'advanced' },
      { name: 'Go-to-Market', proficiency: 'advanced' },
      { name: 'User Research', proficiency: 'advanced' },
      { name: 'Competitive Analysis', proficiency: 'advanced' },
    ],
  },
  {
    name: 'Analytics & Data',
    skills: [
      { name: 'SQL', proficiency: 'intermediate' },
      { name: 'Python', proficiency: 'intermediate' },
      { name: 'Mixpanel', proficiency: 'intermediate' },
      { name: 'PostHog', proficiency: 'intermediate' },
      { name: 'Google Analytics', proficiency: 'advanced' },
      { name: 'A/B Testing', proficiency: 'advanced' },
      { name: 'Cohort Analysis', proficiency: 'advanced' },
      { name: 'Funnel Instrumentation', proficiency: 'advanced' },
    ],
  },
  {
    name: 'AI / ML',
    skills: [
      { name: 'Apple Foundation Models', proficiency: 'intermediate' },
      { name: 'Google Gemini (AI SDK)', proficiency: 'intermediate' },
      { name: 'OpenAI API', proficiency: 'intermediate' },
      { name: 'Structured Outputs (Zod)', proficiency: 'intermediate' },
      { name: 'Prompt Engineering', proficiency: 'advanced' },
    ],
  },
  {
    name: 'Design & Brand',
    skills: [
      { name: 'UI/UX Design', proficiency: 'advanced' },
      { name: 'Design Systems', proficiency: 'advanced' },
      { name: 'Visual Identity', proficiency: 'intermediate' },
      { name: 'Logo Design', proficiency: 'intermediate' },
      { name: 'Landing Page Design', proficiency: 'advanced' },
      { name: 'Figma', proficiency: 'advanced' },
    ],
  },
  {
    name: 'PM Tooling',
    skills: [
      { name: 'Notion', proficiency: 'expert' },
      { name: 'Jira', proficiency: 'expert' },
      { name: 'Confluence', proficiency: 'advanced' },
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
  {
    name: 'Technical Fluency',
    skills: [
      { name: 'TypeScript', proficiency: 'intermediate' },
      { name: 'Next.js', proficiency: 'intermediate' },
      { name: 'Supabase', proficiency: 'intermediate' },
      { name: 'Swift / SwiftUI', proficiency: 'intermediate' },
    ],
  },
];
