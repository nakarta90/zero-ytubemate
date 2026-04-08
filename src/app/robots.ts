import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*/download/'],
      },
    ],
    sitemap: 'https://zero-ytubemate.cc/sitemap.xml',
  };
}
