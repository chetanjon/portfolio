import type { Metadata } from 'next';
import PerplexityCaseStudy from '@/components/sections/perplexity_case_study';

export const metadata: Metadata = {
  title: "The $20 Billion Subscription Gamble · Perplexity AI Case Study",
  description:
    "Perplexity built the fastest-growing AI subscription business, then silently gutted Pro, swapped premium models for cheaper ones, and pushed users toward a 10× more expensive tier.",
};

export default function PerplexityPage() {
  return <PerplexityCaseStudy />;
}
