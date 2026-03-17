import type { Metadata } from 'next';
import SonosCaseStudy from '@/components/sections/sonos-case-study';

export const metadata: Metadata = {
  title: 'When the Music Stopped — Sonos Case Study',
  description:
    'How Sonos shipped a major app rewrite that removed core features, broke accessibility for blind users, and cost the CEO his job — a PM post-mortem and migration framework.',
};

export default function SonosPage() {
  return <SonosCaseStudy />;
}
