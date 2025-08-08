import { fetchArtwalkCategory } from '@/libs/prismic-artwalk';
import SlugArtwalkPage from '@/modules/artwalk/slug';
import { notFound } from 'next/navigation';

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

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  console.log('Artwalk page params:', { locale, slug });

  try {
    // Fetch from Prismic with locale
    console.log('Fetching fresh artwalk category data for:', slug, locale);
    const categoryData = await fetchArtwalkCategory(
      slug,
      locale === 'vi' ? 'vi' : 'en-us',
    );

    console.log('artwalk category data', categoryData);

    // If no data found, return 404
    if (!categoryData) {
      console.log('Collection not found, returning 404');
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
      console.log('Collection not found, returning 404');
      notFound();
    }

    // For other errors, return fallback
    console.log('Using fallback data for artwalk category');
    return <SlugArtwalkPage categoryData={null} slug={slug} lang={locale} />;
  }
}
