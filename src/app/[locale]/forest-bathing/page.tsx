import { createClient } from '@/libs/prismic';
import ForestBathingPage from '@/modules/forest-bathing';
import { notFound } from 'next/navigation';

interface ForestBathingProps {
  params: {
    locale: string;
  };
}

export default async function ForestBathing({ params }: ForestBathingProps) {
  const { locale } = params;

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  try {
    console.log('Fetching fresh forest bathing data for:', locale);
    const client = createClient();
    const forestBathing = await client.getSingle('forest_bathing', {
      lang: locale === 'vi' ? 'vi' : 'en-us',
    });

    console.log('forest bathing data:', forestBathing.data);

    return (
      <ForestBathingPage
        forestBathingData={forestBathing as any}
        lang={locale}
      />
    );
  } catch (error) {
    console.error('Error fetching forest bathing data:', error);

    // Fallback when no data from Prismic
    return <ForestBathingPage forestBathingData={null} lang={locale} />;
  }
}
