import type { Metadata } from 'next';
import NotionCaseStudy from '@/components/sections/notion_case_study';

export const metadata: Metadata = {
  title: "The $11 Billion Weak Link — Notion Case Study",
  description:
    "Notion's mobile app is the bottleneck holding back an $11B platform — a CIRCLES case study to fix the #1 blocker for enterprise mobile users.",
};

export default function NotionPage() {
  return <NotionCaseStudy />;
}
