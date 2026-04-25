'use client';

import dynamic from 'next/dynamic';

const ThemeCustomizer = dynamic(
  () => import('./ThemeCustomizer').then((mod) => mod.ThemeCustomizer),
  { ssr: false }
);

export function DebugWrapper() {
  const isEnabled =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_ENABLE_THEME_CUSTOMIZER === 'true';

  if (!isEnabled) {
    return null;
  }

  return <ThemeCustomizer />;
}
