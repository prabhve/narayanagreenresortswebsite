import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';
import { ROOM_CATEGORIES } from '@/data/rooms';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/stay`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dining`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/weddings-events`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const roomRoutes: MetadataRoute.Sitemap = ROOM_CATEGORIES.map((room) => ({
    url: `${baseUrl}/stay/${room.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...roomRoutes];
}
