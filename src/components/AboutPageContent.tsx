'use client';
import { useTranslations } from 'next-intl';

export default function AboutPageContent() {
  const t = useTranslations('about');
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="prose dark:prose-invert prose-gray max-w-none">
        {t('content').split('\n\n').map((p, i) => (
          <p key={i} className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{p}</p>
        ))}
      </div>
    </section>
  );
}
