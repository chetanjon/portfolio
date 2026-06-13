import type { Metadata } from 'next';
import { CaseStudiesContent } from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Work, Teardowns & Thinking',
  description: 'Products I shipped and owned, teardowns of live products like Waymo and Cursor, and product-thinking exercises on Notion, Figma, Duolingo, and more.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
