import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chetanjonnalagadda.com';
  const defaultLastModified = new Date('2026-04-24T00:00:00.000Z');

  const caseStudySlugs = [
    'cursor',
    'duolingo',
    'figma',
    'liquid-glass',
    'notion',
    'perplexity',
    'rivian',
    'sonos',
    'spotify',
    'tiktok-shop',
    'aatram',
  ];

  const workSlugs = ['aatram', 'ikt-india', 'frictionlens', 'gangothri-nutrients'];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/craft`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/casestudies`,
      lastModified: defaultLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: defaultLastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/casestudies/${slug}`,
    lastModified: defaultLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const workPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: defaultLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...caseStudyPages, ...workPages];
}
