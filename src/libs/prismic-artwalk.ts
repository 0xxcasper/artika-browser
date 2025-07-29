import { createClient } from './prismic';
import * as prismic from '@prismicio/client';

export interface ArtwalkItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  material: string;
  image: string;
  category: string;
}

export async function fetchArtwalks(locale: string): Promise<ArtwalkItem[]> {
  try {
    const client = createClient();
    // Note: This will work once artwalk custom type is created in Prismic
    const docs = await (client as any).getAllByType('artwalk', { lang: locale });
    
    return docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.uid || '',
      title: doc.data.title || '',
      description: doc.data.description || '',
      material: doc.data.material || '',
      image: doc.data.image?.url || '',
      category: doc.data.category || '',
    }));
  } catch (error) {
    console.error('Error fetching artwalks from Prismic:', error);
    return [];
  }
}

export async function fetchArtwalkBySlug(slug: string, locale: string): Promise<ArtwalkItem | null> {
  try {
    const client = createClient();
    // Note: This will work once artwalk custom type is created in Prismic
    const doc = await (client as any).getByUID('artwalk', slug, { lang: locale });
    
    if (!doc) return null;
    
    return {
      id: doc.id,
      slug: doc.uid || '',
      title: doc.data.title || '',
      description: doc.data.description || '',
      material: doc.data.material || '',
      image: doc.data.image?.url || '',
      category: doc.data.category || '',
    };
  } catch (error) {
    console.error('Error fetching artwalk by slug from Prismic:', error);
    return null;
  }
}

export async function fetchArtwalksByCategory(category: string, locale: string): Promise<ArtwalkItem[]> {
  try {
    const client = createClient();
    // Note: This will work once artwalk custom type is created in Prismic
    const docs = await (client as any).getAllByType('artwalk', { 
      lang: locale,
      predicates: [
        (prismic as any).predicates.at('my.artwalk.category', category)
      ]
    });
    
    return docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.uid || '',
      title: doc.data.title || '',
      description: doc.data.description || '',
      material: doc.data.material || '',
      image: doc.data.image?.url || '',
      category: doc.data.category || '',
    }));
  } catch (error) {
    console.error('Error fetching artwalks by category from Prismic:', error);
    return [];
  }
} 