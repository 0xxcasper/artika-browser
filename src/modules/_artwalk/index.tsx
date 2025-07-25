'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import FocusBanner from '@/components/focus-banner';
import GridImages from '@/components/grid-images';
import HorizontalList from '@/components/horizontal-list';

export default function ArtwalkPage() {
  const { t } = useLanguage();

  return (
    <div className="gallery-page">
      <Hero
        title={t('pages.gallery.hero.title')}
        subtitle={t('pages.gallery.hero.subtitle')}
        backgroundImage="/images/gallery/gallery-bg.jpg"
      />
      <About
        title={t('pages.gallery.about.title')}
        description={t('pages.gallery.about.description')}
        button={t('pages.gallery.about.button')}
      />
      <HorizontalList />
      <FocusBanner
        title={t('pages.gallery.focus.title')}
        description={t('pages.gallery.focus.description')}
        buttonText={t('pages.gallery.focus.button')}
        backgroundImage="/images/gallery/focus-banner.jpg"
        aspectRatio="1728/971"
      />
      <SplitBanner sections={t('pages.gallery.infos') as unknown as Array<SplitBannerSection>} />
      <GridImages title={t('pages.gallery.gridImages.title')} />
      <div style={{ height: '30vh', width: '100vw', backgroundColor: 'transparent' }} />
    </div>
  );
} 