import { fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import SlugArtwalkPage from '@/modules/artwalk/slug';
import { notFound } from 'next/navigation';
import { validateAndNormalizeLocale } from '@/libs/prismic-helpers';

interface LocaleArtwalkSlugPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function LocaleArtwalkSlugPage({
  params,
}: LocaleArtwalkSlugPageProps) {
  const { locale, slug } = params;

  const normalizedLocale = validateAndNormalizeLocale(locale);

  try {
    // Fetch from Prismic with locale
    const categoryData = await fetchArtwalkCategory(slug, normalizedLocale);

    // If no data found, return 404
    if (!categoryData) {
      notFound();
    }

    return (
      <SlugArtwalkPage categoryData={categoryData} slug={slug} lang={locale} />
    );
  } catch (error) {
    console.error('Error fetching artwalk category data:', error);

    // Check if it's a "not found" error
    if (
      error instanceof Error &&
      error.message.includes('No documents were returned')
    ) {
      notFound();
    }

    // For other errors, return fallback
    return <SlugArtwalkPage categoryData={null} slug={slug} lang={locale} />;
  }
}
