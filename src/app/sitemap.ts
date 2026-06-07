import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Single-page app: expose the home page plus its key in-page sections as anchors.
  const sections = ['', '#converter', '#saving', '#guide', '#info', '#accessories'];

  return sections.map((section) => ({
    url: `${SITE_URL}/${section}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: section === '' ? 1 : 0.7,
  }));
}
