import { Hero } from '@/components/sections/Hero';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { MetricsShowcase } from '@/components/sections/MetricsShowcase';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { QuickAbout } from './QuickAbout';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <MetricsShowcase />
      <QuickAbout />
      <ContactCTA />
    </>
  );
}
