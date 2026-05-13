import { Hero } from '@/components/sections/Hero';
import { StackMarquee } from '@/components/sections/StackMarquee';
import { SelectedProducts } from '@/components/sections/SelectedProducts';
import { CraftTeaser } from '@/components/sections/CraftTeaser';
import { Works } from '@/components/sections/Works';
import { Thinking } from '@/components/sections/Thinking';
import { Quote } from '@/components/sections/Quote';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <SelectedProducts />
      <CraftTeaser />
      <Works />
      <Thinking />
      <Quote />
      <CTA />
    </>
  );
}
