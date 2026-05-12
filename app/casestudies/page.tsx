import type { Metadata } from 'next';
import { CaseStudiesContent } from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Work & Thinking',
  description: 'Shipped products I co-built and owned, plus product-thinking exercises on Notion, Cursor, Spotify, and more.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
