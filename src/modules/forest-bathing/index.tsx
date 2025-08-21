import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import GridImages from '@/components/grid-images';
import Hero from '@/components/hero';
import EmailForm from '@/components/schedule-tour-form';
import SplitBanner from '@/components/split-banner';
import { ForestBathingDocument } from '@/libs/prismic';
import {
  extractAboutData,
  extractFocusBannerData,
  extractGridImagesData,
  extractHeroData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import type { ScheduleTourData } from '@/types/schedule-tour';
import './styles.scss';

interface ForestBathingPageProps {
  forestBathingData: ForestBathingDocument | null;
  scheduleTourData?: ScheduleTourData | null;
  lang: string;
}

export default function ForestBathingPage({
  forestBathingData,
  scheduleTourData,
}: ForestBathingPageProps) {
  const heroData = extractHeroData({ data: forestBathingData?.data });
  const aboutData = extractAboutData({ data: forestBathingData?.data });
  const splitBannerData = extractSplitBannerData({
    sections: forestBathingData?.data?.split_banner_sections,
    fallbackImagePath: '/images/forest-bathing/section',
    sectionPrefix: 'section',
  });
  const focusBannerData = extractFocusBannerData({
    data: forestBathingData?.data,
  });
  const secondSplitBannerData = extractSplitBannerData({
    sections: forestBathingData?.data?.second_split_banner_sections,
    fallbackImagePath: '/images/forest-bathing/second-section',
    sectionPrefix: 'second-section',
  });
  const gridImagesData = extractGridImagesData({
    data: forestBathingData?.data,
    fallbackImagePath: '/images/forest-bathing/grid',
  });

  return (
    <div className="forest-bathing-page">
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        backgroundImage={heroData.backgroundImage}
      />
      <About
        title={aboutData.title}
        description={aboutData.description}
        button={aboutData.button}
        buttonLink={aboutData.buttonLink}
      />
      <SplitBanner sections={splitBannerData} />
      <FocusBanner
        title={focusBannerData.title}
        description={focusBannerData.description}
        buttonText={focusBannerData.buttonText}
        buttonLink={focusBannerData.buttonLink}
        backgroundImage={focusBannerData.backgroundImage}
      />
      <SplitBanner
        sections={secondSplitBannerData.map((section, index) => ({
          ...section,
          textFirst: index % 2 !== 0,
        }))}
      />
      <GridImages title={gridImagesData.title} cards={gridImagesData.cards} />
      <EmailForm tourData={scheduleTourData} />
    </div>
  );
}
