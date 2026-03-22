import type { Metadata } from 'next';
import NotionTeardown from '@/components/sections/NotionTeardown-2';

export const metadata: Metadata = {
  title: "Notion's $600M Paradox — Product Teardown",
  description:
    "Notion has 100M+ users and ~$600M ARR, but loses most in the first 3 weeks. 5 RICE-scored improvements to fix the activation gap that templates never fixed — led by AI-guided onboarding.",
};

export default function NotionPage() {
  return <NotionTeardown />;
}
