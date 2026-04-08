'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span>{t(`q${i}`)}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                  {t(`a${i}`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
