import { createClient } from './prismic';
import type { NavigationData, NavigationCTA } from '@/locales/types';

const defaultCta: NavigationCTA = {
  cta_label: '',
  cta_link: '',
};

const defaultNavigationItems = [
  {
    label: 'Home',
    href: '/',
    subs: []
  },
  {
    label: 'Artwalk',
    href: '/artwalk',
    subs: []
  },
  {
    label: 'About',
    href: '/about',
    subs: []
  },
  {
    label: 'Contact',
    href: '/contact',
    subs: []
  }
];

export async function fetchNavigation(locale: string): Promise<NavigationData> {
  try {
    const client = createClient();
    console.log("Fetching navigation for locale:", locale);
    
    // Try to fetch navigation_menu document
    try {
      const doc = await (client as any).getSingle('navigation_menu', { 
        lang: locale === 'vi' ? 'vi-vn' : 'en-us' 
      });
      
      // Extract menus data
      const items = doc.data.items?.map((item: any) => ({
        label: item.label || '',
        href: item.href || '',
        subs: item.subs?.map((sub: any) => ({
          id: sub.id || '',
          name: sub.name || '',
          href: sub.href || '',
        })) || [],
      })) || [];

      // Extract CTA data
      const cta = {
        cta_label: doc.data.cta_label || defaultCta.cta_label,
        cta_link: doc.data.cta_link || defaultCta.cta_link,
      };

      return {
        items: items.length > 0 ? items : defaultNavigationItems,
        cta
      };
    } catch (docError) {
      console.warn('Navigation menu document not found, using fallback navigation');
      console.warn('Error details:', docError);
      
      // Return fallback navigation
      return { 
        items: defaultNavigationItems, 
        cta: defaultCta 
      };
    }
  } catch (error) {
    console.error('Error fetching navigation from Prismic:', error);
    // Fallback to default navigation if Prismic fails
    return { 
      items: defaultNavigationItems, 
      cta: defaultCta 
    };
  }
} 