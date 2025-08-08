import { createClient } from '@/libs/prismic';
import ExperiencesPage from '@/modules/experiences';
import { notFound } from 'next/navigation';

interface ExperiencesProps {
  params: {
    locale: string;
  };
}

export default async function Experiences({ params }: ExperiencesProps) {
  const { locale } = params;

  // Validate locale
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  try {
    console.log('Fetching fresh experiences data for:', locale);
    const client = createClient();
    const experiences = await client.getSingle('experiences', {
      lang: locale === 'vi' ? 'vi' : 'en-us',
    });

    console.log('experiences data:', experiences.data);

    return (
      <ExperiencesPage experiencesData={experiences as any} lang={locale} />
    );
  } catch (error) {
    console.error('Error fetching experiences data:', error);

    // Fallback when no data from Prismic
    return <ExperiencesPage experiencesData={null} lang={locale} />;
  }
}
