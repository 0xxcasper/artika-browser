import type { SustainabilityData } from '@/types/sustainability';
import { asText, asImageUrl } from './prismic-helpers';

/**
 * Extract sustainability data from Prismic document
 * @param sustainabilityData - Sustainability page data from Prismic
 * @returns Formatted sustainability data object
 */
export function extractSustainabilityData(
  sustainabilityData: any,
): SustainabilityData | null {
  if (!sustainabilityData || !sustainabilityData.data) {
    console.warn('No sustainability data available');
    return null;
  }

  const data = sustainabilityData.data;

  try {
    const extractedData: SustainabilityData = {
      aboutSection1: {
        title: asText(data.about_1_title) || '',
        description: asText(data.about_1_description) || '',
        buttonText: data.about_1_button_text || '',
        buttonLink: data.about_1_button_link || '',
      },
      mainBanner: {
        image: asImageUrl(data.main_banner_image) || '',
        alt: data.main_banner_alt || '',
      },
      rowText: {
        title: asText(data.row_text_title) || '',
        description: asText(data.row_text_description) || '',
      },
      galleryGrid: {
        title: data.gallery_grid_title || '',
        images:
          data.gallery_grid_items?.map((item: any) => ({
            image: asImageUrl(item.image) || '',
            alt: item.image_alt || '',
          })) || [],
      },
      aboutSection2: {
        title: asText(data.about_2_title) || '',
        description: asText(data.about_2_description) || '',
        buttonText: data.about_2_button_text || '',
        buttonLink: data.about_2_button_link || '',
      },
      aboutSection3: {
        title: asText(data.about_3_title) || '',
        description: asText(data.about_3_description) || '',
        buttonText: data.about_3_button_text || '',
        buttonLink: data.about_3_button_link || '',
      },
      splitBanner: {
        sections:
          data.split_banner_sections?.map((section: any, index: number) => ({
            id: `sustainability-split-${index + 1}`,
            title: asText(section.title) || '',
            description: asText(section.description) || '',
            ctaText: section.cta_text || '',
            ctaLink: section.cta_link || '',
            image: asImageUrl(section.image) || '',
            imageAlt: section.image_alt || '',
            textFirst: index % 2 === 0,
          })) || [],
      },
      horizontalList: {
        title: asText(data.horizontal_list_title) || 'More of Artika',
        items:
          data.horizontal_list_items?.map((item: any) => ({
            href: item.href || '',
            title: asText(item.title) || '',
            image: asImageUrl(item.image) || '',
            alt: item.image_alt || '',
          })) || [],
      },
    };

    console.log('Extracted sustainability data:', extractedData);
    return extractedData;
  } catch (error) {
    console.error('Error extracting sustainability data:', error);
    return null;
  }
}

/**
 * Extract sustainability data with fallback handling
 * @param sustainabilityData - Sustainability page data from Prismic
 * @param fallbackComponent - The component to render if no data is found
 * @returns The extracted sustainability data or throws notFound() if required
 */
export function extractSustainabilityDataWithFallback(
  sustainabilityData: any,
  fallbackComponent: React.ComponentType<any> | null = null,
): SustainabilityData | null {
  const data = extractSustainabilityData(sustainabilityData);

  if (!data && fallbackComponent === null) {
    throw new Error('Sustainability data not found');
  }

  return data;
}

/**
 * Validate sustainability data structure
 * @param data - The extracted sustainability data
 * @returns Boolean indicating if the data is valid
 */
export function validateSustainabilityData(
  data: SustainabilityData | null,
): boolean {
  if (!data) return false;

  const requiredFields = [
    'aboutSection1',
    'mainBanner',
    'rowText',
    'galleryGrid',
    'aboutSection2',
    'splitBanner',
  ];

  return requiredFields.every(
    (field) => data[field as keyof SustainabilityData] !== undefined,
  );
}
