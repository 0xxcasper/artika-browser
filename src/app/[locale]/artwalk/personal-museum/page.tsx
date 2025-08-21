import type { PersonalMuseumDocument } from '@/libs/prismic';
import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import { extractPersonalMuseumScheduleTourData } from '@/libs/prismic-schedule-tour';
import PersonalMuseumPage from '@/modules/personal-museum';

interface PersonalMuseumProps {
  params: {
    locale: string;
  };
}

export default async function PersonalMuseum({ params }: PersonalMuseumProps) {
  const { locale } = params;

  const personalMuseum = (await fetchPrismicDocument(
    'personal_museum',
    locale,
  )) as unknown as PersonalMuseumDocument;

  // Extract schedule tour data
  const scheduleTourData = extractPersonalMuseumScheduleTourData(
    personalMuseum as unknown as PersonalMuseumDocument,
  );

  return (
    <PersonalMuseumPage
      personalMuseumData={personalMuseum}
      scheduleTourData={scheduleTourData}
      lang={locale}
    />
  );
}
