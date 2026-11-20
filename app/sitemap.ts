import { MetadataRoute } from 'next';
import { PRODUCTION_SITE_URL } from '@/lib/seo';
import { ROOM_CATEGORIES } from '@/data/rooms';

const LAST_MODIFIED_DATE = new Date('2025-05-01T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/stay', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/weddings-events', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/dining', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/experiences', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/bodh-gaya-guide', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/gallery', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/policies', changeFrequency: 'yearly', priority: 0.6 },
  ];

  const roomRoutes: MetadataRoute.Sitemap = ROOM_CATEGORIES.map((room) => ({
    url: `${PRODUCTION_SITE_URL}/stay/${room.slug}`,
    lastModified: LAST_MODIFIED_DATE,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${PRODUCTION_SITE_URL}${route.path}`,
      lastModified: LAST_MODIFIED_DATE,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...roomRoutes,
  ];
}
