import type { Metadata } from 'next';
import AatramCaseStudy from '@/components/sections/aatram-case-study';

export const metadata: Metadata = {
  title: "Aatram · 0-to-1 Product Case Study",
  description:
    "Three roommates built an app that treats procrastination as an emotion problem, not a discipline problem. A 0-to-1 case study from brainstorm to App Store.",
};

export default function AatramPage() {
  return <AatramCaseStudy />;
}
