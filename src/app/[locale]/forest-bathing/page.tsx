import ForestBathingPage from '@/modules/forest-bathing';
import { fetchPrismicDocument } from '@/libs/prismic-helpers';

interface ForestBathingProps {
  params: {
    locale: string;
  };
}

export default async function ForestBathing({ params }: ForestBathingProps) {
  const { locale } = params;

  const forestBathing = await fetchPrismicDocument('forest_bathing', locale);

  return (
    <ForestBathingPage forestBathingData={forestBathing as any} lang={locale} />
  );
}
