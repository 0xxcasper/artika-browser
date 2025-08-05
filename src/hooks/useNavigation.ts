import { useState, useEffect } from 'react';
import { fetchNavigation } from '@/libs/prismic-navigation';
import type { NavigationMenu, NavigationData, NavigationCTA } from '@/locales/types';
import { useLanguage } from '@/contexts/LanguageContext';

const defaultCta: NavigationCTA = {
  cta_label: '',
  cta_link: '',
};

export function useNavigation() {
  const { language } = useLanguage();
  const [menus, setMenus] = useState<NavigationMenu[]>([]);
  const [cta, setCta] = useState<NavigationCTA>(defaultCta);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNavigation() {
      try {
        setLoading(true);
        setError(null);
        
        // Convert language to Prismic locale format
        const locale = language; // Currently only English is supported

        console.log("useNavigation", { locale });
        try {
          const navigationData: NavigationData = await fetchNavigation(locale);
          console.log("useNavigation", { navigationData });
          
          // Fallback to default navigation if Prismic data is empty
          if (navigationData.items.length === 0) {
            // Import default navigation as fallback
            const { navigation } = await import('@/locales/en');
            setMenus(navigation);
            setCta(defaultCta);
          } else {
            setMenus(navigationData.items);
            setCta(navigationData.cta);
          }
        } catch (prismicError) {
          console.warn('Prismic navigation failed, using fallback:', prismicError);
          // Import default navigation as fallback
          const { navigation } = await import('@/locales/en');
          setMenus(navigation);
          setCta(defaultCta);

          console.log("useNavigation", { menus, cta });
        }
      } catch (err) {
        console.error('Failed to load navigation:', err);
        setError('Failed to load navigation');
        
        // Fallback to default navigation
        try {
          const { navigation } = await import('@/locales/en');
          setMenus(navigation);
          setCta(defaultCta);
        } catch (fallbackErr) {
          console.error('Fallback navigation also failed:', fallbackErr);
          setMenus([]);
          setCta(defaultCta);
        }
      } finally {
        setLoading(false);
      }
    }

    loadNavigation();
  }, [language]);


  return { menus, cta, loading, error };
} 