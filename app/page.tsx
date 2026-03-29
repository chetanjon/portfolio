import { Hero } from '@/components/sections/Hero';
import { Fundamentals } from '@/components/sections/Fundamentals';
import { Works } from '@/components/sections/Works';
import { Quote } from '@/components/sections/Quote';
import { CaseStudiesPreview } from '@/components/sections/CaseStudiesPreview';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Fundamentals />
      <Works />
      <Quote />
      <CaseStudiesPreview />
      <CTA />
    </>
  );
}
