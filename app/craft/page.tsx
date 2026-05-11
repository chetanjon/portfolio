import type { Metadata } from 'next';
import { CraftContent } from './CraftContent';

export const metadata: Metadata = {
  title: 'Craft',
  description:
    'How the work gets made: design tokens, vector logo construction, motion language, voice ruleset. The PM-who-designs side of the verb chain.',
};

export default function CraftPage() {
  return <CraftContent />;
}
