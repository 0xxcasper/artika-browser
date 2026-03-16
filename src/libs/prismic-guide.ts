import type { GuideData } from '@/types/guide';
import { asText, asImageUrl } from './prismic-helpers';
import { extractScheduleTourData } from './prismic-schedule-tour';

export function extractGuideData(guideDoc: any): GuideData | null {
  if (!guideDoc || !guideDoc.data) {
    console.warn('No guide data available');
    return null;
  }

  const data = guideDoc.data;

  try {
    const extracted: GuideData = {
      hero: {
        title: asText(data.hero_title) || '',
        subtitle: asText(data.hero_subtitle) || '',
        backgroundImage: asImageUrl(data.hero_background_image) || '',
        logo: asImageUrl(data.hero_logo) || '',
      },
      about: {
        title: asText(data.about_title) || '',
        description: asText(data.about_description) || '',
        buttonText: data.about_button_text || '',
        buttonLink: data.about_button_link || '',
      },
      splitBanner: {
        sections:
          data.split_banner_sections?.map((section: any, index: number) => ({
            id: `guide-split-${index + 1}`,
            title: asText(section.title) || '',
            description: asText(section.description) || '',
            ctaText: section.cta_text || '',
            ctaLink: section.cta_link || '',
            image: asImageUrl(section.image) || '',
            imageAlt: section.image_alt || '',
            textFirst: index % 2 === 0,
          })) || [],
      },
      prepare: {
        title: data.prepare_title_section || '',
        items:
          data.prepare_items_sections?.map((item: any) => ({
            description: asText(item.description) || '',
            image: asImageUrl(item.image) || '',
          })) || [],
      },
      mapSections:
        data.map_sections?.map((item: any) => ({
          title: asText(item.title) || '',
          description: asText(item.description) || '',
          link: asText(item.link) || '',
          image: asImageUrl(item.image) || '',
        })) || [],
      scheduleTour: extractScheduleTourData(guideDoc) as any,
    };

    return extracted;
  } catch (error) {
    console.error('Error extracting guide data:', error);
    return null;
  }
}
