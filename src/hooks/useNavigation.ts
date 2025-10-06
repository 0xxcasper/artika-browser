import { useState, useEffect } from 'react';
import { fetchNavigation } from '@/libs/prismic-navigation';
import type {
  NavigationMenu,
  NavigationData,
  NavigationCTA,
  ScheduleTourFormData,
  FooterData,
  NewsletterFormData,
} from '@/locales/types';
import { useLanguage } from '@/contexts/LanguageContext';

const defaultNavigation: NavigationMenu[] = [];

const defaultCta: NavigationCTA = {
  cta_label: '',
  cta_link: '',
};

const defaultNewsletterForm: NewsletterFormData = {
  newsletter_title: 'Get the Insights You Need, Straight to Your Inbox!',
  newsletter_email_placeholder: 'Email',
  newsletter_button_text: 'Subscribe',
  newsletter_success_message:
    'Successfully subscribed! Thank you for signing up.',
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
    twitter_url: 'https://www.twitter.com/artikasapa',
  },
  footer_privacy_policy: {
    privacy_policy_text: 'PRIVACY POLICY',
    privacy_policy_link: '/privacy-policy',
  },
  footer_menu_1_title: '',
  footer_menu_1_items: [],
  footer_menu_2_title: '',
  footer_menu_2_items: [],
  footer_menu_3_title: '',
  footer_menu_3_items: [],
  footer_copyright: 'Artika – Valley of Arts. Bản quyền thuộc về Artika.',
};

export function useNavigation() {
  const { language } = useLanguage();
  const [menus, setMenus] = useState<NavigationMenu[]>(defaultNavigation);
  const [cta, setCta] = useState<NavigationCTA>(defaultCta);
  const [scheduleTourForm, setScheduleTourForm] = useState<
    ScheduleTourFormData | undefined
  >(undefined);
  const [newsletterForm, setNewsletterForm] = useState<NewsletterFormData>(
    defaultNewsletterForm,
  );
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNavigation() {
      setLoading(true);
      setError(null);

      // Convert language to Prismic locale format
      const locale = language; // Currently only English is supported

      console.log('useNavigation', { locale });
      try {
        const navigationData: NavigationData = await fetchNavigation(locale);
        console.log('useNavigation', { navigationData });

        // Fallback to default navigation if Prismic data is empty
        if (navigationData.items.length === 0) {
          // Import default navigation as fallback
          setMenus(defaultNavigation);
          setCta(defaultCta);
          setScheduleTourForm(undefined);
          setNewsletterForm(defaultNewsletterForm);
          setFooterData(defaultFooterData);
        } else {
          setMenus(navigationData.items);
          setCta(navigationData.cta);
          setScheduleTourForm(navigationData.scheduleTourForm);
          setNewsletterForm(
            navigationData.newsletterForm || defaultNewsletterForm,
          );
          setFooterData(navigationData.footerData || defaultFooterData);
        }
      } catch (prismicError) {
        console.warn(
          'Prismic navigation failed, using fallback:',
          prismicError,
        );
        // Import default navigation as fallback
        setMenus(defaultNavigation);
        setCta(defaultCta);
        setScheduleTourForm(undefined);
        setNewsletterForm(defaultNewsletterForm);
        setFooterData(defaultFooterData);

        console.log('useNavigation', { menus, cta });
      }

      setLoading(false);
    }

    loadNavigation();
  }, [language]);

  return {
    menus,
    cta,
    scheduleTourForm,
    newsletterForm,
    footerData,
    loading,
    error,
  };
}
