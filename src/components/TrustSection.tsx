'use client';
import { useTranslations } from 'next-intl';
import { Shield, Heart, Lock, Monitor } from 'lucide-react';

export default function TrustSection() {
  const t = useTranslations('trust');
  const badges = [
    { icon: Heart, key: 'free' },
    { icon: Shield, key: 'noAds' },
    { icon: Lock, key: 'secure' },
    { icon: Monitor, key: 'support4k' },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">{t('title')}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {badges.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-medium">
              <Icon className="w-5 h-5 text-blue-500" />
              {t(key)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
