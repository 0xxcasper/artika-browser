import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import { extractSustainabilityData } from '@/libs/prismic-sustainability';
import SustainabilityPage from '@/modules/sustainability';

interface SustainabilityProps {
  params: {
    locale: string;
  };
}

export default async function Sustainability({ params }: SustainabilityProps) {
  const { locale } = params;

  const sustainability = (await fetchPrismicDocument(
    'sustainability',
    locale,
  )) as any;

  // Extract sustainability data
  const sustainabilityData = extractSustainabilityData(sustainability);

  if (!sustainabilityData) {
    return <div>No sustainability data available</div>;
  }

  return (
    <SustainabilityPage sustainabilityData={sustainabilityData} lang={locale} />
  );
}
