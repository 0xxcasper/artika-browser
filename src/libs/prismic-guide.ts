import type { GuideData } from '@/types/guide';
import { asText, asImageUrl } from './prismic-helpers';

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
      scheduleTour: {
        title: data.schedule_tour_title || '',
        description: asText(data.schedule_tour_description) || '',
        formConfig: {
          phonePlaceholder:
            data.schedule_tour_form_config?.[0]?.phone_placeholder || '',
          emailPlaceholder:
            data.schedule_tour_form_config?.[0]?.email_placeholder || '',
          datePlaceholder:
            data.schedule_tour_form_config?.[0]?.date_placeholder || '',
          buttonText: data.schedule_tour_form_config?.[0]?.button_text || '',
        },
        messages: {
          successMessage:
            data.schedule_tour_messages?.[0]?.success_message || '',
          errorMessage: data.schedule_tour_messages?.[0]?.error_message || '',
        },
        validationMessages: {
          phoneRequired:
            data.schedule_tour_validation_messages?.[0]?.phone_required || '',
          emailRequired:
            data.schedule_tour_validation_messages?.[0]?.email_required || '',
          dateRequired:
            data.schedule_tour_validation_messages?.[0]?.date_required || '',
          phoneInvalid:
            data.schedule_tour_validation_messages?.[0]?.phone_invalid || '',
          emailInvalid:
            data.schedule_tour_validation_messages?.[0]?.email_invalid || '',
          dateFuture:
            data.schedule_tour_validation_messages?.[0]?.date_future || '',
        },
      },
    };

    return extracted;
  } catch (error) {
    console.error('Error extracting guide data:', error);
    return null;
  }
}
