import type { Metadata } from 'next';
import { CaseStudiesContent } from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'In-depth product case studies applying CIRCLES, PRD, and UX research frameworks.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
