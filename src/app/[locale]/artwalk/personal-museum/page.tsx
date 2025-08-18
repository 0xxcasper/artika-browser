import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import PersonalMuseumPage from '@/modules/personal-museum';

interface PersonalMuseumProps {
  params: {
    locale: string;
  };
}

export default async function PersonalMuseum({ params }: PersonalMuseumProps) {
  const { locale } = params;

  const personalMuseum = await fetchPrismicDocument('personal_museum', locale);

  // Log for debugging
  console.log('Personal Museum data:', personalMuseum);
  console.log('Locale:', locale);

  return (
    <PersonalMuseumPage
      personalMuseumData={personalMuseum as any}
      lang={locale}
    />
  );
}
