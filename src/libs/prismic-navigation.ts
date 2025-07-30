import { createClient } from './prismic';
import type { NavigationMenu } from '@/locales/types';

export async function fetchNavigation(locale: string): Promise<NavigationMenu[]> {
  try {
    const client = createClient();
    
    // Check if navigation_menu custom type exists
    try {
      const doc = await (client as any).getSingle('navigation_menu', { lang: locale });
      
      // Map lại cho đúng format component navigation đang dùng
      return doc.data.items?.map((item: any) => ({
        label: item.label || '',
        href: item.href || '',
        subs: item.subs?.map((sub: any) => ({
          id: sub.id || '',
          name: sub.name || '',
          href: sub.href || '',
        })) || [],
      })) || [];
    } catch (docError) {
      console.warn('Navigation menu document not found, using fallback');
      return [];
    }
  } catch (error) {
    console.error('Error fetching navigation from Prismic:', error);
    // Fallback to default navigation if Prismic fails
    return [];
  }
} 