import type { Metadata } from 'next';
import { WorkContent } from './WorkContent';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products I\'ve built and teams I\'ve worked with.',
};

export default function WorkPage() {
  return <WorkContent />;
}
