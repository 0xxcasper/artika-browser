import {
  fetchArtwalkContent,
  fetchArtwalkCategory,
} from '@/libs/prismic-artwalk';
import GalleryDetailPage from '@/modules/artwalk/detail';
import { notFound } from 'next/navigation';

interface LocaleArtwalkDetailPageProps {
  params: {
    locale: string;
    slug: string;
    id: string;
  };
}

export default async function LocaleArtwalkDetailPage({
  params,
}: LocaleArtwalkDetailPageProps) {
  const { locale, slug, id } = params;

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  try {
    // Fetch from Prismic with locale
    const contentData = await fetchArtwalkContent(
      id,
      locale === 'vi' ? 'vi' : 'en-us',
    );

    // If no data found, return 404
    if (!contentData) {
      notFound();
    }

    // Fetch other projects from the same collection
    const categoryData = await fetchArtwalkCategory(
      slug,
      locale === 'vi' ? 'vi' : 'en-us',
    );
    const otherProjects =
      categoryData?.contents?.filter((project) => project.id !== id) || [];

    // Add other projects to content data
    const contentDataWithOthers = {
      ...contentData,
      otherProjects,
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
    if (
      error instanceof Error &&
      error.message.includes('No documents were returned')
    ) {
      notFound();
    }

    // For other errors, return fallback
    return (
      <GalleryDetailPage contentData={null} slug={slug} id={id} lang={locale} />
    );
  }
}
