import { Hero } from '@/components/sections/Hero';
import { SelectedProducts } from '@/components/sections/SelectedProducts';
import { TheNumber } from '@/components/sections/TheNumber';
import { Works } from '@/components/sections/Works';
import { HowIWork } from '@/components/sections/HowIWork';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedProducts />
      <TheNumber />
      <Works />
      <HowIWork />
      <CTA />
    </>
  );
}
