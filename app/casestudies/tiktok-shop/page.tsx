import type { Metadata } from 'next';
import TikTokShopCaseStudy from '@/components/sections/tiktok_shop_case_study';

export const metadata: Metadata = {
  title: 'Redesigning Trust in Social Commerce — TikTok Shop Case Study',
  description:
    'Redesigning trust, discovery and purchase confidence in the world\'s fastest-growing social commerce platform — from $4.4B to $64B GMV and a 1.3/5 Trustpilot score.',
};

export default function TikTokShopPage() {
  return <TikTokShopCaseStudy />;
}
