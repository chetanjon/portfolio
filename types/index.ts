export interface Metric {
  value: string;
  label: string;
  context?: string;
}

export interface ApproachPhase {
  phase: string;
  description: string;
}

export interface Decision {
  decision: string;
  context: string;
  outcome: string;
}

export interface CaseStudy {
  overview: string;
  challenge: string;
  challengePoints: string[];
  approach: ApproachPhase[];
  decisions: Decision[];
  results: string;
  learnings: string;
  whatWouldChange: string;
}

export interface WorkExperience {
  id: string;
  slug: string;
  company: string;
  role: string;
  type: 'full-time' | 'internship' | 'contract';
  startDate: string;
  endDate: string | 'Present';
  location: string;
  description: string;
  highlights: string[];
  metrics: Metric[];
  skills: string[];
  thumbnail?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
}

export interface Skill {
  name: string;
  proficiency: 'expert' | 'advanced' | 'intermediate';
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ProjectProcess {
  step: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  highlights: string[];
  skills: string[];
  type: 'academic' | 'personal' | 'open-source';
  year: string;
  link?: string;
  status: 'completed' | 'in-progress' | 'concept';
  metrics?: Metric[];
  process?: ProjectProcess[];
  color: string;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'work' | 'certification';
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
