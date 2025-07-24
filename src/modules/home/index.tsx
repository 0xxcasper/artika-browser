'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import CenteredCarousel from '@/components/centered-carousel';
import FocusBanner from '@/components/focus-banner';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import GridImages from '@/components/grid-images';

const images = [
  '/images/home/arts/art-1.jpg',
  '/images/home/arts/art-2.jpg',
  '/images/home/arts/art-3.jpg',
  '/images/home/arts/art-1.jpg',
  '/images/home/arts/art-2.jpg',
  '/images/home/arts/art-3.jpg',
];


export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <Hero
        title={t('pages.home.hero.title')}
        subtitle={t('pages.home.hero.subtitle')}
        backgroundImage="/images/home/banner.jpg"
      />
      <About
        title={t('pages.home.about.title')}
        description={t('pages.home.about.description')}
        button={t('pages.home.about.button')}
      />
      {/* <CenteredCarousel images={images} title={t('pages.home.arts.title')} /> */}
      <FocusBanner
        title={t('pages.home.focus.title')}
        description={t('pages.home.focus.description')}
        buttonText={t('pages.home.focus.button')}
        backgroundImage="/images/home/focus-banner.jpg"
      />
      <SplitBanner sections={t('pages.home.infos') as unknown as Array<SplitBannerSection>} />
      <GridImages title={t('pages.home.gridImages.title')} />
      <div style={{ height: '10vh', width: '100vw', backgroundColor: 'transparent' }} />
    </div>
  );
} 