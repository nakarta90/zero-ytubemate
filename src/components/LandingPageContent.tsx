'use client';
import { useTranslations } from 'next-intl';
import HeroSection from './HeroSection';
import FAQSection from './FAQSection';

const typeMap = {
  mp3: 'landingMp3',
  mp4: 'landingMp4',
  shorts: 'landingShorts',
  '4k': 'landing4k',
} as const;

export default function LandingPageContent({ type }: { type: keyof typeof typeMap }) {
  const t = useTranslations(typeMap[type]);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>
      <HeroSection />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('content')}</p>
      </section>
      <FAQSection />
    </>
  );
}
