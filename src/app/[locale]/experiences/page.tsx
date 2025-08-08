import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import ExperiencesPage from '@/modules/experiences';

interface ExperiencesProps {
  params: {
    locale: string;
  };
}

export default async function Experiences({ params }: ExperiencesProps) {
  const { locale } = params;

  const experiences = await fetchPrismicDocument('experiences', locale);

  return <ExperiencesPage experiencesData={experiences as any} lang={locale} />;
}
