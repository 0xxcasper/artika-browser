import { fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import SlugArtwalkPage from '@/modules/artwalk/slug';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    lang?: string[];
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  // Nếu không có lang hoặc lang[0] là 'en', sử dụng 'en'
  const lang = params.lang?.[0] || 'en';
  const slug = params.slug;
  
  console.log('Artwalk page params:', { lang, slug });
  
  try {
    // Fetch from Prismic
    console.log('Fetching fresh artwalk category data for:', slug, lang);
    const categoryData = await fetchArtwalkCategory(slug, lang === 'vi' ? 'vi' : 'en-us');

    console.log("artwalk category data", categoryData);

    // If no data found, return 404
    if (!categoryData) {
      console.log('Collection not found, returning 404');
      notFound();
    }

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