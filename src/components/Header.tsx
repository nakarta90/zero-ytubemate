'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu, X, Sun, Moon, Globe, Download } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Download className="w-6 h-6 text-blue-500" />
            <span className="gradient-text">Zero YTubeMate</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-blue-500 transition-colors">{t('nav.home')}</Link>
            <Link href="/how-to-use" className="hover:text-blue-500 transition-colors">{t('nav.howToUse')}</Link>
            <Link href="/faq" className="hover:text-blue-500 transition-colors">{t('nav.faq')}</Link>
            <Link href="/about" className="hover:text-blue-500 transition-colors">{t('nav.about')}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector locale={locale} />
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? t('common.lightMode') : t('common.darkMode')}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t('common.menu')}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.home')}</Link>
          <Link href="/how-to-use" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.howToUse')}</Link>
          <Link href="/youtube-to-mp3" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.youtubeToMp3')}</Link>
          <Link href="/youtube-to-mp4" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.youtubeToMp4')}</Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.faq')}</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.about')}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">{t('nav.contact')}</Link>
        </div>
      )}
    </header>
  );
}
