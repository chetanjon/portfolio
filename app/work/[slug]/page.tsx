import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workExperiences, getWorkBySlug } from '@/data/work';
import { CaseStudyContent } from './CaseStudyContent';

export function generateStaticParams() {
  return workExperiences.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: 'Not Found' };

  return {
    title: `${work.company} Case Study`,
    description: work.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) notFound();

  const currentIndex = workExperiences.findIndex((w) => w.slug === slug);
  const prev = currentIndex > 0 ? workExperiences[currentIndex - 1] : null;
  const next = currentIndex < workExperiences.length - 1 ? workExperiences[currentIndex + 1] : null;

  return <CaseStudyContent work={work} prev={prev} next={next} />;
}
