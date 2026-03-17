import type { Metadata } from 'next';
import FigmaCaseStudy from '@/components/sections/figma-case-study';

export const metadata: Metadata = {
  title: 'Rebuilding Trust After UI3 — Figma Case Study',
  description:
    'How a forced redesign migration and AI data-sharing controversy tested trust with Figma\'s power users — a PM framework for earning it back through progressive migration and transparent AI consent.',
};

export default function FigmaPage() {
  return <FigmaCaseStudy />;
}
