import { createClient } from '@/libs/prismic';
import type { ArtwalkCategory, ArtwalkCategoryList, ArtwalkContent } from '@/types/artwalk';

// Transform Prismic collection document to ArtwalkCategory
function transformToArtwalkCategory(doc: any): ArtwalkCategory {
  console.log('Transforming collection document:', doc);
  
  const result = {
    slugId: doc.uid, // Use UID instead of slugId field
    title: doc.data.title || '',
    description: doc.data.description || '',
    contents: []
  };
  
  // Transform linked content items
  if (doc.data.contents && Array.isArray(doc.data.contents)) {
    result.contents = doc.data.contents
      .map((content: any) => {
        if (content.contentItem && content.contentItem.data) {
          return transformToArtwalkContent(content.contentItem);
        }
        return null;
      })
      .filter(Boolean);
  }
  
  console.log('Transformed category result:', result);
  return result;
}

// Transform Prismic content item document to ArtwalkContent
function transformToArtwalkContent(doc: any): ArtwalkContent {
  console.log('Transforming content item document:', doc);
  
  const result = {
    id: doc.uid,
    href: `/artwalk/content/${doc.uid}`,
    name: doc.data.name || '',
    subName: doc.data.subName || '',
    thumb: doc.data.thumb?.url || '',
    material: doc.data.material || '',
    detail: {
      images: [],
      title: '',
      info: '',
      author: '',
      description: ''
    }
  };
  
  // Transform linked detail if exists
  if (doc.data.detail && doc.data.detail.data) {
    result.detail = transformToArtwalkDetail(doc.data.detail);
  }
  
  console.log('Transformed content result:', result);
  return result;
}

// Transform Prismic detail document
function transformToArtwalkDetail(doc: any): any {
  console.log('Transforming detail document:', doc);
  
  const result = {
    title: doc.data.title || '',
    description: doc.data.description || '',
    info: doc.data.info || '',
    author: doc.data.author || '',
    images: []
  };
  
  // Transform images
  if (doc.data.images && Array.isArray(doc.data.images)) {
    result.images = doc.data.images
      .map((img: any) => img.image?.url)
      .filter(Boolean);
  }
  
  console.log('Transformed detail result:', result);
  return result;
}

// Fetch all collections
export async function fetchAllArtwalkCategories(locale: string): Promise<ArtwalkCategoryList> {
  try {
    console.log('Fetching all artwalk categories for locale:', locale);
    const client = createClient();
    const docs = await (client as any).getAllByType('collection', { 
      lang: locale,
      fetchLinks: [
        'content_item.name',
        'content_item.subName', 
        'content_item.thumb',
        'content_item.material',
        'content_item.detail',
        'detail.title',
        'detail.description',
        'detail.info',
        'detail.author',
        'detail.images'
      ]
    });
    
    console.log('Found collection documents:', docs.length);
    return docs.map(transformToArtwalkCategory);
  } catch (error) {
    console.error('Error fetching artwalk categories from Prismic:', error);
    return [];
  }
}

// Fetch specific collection by slugId (using UID)
export async function fetchArtwalkCategory(slugId: string, locale: string): Promise<ArtwalkCategory | null> {
  try {
    console.log('Fetching artwalk category by UID:', slugId, 'locale:', locale);
    const client = createClient();
    
    const doc = await (client as any).getByUID('collection', slugId, { 
      lang: locale,
      fetchLinks: [
        'content_item.name',
        'content_item.subName', 
        'content_item.thumb',
        'content_item.material',
        'content_item.detail',
        'detail.title',
        'detail.description',
        'detail.info',
        'detail.author',
        'detail.images'
      ]
    });
    
    console.log('Found collection document by UID:', !!doc);
    
    if (!doc) {
      console.log('No collection found for UID:', slugId);
      return null;
    }
    
    return transformToArtwalkCategory(doc);
  } catch (error) {
    console.error('Error fetching artwalk category from Prismic:', error);
    return null;
  }
}

// Fetch specific content item by ID
export async function fetchArtwalkContent(contentId: string, locale: string): Promise<ArtwalkContent | null> {
  try {
    console.log('Fetching artwalk content by ID:', contentId, 'locale:', locale);
    const client = createClient();
    const doc = await (client as any).getByUID('content_item', contentId, { 
      lang: locale,
      fetchLinks: [
        'detail.title',
        'detail.description',
        'detail.info',
        'detail.author',
        'detail.images'
      ]
    });
    
    console.log('Found content item document:', !!doc);
    
    if (!doc) return null;
    
    return transformToArtwalkContent(doc);
  } catch (error) {
    console.error('Error fetching artwalk content from Prismic:', error);
    return null;
  }
}

// Get all collection UIDs
export async function getArtwalkCategorySlugIds(locale: string): Promise<string[]> {
  try {
    console.log('Fetching all collection UIDs for locale:', locale);
    const client = createClient();
    const docs = await (client as any).getAllByType('collection', { 
      lang: locale
    });
    
    const uids = docs.map((doc: any) => doc.uid).filter(Boolean);
    console.log('Found UIDs:', uids);
    return uids;
  } catch (error) {
    console.error('Error fetching artwalk category UIDs from Prismic:', error);
    return [];
  }
}

// Legacy functions for backward compatibility
export async function fetchAllArtwalkItems(locale: string): Promise<ArtwalkContent[]> {
  try {
    console.log('Fetching all artwalk items for locale:', locale);
    const client = createClient();
    const docs = await (client as any).getAllByType('content_item', { 
      lang: locale,
      fetchLinks: [
        'detail.title',
        'detail.description',
        'detail.info',
        'detail.author',
        'detail.images'
      ]
    });
    
    console.log('Found content item documents:', docs.length);
    return docs.map(transformToArtwalkContent);
  } catch (error) {
    console.error('Error fetching all artwalk items from Prismic:', error);
    return [];
  }
}

export async function fetchArtwalkItem(itemId: string, locale: string): Promise<ArtwalkContent | null> {
  return fetchArtwalkContent(itemId, locale);
} 