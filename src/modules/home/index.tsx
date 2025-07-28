'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import './styles.scss';
import FocusBanner from '@/components/focus-banner';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import GridImages from '@/components/grid-images';
import EmailForm from '@/components/email-form';
import { asText, asImageUrl } from '@/libs/prismic-helpers';
import { useHomepageData } from '@/hooks/usePrismic';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices/index';

export default function HomePage() {
  const { data: homepageData, loading, error } = useHomepageData();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error loading homepage data:', error);
  }

  return (
    <div className="home-page">
      {/* Render slices từ Prismic */}
      {homepageData?.data?.slices && (
        <SliceZone slices={homepageData.data.slices} components={components} />
      )}
    </div>
  );
} 