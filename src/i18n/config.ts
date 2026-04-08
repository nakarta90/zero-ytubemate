export const locales = ['en', 'zh', 'de', 'ja', 'hi', 'fr', 'it', 'pt', 'ru', 'es', 'ko', 'id', 'nl', 'tr', 'ar', 'pl', 'sv', 'no', 'da', 'fi'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];
