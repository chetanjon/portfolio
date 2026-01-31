import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my journey from electrical engineering to product management.',
};

export default function AboutPage() {
  return <AboutContent />;
}
