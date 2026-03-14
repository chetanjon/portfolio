import type { Metadata } from 'next';
import RivianCaseStudy from '@/components/sections/rivian-case-study-final';

export const metadata: Metadata = {
  title: 'Fleet Intelligence Platform — Rivian Case Study',
  description:
    'Redesigning the fleet management experience for commercial operators — discovery, competitive analysis, solution design, and go-to-market strategy.',
};

export default function RivianPage() {
  return <RivianCaseStudy />;
}
