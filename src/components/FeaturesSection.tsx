'use client';
import { useTranslations } from 'next-intl';
import { Monitor, Zap, Shield, Users, Smartphone, Music } from 'lucide-react';

const icons = [Monitor, Shield, Zap, Users, Smartphone, Music];
const keys = ['4k', 'free', 'fast', 'noRegister', 'allDevices', 'formats'] as const;

export default function FeaturesSection() {
  const t = useTranslations('features');
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div key={key} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(key)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t(`${key}Desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
