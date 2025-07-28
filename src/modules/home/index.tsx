import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import GridImages from '@/components/grid-images';
import EmailForm from '@/components/email-form';
import { asText, asImageUrl } from '@/libs/prismic-helpers';
import { HomepageDocument } from '@/libs/prismic';

interface HomePageProps {
  homepageData: HomepageDocument | null;
  lang: string;
}

export default function HomePage({ homepageData }: HomePageProps) {
  // Sử dụng dữ liệu từ Prismic với localization
  const heroTitle = asText(homepageData?.data?.hero_title) || 'Welcome to Artika';
  const heroSubtitle = asText(homepageData?.data?.hero_subtitle) || 'Discover art and culture';
  const heroBackgroundImage = asImageUrl(homepageData?.data?.hero_background_image) || '/images/home/banner.jpg';
  
  const aboutTitle = asText(homepageData?.data?.about_title) || 'About Us';
  const aboutDescription = asText(homepageData?.data?.about_description) || 'Artika connects art with life';
  const aboutButton = homepageData?.data?.about_button_text || 'Learn More';
  
  const focusTitle = asText(homepageData?.data?.focus_title) || 'Focus on Art';
  const focusDescription = asText(homepageData?.data?.focus_description) || 'We bring unique artworks to life';
  const focusButtonText = homepageData?.data?.focus_button_text || 'View More';
  const focusBackgroundImage = asImageUrl(homepageData?.data?.focus_background_image) || '/images/home/focus-banner.jpg';
  
  // Debug split banner sections
  console.log('homepageData?.data?.split_banner_sections:', homepageData?.data?.split_banner_sections);
  
  // Sử dụng data từ Prismic cho SplitBanner
  const splitBannerSections: Array<SplitBannerSection> = homepageData?.data?.split_banner_sections?.map((section, index) => ({
    id: `section-${index + 1}`,
    title: asText(section.title) || `Section ${index + 1}`,
    description: asText(section.description) || 'Description',
    ctaText: section.cta_text || 'Learn More',
    image: asImageUrl(section.image) || `/images/home/art-${index + 1}.jpg`,
    imageAlt: section.image_alt || `Section ${index + 1}`,
    textFirst: index % 2 === 0
  })) || [];
  
  // Sử dụng data từ Prismic cho GridImages
  const gridImagesTitle = homepageData?.data?.grid_images_title || 'Collections';
  const gridImagesCards = homepageData?.data?.grid_images_items?.map((item, index) => ({
    id: index + 1,
    image: asImageUrl(item.image) || `/images/collections/collection-${index + 1}.jpg`,
    title: asText(item.title) || '',
    description: asText(item.description) || '',
    hasOverlay: !!item?.title,
    overlayText: {
      title: asText(item.title) || '',
      body: asText(item.description) || ''
    }
  })) || [];
  
  return(
    <div className="home-page">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroBackgroundImage}
      />
      <About
        title={aboutTitle}
        description={aboutDescription}
        button={aboutButton}
      />
      <FocusBanner
        title={focusTitle}
        description={focusDescription}
        buttonText={focusButtonText}
        backgroundImage={focusBackgroundImage}
      />
      <SplitBanner sections={splitBannerSections}       />
      <GridImages title={gridImagesTitle} cards={gridImagesCards} />
      <EmailForm />
    </div>
  );
} 