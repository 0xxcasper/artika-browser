import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import SplitBanner from '@/components/split-banner';
import GridImages from '@/components/grid-images';
import { ExperiencesDocument } from '@/libs/prismic';
import {
  extractCommonPageData,
  extractSplitBannerData,
  extractFocusBannerData,
  extractGridImagesData,
} from '@/libs/prismic-helpers';

interface ExperiencesPageProps {
  experiencesData: ExperiencesDocument | null;
  lang: string;
}

export default function ExperiencesPage({
  experiencesData,
}: ExperiencesPageProps) {
  const { hero, about } = extractCommonPageData({
    data: experiencesData?.data,
  });
  const splitBannerData = extractSplitBannerData({
    sections: experiencesData?.data?.split_banner_sections,
    fallbackImagePath: '/images/experiences/section',
    sectionPrefix: 'section',
  });
  const focusBannerData = extractFocusBannerData({
    data: experiencesData?.data,
  });
  const secondSplitBannerData = extractSplitBannerData({
    sections: experiencesData?.data?.second_split_banner_sections,
    fallbackImagePath: '/images/experiences/second-section',
    sectionPrefix: 'second-section',
  });
  const gridImagesData = extractGridImagesData({
    data: experiencesData?.data,
    fallbackImagePath: '/images/experiences/grid',
  });

  return (
    <div className="experiences-page">
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
    </div>
  );
}
