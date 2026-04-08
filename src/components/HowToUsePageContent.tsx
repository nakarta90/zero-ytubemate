'use client';
import { useTranslations } from 'next-intl';
import { Monitor, Smartphone, Music, Film } from 'lucide-react';

export default function HowToUsePageContent() {
  const t = useTranslations('howToUse');

  const Section = ({ title, icon: Icon, steps }: { title: string; icon: any; steps: string[] }) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
            <span className="w-7 h-7 rounded-full gradient-bg text-white text-sm flex items-center justify-center shrink-0">{i + 1}</span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">{t('intro')}</p>
      <Section title={t('desktop')} icon={Monitor} steps={[t('desktopStep1'), t('desktopStep2'), t('desktopStep3'), t('desktopStep4'), t('desktopStep5')]} />
      <Section title={t('mobile')} icon={Smartphone} steps={[t('mobileStep1'), t('mobileStep2'), t('mobileStep3'), t('mobileStep4'), t('mobileStep5')]} />
      <Section title={t('mp3')} icon={Music} steps={[t('mp3Step1'), t('mp3Step2'), t('mp3Step3'), t('mp3Step4')]} />
      <Section title={t('shorts')} icon={Film} steps={[t('shortsStep1'), t('shortsStep2'), t('shortsStep3')]} />
    </section>
  );
}
