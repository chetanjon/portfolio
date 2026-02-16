import { Hero } from '@/components/sections/Hero';
import { Fundamentals } from '@/components/sections/Fundamentals';
import { Awards } from '@/components/sections/Awards';
import { Works } from '@/components/sections/Works';
import { Expertise } from '@/components/sections/Expertise';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Fundamentals />
      <Awards />
      <Works />
      <Expertise />
      <Contact />
    </>
  );
}
