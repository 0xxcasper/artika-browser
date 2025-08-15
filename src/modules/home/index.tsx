import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import GridImages from '@/components/grid-images';
import Hero from '@/components/hero';
import EmailForm from '@/components/schedule-tour-form';
import SplitBanner from '@/components/split-banner';
import { HomepageDocument } from '@/libs/prismic';
import {
  extractAboutData,
  extractFocusBannerData,
  extractGridImagesData,
  extractHeroData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import './styles.scss';

interface HomePageProps {
  homepageData: HomepageDocument | null;
  lang: string;
}

export default function HomePage({ homepageData }: HomePageProps) {
  const heroData = extractHeroData({ data: homepageData?.data });
  const aboutData = extractAboutData({ data: homepageData?.data });
  const focusBannerData = extractFocusBannerData({ data: homepageData?.data });
  const splitBannerData = extractSplitBannerData({
    sections: homepageData?.data?.split_banner_sections,
    fallbackImagePath: '/images/home/art',
    sectionPrefix: 'section',
  });
  const gridImagesData = extractGridImagesData({
    data: homepageData?.data,
    fallbackImagePath: '/images/collections/collection',
  });

  return (
    <div className="home-page">
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
      <FocusBanner
        title={focusBannerData.title}
        description={focusBannerData.description}
        buttonText={focusBannerData.buttonText}
        buttonLink={focusBannerData.buttonLink}
        backgroundImage={focusBannerData.backgroundImage}
      />
      <SplitBanner sections={splitBannerData} />
      <GridImages title={gridImagesData.title} cards={gridImagesData.cards} />
      <EmailForm />
      <div />
    </div>
  );
}
