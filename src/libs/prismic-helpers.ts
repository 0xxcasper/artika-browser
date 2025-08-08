import { createClient } from './prismic';
import { notFound } from 'next/navigation';
import { SplitBannerSection } from '@/components/split-banner';

/**
 * Validates locale and returns normalized Prismic language code
 * @param locale - The locale from route params
 * @returns Normalized Prismic language code
 */
export function validateAndNormalizeLocale(locale: string): string {
  if (!['en', 'vi'].includes(locale)) {
    notFound();
  }

  return locale === 'vi' ? 'vi' : 'en-us';
}

/**
 * Fetches a single Prismic document with proper error handling
 * @param documentType - The Prismic document type to fetch
 * @param locale - The locale from route params
 * @returns The fetched document or null if not found
 */
export async function fetchPrismicDocument(
  documentType: string,
  locale: string,
) {
  try {
    console.log(`Fetching fresh ${documentType} data for:`, locale);
    const client = createClient();
    const document = await client.getSingle(documentType as any, {
      lang: validateAndNormalizeLocale(locale),
    });

    console.log(`${documentType} data:`, document.data);
    return document;
  } catch (error) {
    console.error(`Error fetching ${documentType} data:`, error);
    return null;
  }
}

/**
 * Fetches Prismic document with fallback handling
 * @param documentType - The Prismic document type to fetch
 * @param locale - The locale from route params
 * @param fallbackComponent - The component to render if no data is found
 * @returns The fetched document or throws notFound() if required
 */
export async function fetchPrismicDocumentWithFallback(
  documentType: string,
  locale: string,
  fallbackComponent: React.ComponentType<any> | null = null,
) {
  const document = await fetchPrismicDocument(documentType, locale);

  if (!document && fallbackComponent === null) {
    notFound();
  }

  return document;
}

/**
 * Extracts Hero section data from Prismic document
 * @param params - Object containing the Prismic document data
 * @returns Hero section data object
 */
export function extractHeroData(params: { data?: any }) {
  const { data } = params;
  return {
    title: asText(data?.hero_title) || '',
    subtitle: asText(data?.hero_subtitle) || '',
    backgroundImage: asImageUrl(data?.hero_background_image) || '',
    logo: asImageUrl(data?.hero_logo) || '',
  };
}

/**
 * Extracts About section data from Prismic document
 * @param params - Object containing the Prismic document data
 * @returns About section data object
 */
export function extractAboutData(params: { data?: any }) {
  const { data } = params;
  return {
    title: asText(data?.about_title) || '',
    description: asText(data?.about_description) || '',
    button: data?.about_button_text || '',
    buttonLink: data?.about_button_link || '',
  };
}

/**
 * Extracts Split Banner sections data from Prismic document
 * @param params - Object containing sections array and configuration
 * @returns Array of SplitBannerSection objects
 */
export function extractSplitBannerData(params: {
  sections?: any[];
  fallbackImagePath?: string;
  sectionPrefix?: string;
}): Array<SplitBannerSection> {
  const {
    sections,
    fallbackImagePath = '/images/section',
    sectionPrefix = 'section',
  } = params;

  return (
    sections?.map((section, index) => ({
      id: `${sectionPrefix}-${index + 1}`,
      title:
        asText(section.title) ||
        `${sectionPrefix.charAt(0).toUpperCase() + sectionPrefix.slice(1)} ${index + 1}`,
      description: asText(section.description) || 'Description',
      ctaText: section.cta_text || 'Learn More',
      ctaLink: section.cta_link || '#',
      image:
        asImageUrl(section.image) || `${fallbackImagePath}-${index + 1}.jpg`,
      imageAlt:
        section.image_alt ||
        `${sectionPrefix.charAt(0).toUpperCase() + sectionPrefix.slice(1)} ${index + 1}`,
      textFirst: index % 2 === 0,
    })) || []
  );
}

/**
 * Extracts Focus Banner section data from Prismic document
 * @param params - Object containing the Prismic document data
 * @returns Focus Banner section data object
 */
export function extractFocusBannerData(params: { data?: any }) {
  const { data } = params;
  return {
    title: asText(data?.focus_title) || '',
    description: asText(data?.focus_description) || '',
    buttonText: data?.focus_button_text || '',
    buttonLink: data?.focus_button_link || '',
    backgroundImage: asImageUrl(data?.focus_background_image) || '',
    aspectRatio: data?.focus_aspect_ratio || '',
  };
}

/**
 * Extracts Grid Images section data from Prismic document
 * @param params - Object containing the Prismic document data and configuration
 * @returns Grid Images section data object
 */
export function extractGridImagesData(params: {
  data?: any;
  fallbackImagePath?: string;
}) {
  const { data, fallbackImagePath = '/images/grid' } = params;
  return {
    title: data?.grid_images_title || 'Collections',
    cards:
      data?.grid_images_items?.map((item: any, index: number) => ({
        id: index + 1,
        image:
          asImageUrl(item.image) || `${fallbackImagePath}-${index + 1}.jpg`,
        title: asText(item.title) || '',
        description: asText(item.description) || '',
        hasOverlay: !!item?.title,
        overlayText: {
          title: asText(item.title) || '',
          body: asText(item.description) || '',
        },
      })) || [],
  };
}

export function asText(field: any): string {
  if (!field) return '';

  if (Array.isArray(field)) {
    return field.map((item) => item.text || '').join(' ');
  }

  if (typeof field === 'string') {
    return field;
  }

  return '';
}

export function asImageUrl(field: any): string {
  if (!field) return '';

  if (typeof field === 'string') {
    return field;
  }

  if (field.url) {
    return field.url;
  }

  return '';
}

export function asLink(field: any): string {
  if (!field) return '';

  if (typeof field === 'string') {
    return field;
  }

  if (field.url) {
    return field.url;
  }

  return '';
}
