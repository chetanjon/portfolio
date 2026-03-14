import type { Metadata } from 'next';
import LiquidGlassCaseStudy from '@/components/sections/liquid-glass-case-study';

export const metadata: Metadata = {
  title: 'When Glass Cracked — Apple iOS 26 Case Study',
  description:
    'How Apple\'s most ambitious redesign since iOS 7 broke accessibility for millions — a WCAG 2.2 audit, heuristic evaluation, and a better path forward.',
};

export default function LiquidGlassPage() {
  return <LiquidGlassCaseStudy />;
}
