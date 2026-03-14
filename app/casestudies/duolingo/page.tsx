import type { Metadata } from 'next';
import DuolingoCaseStudy from '@/components/sections/duolingo_case_study';

export const metadata: Metadata = {
  title: 'Breaking the B1 Wall — Duolingo Case Study',
  description:
    'A product strategy using the CIRCLES framework and PRD to solve Duolingo\'s intermediate plateau. 52M daily users. A learning ceiling nobody\'s fixing.',
};

export default function DuolingoPage() {
  return <DuolingoCaseStudy />;
}
