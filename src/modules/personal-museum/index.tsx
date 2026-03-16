'use client';

import About from '@/components/about';
import Hero from '@/components/hero';
import EmailForm from '@/components/schedule-tour-form';
import SplitBanner from '@/components/split-banner';
import { PersonalMuseumDocument } from '@/libs/prismic';
import {
  asImageUrl,
  extractCommonPageData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import type { ScheduleTourData } from '@/types/schedule-tour';
import { Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface PersonalMuseumPageProps {
  personalMuseumData: PersonalMuseumDocument | null;
  scheduleTourData: ScheduleTourData | null;
  lang: string;
}

export default function PersonalMuseumPage({
  personalMuseumData,
  scheduleTourData,
}: PersonalMuseumPageProps) {
  // Only show components if Prismic data exists
  if (!personalMuseumData?.data) {
    return null; // Don't render anything if no data
  }

  // Extract data from Prismic
  const { hero, about } = extractCommonPageData({
    data: personalMuseumData.data,
  });
  const bannerImage = personalMuseumData.data.banner_image;
  const splitBannerSections = personalMuseumData.data.split_banner_sections;

  // Only render split banner if sections exist
  const splitBannerData = splitBannerSections
    ? extractSplitBannerData({
        sections: splitBannerSections,
        fallbackImagePath: '/images/personal-museum/section',
        sectionPrefix: 'section',
      })
    : null;

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
      {bannerImage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src={asImageUrl(bannerImage)}
            alt={hero.title}
            width="100%"
            height="auto"
          />
        </motion.div>
      )}
      {splitBannerData && <SplitBanner sections={splitBannerData} />}
      {!!scheduleTourData && <EmailForm tourData={scheduleTourData} />}
    </div>
  );
}
