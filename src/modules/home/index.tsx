import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import GridImages from '@/components/grid-images';
import Hero from '@/components/hero';
import EmailForm from '@/components/schedule-tour-form';
import SplitBanner, {
  type SplitBannerSection,
} from '@/components/split-banner';
import { HomepageDocument } from '@/libs/prismic';
import {
  extractCommonPageData,
  extractFocusBannerData,
  extractGridImagesData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import type { ScheduleTourData } from '@/types/schedule-tour';
import './styles.scss';

interface HomePageProps {
  homepageData: HomepageDocument | null;
  scheduleTourData?: ScheduleTourData | null;
  lang: string;
}

export default function HomePage({
  homepageData,
  scheduleTourData,
}: HomePageProps) {
  const { hero, about } = extractCommonPageData({ data: homepageData?.data });
  const focusBannerData = extractFocusBannerData({ data: homepageData?.data });
  const splitBannerData = extractSplitBannerData({
    sections: homepageData?.data?.split_banner_sections as SplitBannerSection[],
    fallbackImagePath: '/images/home/art',
    sectionPrefix: 'section',
  });
  const gridImagesData = extractGridImagesData({
    data: homepageData?.data,
    fallbackImagePath: '/images/collections/collection',
  });

  return (
    <div className="container-no-padding home-page">
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        backgroundImage={hero.backgroundImage}
      />
      <About
        title={about.title}
        description={about.description}
        button={about.button}
        buttonLink={about.buttonLink}
      />
      <SplitBanner sections={splitBannerData.slice(0, 1)} />
      <FocusBanner
        title={focusBannerData.title}
        description={focusBannerData.description}
        buttonText={focusBannerData.buttonText}
        buttonLink={focusBannerData.buttonLink}
        backgroundImage={focusBannerData.backgroundImage}
      />
      <SplitBanner sections={splitBannerData.slice(1)} />
      <GridImages title={gridImagesData.title} cards={gridImagesData.cards} />
      {!!scheduleTourData && <EmailForm tourData={scheduleTourData} />}
    </div>
  );
}
