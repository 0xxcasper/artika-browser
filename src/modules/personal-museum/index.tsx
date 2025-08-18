import About from '@/components/about';
import Hero from '@/components/hero';
import SplitBanner from '@/components/split-banner';
import { PersonalMuseumDocument } from '@/libs/prismic';
import {
  asImageUrl,
  extractAboutData,
  extractHeroData,
  extractSplitBannerData,
} from '@/libs/prismic-helpers';
import { Image } from '@chakra-ui/react';
import './styles.scss';

interface PersonalMuseumPageProps {
  personalMuseumData: PersonalMuseumDocument | null;
  lang: string;
}

export default function PersonalMuseumPage({
  personalMuseumData,
}: PersonalMuseumPageProps) {
  // Fallback data when Prismic data is not available
  const fallbackHeroData = {
    title: 'Personal Museum',
    subtitle: 'Discover your own curated collection of art and experiences',
    backgroundImage: '/images/personal-museum/section-1.jpg',
  };

  const fallbackAboutData = {
    title: 'About Personal Museum',
    description: 'Create your own personal museum experience. Curate collections, explore art, and build your unique artistic journey.',
    button: 'Start Exploring',
    buttonLink: '/artwalk',
  };

  const fallbackSplitBannerData = [
    {
      id: 'section-1',
      title: 'Curate Your Collection',
      description: 'Build your personal art collection with pieces that speak to you.',
      ctaText: 'Browse Art',
      ctaLink: '/artwalk',
      image: '/images/personal-museum/section-1.jpg',
      imageAlt: 'Art collection curation',
      textFirst: true,
    },
    {
      id: 'section-2',
      title: 'Personal Gallery',
      description: 'Create your own gallery space to showcase your favorite artworks.',
      ctaText: 'View Gallery',
      ctaLink: '/gallery',
      image: '/images/personal-museum/section-2.jpg',
      imageAlt: 'Personal gallery space',
      textFirst: false,
    },
    {
      id: 'section-3',
      title: 'Artistic Journey',
      description: 'Track your artistic growth and discoveries over time.',
      ctaText: 'Learn More',
      ctaLink: '/experiences',
      image: '/images/personal-museum/section-3.jpg',
      imageAlt: 'Artistic journey',
      textFirst: true,
    },
  ];

  // Use Prismic data if available, otherwise use fallback data
  const heroData = personalMuseumData?.data 
    ? extractHeroData({ data: personalMuseumData.data })
    : fallbackHeroData;

  const aboutData = personalMuseumData?.data
    ? extractAboutData({ data: personalMuseumData.data })
    : fallbackAboutData;

  // Extract banner image data
  const bannerImage = personalMuseumData?.data?.banner_image;

  const splitBannerData = personalMuseumData?.data?.split_banner_sections
    ? extractSplitBannerData({
        sections: personalMuseumData.data.split_banner_sections,
        fallbackImagePath: '/images/personal-museum/section',
        sectionPrefix: 'section',
      })
    : fallbackSplitBannerData;

  return (
    <div className="container-no-padding">
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
      {bannerImage && (
        <Image src={asImageUrl(bannerImage)} alt={heroData.title} width="100%" height="auto" />
      )}
      <SplitBanner sections={splitBannerData} />
    </div>
  );
}
