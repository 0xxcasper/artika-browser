export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromParams(params: any): Locale {
  const locale = params?.locale || defaultLocale;
  return isValidLocale(locale) ? locale : defaultLocale;
}

// Prismic locale mapping
export const prismicLocales = {
  en: 'en-us',
  vi: 'vi-vn',
} as const;

export function getPrismicLocale(locale: Locale): string {
  return prismicLocales[locale];
}

// Translations
export const translations = {
  en: {
    welcome: 'Welcome to Artika',
    description: 'Discover amazing artworks',
    about: 'About',
    contact: 'Contact',
    // Add more translations
  },
  vi: {
    welcome: 'Chào mừng đến với Artika',
    description: 'Khám phá những tác phẩm nghệ thuật tuyệt vời',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    // Add more translations
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
