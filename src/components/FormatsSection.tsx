'use client';
import { useTranslations } from 'next-intl';
import { Film, Music } from 'lucide-react';

export default function FormatsSection() {
  const t = useTranslations('formats');
  const videoFormats = ['360p', '480p', '720p HD', '1080p FHD', '1440p 2K', '2160p 4K'];
  const audioFormats = ['MP3 128kbps', 'MP3 192kbps', 'MP3 320kbps'];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Film className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-lg">{t('video')} (MP4)</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {videoFormats.map((f) => (
                <div key={f} className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-sm text-center font-medium border border-gray-200 dark:border-gray-700">
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-lg">{t('audio')} (MP3)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {audioFormats.map((f) => (
                <div key={f} className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-sm text-center font-medium border border-gray-200 dark:border-gray-700">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
