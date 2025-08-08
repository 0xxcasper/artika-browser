import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import SplitBanner from '@/components/split-banner';
import GridImages from '@/components/grid-images';
import { ExperiencesDocument } from '@/libs/prismic';
import {
  extractHeroData,
  extractAboutData,
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
  const heroData = extractHeroData({ data: experiencesData?.data });
  const aboutData = extractAboutData({ data: experiencesData?.data });
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
    </div>
  );
}
