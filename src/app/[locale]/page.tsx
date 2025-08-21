import { type HomepageDocument } from '@/libs/prismic';
import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import { extractHomepageScheduleTourData } from '@/libs/prismic-schedule-tour';
import HomePage from '@/modules/home';
import { notFound } from 'next/navigation';

interface LocalePageProps {
  params: {
    locale: string;
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = params;

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  try {
    const homepage = (await fetchPrismicDocument(
      'homepage',
      locale,
    )) as unknown as HomepageDocument;

    console.log('homepage data:', homepage.data);

    // Extract schedule tour data
    const scheduleTourData = extractHomepageScheduleTourData(homepage);

    return (
      <HomePage
        homepageData={homepage}
        scheduleTourData={scheduleTourData}
        lang={locale}
      />
    );
  } catch (error) {
    console.error('Error fetching homepage data:', error);

    // Fallback when no data from Prismic
    return <HomePage homepageData={null} lang={locale} />;
  }
}
