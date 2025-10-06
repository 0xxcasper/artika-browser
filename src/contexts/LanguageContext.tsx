'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  getLocalizedHref: (href: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
  language: Language;
}

export function LanguageProvider({
  children,
  language,
}: LanguageProviderProps) {
  const getLocalizedHref = (href: string) => {
    // If href is empty or just whitespace, return empty string to prevent navigation
    if (!href || href.trim() === '') {
      return '';
    }

    // if different domain, return href
    if (href.includes('http') && !href.includes(window.location.origin)) {
      return href;
    }

    if (href.includes('http') && href.includes(window.location.origin)) {
      const locale = language === 'vi' ? '/vi' : '';

      return href.replace(
        window.location.origin,
        `${window.location.origin}${locale}`,
      );
    }

    if (href === '/') {
      return language === 'vi' ? '/vi' : '/';
    }
    return language === 'vi' ? `/vi${href}` : href;
  };
  return (
    <LanguageContext.Provider value={{ language, getLocalizedHref }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
