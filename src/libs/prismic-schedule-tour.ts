import type { ScheduleTourData } from '@/types/schedule-tour';
import type {
  ForestBathingDocument,
  HomepageDocument,
  PersonalMuseumDocument,
} from './prismic';
import { asText } from './prismic-helpers';

/**
 * Extract schedule tour data from homepage or forest bathing page data
 * @param pageData - Page data from Prismic (homepage or forest bathing)
 * @returns Formatted schedule tour data object
 */
export function extractScheduleTourData(
  pageData:
    | HomepageDocument
    | ForestBathingDocument
    | PersonalMuseumDocument
    | null,
): ScheduleTourData | null {
  if (!pageData || !pageData.data) {
    return null;
  }

  const data = pageData.data;

  return {
    // Basic tour info
    title: asText(data.schedule_tour_title) || '',
    description: asText(data.schedule_tour_description) || '',

    // Form configuration
    form: {
      phonePlaceholder:
        data.schedule_tour_form_config?.[0]?.phone_placeholder || '',
      emailPlaceholder:
        data.schedule_tour_form_config?.[0]?.email_placeholder || '',
      datePlaceholder:
        data.schedule_tour_form_config?.[0]?.date_placeholder || '',
      buttonText: data.schedule_tour_form_config?.[0]?.button_text || '',
    },

    // Messages
    messages: {
      success: data.schedule_tour_messages?.[0]?.success_message || '',
      error: data.schedule_tour_messages?.[0]?.error_message || '',
    },

    // Validation messages
    validation: {
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

    // Raw data for advanced usage
    raw: pageData,
  };
}

/**
 * Extract schedule tour data specifically from homepage
 * @param homepageData - Homepage data from Prismic
 * @returns Formatted schedule tour data object
 */
export function extractHomepageScheduleTourData(
  homepageData: HomepageDocument | null,
): ScheduleTourData | null {
  return extractScheduleTourData(homepageData);
}

/**
 * Extract schedule tour data specifically from forest bathing page
 * @param forestBathingData - Forest bathing page data from Prismic
 * @returns Formatted schedule tour data object
 */
export function extractForestBathingScheduleTourData(
  forestBathingData: ForestBathingDocument | null,
): ScheduleTourData | null {
  return extractScheduleTourData(forestBathingData);
}

/**
 * Extract schedule tour data specifically from personal museum page
 * @param personalMuseumData - Personal museum page data from Prismic
 * @returns Formatted schedule tour data object
 */
export function extractPersonalMuseumScheduleTourData(
  personalMuseumData: PersonalMuseumDocument | null,
): ScheduleTourData | null {
  return extractScheduleTourData(personalMuseumData);
}
