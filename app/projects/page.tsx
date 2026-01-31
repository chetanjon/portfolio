import type { Metadata } from 'next';
import { ProjectsContent } from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects and academic work in product management.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
