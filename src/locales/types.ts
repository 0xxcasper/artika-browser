export type NavigationSub = {
  id: string;
  name: string;
  href: string;
};

export type NavigationMenu = {
  label: string;
  href: string;
  subs?: NavigationSub[];
};

export type NavigationCTA = {
  cta_label: string;
  cta_link: string;
};

export type ScheduleTourValidationMessages = {
  schedule_tour_phone_required: string;
  schedule_tour_email_required: string;
  schedule_tour_date_required: string;
  schedule_tour_phone_invalid: string;
  schedule_tour_email_invalid: string;
  schedule_tour_date_future: string;
};

export type ScheduleTourFormData = {
  schedule_tour_title: string;
  schedule_tour_description: string;
  schedule_tour_phone_placeholder: string;
  schedule_tour_email_placeholder: string;
  schedule_tour_date_placeholder: string;
  schedule_tour_button_text: string;
  schedule_tour_success_message: string;
  schedule_tour_error_message: string;
  schedule_tour_validation_messages: ScheduleTourValidationMessages;
};

export type NewsletterFormData = {
  newsletter_title: string;
  newsletter_email_placeholder: string;
  newsletter_button_text: string;
  newsletter_success_message: string;
  newsletter_error_message: string;
  newsletter_validation_message: string;
};

export type FooterContactAddress = {
  address_line: string;
};

export type FooterContactInfo = {
  contact_item: string;
};

export type FooterSocialLinks = {
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
};

export type FooterPrivacyPolicy = {
  privacy_policy_text: string;
  privacy_policy_link: string;
};

export type FooterMenu = {
  title: string;
  href: string;
};

export type FooterData = {
  footer_contact_title: string;
  footer_contact_address: FooterContactAddress[];
  footer_contact_info: FooterContactInfo[];
  footer_artika_title: string;
  footer_social_title: string;
  footer_social_links: FooterSocialLinks;
  footer_privacy_policy: FooterPrivacyPolicy;
  footer_menu_1_title: string;
  footer_menu_1_items: FooterMenu[];
  footer_menu_2_title: string;
  footer_menu_2_items: FooterMenu[];
  footer_menu_3_title: string;
  footer_menu_3_items: FooterMenu[];
  footer_copyright: string;
};

export type NavigationData = {
  items: NavigationMenu[];
  cta: NavigationCTA;
  scheduleTourForm?: ScheduleTourFormData;
  newsletterForm?: NewsletterFormData;
  footerData?: FooterData;
};

export enum SubMenuType {
  // Artwalk
  outdoor = 'outdoor-sculpture-park',
  personal = 'personal-art-museum',
  artists = 'artists-featured',
  memories = 'memories-of-stone',
  whispers = 'whispers-of-moss',
  voices = 'voices-of-bloom',
  breathing = 'breathing-guidance',
}
