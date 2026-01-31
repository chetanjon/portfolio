import type { Metadata } from 'next';
import { ResumeContent } from './ResumeContent';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Interactive resume — experience, education, skills, and certifications.',
};

export default function ResumePage() {
  return <ResumeContent />;
}
