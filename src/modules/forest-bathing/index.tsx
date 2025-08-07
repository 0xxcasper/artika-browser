import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import { asText, asImageUrl } from '@/libs/prismic-helpers';
import { ForestBathingDocument } from '@/libs/prismic';

interface ForestBathingPageProps {
  forestBathingData: ForestBathingDocument | null;
  lang: string;
}

export default function ForestBathingPage({ forestBathingData }: ForestBathingPageProps) {
  // Hero section data
  const heroTitle = asText(forestBathingData?.data?.hero_title) || '';
  const heroSubtitle = asText(forestBathingData?.data?.hero_subtitle) || '';
  const heroBackgroundImage = asImageUrl(forestBathingData?.data?.hero_background_image) || '';

  console.log("forestBathingData", forestBathingData?.data);
  
  // About section data
  const aboutTitle = asText(forestBathingData?.data?.about_title) || '';
  const aboutDescription = asText(forestBathingData?.data?.about_description) || '';
  const aboutButton = forestBathingData?.data?.about_button_text || '';
  const aboutButtonLink = forestBathingData?.data?.about_button_link || '';
  
  // First Split Banner sections data
  const splitBannerSections: Array<SplitBannerSection> = forestBathingData?.data?.split_banner_sections?.map((section, index) => ({
    id: `section-${index + 1}`,
    title: asText(section.title) || `Section ${index + 1}`,
    description: asText(section.description) || 'Description',
    ctaText: section.cta_text || 'Learn More',
    ctaLink: section.cta_link || '#',
    image: asImageUrl(section.image) || `/images/forest-bathing/section-${index + 1}.jpg`,
    imageAlt: section.image_alt || `Section ${index + 1}`,
    textFirst: index % 2 === 0
  })) || [];
  
  // Focus Banner section data
  const focusTitle = asText(forestBathingData?.data?.focus_title) || '';
  const focusDescription = asText(forestBathingData?.data?.focus_description) || '';
  const focusButtonText = forestBathingData?.data?.focus_button_text || '';
  const focusButtonLink = forestBathingData?.data?.focus_button_link || '';
  const focusBackgroundImage = asImageUrl(forestBathingData?.data?.focus_background_image) || '';
  
  // Second Split Banner sections data
  const secondSplitBannerSections: Array<SplitBannerSection> = forestBathingData?.data?.second_split_banner_sections?.map((section, index) => ({
    id: `second-section-${index + 1}`,
    title: asText(section.title) || `Second Section ${index + 1}`,
    description: asText(section.description) || 'Description',
    ctaText: section.cta_text || 'Learn More',
    ctaLink: section.cta_link || '#',
    image: asImageUrl(section.image) || `/images/forest-bathing/second-section-${index + 1}.jpg`,
    imageAlt: section.image_alt || `Second Section ${index + 1}`,
    textFirst: index % 2 === 0
  })) || [];
  
  return(
    <div className="forest-bathing-page">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroBackgroundImage}
      />
      <About
        title={aboutTitle}
        description={aboutDescription}
        button={aboutButton}
        buttonLink={aboutButtonLink}
      />
      <SplitBanner sections={splitBannerSections} />
      <FocusBanner
        title={focusTitle}
        description={focusDescription}
        buttonText={focusButtonText}
        buttonLink={focusButtonLink}
        backgroundImage={focusBackgroundImage}
      />
      <SplitBanner sections={secondSplitBannerSections} />
      <div />
    </div>
  );
}
