import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import Hero from '@/components/hero';
import EmailForm from '@/components/schedule-tour-form';
import SplitBanner from '@/components/split-banner';
import { ForestBathingDocument } from '@/libs/prismic';
import {
  extractCommonPageData,
  extractFocusBannerData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import type { ScheduleTourData } from '@/types/schedule-tour';

interface ForestBathingPageProps {
  forestBathingData: ForestBathingDocument | null;
  scheduleTourData?: ScheduleTourData | null;
  lang: string;
}

export default function ForestBathingPage({
  forestBathingData,
  scheduleTourData,
}: ForestBathingPageProps) {
  const { hero, about } = extractCommonPageData({
    data: forestBathingData?.data,
  });
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

  return (
    <div className="container-no-padding">
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
      <SplitBanner
        sections={splitBannerData.map((section, index) => ({
          ...section,
          textFirst: index % 2 !== 0,
        }))}
      />
      <FocusBanner
        title={focusBannerData.title}
        description={focusBannerData.description}
        buttonText={focusBannerData.buttonText}
        buttonLink={focusBannerData.buttonLink}
        backgroundImage={focusBannerData.backgroundImage}
      />
      <SplitBanner sections={secondSplitBannerData} />
      {!!scheduleTourData && <EmailForm tourData={scheduleTourData} />}
    </div>
  );
}
