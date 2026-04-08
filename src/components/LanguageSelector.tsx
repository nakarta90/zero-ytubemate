'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, ChevronDown } from 'lucide-react';

const languageNames: Record<string, string> = {
  en: 'English', zh: '中文', de: 'Deutsch', ja: '日本語', hi: 'हिन्दी',
  fr: 'Français', it: 'Italiano', pt: 'Português', ru: 'Русский', es: 'Español',
  ko: '한국어', id: 'Indonesia', nl: 'Nederlands', tr: 'Türkçe', ar: 'العربية',
  pl: 'Polski', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi'
};

export default function LanguageSelector({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{languageNames[locale]}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          {Object.entries(languageNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                code === locale ? 'text-blue-500 font-semibold' : ''
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
