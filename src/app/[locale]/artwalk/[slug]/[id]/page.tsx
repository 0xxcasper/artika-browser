import { fetchArtwalkContent, fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import GalleryDetailPage from "@/modules/artwalk/detail";
import { notFound } from 'next/navigation';

interface LocaleArtwalkDetailPageProps {
  params: {
    locale: string;
    slug: string;
    id: string;
  };
}

export default async function LocaleArtwalkDetailPage({ params }: LocaleArtwalkDetailPageProps) {
  const { locale, slug, id } = params;
  
  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }
  
  try {
    // Fetch from Prismic with locale
    console.log('Fetching fresh artwalk content data for:', id, locale);
    const contentData = await fetchArtwalkContent(id, locale === 'vi' ? 'vi' : 'en-us');

    console.log("artwalk content data", contentData);

    // If no data found, return 404
    if (!contentData) {
      console.log('Content item not found, returning 404');
      notFound();
    }

    // Fetch other projects from the same collection
    const categoryData = await fetchArtwalkCategory(slug, locale === 'vi' ? 'vi' : 'en-us');
    const otherProjects = categoryData?.contents?.filter(project => project.id !== id) || [];

    // Add other projects to content data
    const contentDataWithOthers = {
      ...contentData,
      otherProjects
    };

    return (
      <GalleryDetailPage 
        contentData={contentDataWithOthers}
        slug={slug}
        id={id}
        lang={locale}
      />
    );
  } catch (error) {
    console.error('Error fetching artwalk content data:', error);
    
    // Check if it's a "not found" error
    if (error instanceof Error && error.message.includes('No documents were returned')) {
      console.log('Content item not found, returning 404');
      notFound();
    }
    
    // For other errors, return fallback
    console.log('Using fallback data for artwalk content');
    return (
      <GalleryDetailPage 
        contentData={null}
        slug={slug}
        id={id}
        lang={locale}
      />
    );
  }
} 