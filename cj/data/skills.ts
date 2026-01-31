import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Product',
    skills: [
      { name: 'Product Strategy', proficiency: 'advanced' },
      { name: 'Roadmapping', proficiency: 'advanced' },
      { name: 'PRDs', proficiency: 'expert' },
      { name: 'User Research', proficiency: 'advanced' },
      { name: 'MVP Scoping', proficiency: 'advanced' },
      { name: 'Go-to-Market', proficiency: 'advanced' },
      { name: 'Backlog Prioritization', proficiency: 'expert' },
      { name: 'A/B Testing', proficiency: 'intermediate' },
      { name: 'Competitive Analysis', proficiency: 'advanced' },
      { name: 'Wireframing', proficiency: 'intermediate' },
    ],
  },
  {
    name: 'Methods',
    skills: [
      { name: 'Agile/Scrum', proficiency: 'expert' },
      { name: 'Sprint Planning', proficiency: 'expert' },
      { name: 'Stakeholder Management', proficiency: 'advanced' },
      { name: 'Design Thinking', proficiency: 'advanced' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Figma', proficiency: 'intermediate' },
      { name: 'Jira', proficiency: 'expert' },
      { name: 'Notion', proficiency: 'expert' },
      { name: 'Miro', proficiency: 'advanced' },
      { name: 'SQL', proficiency: 'intermediate' },
      { name: 'Mixpanel', proficiency: 'intermediate' },
      { name: 'Google Analytics', proficiency: 'advanced' },
    ],
  },
];
