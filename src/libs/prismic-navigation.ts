import { createClient } from './prismic';
import type { NavigationData, NavigationCTA, ScheduleTourFormData, FooterData, NewsletterFormData } from '@/locales/types';

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

const defaultNewsletterForm: NewsletterFormData = {
  newsletter_title: 'Get the Insights You Need, Straight to Your Inbox!',
  newsletter_email_placeholder: 'Email',
  newsletter_button_text: 'Subscribe',
  newsletter_success_message: 'Successfully subscribed! Thank you for signing up.',
  newsletter_error_message: 'An error occurred. Please try again.',
  newsletter_validation_message: 'Please enter a valid email',
};

const defaultFooterData: FooterData = {
  footer_contact_title: 'Contact',
  footer_contact_address: [
    { address_line: 'Ta Phi Village' },
    { address_line: 'Sa Pa District' },
    { address_line: 'Lao Cai Province' },
  ],
  footer_contact_info: [
    { contact_item: 'info@artikasapa.com' },
    { contact_item: 'artikasapa.com' },
    { contact_item: '+84 8899963616' },
  ],
  footer_artika_title: 'Artika',
  footer_social_title: 'FOLLOW US',
  footer_social_links: {
    instagram_url: 'https://www.instagram.com/artikasapa',
    facebook_url: 'https://www.facebook.com/artikasapa',
  },
  footer_privacy_policy: {
    privacy_policy_text: 'PRIVACY POLICY',
    privacy_policy_link: '/privacy-policy',
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

// Helper function to extract newsletter form data from Prismic document
function extractNewsletterFormData(doc: any): NewsletterFormData {
  return {
    newsletter_title: doc.data.newsletter_title || defaultNewsletterForm.newsletter_title,
    newsletter_email_placeholder: doc.data.newsletter_email_placeholder || defaultNewsletterForm.newsletter_email_placeholder,
    newsletter_button_text: doc.data.newsletter_button_text || defaultNewsletterForm.newsletter_button_text,
    newsletter_success_message: doc.data.newsletter_success_message || defaultNewsletterForm.newsletter_success_message,
    newsletter_error_message: doc.data.newsletter_error_message || defaultNewsletterForm.newsletter_error_message,
    newsletter_validation_message: doc.data.newsletter_validation_message || defaultNewsletterForm.newsletter_validation_message,
  };
}

// Helper function to extract footer data from Prismic document
function extractFooterData(doc: any): FooterData {
  return {
    footer_contact_title: doc.data.footer_contact_title || defaultFooterData.footer_contact_title,
    footer_contact_address: doc.data.footer_contact_address?.map((item: any) => ({
      address_line: item.address_line || '',
    })) || defaultFooterData.footer_contact_address,
    footer_contact_info: doc.data.footer_contact_info?.map((item: any) => ({
      contact_item: item.contact_item || '',
    })) || defaultFooterData.footer_contact_info,
    footer_artika_title: doc.data.footer_artika_title || defaultFooterData.footer_artika_title,
    footer_social_title: doc.data.footer_social_title || defaultFooterData.footer_social_title,
    footer_social_links: {
      instagram_url: doc.data.footer_social_links?.[0]?.instagram_url || defaultFooterData.footer_social_links.instagram_url,
      facebook_url: doc.data.footer_social_links?.[0]?.facebook_url || defaultFooterData.footer_social_links.facebook_url,
    },
    footer_privacy_policy: {
      privacy_policy_text: doc.data.footer_privacy_policy?.[0]?.privacy_policy_text || defaultFooterData.footer_privacy_policy.privacy_policy_text,
      privacy_policy_link: doc.data.footer_privacy_policy?.[0]?.privacy_policy_link || defaultFooterData.footer_privacy_policy.privacy_policy_link,
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

      // Extract newsletter form data
      const newsletterForm = extractNewsletterFormData(doc);
      console.log("Extracted newsletter form data:", newsletterForm);

      // Extract footer data
      const footerData = extractFooterData(doc);
      console.log("Extracted footer data:", footerData);

      return {
        items: items.length > 0 ? items : defaultNavigationItems,
        cta,
        scheduleTourForm,
        newsletterForm,
        footerData
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
        scheduleTourForm: defaultScheduleTourForm,
        newsletterForm: defaultNewsletterForm,
        footerData: defaultFooterData
      };
    }
  } catch (error) {
    console.error('Error fetching navigation from Prismic:', error);
    // Fallback to default navigation if Prismic fails
    return { 
      items: defaultNavigationItems, 
      cta: defaultCta,
      scheduleTourForm: defaultScheduleTourForm,
      newsletterForm: defaultNewsletterForm,
      footerData: defaultFooterData
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

// Export a separate function to get only newsletter form data
export async function fetchNewsletterForm(locale: string): Promise<NewsletterFormData> {
  try {
    const client = createClient();
    console.log("Fetching newsletter form for locale:", locale);
    
    try {
      const prismicLang = locale === 'vi' ? 'vi' : 'en-us';
      console.log("Using Prismic language:", prismicLang);
      
      const doc = await (client as any).getSingle('navigation_menu', { 
        lang: prismicLang
      });
      console.log("Navigation document found for newsletter form:", doc);

      const newsletterForm = extractNewsletterFormData(doc);
      console.log("Extracted newsletter form data:", newsletterForm);
      return newsletterForm;
    } catch (docError) {
      console.warn('Navigation menu document not found for newsletter form, using fallback data');
      console.warn('Error details:', docError);
      console.warn('Locale:', locale);
      console.warn('Prismic language used:', locale === 'vi' ? 'vi' : 'en-us');
      
      return defaultNewsletterForm;
    }
  } catch (error) {
    console.error('Error fetching newsletter form from Prismic:', error);
    return defaultNewsletterForm;
  }
}

// Export a separate function to get only footer data
export async function fetchFooterData(locale: string): Promise<FooterData> {
  try {
    const client = createClient();
    console.log("Fetching footer data for locale:", locale);
    
    try {
      const prismicLang = locale === 'vi' ? 'vi' : 'en-us';
      console.log("Using Prismic language:", prismicLang);
      
      const doc = await (client as any).getSingle('navigation_menu', { 
        lang: prismicLang
      });
      console.log("Navigation document found for footer data:", doc);

      const footerData = extractFooterData(doc);
      console.log("Extracted footer data:", footerData);
      return footerData;
    } catch (docError) {
      console.warn('Navigation menu document not found for footer data, using fallback data');
      console.warn('Error details:', docError);
      console.warn('Locale:', locale);
      console.warn('Prismic language used:', locale === 'vi' ? 'vi' : 'en-us');
      
      return defaultFooterData;
    }
  } catch (error) {
    console.error('Error fetching footer data from Prismic:', error);
    return defaultFooterData;
  }
} 