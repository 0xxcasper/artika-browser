import { prismicServerCache, createCacheKey } from '@/libs/prismic-server-cache';
import { fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import SlugArtwalkPage from '@/modules/artwalk/slug';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    lang?: string[];
    slug: string;
  };
}

// Cache cho 5 phút (300 giây)
export const revalidate = 300;

export default async function Page({ params }: PageProps) {
  // Nếu không có lang hoặc lang[0] là 'en', sử dụng 'en'
  const lang = params.lang?.[0] || 'en';
  const slug = params.slug;
  
  console.log('Artwalk page params:', { lang, slug });
  
  try {
    // Check server cache first
    const cacheKey = createCacheKey(`artwalk-category-${slug}`, lang);
    const cachedData = prismicServerCache.get<any>(cacheKey);
    
    console.log('Cache key:', cacheKey);
    console.log('Cached data exists:', !!cachedData);
    
    if (cachedData) {
      console.log('Using server cached data for artwalk category:', slug);
      return (
        <SlugArtwalkPage 
          categoryData={cachedData}
          slug={slug}
          lang={lang}
        />
      );
    }

    // Fetch from Prismic if not cached
    console.log('Fetching fresh artwalk category data for:', slug, lang);
    const categoryData = await fetchArtwalkCategory(slug, lang === 'vi' ? 'vi' : 'en-us');

    console.log("artwalk category data", categoryData);

    // If no data found, return 404
    if (!categoryData) {
      console.log('Collection not found, returning 404');
      notFound();
    }

    // Cache the result
    prismicServerCache.set(cacheKey, categoryData);

    return (
      <SlugArtwalkPage 
        categoryData={categoryData}
        slug={slug}
        lang={lang}
      />
    );
  } catch (error) {
    console.error('Error fetching artwalk category data:', error);
    
    // Check if it's a "not found" error
    if (error instanceof Error && error.message.includes('No documents were returned')) {
      console.log('Collection not found, returning 404');
      notFound();
    }
    
    // For other errors, return fallback
    console.log('Using fallback data for artwalk category');
    return (
      <SlugArtwalkPage 
        categoryData={null}
        slug={slug}
        lang={lang}
      />
    );
  }
}