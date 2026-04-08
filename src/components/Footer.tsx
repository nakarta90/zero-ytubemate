'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Download } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Download className="w-5 h-5 text-blue-500" />
              <span className="gradient-text">Zero YTubeMate</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('footer.tagline')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.quickLinks')}</h3>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="block hover:text-blue-500 transition-colors">{t('nav.home')}</Link>
              <Link href="/how-to-use" className="block hover:text-blue-500 transition-colors">{t('nav.howToUse')}</Link>
              <Link href="/faq" className="block hover:text-blue-500 transition-colors">{t('nav.faq')}</Link>
              <Link href="/about" className="block hover:text-blue-500 transition-colors">{t('nav.about')}</Link>
              <Link href="/contact" className="block hover:text-blue-500 transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.tools')}</h3>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/youtube-to-mp3" className="block hover:text-blue-500 transition-colors">{t('nav.youtubeToMp3')}</Link>
              <Link href="/youtube-to-mp4" className="block hover:text-blue-500 transition-colors">{t('nav.youtubeToMp4')}</Link>
              <Link href="/youtube-shorts-download" className="block hover:text-blue-500 transition-colors">{t('nav.youtubeShortsDownload')}</Link>
              <Link href="/youtube-4k-download" className="block hover:text-blue-500 transition-colors">{t('nav.youtube4kDownload')}</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('footer.legal')}</h3>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/privacy-policy" className="block hover:text-blue-500 transition-colors">{t('nav.privacy')}</Link>
              <Link href="/terms-of-service" className="block hover:text-blue-500 transition-colors">{t('nav.terms')}</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
