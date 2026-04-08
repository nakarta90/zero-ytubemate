'use client';
import { useTranslations } from 'next-intl';

export default function PrivacyPageContent() {
  const t = useTranslations('privacy');
  const sections = ['whatWeCollect', 'cookies', 'thirdParty', 'dataRetention', 'contact'] as const;
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('intro')}</p>
      {sections.map((s) => (
        <div key={s} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t(s)}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t(`${s}Content`)}</p>
        </div>
      ))}
      <p className="text-sm text-gray-400 mt-8">{t('lastUpdated')}</p>
    </section>
  );
}
