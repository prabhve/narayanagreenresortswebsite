import { MetadataRoute } from 'next';
import { PRODUCTION_SITE_URL, isPreviewDeployment } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${PRODUCTION_SITE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Applebot', 'PerplexityBot'],
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${PRODUCTION_SITE_URL}/sitemap.xml`,
    host: PRODUCTION_SITE_URL,
  };
}
