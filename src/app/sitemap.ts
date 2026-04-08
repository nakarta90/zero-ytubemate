import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zero-ytubemate.cc';
  const pages = [
    '',
    '/faq',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/how-to-use',
    '/youtube-to-mp3',
    '/youtube-to-mp4',
    '/youtube-shorts-download',
    '/youtube-4k-download',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
