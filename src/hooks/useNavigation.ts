import { useState, useEffect } from 'react';
import { fetchNavigation } from '@/libs/prismic-navigation';
import type { NavigationMenu } from '@/locales/types';
import { useLanguage } from '@/contexts/LanguageContext';

export function useNavigation() {
  const { language } = useLanguage();
  const [menus, setMenus] = useState<NavigationMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNavigation() {
      try {
        setLoading(true);
        setError(null);
        
        // Convert language to Prismic locale format
        const locale = 'en-us'; // Currently only English is supported
        
        try {
          const navigationData = await fetchNavigation(locale);
          
          // Fallback to default navigation if Prismic data is empty
          if (navigationData.length === 0) {
            // Import default navigation as fallback
            const { navigation } = await import('@/locales/en');
            setMenus(navigation);
          } else {
            setMenus(navigationData);
          }
        } catch (prismicError) {
          console.warn('Prismic navigation failed, using fallback:', prismicError);
          // Import default navigation as fallback
          const { navigation } = await import('@/locales/en');
          setMenus(navigation);
        }
      } catch (err) {
        console.error('Failed to load navigation:', err);
        setError('Failed to load navigation');
        
        // Fallback to default navigation
        try {
          const { navigation } = await import('@/locales/en');
          setMenus(navigation);
        } catch (fallbackErr) {
          console.error('Fallback navigation also failed:', fallbackErr);
          setMenus([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadNavigation();
  }, [language]);


  return { menus, loading, error };
} 