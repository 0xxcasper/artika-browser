import { createClient } from './prismic';
import type { NavigationData, NavigationCTA, ScheduleTourFormData } from '@/locales/types';

const defaultCta: NavigationCTA = {
  cta_label: '',
  cta_link: '',
};

const defaultScheduleTourForm: ScheduleTourFormData = {
  schedule_tour_title: 'Hẹn lịch tham quan',
  schedule_tour_description: 'Artika đã mở cửa giới hạn cho bạn đến tham quan trải nghiệm. Để lại thông tin để khôi nguồn chuyến đi đến miền bất tận.',
  schedule_tour_phone_placeholder: 'Số điện thoại',
  schedule_tour_email_placeholder: 'Email',
  schedule_tour_date_placeholder: 'Select Date',
  schedule_tour_button_text: 'Đặt lịch ngay!',
  schedule_tour_success_message: 'Thank you! We will contact you soon to confirm your tour schedule.',
  schedule_tour_error_message: 'Something went wrong. Please try again.',
  schedule_tour_validation_messages: {
    schedule_tour_phone_required: 'Please enter your phone number',
    schedule_tour_email_required: 'Please enter your email address',
    schedule_tour_date_required: 'Please select a tour date',
    schedule_tour_phone_invalid: 'Please enter a valid phone number',
    schedule_tour_email_invalid: 'Please enter a valid email address',
    schedule_tour_date_future: 'Please select a future date',
  },
};

const defaultNavigationItems = [
  {
    label: 'Home',
    href: '/',
    subs: []
  },
  {
    label: 'Artwalk',
    href: '/artwalk',
    subs: []
  },
  {
    label: 'About',
    href: '/about',
    subs: []
  },
  {
    label: 'Contact',
    href: '/contact',
    subs: []
  }
];

// Helper function to extract schedule tour form data from Prismic document
function extractScheduleTourFormData(doc: any): ScheduleTourFormData {
  return {
    schedule_tour_title: doc.data.schedule_tour_title || defaultScheduleTourForm.schedule_tour_title,
    schedule_tour_description: doc.data.schedule_tour_description?.[0]?.text || defaultScheduleTourForm.schedule_tour_description,
    schedule_tour_phone_placeholder: doc.data.schedule_tour_phone_placeholder || defaultScheduleTourForm.schedule_tour_phone_placeholder,
    schedule_tour_email_placeholder: doc.data.schedule_tour_email_placeholder || defaultScheduleTourForm.schedule_tour_email_placeholder,
    schedule_tour_date_placeholder: doc.data.schedule_tour_date_placeholder || defaultScheduleTourForm.schedule_tour_date_placeholder,
    schedule_tour_button_text: doc.data.schedule_tour_button_text || defaultScheduleTourForm.schedule_tour_button_text,
    schedule_tour_success_message: doc.data.schedule_tour_success_message || defaultScheduleTourForm.schedule_tour_success_message,
    schedule_tour_error_message: doc.data.schedule_tour_error_message || defaultScheduleTourForm.schedule_tour_error_message,
    schedule_tour_validation_messages: {
      schedule_tour_phone_required: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_phone_required || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_phone_required,
      schedule_tour_email_required: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_email_required || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_email_required,
      schedule_tour_date_required: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_date_required || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_date_required,
      schedule_tour_phone_invalid: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_phone_invalid || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_phone_invalid,
      schedule_tour_email_invalid: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_email_invalid || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_email_invalid,
      schedule_tour_date_future: doc.data.schedule_tour_validation_messages?.[0]?.schedule_tour_date_future || defaultScheduleTourForm.schedule_tour_validation_messages.schedule_tour_date_future,
    },
  };
}

export async function fetchNavigation(locale: string): Promise<NavigationData> {
  try {
    const client = createClient();
    console.log("Fetching navigation for locale:", locale);
    
    // Try to fetch navigation_menu document
    try {
      const prismicLang = locale === 'vi' ? 'vi' : 'en-us';
      console.log("Using Prismic language:", prismicLang);
      
      const doc = await (client as any).getSingle('navigation_menu', { 
        lang: prismicLang
      });
      console.log("Navigation document found:", doc);
      console.log("Navigation data:", doc.data);

      // Extract menus data
      const items = doc.data.items?.map((item: any) => ({
        label: item.label || '',
        href: item.href || '',
        subs: item.subs?.map((sub: any) => ({
          id: sub.id || '',
          name: sub.name || '',
          href: sub.href || '',
        })) || [],
      })) || [];

      console.log("Extracted navigation items:", items);

      // Extract CTA data
      const cta = {
        cta_label: doc.data.cta_label || defaultCta.cta_label,
        cta_link: doc.data.cta_link || defaultCta.cta_link,
      };

      // Extract schedule tour form data
      const scheduleTourForm = extractScheduleTourFormData(doc);
      console.log("Extracted schedule tour form data:", scheduleTourForm);

      return {
        items: items.length > 0 ? items : defaultNavigationItems,
        cta,
        scheduleTourForm
      };
    } catch (docError) {
      console.warn('Navigation menu document not found, using fallback navigation');
      console.warn('Error details:', docError);
      console.warn('Locale:', locale);
      console.warn('Prismic language used:', locale === 'vi' ? 'vi' : 'en-us');
      
      // Return fallback navigation
      return { 
        items: defaultNavigationItems, 
        cta: defaultCta,
        scheduleTourForm: defaultScheduleTourForm
      };
    }
  } catch (error) {
    console.error('Error fetching navigation from Prismic:', error);
    // Fallback to default navigation if Prismic fails
    return { 
      items: defaultNavigationItems, 
      cta: defaultCta,
      scheduleTourForm: defaultScheduleTourForm
    };
  }
}

// Export a separate function to get only schedule tour form data
export async function fetchScheduleTourForm(locale: string): Promise<ScheduleTourFormData> {
  try {
    const client = createClient();
    console.log("Fetching schedule tour form for locale:", locale);
    
    try {
      const prismicLang = locale === 'vi' ? 'vi' : 'en-us';
      console.log("Using Prismic language:", prismicLang);
      
      const doc = await (client as any).getSingle('navigation_menu', { 
        lang: prismicLang
      });
      console.log("Navigation document found for schedule tour form:", doc);

      const scheduleTourForm = extractScheduleTourFormData(doc);
      console.log("Extracted schedule tour form data:", scheduleTourForm);
      return scheduleTourForm;
    } catch (docError) {
      console.warn('Navigation menu document not found for schedule tour form, using fallback data');
      console.warn('Error details:', docError);
      console.warn('Locale:', locale);
      console.warn('Prismic language used:', locale === 'vi' ? 'vi' : 'en-us');
      
      return defaultScheduleTourForm;
    }
  } catch (error) {
    console.error('Error fetching schedule tour form from Prismic:', error);
    return defaultScheduleTourForm;
  }
} 