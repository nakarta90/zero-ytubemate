'use client';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

export default function ContactPageContent() {
  const t = useTranslations('contact');
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('content')}</p>
      <a
        href={`mailto:${t('email')}`}
        className="inline-flex items-center gap-3 gradient-bg text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all text-lg"
      >
        <Mail className="w-6 h-6" />
        {t('email')}
      </a>
    </section>
  );
}
