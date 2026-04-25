import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workExperiences, getWorkBySlug } from '@/data/work';
import { CaseStudyContent } from './CaseStudyContent';

const SITE_URL = 'https://chetanjonnalagadda.com';

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

  const title = `${work.company} Case Study`;
  const url = `${SITE_URL}/work/${slug}`;

  return {
    title,
    description: work.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} | Chetan Jonnalagadda`,
      description: work.description,
      siteName: 'Chetan Jonnalagadda',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Chetan Jonnalagadda`,
      description: work.description,
    },
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

  const url = `${SITE_URL}/work/${slug}`;
  const datePublished = `${work.startDate}-01`;
  const dateModified =
    work.endDate === 'Present' ? new Date().toISOString().slice(0, 10) : `${work.endDate}-01`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${work.company} — ${work.role}`,
    description: work.description,
    author: {
      '@type': 'Person',
      name: 'Chetan Jonnalagadda',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Chetan Jonnalagadda',
      url: SITE_URL,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    about: work.skills,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CaseStudyContent work={work} prev={prev} next={next} />
    </>
  );
}
