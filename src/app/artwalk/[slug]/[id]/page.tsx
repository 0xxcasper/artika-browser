import { fetchArtwalkContent, fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import GalleryDetailPage from "@/modules/artwalk/detail";
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    lang?: string[];
    slug: string;
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  // Nếu không có lang hoặc lang[0] là 'en', sử dụng 'en'
  const lang = params.lang?.[0] || 'en';
  const slug = params.slug;
  const id = params.id;
  
  try {
    // Fetch from Prismic
    console.log('Fetching fresh artwalk content data for:', id, lang);
    const contentData = await fetchArtwalkContent(id, lang === 'vi' ? 'vi' : 'en-us');

    console.log("artwalk content data", contentData);

    // If no data found, return 404
    if (!contentData) {
      console.log('Content item not found, returning 404');
      notFound();
    }

    // Fetch other projects from the same collection
    const categoryData = await fetchArtwalkCategory(slug, lang === 'vi' ? 'vi' : 'en-us');
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
        lang={lang}
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
        lang={lang}
      />
    );
  }
}