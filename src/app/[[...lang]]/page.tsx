import { createClient } from '@/libs/prismic';
import { prismicServerCache, createCacheKey } from '@/libs/prismic-server-cache';
import HomePage from '@/modules/home';

interface PageProps {
  params: {
    lang?: string[];
  };
}

// Cache cho 5 phút (300 giây)
export const revalidate = 300;

export default async function Page({ params }: PageProps) {
  // Nếu không có lang hoặc lang[0] là 'en', sử dụng 'en'
  const lang = params.lang?.[0] || 'en';
  
  try {
    // Check server cache first
    const cacheKey = createCacheKey('homepage', lang);
    const cachedData = prismicServerCache.get<any>(cacheKey);
    
    if (cachedData) {
      console.log('Using server cached data for:', lang);
      return (
        <HomePage 
          homepageData={cachedData}
          lang={lang}
        />
      );
    }

    // Fetch from Prismic if not cached
    console.log('Fetching fresh data for:', lang);
    const client = createClient();
    const homepage = await client.getSingle('homepage', {
      lang: lang === 'vi' ? 'vi' : 'en-us'
    });

    // Cache the result
    prismicServerCache.set(cacheKey, homepage);

    return (
      <HomePage 
        homepageData={homepage as any}
        lang={lang}
      />
    );
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    
    // Fallback khi không có dữ liệu từ Prismic
    return (
      <HomePage 
        homepageData={null}
        lang={lang}
      />
    );
  }
} 