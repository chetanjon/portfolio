import type { Metadata } from 'next';
import CursorTeardown from '@/components/sections/cursor-teardown';

export const metadata: Metadata = {
  title: "Cursor — The $29B Fork",
  description:
    "How four MIT students forked VS Code, grew with almost no traditional marketing, and built what may be the fastest-growing SaaS product ever.",
};

export default function CursorPage() {
  return <CursorTeardown />;
}
