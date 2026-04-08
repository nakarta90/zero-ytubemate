'use client';
import { useTranslations } from 'next-intl';
import { ClipboardCopy, ListChecks, Download } from 'lucide-react';

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const steps = [
    { icon: ClipboardCopy, key: 'step1', num: '1' },
    { icon: ListChecks, key: 'step2', num: '2' },
    { icon: Download, key: 'step3', num: '3' },
  ];
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, key, num }) => (
            <div key={key} className="text-center">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-bold text-blue-500 mb-1">Step {num}</div>
              <h3 className="font-semibold text-lg mb-2">{t(key)}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
