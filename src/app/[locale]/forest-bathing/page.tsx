import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import { extractForestBathingScheduleTourData } from '@/libs/prismic-schedule-tour';
import ForestBathingPage from '@/modules/forest-bathing';

interface ForestBathingProps {
  params: {
    locale: string;
  };
}

export default async function ForestBathing({ params }: ForestBathingProps) {
  const { locale } = params;

  const forestBathing = await fetchPrismicDocument('forest_bathing', locale);

  // Extract schedule tour data
  const scheduleTourData = extractForestBathingScheduleTourData(forestBathing as any);

  return (
    <ForestBathingPage forestBathingData={forestBathing as any} scheduleTourData={scheduleTourData} lang={locale} />
  );
}
