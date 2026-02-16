'use client';

import dynamic from 'next/dynamic';

const ThemeCustomizer = dynamic(
  () => import('./ThemeCustomizer').then((mod) => mod.ThemeCustomizer),
  { ssr: false }
);

export function DebugWrapper() {
  return <ThemeCustomizer />;
}
