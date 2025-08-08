import Hero from '@/components/hero';
import './styles.scss';
import About from '@/components/about';
import FocusBanner from '@/components/focus-banner';
import SplitBanner, { SplitBannerSection } from '@/components/split-banner';
import GridImages from '@/components/grid-images';
import { asText, asImageUrl } from '@/libs/prismic-helpers';
import { ExperiencesDocument } from '@/libs/prismic';

interface ExperiencesPageProps {
  experiencesData: ExperiencesDocument | null;
  lang: string;
}

export default function ExperiencesPage({
  experiencesData,
}: ExperiencesPageProps) {
  // Hero section data
  const heroTitle = asText(experiencesData?.data?.hero_title) || '';
  const heroSubtitle = asText(experiencesData?.data?.hero_subtitle) || '';
  const heroBackgroundImage =
    asImageUrl(experiencesData?.data?.hero_background_image) || '';

  console.log('experiencesData', experiencesData?.data);

  // About section data
  const aboutTitle = asText(experiencesData?.data?.about_title) || '';
  const aboutDescription =
    asText(experiencesData?.data?.about_description) || '';
  const aboutButton = experiencesData?.data?.about_button_text || '';
  const aboutButtonLink = experiencesData?.data?.about_button_link || '';

  // First Split Banner sections data
  const splitBannerSections: Array<SplitBannerSection> =
    experiencesData?.data?.split_banner_sections?.map((section, index) => ({
      id: `section-${index + 1}`,
      title: asText(section.title) || `Section ${index + 1}`,
      description: asText(section.description) || 'Description',
      ctaText: section.cta_text || 'Learn More',
      ctaLink: section.cta_link || '#',
      image:
        asImageUrl(section.image) ||
        `/images/experiences/section-${index + 1}.jpg`,
      imageAlt: section.image_alt || `Section ${index + 1}`,
      textFirst: index % 2 === 0,
    })) || [];

  // Focus Banner section data
  const focusTitle = asText(experiencesData?.data?.focus_title) || '';
  const focusDescription =
    asText(experiencesData?.data?.focus_description) || '';
  const focusButtonText = experiencesData?.data?.focus_button_text || '';
  const focusButtonLink = experiencesData?.data?.focus_button_link || '';
  const focusBackgroundImage =
    asImageUrl(experiencesData?.data?.focus_background_image) || '';

  // Second Split Banner sections data
  const secondSplitBannerSections: Array<SplitBannerSection> =
    experiencesData?.data?.second_split_banner_sections?.map(
      (section, index) => ({
        id: `second-section-${index + 1}`,
        title: asText(section.title) || `Second Section ${index + 1}`,
        description: asText(section.description) || 'Description',
        ctaText: section.cta_text || 'Learn More',
        ctaLink: section.cta_link || '#',
        image:
          asImageUrl(section.image) ||
          `/images/experiences/second-section-${index + 1}.jpg`,
        imageAlt: section.image_alt || `Second Section ${index + 1}`,
        textFirst: index % 2 === 0,
      }),
    ) || [];

  // Grid Images section data
  const gridImagesTitle =
    experiencesData?.data?.grid_images_title || 'Experiences';
  const gridImagesCards =
    experiencesData?.data?.grid_images_items?.map((item, index) => ({
      id: index + 1,
      image:
        asImageUrl(item.image) || `/images/experiences/grid-${index + 1}.jpg`,
      title: asText(item.title) || '',
      description: asText(item.description) || '',
      hasOverlay: !!item?.title,
      overlayText: {
        title: asText(item.title) || '',
        body: asText(item.description) || '',
      },
    })) || [];

  return (
    <div className="experiences-page">
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
      <SplitBanner
        sections={secondSplitBannerSections.map((section, index) => ({
          ...section,
          textFirst: index % 2 !== 0,
        }))}
      />
      <GridImages title={gridImagesTitle} cards={gridImagesCards} />
    </div>
  );
}
