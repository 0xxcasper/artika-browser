import { fetchPrismicDocument } from '@/libs/prismic-helpers';
import { GuideDocument } from '@/libs/prismic';
import { extractGuideData } from '@/libs/prismic-guide';
import Guide from '@/modules/guide';

const GuidePage = async ({ params }: { params: { locale: 'en' | 'vi' } }) => {
  console.log(params);
  const { locale } = params;
  const prismicGuideData = (await fetchPrismicDocument(
    'guide',
    locale,
  )) as unknown as GuideDocument;

  const guideData = extractGuideData(prismicGuideData);
  if (!guideData) {
    return null;
  }
  return <Guide guideData={guideData} />;
};

export default GuidePage;
